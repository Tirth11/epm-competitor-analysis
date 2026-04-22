import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from './db.js';
const MIN_FEATURES = 6;
function normalizeText(text) {
    return text.replace(/\s+/g, ' ').replace(/[•·]+/g, '').trim();
}
function isFeatureCandidate(text) {
    const lower = text.toLowerCase();
    if (text.length < 4 || text.length > 140)
        return false;
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
function pushFeature(features, seen, name, category, subCategory) {
    const cleaned = normalizeText(name);
    if (!cleaned || !isFeatureCandidate(cleaned))
        return;
    const key = cleaned.toLowerCase();
    if (seen.has(key))
        return;
    seen.add(key);
    features.push({
        name: cleaned,
        category: category || 'General',
        subCategory,
    });
}
function extractFeaturesFromPage(html) {
    const $ = cheerio.load(html);
    const root = $('main').first().length ? $('main').first() : $('body');
    const features = [];
    const seen = new Set();
    const sections = root.find('section');
    if (sections.length) {
        sections.each((_, section) => {
            const $section = $(section);
            const sectionHeading = normalizeText($section.find('h2').first().text());
            $section.find('ul, ol').each((__, list) => {
                const $list = $(list);
                const listHeading = normalizeText($list.prevAll('h3, h4').first().text());
                const category = sectionHeading || listHeading || 'General';
                const subCategory = sectionHeading && listHeading ? listHeading : null;
                $list.find('li').each((___, li) => {
                    const text = normalizeText($(li).text());
                    pushFeature(features, seen, text, category, subCategory);
                });
            });
        });
    }
    if (features.length < MIN_FEATURES) {
        root.find('ul li, ol li').each((_, li) => {
            const text = normalizeText($(li).text());
            pushFeature(features, seen, text, 'General', null);
        });
    }
    if (features.length < MIN_FEATURES) {
        root.find('h3, h4').each((_, heading) => {
            const text = normalizeText($(heading).text());
            pushFeature(features, seen, text, 'General', null);
        });
    }
    return features;
}
function quickHash(input) {
    let h = 0;
    for (let i = 0; i < input.length; i++) {
        h = (h << 5) - h + input.charCodeAt(i);
        h |= 0;
    }
    return String(h);
}
function maybeInferUpdateType(text) {
    const lower = text.toLowerCase();
    if (lower.includes('deprecat') || lower.includes('retire') || lower.includes('sunset'))
        return 'deprecated';
    if (lower.includes('new') || lower.includes('launch') || lower.includes('introduc'))
        return 'added';
    if (lower.includes('update') || lower.includes('improv') || lower.includes('enhance'))
        return 'changed';
    return 'announcement';
}
export async function runCompetitorCheck() {
    const sources = db.prepare(`
    SELECT s.id, s.product_id, s.source_type, s.url, s.last_hash, p.name as product_name
    FROM sources s
    JOIN products p ON p.id = s.product_id
  `).all();
    const updateSource = db.prepare('UPDATE sources SET last_checked = ?, last_hash = ? WHERE id = ?');
    const insertUpdate = db.prepare(`
    INSERT INTO updates (product_id, update_type, title, detail, source_url)
    VALUES (?, ?, ?, ?, ?)
  `);
    const deleteFeatures = db.prepare('DELETE FROM features WHERE product_id = ?');
    const insertFeature = db.prepare(`
    INSERT INTO features (product_id, name, category, sub_category, status, last_updated)
    VALUES (?, ?, ?, ?, 'Available', ?)
  `);
    for (const source of sources) {
        try {
            const res = await axios.get(source.url, { timeout: 15000 });
            const html = String(res.data);
            const $ = cheerio.load(html);
            const title = $('title').first().text().trim() || `${source.product_name} page`;
            const h1 = $('h1').first().text().trim();
            const combined = `${title} ${h1}`.trim();
            const extractedFeatures = source.source_type === 'product_page' ? extractFeaturesFromPage(html) : [];
            const featureHash = extractedFeatures.map((f) => f.name).join('|');
            const hash = quickHash(featureHash || combined || html.slice(0, 1200));
            const now = new Date().toISOString();
            if (source.source_type === 'product_page' && extractedFeatures.length >= MIN_FEATURES) {
                const tx = db.transaction(() => {
                    deleteFeatures.run(source.product_id);
                    for (const feature of extractedFeatures) {
                        insertFeature.run(source.product_id, feature.name, feature.category, feature.subCategory, now);
                    }
                });
                tx();
                insertUpdate.run(source.product_id, 'changed', `${source.product_name}: features refreshed`, `Extracted ${extractedFeatures.length} features from product page.`, source.url);
            }
            else if (source.source_type === 'product_page') {
                insertUpdate.run(source.product_id, 'announcement', `${source.product_name}: feature extraction incomplete`, 'Insufficient feature signals found on the product page.', source.url);
            }
            if (source.last_hash && source.last_hash !== hash) {
                const updateType = maybeInferUpdateType(combined);
                insertUpdate.run(source.product_id, updateType, `${source.product_name}: ${source.source_type} updated`, combined || 'Page content changed.', source.url);
            }
            updateSource.run(now, hash, source.id);
        }
        catch {
            insertUpdate.run(source.product_id, 'announcement', `${source.product_name}: source check failed`, `Unable to fetch ${source.source_type} source for automated check.`, source.url);
        }
    }
}
