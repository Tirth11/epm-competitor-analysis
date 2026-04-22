import Database from 'better-sqlite3';
export const db = new Database('epm_competitor.db');
export function initDb() {
    db.pragma('journal_mode = WAL');
    db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      website TEXT NOT NULL,
      is_primary INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      sub_category TEXT,
      status TEXT NOT NULL,
      notes TEXT,
      source_url TEXT,
      last_updated TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      feature_id INTEGER,
      update_type TEXT NOT NULL,
      title TEXT NOT NULL,
      detail TEXT,
      source_url TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (feature_id) REFERENCES features(id)
    );

    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      source_type TEXT NOT NULL,
      url TEXT NOT NULL,
      last_checked TEXT,
      last_hash TEXT,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE INDEX IF NOT EXISTS idx_features_product ON features(product_id);
    CREATE INDEX IF NOT EXISTS idx_features_category ON features(category);
    CREATE INDEX IF NOT EXISTS idx_updates_created ON updates(created_at DESC);
  `);
}
