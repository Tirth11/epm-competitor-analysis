import cors from 'cors';
import express from 'express';
import cron from 'node-cron';
import { z } from 'zod';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, initDb } from './db';
import { applyArconPrimaryProfile, seedData } from './seed';
import { buildInsights } from './insights';
import { runCompetitorCheck } from './scraper';

const app = express();
const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '0.0.0.0';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../../dist');

initDb();
seedData();
applyArconPrimaryProfile();

app.use(cors());
app.use(express.json());

app.get('/api/products', (_req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY is_primary DESC, name ASC').all();
  res.json(products);
});

app.get('/api/comparison', (req, res) => {
  const { product, category, status, search, recentlyUpdated } = req.query as Record<string, string>;
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (product) {
    conditions.push('p.name = ?');
    values.push(product);
  }
  if (category) {
    conditions.push('f.category = ?');
    values.push(category);
  }
  if (status) {
    conditions.push('f.status = ?');
    values.push(status);
  }
  if (search) {
    conditions.push('(f.name LIKE ? OR f.notes LIKE ?)');
    values.push(`%${search}%`, `%${search}%`);
  }
  if (recentlyUpdated === 'true') {
    conditions.push("datetime(f.last_updated) > datetime('now', '-14 days')");
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = db.prepare(`
    SELECT
      f.id,
      p.name as product,
      p.is_primary as isPrimary,
      f.name as feature,
      f.category,
      f.sub_category as subCategory,
      f.status,
      f.notes,
      f.source_url as sourceUrl,
      f.last_updated as lastUpdated
    FROM features f
    JOIN products p ON p.id = f.product_id
    ${where}
    ORDER BY datetime(f.last_updated) DESC, p.is_primary DESC, p.name ASC
  `).all(...values);

  res.json(rows);
});

app.get('/api/updates', (_req, res) => {
  const updates = db.prepare(`
    SELECT
      u.id,
      p.name as product,
      u.update_type as updateType,
      u.title,
      u.detail,
      u.source_url as sourceUrl,
      u.created_at as createdAt
    FROM updates u
    JOIN products p ON p.id = u.product_id
    ORDER BY datetime(u.created_at) DESC
    LIMIT 100
  `).all();
  res.json(updates);
});

app.get('/api/insights', (_req, res) => {
  res.json(buildInsights());
});

app.get('/api/reports/weekly', (_req, res) => {
  const rows = db.prepare(`
    SELECT p.name as product, u.update_type as updateType, u.title, u.created_at as createdAt
    FROM updates u
    JOIN products p ON p.id = u.product_id
    WHERE datetime(u.created_at) > datetime('now', '-7 days')
    ORDER BY datetime(u.created_at) DESC
  `).all();
  res.json({ period: 'weekly', generatedAt: new Date().toISOString(), items: rows });
});

app.get('/api/reports/monthly', (_req, res) => {
  const rows = db.prepare(`
    SELECT p.name as product, u.update_type as updateType, u.title, u.created_at as createdAt
    FROM updates u
    JOIN products p ON p.id = u.product_id
    WHERE datetime(u.created_at) > datetime('now', '-30 days')
    ORDER BY datetime(u.created_at) DESC
  `).all();
  res.json({ period: 'monthly', generatedAt: new Date().toISOString(), items: rows });
});

app.get('/api/export/comparison.csv', (_req, res) => {
  const rows = db.prepare(`
    SELECT p.name, f.name as feature, f.category, f.sub_category, f.status, f.notes, f.source_url, f.last_updated
    FROM features f
    JOIN products p ON p.id = f.product_id
    ORDER BY p.name, f.category
  `).all() as Array<Record<string, unknown>>;

  const header = [
    'Product',
    'Feature',
    'Category',
    'Sub Category',
    'Status',
    'Notes',
    'Source URL',
    'Last Updated',
  ];
  const data = rows.map((r) =>
    [
      r.name,
      r.feature,
      r.category,
      r.sub_category,
      r.status,
      r.notes,
      r.source_url,
      r.last_updated,
    ]
      .map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`)
      .join(',')
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="epm-comparison.csv"');
  res.send([header.join(','), ...data].join('\n'));
});

app.post('/api/check-now', async (_req, res) => {
  await runCompetitorCheck();
  res.json({ ok: true, message: 'Competitor sources checked successfully.' });
});

app.post('/api/features', (req, res) => {
  const schema = z.object({
    productId: z.number(),
    name: z.string().min(1),
    category: z.string().min(1),
    subCategory: z.string().optional(),
    status: z.enum(['Available', 'Partial', 'Planned', 'Deprecated', 'Unknown']),
    notes: z.string().optional(),
    sourceUrl: z.string().url().optional(),
  });

  const payload = schema.parse(req.body);
  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO features (product_id, name, category, sub_category, status, notes, source_url, last_updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    payload.productId,
    payload.name,
    payload.category,
    payload.subCategory ?? null,
    payload.status,
    payload.notes ?? null,
    payload.sourceUrl ?? null,
    now
  );

  db.prepare(`
    INSERT INTO updates (product_id, feature_id, update_type, title, detail, source_url)
    VALUES (?, ?, 'added', ?, ?, ?)
  `).run(
    payload.productId,
    Number(result.lastInsertRowid),
    `Feature added: ${payload.name}`,
    'Feature added manually via dashboard workflow.',
    payload.sourceUrl ?? null
  );

  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

cron.schedule('0 */6 * * *', () => {
  runCompetitorCheck().catch(() => undefined);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, host, () => {
  console.log(`EPM competitor tracker API running on http://${host}:${port}`);
});
