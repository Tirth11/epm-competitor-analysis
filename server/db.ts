import Database from 'better-sqlite3';

export const db = new Database('epm_competitor.db');

function getColumns(table: string) {
  return db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
}

function hasColumn(table: string, column: string) {
  const columns = getColumns(table);
  return columns.some((c) => c.name === column);
}

function migrateFeaturesTable() {
  const columns = getColumns('features');
  if (!columns.length) return;

  const columnNames = new Set(columns.map((c) => c.name));
  const needsMigration =
    columnNames.has('notes') ||
    !columnNames.has('description') ||
    !columnNames.has('source_url') ||
    !columnNames.has('first_detected') ||
    !columnNames.has('change_type');

  if (!needsMigration) return;

  const selectStatus = columnNames.has('status') ? 'status' : "'Available'";
  const selectDescription = columnNames.has('description') ? 'description' : 'NULL';
  const selectSourceUrl = columnNames.has('source_url') ? 'source_url' : 'NULL';
  const selectFirstDetected = columnNames.has('first_detected')
    ? 'first_detected'
    : "COALESCE(last_updated, CURRENT_TIMESTAMP)";
  const selectChangeType = columnNames.has('change_type') ? 'change_type' : "'updated'";

  db.exec(`
    BEGIN;
      CREATE TABLE IF NOT EXISTS features_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT,
        status TEXT NOT NULL,
        description TEXT,
        source_url TEXT,
        first_detected TEXT NOT NULL,
        last_updated TEXT NOT NULL,
        change_type TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
      );

      INSERT INTO features_new (
        id,
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
      SELECT
        id,
        product_id,
        name,
        category,
        sub_category,
        ${selectStatus},
        ${selectDescription},
        ${selectSourceUrl},
        ${selectFirstDetected},
        COALESCE(last_updated, CURRENT_TIMESTAMP),
        ${selectChangeType}
      FROM features;

      DROP TABLE features;
      ALTER TABLE features_new RENAME TO features;

      CREATE INDEX IF NOT EXISTS idx_features_product ON features(product_id);
      CREATE INDEX IF NOT EXISTS idx_features_category ON features(category);
    COMMIT;
  `);
}

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
      description TEXT,
      source_url TEXT,
      first_detected TEXT NOT NULL,
      last_updated TEXT NOT NULL,
      change_type TEXT NOT NULL,
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

    CREATE TABLE IF NOT EXISTS feature_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feature_id INTEGER NOT NULL,
      source_type TEXT NOT NULL,
      url TEXT NOT NULL,
      FOREIGN KEY (feature_id) REFERENCES features(id)
    );

    CREATE INDEX IF NOT EXISTS idx_features_product ON features(product_id);
    CREATE INDEX IF NOT EXISTS idx_features_category ON features(category);
    CREATE INDEX IF NOT EXISTS idx_updates_created ON updates(created_at DESC);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_sources_unique ON sources(product_id, source_type, url);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_feature_sources_unique ON feature_sources(feature_id, url);
  `);

  migrateFeaturesTable();
}
