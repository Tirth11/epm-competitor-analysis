import cors from 'cors';
import express from 'express';
import cron from 'node-cron';
import { z } from 'zod';
import path from 'node:path';
import { db, initDb } from './db.js';
import { seedData } from './seed.js';
import { buildInsights } from './insights.js';
import { runCompetitorCheck } from './scraper.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '0.0.0.0';
const distPath = path.resolve(process.cwd(), 'dist');

initDb();
seedData();
runCompetitorCheck().catch(() => undefined);

app.use(cors());
app.use(express.json());

// --- Products ---
app.get('/api/products', (req, res) => {
    const { type } = req.query;
    let sql = 'SELECT * FROM products';
    const values = [];
    if (type) { sql += ' WHERE product_type = ?'; values.push(type); }
    sql += ' ORDER BY is_primary DESC, name ASC';
    const products = db.prepare(sql).all(...values);
    res.json(products);
});

// --- Comparison ---
app.get('/api/comparison', (req, res) => {
    const { product, category, status, search, recentlyUpdated, changeType, type } = req.query;
    const conditions = [];
    const values = [];
    if (type) { conditions.push('p.product_type = ?'); values.push(type); }
    if (product) { conditions.push('p.name = ?'); values.push(product); }
    if (category) { conditions.push('f.category = ?'); values.push(category); }
    if (status) { conditions.push('f.status = ?'); values.push(status); }
    if (changeType) { conditions.push('f.change_type = ?'); values.push(changeType); }
    if (search) {
        conditions.push('(f.name LIKE ? OR f.category LIKE ? OR f.sub_category LIKE ? OR f.description LIKE ?)');
        values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (recentlyUpdated === 'true') {
        conditions.push("datetime(f.last_updated) > datetime('now', '-14 days')");
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const rows = db.prepare(`
      SELECT
        f.id, p.name as product, p.is_primary as isPrimary, p.product_type as productType,
        f.name as feature, f.category, f.sub_category as subCategory, f.status, f.description,
        f.source_url as sourceUrl, f.first_detected as firstDetected,
        f.last_updated as lastUpdated, f.change_type as changeType,
        group_concat(fs.url, '||') as refs
      FROM features f
      JOIN products p ON p.id = f.product_id
      LEFT JOIN feature_sources fs ON fs.feature_id = f.id
      ${where}
      GROUP BY f.id
      ORDER BY datetime(f.last_updated) DESC, p.is_primary DESC, p.name ASC
    `).all(...values);
    const formatted = rows.map((row) => ({
        ...row,
        references: row.refs ? String(row.refs).split('||') : [],
        refs: undefined,
    }));
    res.json(formatted);
});

// --- Use Cases ---
app.get('/api/use-cases', (req, res) => {
    const { type, product, category } = req.query;
    const conditions = [];
    const values = [];
    if (type) { conditions.push('p.product_type = ?'); values.push(type); }
    if (product) { conditions.push('p.name = ?'); values.push(product); }
    if (category) { conditions.push('uc.category = ?'); values.push(category); }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const rows = db.prepare(`
      SELECT uc.id, p.name as product, p.product_type as productType,
        uc.title, uc.category, uc.industry, uc.problem, uc.solution, uc.outcome,
        uc.source_url as sourceUrl
      FROM use_cases uc
      JOIN products p ON p.id = uc.product_id
      ${where}
      ORDER BY p.name ASC, uc.category ASC
    `).all(...values);
    res.json(rows);
});

// --- Updates ---
app.get('/api/updates', (_req, res) => {
    const updates = db.prepare(`
      SELECT u.id, p.name as product, u.update_type as updateType, u.title, u.detail,
        u.source_url as sourceUrl, u.created_at as createdAt
      FROM updates u
      JOIN products p ON p.id = u.product_id
      ORDER BY datetime(u.created_at) DESC LIMIT 100
    `).all();
    res.json(updates);
});

// --- Insights ---
app.get('/api/insights', (_req, res) => {
    res.json(buildInsights());
});

// --- Reports ---
app.get('/api/reports/weekly', (_req, res) => {
    const rows = db.prepare(`
      SELECT p.name as product, u.update_type as updateType, u.title, u.created_at as createdAt
      FROM updates u JOIN products p ON p.id = u.product_id
      WHERE datetime(u.created_at) > datetime('now', '-7 days')
      ORDER BY datetime(u.created_at) DESC
    `).all();
    res.json({ period: 'weekly', generatedAt: new Date().toISOString(), items: rows });
});

app.get('/api/reports/monthly', (_req, res) => {
    const rows = db.prepare(`
      SELECT p.name as product, u.update_type as updateType, u.title, u.created_at as createdAt
      FROM updates u JOIN products p ON p.id = u.product_id
      WHERE datetime(u.created_at) > datetime('now', '-30 days')
      ORDER BY datetime(u.created_at) DESC
    `).all();
    res.json({ period: 'monthly', generatedAt: new Date().toISOString(), items: rows });
});

// --- CSV Export ---
app.get('/api/export/comparison.csv', (_req, res) => {
    const rows = db.prepare(`
      SELECT p.name, p.product_type, f.name as feature, f.category, f.sub_category, f.status,
        f.description, f.source_url, f.first_detected, f.last_updated, f.change_type,
        group_concat(fs.url, '||') as refs
      FROM features f
      JOIN products p ON p.id = f.product_id
      LEFT JOIN feature_sources fs ON fs.feature_id = f.id
      GROUP BY f.id
      ORDER BY p.product_type, p.name, f.category
    `).all();
    const header = ['Product','Type','Feature','Category','Sub Category','Status','Description','Source URL','Reference URLs','First Detected','Last Updated','Change Type'];
    const data = rows.map((r) =>
        [r.name, r.product_type, r.feature, r.category, r.sub_category, r.status, r.description, r.source_url, r.refs, r.first_detected, r.last_updated, r.change_type]
            .map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`)
            .join(',')
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="epm-edr-comparison.csv"');
    res.send([header.join(','), ...data].join('\n'));
});

// --- Manual Feature Addition ---
app.post('/api/features', (req, res) => {
    const schema = z.object({
        productId: z.number(),
        name: z.string().min(1),
        category: z.string().min(1),
        subCategory: z.string().optional(),
        status: z.enum(['Available', 'Partial', 'Planned', 'Deprecated', 'Unknown']),
        description: z.string().optional(),
        sourceUrl: z.string().url().optional(),
    });
    const payload = schema.parse(req.body);
    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO features (product_id, name, category, sub_category, status, description, source_url, first_detected, last_updated, change_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(payload.productId, payload.name, payload.category, payload.subCategory ?? null, payload.status, payload.description ?? null, payload.sourceUrl ?? null, now, now, 'new');
    if (payload.sourceUrl) {
        db.prepare('INSERT INTO feature_sources (feature_id, source_type, url) VALUES (?, ?, ?)').run(Number(result.lastInsertRowid), 'manual', payload.sourceUrl);
    }
    db.prepare(`INSERT INTO updates (product_id, feature_id, update_type, title, detail, source_url) VALUES (?, ?, 'added', ?, ?, ?)`)
        .run(payload.productId, Number(result.lastInsertRowid), `Feature added: ${payload.name}`, 'Feature added manually via dashboard workflow.', payload.sourceUrl ?? null);
    res.status(201).json({ id: Number(result.lastInsertRowid) });
});

// --- Check now ---
app.post('/api/check-now', async (_req, res) => {
    await runCompetitorCheck({ force: true });
    res.json({ ok: true, message: 'Competitor sources checked successfully.' });
});

// --- Cron ---
cron.schedule('0 */6 * * *', () => {
    runCompetitorCheck().catch(() => undefined);
});

// --- Static + SPA ---
app.use(express.static(distPath));
app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, host, () => {
    console.log(`EPM & EDR competitor tracker API running on http://${host}:${port}`);
});
