import { db } from './db.js';

export function buildInsights() {
  const primary = db.prepare('SELECT id, name FROM products WHERE is_primary = 1 LIMIT 1').get() as
    | { id: number; name: string }
    | undefined;
  if (!primary) return null;

  const competitorFeatures = db.prepare(`
    SELECT DISTINCT f.name
    FROM features f
    JOIN products p ON p.id = f.product_id
    WHERE p.is_primary = 0 AND f.change_type != 'removed'
  `).all() as Array<{ name: string }>;

  const myFeatures = db.prepare(
    "SELECT DISTINCT name FROM features WHERE product_id = ? AND change_type != 'removed'"
  ).all(primary.id) as Array<{ name: string }>;

  const mySet = new Set(myFeatures.map((f) => f.name));
  const competitorSet = new Set(competitorFeatures.map((f) => f.name));

  const gaps = [...competitorSet].filter((f) => !mySet.has(f));
  const differentiators = [...mySet].filter((f) => !competitorSet.has(f));

  const fastest = db.prepare(`
    SELECT p.name, COUNT(*) as update_count
    FROM updates u
    JOIN products p ON p.id = u.product_id
    WHERE p.is_primary = 0 AND datetime(u.created_at) > datetime('now', '-30 days')
    GROUP BY p.name
    ORDER BY update_count DESC
    LIMIT 5
  `).all();

  const trendingCategories = db.prepare(`
    SELECT f.category, COUNT(*) as additions
    FROM updates u
    JOIN features f ON f.id = u.feature_id
    WHERE u.update_type = 'added' AND datetime(u.created_at) > datetime('now', '-60 days')
    GROUP BY f.category
    ORDER BY additions DESC
    LIMIT 5
  `).all();

  return {
    gaps,
    differentiators,
    fastestInnovation: fastest,
    trends: trendingCategories,
  };
}
