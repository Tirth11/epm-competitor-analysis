import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from './db';
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
    for (const source of sources) {
        try {
            const res = await axios.get(source.url, { timeout: 15000 });
            const html = String(res.data);
            const $ = cheerio.load(html);
            const title = $('title').first().text().trim() || `${source.product_name} page`;
            const h1 = $('h1').first().text().trim();
            const combined = `${title} ${h1}`.trim();
            const hash = quickHash(combined || html.slice(0, 1200));
            const now = new Date().toISOString();
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
