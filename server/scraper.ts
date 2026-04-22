import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Cheerio } from 'cheerio';
import type { AnyNode } from 'domhandler';
import { db } from './db.js';

type ExtractedFeature = {
  name: string;
  description: string | null;
  category: string;
  subCategory: string | null;
  references: string[];
};

type SourceRow = {
  id: number;
  product_id: number;
  source_type: string;
  url: string;
  last_hash: string | null;
  last_checked: string | null;
  product_name: string;
};

type ExistingFeature = {
  id: number;
  name: string;
  category: string;
  sub_category: string | null;
  description: string | null;
  source_url: string | null;
  first_detected: string;
  change_type: string;
};

const MIN_FEATURES = 6;
const CHECK_INTERVAL_DAYS: Record<string, number> = {
  release_notes: 7,
  blog: 7,
  product_page: 30,
  docs: 30,
  youtube: 30,
};

const CATEGORY_RULES: Array<{ category: string; keywords: string[] }> = [
  {
    category: 'Least Privilege',
    keywords: ['least privilege', 'privilege', 'elevation', 'admin', 'endpoint privilege'],
  },
  {
    category: 'Application Control',
    keywords: ['application control', 'allowlist', 'whitelist', 'blocklist', 'denylist'],
  },
  {
    category: 'JIT Access',
    keywords: ['jit', 'just-in-time', 'temporary access', 'time-bound', 'approval'],
  },
  {
    category: 'Session Control',
    keywords: ['session', 'record', 'monitor', 'audit trail', 'session control'],
  },
  {
    category: 'Integrations',
    keywords: ['integration', 'siem', 'splunk', 'servicenow', 'jira', 'api'],
  },
  {
    category: 'Deployment Model',
    keywords: ['cloud', 'saas', 'on-prem', 'hybrid', 'deployment'],
  },
  {
    category: 'Security Capabilities',
    keywords: ['security', 'threat', 'zero trust', 'vulnerability', 'risk', 'malware'],
  },
  {
    category: 'Compliance',
    keywords: ['compliance', 'audit', 'pci', 'hipaa', 'soc', 'iso', 'gdpr'],
  },
];

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').replace(/[•·]+/g, '').trim();
}

function isFeatureCandidate(text: string) {
  const lower = text.toLowerCase();
  if (text.length < 4 || text.length > 160) return false;
  const blocked = [
    'cookie',
    'privacy',
    'terms',
    'contact',
    'careers',
    'press',
    'resources',
    'blog',
    'pricing',
    'demo',
    'login',
    'sign in',
    'subscribe',
  ];
  return !blocked.some((word) => lower.includes(word));
}

