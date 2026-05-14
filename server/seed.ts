import { db } from './db.js';
import { CATALOG, type CuratedFeature, type CuratedProduct, type CuratedUseCase } from './catalog.js';

type ProductIdRow = { id: number };

const upsertProduct = (product: CuratedProduct) => {
  db.prepare(
    `
      INSERT INTO products (name, website, is_primary, product_type, vendor, description)
      VALUES (@name, @website, @isPrimary, @productType, @vendor, @description)
      ON CONFLICT(name) DO UPDATE SET
        website = excluded.website,
        is_primary = excluded.is_primary,
        product_type = excluded.product_type,
        vendor = excluded.vendor,
        description = excluded.description
    `
  ).run({
    name: product.name,
    website: product.website,
    isPrimary: product.isPrimary ? 1 : 0,
    productType: product.productType,
    vendor: product.vendor,
    description: product.description,
  });

  const row = db
    .prepare('SELECT id FROM products WHERE name = ?')
    .get(product.name) as ProductIdRow | undefined;
  if (!row) {
    throw new Error(`Failed to upsert product ${product.name}`);
  }
  return row.id;
};

const replaceSources = (productId: number, product: CuratedProduct) => {
  db.prepare('DELETE FROM sources WHERE product_id = ?').run(productId);
  const insertSource = db.prepare(
    'INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)'
  );
  for (const source of product.sources) {
    insertSource.run(productId, source.type, source.url);
  }
};

type ExistingFeature = {
  id: number;
  name: string;
  category: string;
  sub_category: string | null;
  status: string;
  description: string | null;
  source_url: string | null;
  change_type: string;
};

const syncFeatures = (productId: number, productName: string, features: CuratedFeature[]) => {
  const now = new Date().toISOString();
  const existing = db
    .prepare(
      `SELECT id, name, category, sub_category, status, description, source_url, change_type
         FROM features
        WHERE product_id = ?`
    )
    .all(productId) as ExistingFeature[];

  const existingByName = new Map(existing.map((row) => [row.name.toLowerCase(), row]));
  const seen = new Set<string>();

  const insertFeature = db.prepare(`
    INSERT INTO features (
      product_id, name, category, sub_category, status, description, source_url,
      first_detected, last_updated, change_type
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const updateFeature = db.prepare(`
    UPDATE features
       SET category = ?, sub_category = ?, status = ?, description = ?,
           source_url = ?, last_updated = ?, change_type = ?
     WHERE id = ?
  `);
  const markRemoved = db.prepare(`
    UPDATE features
       SET status = 'Deprecated', change_type = 'removed', last_updated = ?
     WHERE id = ?
  `);
  const insertUpdate = db.prepare(`
    INSERT INTO updates (product_id, feature_id, update_type, title, detail, source_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const deleteFeatureSources = db.prepare('DELETE FROM feature_sources WHERE feature_id = ?');
  const insertFeatureSource = db.prepare(`
    INSERT OR IGNORE INTO feature_sources (feature_id, source_type, url)
    VALUES (?, ?, ?)
  `);

  for (const feature of features) {
    seen.add(feature.name.toLowerCase());
    const status = feature.status ?? 'Available';
    const description = feature.description ?? null;
    const subCategory = feature.subCategory ?? null;
    const refs = (feature.references ?? []).filter(Boolean);
    const primary = refs[0] ?? null;
    const existingRow = existingByName.get(feature.name.toLowerCase());

    if (existingRow) {
      const changed =
        existingRow.category !== feature.category ||
        (existingRow.sub_category ?? null) !== subCategory ||
        existingRow.status !== status ||
        (existingRow.description ?? null) !== description ||
        (existingRow.source_url ?? null) !== primary ||
        existingRow.change_type === 'removed';

      if (changed) {
        const changeType = existingRow.change_type === 'removed' ? 'new' : 'updated';
        updateFeature.run(
          feature.category,
          subCategory,
          status,
          description,
          primary,
          now,
          changeType,
          existingRow.id
        );
        insertUpdate.run(
          productId,
          existingRow.id,
          changeType === 'new' ? 'added' : 'changed',
          `${productName}: ${feature.name} ${changeType === 'new' ? 'reintroduced' : 'updated'}`,
          description,
          primary
        );
      }
      deleteFeatureSources.run(existingRow.id);
      for (const url of refs) {
        insertFeatureSource.run(existingRow.id, 'reference', url);
      }
      continue;
    }

    const result = insertFeature.run(
      productId,
      feature.name,
      feature.category,
      subCategory,
      status,
      description,
      primary,
      now,
      now,
      'new'
    );
    const featureId = Number(result.lastInsertRowid);
    for (const url of refs) {
      insertFeatureSource.run(featureId, 'reference', url);
    }
    insertUpdate.run(
      productId,
      featureId,
      'added',
      `${productName}: ${feature.name} added`,
      description,
      primary
    );
  }

  for (const row of existing) {
    if (!seen.has(row.name.toLowerCase()) && row.change_type !== 'removed') {
      markRemoved.run(now, row.id);
      insertUpdate.run(
        productId,
        row.id,
        'deprecated',
        `${productName}: ${row.name} removed`,
        row.description ?? null,
        row.source_url ?? null
      );
    }
  }
};

const syncUseCases = (productId: number, useCases: CuratedUseCase[]) => {
  db.prepare('DELETE FROM use_cases WHERE product_id = ?').run(productId);
  const insert = db.prepare(`
    INSERT INTO use_cases (
      product_id, title, category, industry, problem, solution, outcome, source_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const uc of useCases) {
    insert.run(
      productId,
      uc.title,
      uc.category,
      uc.industry ?? null,
      uc.problem,
      uc.solution,
      uc.outcome,
      uc.sourceUrl ?? null
    );
  }
};

const removeStaleProducts = (activeNames: Set<string>) => {
  const existing = db
    .prepare('SELECT id, name FROM products')
    .all() as Array<{ id: number; name: string }>;
  for (const row of existing) {
    if (activeNames.has(row.name)) continue;
    db.prepare('DELETE FROM features WHERE product_id = ?').run(row.id);
    db.prepare('DELETE FROM updates WHERE product_id = ?').run(row.id);
    db.prepare('DELETE FROM sources WHERE product_id = ?').run(row.id);
    db.prepare('DELETE FROM use_cases WHERE product_id = ?').run(row.id);
    db.prepare('DELETE FROM products WHERE id = ?').run(row.id);
  }
};

export function seedData() {
  const activeNames = new Set(CATALOG.map((p) => p.name));
  removeStaleProducts(activeNames);

  for (const product of CATALOG) {
    const productId = upsertProduct(product);
    replaceSources(productId, product);
    syncFeatures(productId, product.name, product.features);
    syncUseCases(productId, product.useCases);
  }
}

// Kept for backward compatibility with existing imports.
export function applyArconPrimaryProfile() {
  // Intentional no-op: ARCON|EPM is now seeded via the unified curated catalog.
}
