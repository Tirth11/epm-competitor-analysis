import { db } from './db.js';

type SourceSeed = { type: string; url: string };
type ProductSeed = { name: string; website: string; sources: SourceSeed[] };

const products: ProductSeed[] = [
  {
    name: 'CyberArk Endpoint Privilege Manager',
    website: 'https://www.cyberark.com/products/endpoint-privilege-manager/',
    sources: [
      { type: 'product_page', url: 'https://www.cyberark.com/products/endpoint-privilege-manager/' },
      { type: 'docs', url: 'https://docs.cyberark.com' },
      { type: 'release_notes', url: 'https://www.cyberark.com/resources/release-notes' },
      { type: 'blog', url: 'https://www.cyberark.com/blog/' },
    ],
  },
  {
    name: 'BeyondTrust Endpoint Privilege Management',
    website: 'https://www.beyondtrust.com/products/endpoint-privilege-management',
    sources: [
      { type: 'product_page', url: 'https://www.beyondtrust.com/products/endpoint-privilege-management' },
      { type: 'release_notes', url: 'https://www.beyondtrust.com/docs/release-notes' },
      { type: 'blog', url: 'https://www.beyondtrust.com/blog' },
    ],
  },
  {
    name: 'Delinea Privilege Manager',
    website: 'https://delinea.com/products/privilege-manager',
    sources: [
      { type: 'product_page', url: 'https://delinea.com/products/privilege-manager' },
      { type: 'docs', url: 'https://docs.delinea.com' },
      { type: 'release_notes', url: 'https://docs.delinea.com/online-help/products/pm/release-notes' },
      { type: 'blog', url: 'https://delinea.com/blog' },
    ],
  },
  {
    name: 'ManageEngine Endpoint Central',
    website: 'https://www.manageengine.com/products/desktop-central/',
    sources: [
      { type: 'product_page', url: 'https://www.manageengine.com/products/desktop-central/' },
    ],
  },
  {
    name: 'ManageEngine PAM360',
    website: 'https://www.manageengine.com/privileged-access-management/',
    sources: [
      { type: 'product_page', url: 'https://www.manageengine.com/privileged-access-management/' },
    ],
  },
  {
    name: 'Netwrix Endpoint Privilege Manager',
    website: 'https://www.netwrix.com/endpoint_privilege_manager.html',
    sources: [
      { type: 'product_page', url: 'https://www.netwrix.com/endpoint_privilege_manager.html' },
    ],
  },
  {
    name: 'PolicyPak Least Privilege Manager',
    website: 'https://www.policypak.com/products/least-privilege-manager/',
    sources: [
      { type: 'product_page', url: 'https://www.policypak.com/products/least-privilege-manager/' },
    ],
  },
  {
    name: 'Securden Endpoint Privilege Manager',
    website: 'https://www.securden.com/windows-privilege-manager/index.html',
    sources: [
      { type: 'product_page', url: 'https://www.securden.com/windows-privilege-manager/index.html' },
    ],
  },
  {
    name: 'Heimdal Privileged Access Management',
    website: 'https://heimdalsecurity.com/en/products/privileged-access-management',
    sources: [
      { type: 'product_page', url: 'https://heimdalsecurity.com/en/products/privileged-access-management' },
    ],
  },
  {
    name: 'Microsoft Intune Endpoint Privilege Management',
    website: 'https://learn.microsoft.com/en-us/mem/intune/protect/epm-overview',
    sources: [
      { type: 'product_page', url: 'https://learn.microsoft.com/en-us/mem/intune/protect/epm-overview' },
      { type: 'docs', url: 'https://learn.microsoft.com' },
      { type: 'release_notes', url: 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/whats-new' },
    ],
  },
  {
    name: 'Ivanti Endpoint Manager',
    website: 'https://www.ivanti.com/products/endpoint-manager',
    sources: [
      { type: 'product_page', url: 'https://www.ivanti.com/products/endpoint-manager' },
      { type: 'docs', url: 'https://help.ivanti.com' },
      { type: 'release_notes', url: 'https://forums.ivanti.com/s/article/Release-Notes' },
    ],
  },
  {
    name: 'Ivanti Application Control',
    website: 'https://www.ivanti.com/products/application-control',
    sources: [
      { type: 'product_page', url: 'https://www.ivanti.com/products/application-control' },
      { type: 'docs', url: 'https://help.ivanti.com' },
    ],
  },
  {
    name: 'Broadcom (Symantec) Endpoint Privilege Management',
    website: 'https://www.broadcom.com/products/cybersecurity/endpoint/endpoint-privilege-management',
    sources: [
      {
        type: 'product_page',
        url: 'https://www.broadcom.com/products/cybersecurity/endpoint/endpoint-privilege-management',
      },
    ],
  },
  {
    name: 'Admin By Request',
    website: 'https://www.adminbyrequest.com/en/endpoint-privilege-management',
    sources: [
      { type: 'product_page', url: 'https://www.adminbyrequest.com/en/endpoint-privilege-management' },
    ],
  },
  {
    name: 'ThreatLocker',
    website: 'https://www.threatlocker.com/platform/application-control',
    sources: [
      { type: 'product_page', url: 'https://www.threatlocker.com/platform/application-control' },
    ],
  },
  {
    name: 'One Identity Safeguard',
    website: 'https://www.oneidentity.com/products/safeguard/',
    sources: [
      { type: 'product_page', url: 'https://www.oneidentity.com/products/safeguard/' },
    ],
  },
  {
    name: 'Avecto Defendpoint (Legacy Reference)',
    website: 'https://www.beyondtrust.com/resources/glossary/avecto-defendpoint',
    sources: [
      { type: 'product_page', url: 'https://www.beyondtrust.com/resources/glossary/avecto-defendpoint' },
    ],
  },
];

const arconFeatures = [
  { name: 'Platform support for Windows, macOS, and Linux/Unix', category: 'Platform Support', subCategory: 'Cross-platform endpoints' },
  { name: 'Whitelist, Blacklist, and Elevation Profiles', category: 'Privilege Control & Elevation', subCategory: 'Policy profiles' },
  { name: 'Elevation Control and Privilege Configuration', category: 'Privilege Control & Elevation', subCategory: 'Privilege policy tuning' },
  { name: 'Just-In-Time (JIT) Elevation', category: 'Privilege Control & Elevation', subCategory: 'Time-bound privilege access' },
  { name: 'Elevation Extension', category: 'Privilege Control & Elevation', subCategory: 'Session extension' },
  { name: 'Elevation Based on Windows Group Policy', category: 'Privilege Control & Elevation', subCategory: 'Role-based access' },
  { name: 'Elevation Based on Parent-Child Process', category: 'Privilege Control & Elevation', subCategory: 'Process controls' },
  { name: 'Temporary and Permanent Admin Privileges', category: 'Privilege Control & Elevation', subCategory: 'Admin right assignments' },
  { name: 'Ephemeral Admin Account Access', category: 'Privilege Control & Elevation', subCategory: 'Temporary local admin accounts' },
  { name: 'Linux Command Elevation', category: 'Privilege Control & Elevation', subCategory: 'Command-level elevation' },
  { name: 'macOS System Settings Elevation for Specific Privileges', category: 'Privilege Control & Elevation', subCategory: 'Fine-grained macOS admin' },
  { name: 'Password Rotation', category: 'Credential & Emergency Access Management', subCategory: 'Credential lifecycle' },
  { name: 'Envelope Scheduler for Break Glass Access', category: 'Credential & Emergency Access Management', subCategory: 'Outage-safe emergency access' },
  { name: 'Workflow and Approval Management', category: 'Workflow, Approval & Integrations', subCategory: 'Multi-level approvals' },
  { name: 'ITSM Integration for Approval and Incident Management', category: 'Workflow, Approval & Integrations', subCategory: 'ServiceNow and ITSM workflows' },
  { name: 'API Integration Support', category: 'Workflow, Approval & Integrations', subCategory: 'External platform integrations' },
  { name: 'MFA Integration with EPM Agent', category: 'Authentication & MFA', subCategory: 'Agent-based MFA' },
  { name: 'Endpoint MFA Support (Windows and Linux)', category: 'Authentication & MFA', subCategory: 'OS login and privileged actions' },
  { name: 'Process MFA for Thick Client Applications', category: 'Authentication & MFA', subCategory: 'Desktop app MFA gates' },
  { name: 'File Integrity Monitoring (FIM) with Incident Management and Alert Correlation', category: 'Monitoring, Auditing & Compliance', subCategory: 'FIM and SOC workflows' },
  { name: 'SIEM Integration and Syslog Forwarding', category: 'Monitoring, Auditing & Compliance', subCategory: 'Centralized monitoring' },
  { name: 'Reports and Auditing', category: 'Monitoring, Auditing & Compliance', subCategory: 'Audit evidence and governance' },
  { name: 'Report Scheduler', category: 'Monitoring, Auditing & Compliance', subCategory: 'Automated report delivery' },
  { name: 'Archival and Purging of Endpoint and Reports', category: 'Monitoring, Auditing & Compliance', subCategory: 'Retention controls' },
  { name: 'Endpoint Agent Pulling Logs from Endpoint', category: 'Monitoring, Auditing & Compliance', subCategory: 'Endpoint log collection' },
  { name: 'Auto Profiling', category: 'Policy, Identity & Organizational Management', subCategory: 'Behavior-based policying' },
  { name: 'Group-Based Policy Management', category: 'Policy, Identity & Organizational Management', subCategory: 'Group-driven policy assignment' },
  { name: 'Line of Business (LOB) Based Management', category: 'Policy, Identity & Organizational Management', subCategory: 'Business unit controls' },
  { name: 'AD, LDAP, LDAPS, and Azure AD Integration', category: 'Policy, Identity & Organizational Management', subCategory: 'Directory sync' },
  { name: 'Central Inventory Management', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Asset and software inventory' },
  { name: 'Peripheral Device Control with Granular Restriction and Elevation', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'USB, SD card, and CD-ROM controls' },
  { name: 'URL Restriction and Monitoring', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Web access control' },
  { name: 'Server-Based Restrictions and Elevation', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'IP/IP-range controls' },
  { name: 'Outside ARCON PAM Monitoring and Restriction', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Out-of-band privileged activity' },
  { name: 'Endpoint Quarantine', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Threat response isolation' },
  { name: 'Script Firing / Automated Remediation', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Automated response actions' },
  { name: 'Data Classification and DLP on Endpoints', category: 'Endpoint Control, Restrictions & Device Security', subCategory: 'Data protection policies' },
  { name: 'Remote Endpoint Access and Command Execution', category: 'Remote Operations, Resilience & Endpoint Management', subCategory: 'Remote operations' },
  { name: 'Offline Elevation', category: 'Remote Operations, Resilience & Endpoint Management', subCategory: 'Disconnected mode controls' },
  { name: 'Screen Capturing and Session Monitoring', category: 'Remote Operations, Resilience & Endpoint Management', subCategory: 'Session evidence and monitoring' },
  { name: 'Endpoint Backup and Restore', category: 'Remote Operations, Resilience & Endpoint Management', subCategory: 'Operational resilience' },
  { name: 'Vulnerability Scanning for Processes', category: 'Security & Risk Management', subCategory: 'CVE-based process risk detection' },
];

export function seedData() {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, website, is_primary)
    VALUES (@name, @website, 0)
    ON CONFLICT(name) DO UPDATE SET website = excluded.website
  `);
  const selectProduct = db.prepare('SELECT id FROM products WHERE name = ?');
  const deleteProduct = db.prepare('DELETE FROM products WHERE id = ?');
  const deleteFeatures = db.prepare('DELETE FROM features WHERE product_id = ?');
  const deleteUpdates = db.prepare('DELETE FROM updates WHERE product_id = ?');
  const deleteSources = db.prepare('DELETE FROM sources WHERE product_id = ?');
  const insertSource = db.prepare(
    'INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)'
  );

  const activeNames = new Set<string>(['ARCON|EPM', ...products.map((p) => p.name)]);
  const existing = db.prepare('SELECT id, name FROM products').all() as Array<{ id: number; name: string }>;
  for (const row of existing) {
    if (!activeNames.has(row.name)) {
      deleteFeatures.run(row.id);
      deleteUpdates.run(row.id);
      deleteSources.run(row.id);
      deleteProduct.run(row.id);
    }
  }

  for (const p of products) {
    insertProduct.run({ name: p.name, website: p.website });
    const info = selectProduct.get(p.name) as { id: number };
    const productId = info.id;
    deleteSources.run(productId);
    for (const source of p.sources) {
      insertSource.run(productId, source.type, source.url);
    }
  }
}

export function applyArconPrimaryProfile() {
  const now = new Date().toISOString();
  const insertProduct = db.prepare(
    'INSERT INTO products (name, website, is_primary) VALUES (?, ?, 1)'
  );

  db.prepare('UPDATE products SET is_primary = 0').run();

  let arcon = db.prepare('SELECT id FROM products WHERE name = ?').get('ARCON|EPM') as
    | { id: number }
    | undefined;
  if (!arcon) {
    const result = insertProduct.run('ARCON|EPM', 'https://arconnet.com');
    arcon = { id: Number(result.lastInsertRowid) };
  } else {
    db.prepare('UPDATE products SET is_primary = 1, website = ? WHERE id = ?').run('https://arconnet.com', arcon.id);
  }

  const legacy = db.prepare('SELECT id FROM products WHERE name = ?').get('My EPM Product') as
    | { id: number }
    | undefined;
  if (legacy) {
    db.prepare('DELETE FROM features WHERE product_id = ?').run(legacy.id);
    db.prepare('DELETE FROM updates WHERE product_id = ?').run(legacy.id);
    db.prepare('DELETE FROM sources WHERE product_id = ?').run(legacy.id);
    db.prepare('DELETE FROM products WHERE id = ?').run(legacy.id);
  }

  const hasSource = db.prepare('SELECT id FROM sources WHERE product_id = ? AND source_type = ?').get(arcon.id, 'product_page') as { id: number } | undefined;
  if (!hasSource) {
    db.prepare('DELETE FROM sources WHERE product_id = ?').run(arcon.id);
    db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'product_page', 'https://arconnet.com');
    db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'release_notes', 'https://arconnet.com/resources');
    db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'blog', 'https://arconnet.com/blog');
  }

  const featureExists = db.prepare('SELECT id FROM features WHERE product_id = ? AND name = ?');
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
  const deleteFeatureSources = db.prepare('DELETE FROM feature_sources WHERE feature_id = ?');
  const insertFeatureSource = db.prepare(`
    INSERT OR IGNORE INTO feature_sources (feature_id, source_type, url)
    VALUES (?, ?, ?)
  `);

  for (const feature of arconFeatures) {
    const existing = featureExists.get(arcon.id, feature.name) as { id: number } | undefined;
    if (existing) {
      db.prepare(`
        UPDATE features
        SET category = ?, sub_category = ?, status = 'Available', source_url = ?, last_updated = ?, change_type = 'updated'
        WHERE id = ?
      `).run(feature.category, feature.subCategory, 'https://arconnet.com', now, existing.id);
      deleteFeatureSources.run(existing.id);
      insertFeatureSource.run(existing.id, 'product_page', 'https://arconnet.com');
      continue;
    }

    const result = insertFeature.run(
      arcon.id,
      feature.name,
      feature.category,
      feature.subCategory,
      null,
      'https://arconnet.com',
      now,
      now,
      'new'
    );
    insertFeatureSource.run(Number(result.lastInsertRowid), 'product_page', 'https://arconnet.com');
  }

  db.prepare(`
    INSERT INTO updates (product_id, update_type, title, detail, source_url)
    VALUES (?, 'changed', ?, ?, 'https://arconnet.com')
  `).run(
    arcon.id,
    'ARCON|EPM profile synchronized',
    'Primary product renamed and enriched with the full ARCON feature catalog.'
  );
}