function inferCategory(heading: string, name: string, description: string | null) {
  const combined = `${heading} ${name} ${description ?? ''}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => combined.includes(keyword))) {
      return rule.category;
    }
  }
  return heading || 'General';
}

function parseFeatureText(text: string) {
  const separators = [' - ', ' – ', ' — ', ': '];
  for (const sep of separators) {
    if (text.includes(sep)) {
      const [left, right] = text.split(sep, 2).map((part) => part.trim());
      if (left.length >= 3 && right.length >= 4 && left.length <= 90) {
        return { name: left, description: right };
      }
    }
  }
  return { name: text, description: null };
}

function parseFeatureFromElement($element: Cheerio<AnyNode>) {
  const rawText = normalizeText($element.text());
  if (!rawText) return null;
  const strongText = normalizeText($element.find('strong, b').first().text());
  if (strongText && rawText.toLowerCase().startsWith(strongText.toLowerCase())) {
    const remainder = normalizeText(rawText.slice(strongText.length));
    const description = normalizeText(remainder.replace(/^[-–—:]\s*/, '')) || null;
    return { name: strongText, description };
  }
  return parseFeatureText(rawText);
}

function resolveUrl(href: string, baseUrl: string) {
  try {
    const url = new URL(href, baseUrl);
    if (url.protocol.startsWith('http')) return url.toString();
    return null;
  } catch {
    return null;
  }
}

function isYoutube(url: string) {
  const lower = url.toLowerCase();
  return lower.includes('youtube.com') || lower.includes('youtu.be');
}

function collectReferences($element: Cheerio<AnyNode>, pageUrl: string): string[] {
  const urls = new Set<string>();
  $element.find('a[href]').each((_, link) => {
    const href = String($element.find(link).attr('href') ?? '').trim();
    if (!href) return;
    const resolved = resolveUrl(href, pageUrl);
    if (resolved) urls.add(resolved);
  });
  if (!urls.size) {
    urls.add(pageUrl);
  }
  return [...urls];
}

function pickPrimarySource(references: string[], pageUrl: string) {
  const youtube = references.find((ref) => isYoutube(ref));
  if (youtube) return youtube;
  return references[0] ?? pageUrl;
}

function pushFeature(
  features: ExtractedFeature[],
  seen: Set<string>,
  feature: ExtractedFeature
) {
  const cleaned = normalizeText(feature.name);
  if (!cleaned || !isFeatureCandidate(cleaned)) return;
  const key = cleaned.toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);
  features.push({
    ...feature,
    name: cleaned,
    description: feature.description ? normalizeText(feature.description) : null,
    category: feature.category || 'General',
  });
}

function extractFeaturesFromPage(html: string, pageUrl: string) {
  const $ = cheerio.load(html);
  const root = $('main').first().length ? $('main').first() : $('body');
  const features: ExtractedFeature[] = [];
  const seen = new Set<string>();

  const sections = root.find('section');
  if (sections.length) {
    sections.each((_, section) => {
      const $section = $(section);
      const sectionHeading = normalizeText($section.find('h2').first().text());

      $section.find('ul, ol').each((__, list) => {
        const $list = $(list);
        const listHeading = normalizeText($list.prevAll('h3, h4').first().text());
        $list.find('li').each((___, li) => {
          const parsed = parseFeatureFromElement($(li));
          if (!parsed) return;
          const heading = listHeading || sectionHeading;
          const category = inferCategory(heading, parsed.name, parsed.description);
          const subCategory = heading && heading !== category ? heading : null;
          const references = collectReferences($(li), pageUrl);
          pushFeature(features, seen, {
            name: parsed.name,
            description: parsed.description,
            category,
            subCategory,
            references,
          });
        });
      });
    });
  }

  if (features.length < MIN_FEATURES) {
    root.find('ul li, ol li').each((_, li) => {
      const parsed = parseFeatureFromElement($(li));
      if (!parsed) return;
      const references = collectReferences($(li), pageUrl);
      const category = inferCategory('', parsed.name, parsed.description);
      pushFeature(features, seen, {
        name: parsed.name,
        description: parsed.description,
        category,
        subCategory: null,
        references,
      });
    });
  }

  if (features.length < MIN_FEATURES) {
    root.find('h3, h4').each((_, heading) => {
      const text = normalizeText($(heading).text());
      if (!text) return;
      const references = collectReferences($(heading), pageUrl);
      const category = inferCategory('', text, null);
      pushFeature(features, seen, {
        name: text,
        description: null,
        category,
        subCategory: null,
        references,
      });
    });
  }

  return features;
}

function quickHash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return String(h);
}

function maybeInferUpdateType(text: string): 'added' | 'changed' | 'deprecated' | 'announcement' {
  const lower = text.toLowerCase();
  if (lower.includes('deprecat') || lower.includes('retire') || lower.includes('sunset')) return 'deprecated';
  if (lower.includes('new') || lower.includes('launch') || lower.includes('introduc')) return 'added';
  if (lower.includes('update') || lower.includes('improv') || lower.includes('enhance')) return 'changed';
  return 'announcement';
}

function shouldCheckSource(source: SourceRow, force: boolean) {
  if (force) return true;
  if (!source.last_checked) return true;
  const intervalDays = CHECK_INTERVAL_DAYS[source.source_type] ?? 30;
  const last = Date.parse(source.last_checked);
  if (Number.isNaN(last)) return true;
  const diffDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
  return diffDays >= intervalDays;
}

function syncProductFeatures(
  productId: number,
  productName: string,
  pageUrl: string,
  extracted: ExtractedFeature[]
) {
  const now = new Date().toISOString();
  const existing = db
    .prepare(
      `
        SELECT id, name, category, sub_category, description, source_url, first_detected, change_type
        FROM features
        WHERE product_id = ?
      `
    )
    .all(productId) as ExistingFeature[];

  const existingMap = new Map(existing.map((item) => [item.name.toLowerCase(), item]));
  const seen = new Set<string>();

  const insertFeature = db.prepare(`
    INSERT INTO features (
      product_id,
      name,
      category,
      sub_category,
      status,
      description,
      source_url,
      first_detected,
      last_updated,
      change_type
    )
    VALUES (?, ?, ?, ?, 'Available', ?, ?, ?, ?, ?)
  `);
  const updateFeature = db.prepare(`
    UPDATE features
    SET category = ?, sub_category = ?, status = 'Available', description = ?, source_url = ?, last_updated = ?, change_type = ?
    WHERE id = ?
  `);
  const markRemoved = db.prepare(`
    UPDATE features
    SET status = 'Deprecated', last_updated = ?, change_type = 'removed'
    WHERE id = ?
  `);
  const deleteFeatureSources = db.prepare('DELETE FROM feature_sources WHERE feature_id = ?');
  const insertFeatureSource = db.prepare(`
    INSERT OR IGNORE INTO feature_sources (feature_id, source_type, url)
    VALUES (?, ?, ?)
  `);
  const insertUpdate = db.prepare(`
    INSERT INTO updates (product_id, feature_id, update_type, title, detail, source_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    for (const feature of extracted) {
      const key = feature.name.toLowerCase();
      seen.add(key);
      const existingFeature = existingMap.get(key);
      const references = feature.references.length ? feature.references : [pageUrl];
      const primarySource = pickPrimarySource(references, pageUrl);

      if (!existingFeature) {
        const result = insertFeature.run(
          productId,
          feature.name,
          feature.category,
          feature.subCategory,
          feature.description,
          primarySource,
          now,
          now,
          'new'
        );
        const featureId = Number(result.lastInsertRowid);
        for (const ref of references) {
          const sourceType = isYoutube(ref) ? 'youtube' : ref === pageUrl ? 'product_page' : 'reference';
          insertFeatureSource.run(featureId, sourceType, ref);
        }
        insertUpdate.run(
          productId,
          featureId,
          'added',
          `${productName}: feature added`,
          feature.name,
          primarySource
        );
        continue;
      }

      const changed =
        existingFeature.category !== feature.category ||
        (existingFeature.sub_category ?? null) !== feature.subCategory ||
        (existingFeature.description ?? null) !== (feature.description ?? null) ||
        (existingFeature.source_url ?? null) !== (primarySource ?? null) ||
        existingFeature.change_type === 'removed';

      if (changed) {
        const changeType = existingFeature.change_type === 'removed' ? 'new' : 'updated';
        updateFeature.run(
          feature.category,
          feature.subCategory,
          feature.description,
          primarySource,
          now,
          changeType,
          existingFeature.id
        );
        insertUpdate.run(
          productId,
          existingFeature.id,
          changeType === 'new' ? 'added' : 'changed',
          `${productName}: feature ${changeType === 'new' ? 'reintroduced' : 'updated'}`,
          feature.name,
          primarySource
        );
      }

      deleteFeatureSources.run(existingFeature.id);
      for (const ref of references) {
        const sourceType = isYoutube(ref) ? 'youtube' : ref === pageUrl ? 'product_page' : 'reference';
        insertFeatureSource.run(existingFeature.id, sourceType, ref);
      }
    }

    for (const existingFeature of existing) {
      const key = existingFeature.name.toLowerCase();
      if (!seen.has(key) && existingFeature.change_type !== 'removed') {
        markRemoved.run(now, existingFeature.id);
        insertUpdate.run(
          productId,
          existingFeature.id,
          'deprecated',
          `${productName}: feature removed`,
          existingFeature.name,
          existingFeature.source_url ?? pageUrl
        );
      }
    }
  });

  tx();
}

export async function runCompetitorCheck(options: { force?: boolean } = {}) {
  const sources = db.prepare(`
    SELECT s.id, s.product_id, s.source_type, s.url, s.last_hash, s.last_checked, p.name as product_name
    FROM sources s
    JOIN products p ON p.id = s.product_id
  `).all() as SourceRow[];

  const updateSource = db.prepare('UPDATE sources SET last_checked = ?, last_hash = ? WHERE id = ?');
  const insertUpdate = db.prepare(`
    INSERT INTO updates (product_id, update_type, title, detail, source_url)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const source of sources) {
    if (!shouldCheckSource(source, options.force ?? false)) {
      continue;
    }
    try {
      const res = await axios.get(source.url, { timeout: 15000 });
      const html = String(res.data);
      const $ = cheerio.load(html);
      const title = $('title').first().text().trim() || `${source.product_name} page`;
      const h1 = $('h1').first().text().trim();
      const combined = `${title} ${h1}`.trim();
      const extractedFeatures =
        source.source_type === 'product_page' ? extractFeaturesFromPage(html, source.url) : [];
      const featureHash = extractedFeatures.map((f) => f.name).join('|');
      const hash = quickHash(featureHash || combined || html.slice(0, 1200));
      const now = new Date().toISOString();

      if (source.source_type === 'product_page' && extractedFeatures.length >= MIN_FEATURES) {
        syncProductFeatures(source.product_id, source.product_name, source.url, extractedFeatures);
      } else if (source.source_type === 'product_page') {
        insertUpdate.run(
          source.product_id,
          'announcement',
          `${source.product_name}: feature extraction incomplete`,
          'Insufficient feature signals found on the product page.',
          source.url
        );
      }

      if (source.last_hash && source.last_hash !== hash) {
        const updateType = maybeInferUpdateType(combined);
        insertUpdate.run(
          source.product_id,
          updateType,
          `${source.product_name}: ${source.source_type} updated`,
          combined || 'Page content changed.',
          source.url
        );
      }

      updateSource.run(now, hash, source.id);
    } catch {
      insertUpdate.run(
        source.product_id,
        'announcement',
        `${source.product_name}: source check failed`,
        `Unable to fetch ${source.source_type} source for automated check.`,
        source.url
      );
    }
  }
}
