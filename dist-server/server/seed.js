import { db } from './db.js';
const products = [
    { name: 'ARCON|EPM', website: 'https://arconnet.com', isPrimary: true },
    { name: 'CyberArk Endpoint Privilege Manager', website: 'https://www.cyberark.com' },
    { name: 'BeyondTrust Endpoint Privilege Management', website: 'https://www.beyondtrust.com' },
    { name: 'Delinea Privilege Manager', website: 'https://delinea.com' },
    { name: 'ManageEngine Endpoint Central / PAM360', website: 'https://www.manageengine.com' },
    { name: 'Netwrix Endpoint Privilege Manager', website: 'https://www.netwrix.com' },
    { name: 'Securden Endpoint Privilege Manager', website: 'https://www.securden.com' },
    { name: 'Heimdal Privileged Access Management', website: 'https://heimdalsecurity.com' },
    { name: 'Microsoft Endpoint Privilege Management (Intune Suite)', website: 'https://www.microsoft.com' },
    { name: 'Ivanti Endpoint Manager (Privilege Control)', website: 'https://www.ivanti.com' },
    { name: 'Broadcom (Symantec) Endpoint Privilege Management', website: 'https://www.broadcom.com' },
    { name: 'PolicyPak Endpoint Privilege Manager', website: 'https://www.policypak.com' },
    { name: 'Admin By Request', website: 'https://www.adminbyrequest.com' },
    { name: 'ThreatLocker Application + Privilege Control', website: 'https://www.threatlocker.com' },
    { name: 'One Identity Safeguard', website: 'https://www.oneidentity.com' },
];
const baselineFeatures = [
    { name: 'Least privilege enforcement', category: 'Privilege Control', subCategory: 'Core' },
    { name: 'Temporary admin elevation', category: 'Privilege Control', subCategory: 'Just-in-time access' },
    { name: 'Application whitelisting', category: 'Application Control', subCategory: 'Allow/deny policies' },
    { name: 'Audit trail and forensics', category: 'Auditing', subCategory: 'Session and event logs' },
    { name: 'Policy automation', category: 'Policy Management', subCategory: 'Workflow' },
    { name: 'SIEM integrations', category: 'Integrations', subCategory: 'Security Operations' },
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
function randomStatus() {
    return ['Available', 'Partial', 'Planned'][Math.floor(Math.random() * 3)];
}
export function seedData() {
    const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
    if (count.count > 0)
        return;
    const insertProduct = db.prepare('INSERT INTO products (name, website, is_primary) VALUES (@name, @website, @isPrimary)');
    const insertFeature = db.prepare(`
    INSERT INTO features (product_id, name, category, sub_category, status, notes, source_url, last_updated)
    VALUES (@productId, @name, @category, @subCategory, @status, @notes, @sourceUrl, @lastUpdated)
  `);
    const insertSource = db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)');
    const insertUpdate = db.prepare(`
    INSERT INTO updates (product_id, update_type, title, detail, source_url)
    VALUES (?, ?, ?, ?, ?)
  `);
    for (const p of products) {
        const info = insertProduct.run({
            name: p.name,
            website: p.website,
            isPrimary: p.isPrimary ? 1 : 0,
        });
        const productId = Number(info.lastInsertRowid);
        insertSource.run(productId, 'website', p.website);
        insertSource.run(productId, 'release_notes', `${p.website.replace(/\/$/, '')}/resources`);
        insertSource.run(productId, 'blog', `${p.website.replace(/\/$/, '')}/blog`);
        for (const f of baselineFeatures) {
            const status = p.isPrimary ? 'Available' : randomStatus();
            insertFeature.run({
                productId,
                name: f.name,
                category: f.category,
                subCategory: f.subCategory,
                status,
                notes: p.isPrimary ? 'Current capability in our platform.' : 'Derived from public product positioning.',
                sourceUrl: p.website,
                lastUpdated: new Date().toISOString(),
            });
        }
        insertUpdate.run(productId, 'announcement', `${p.name} baseline profile added`, 'Initial competitor profile seeded for tracking and benchmarking.', p.website);
    }
}
export function applyArconPrimaryProfile() {
    const now = new Date().toISOString();
    const insertProduct = db.prepare('INSERT INTO products (name, website, is_primary) VALUES (?, ?, 1)');
    db.prepare('UPDATE products SET is_primary = 0').run();
    let arcon = db.prepare('SELECT id FROM products WHERE name = ?').get('ARCON|EPM');
    if (!arcon) {
        const result = insertProduct.run('ARCON|EPM', 'https://arconnet.com');
        arcon = { id: Number(result.lastInsertRowid) };
    }
    else {
        db.prepare('UPDATE products SET is_primary = 1, website = ? WHERE id = ?').run('https://arconnet.com', arcon.id);
    }
    const legacy = db.prepare('SELECT id FROM products WHERE name = ?').get('My EPM Product');
    if (legacy) {
        db.prepare('DELETE FROM features WHERE product_id = ?').run(legacy.id);
        db.prepare('DELETE FROM updates WHERE product_id = ?').run(legacy.id);
        db.prepare('DELETE FROM sources WHERE product_id = ?').run(legacy.id);
        db.prepare('DELETE FROM products WHERE id = ?').run(legacy.id);
    }
    const hasSource = db.prepare('SELECT id FROM sources WHERE product_id = ? AND source_type = ?').get(arcon.id, 'website');
    if (!hasSource) {
        db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'website', 'https://arconnet.com');
        db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'release_notes', 'https://arconnet.com/resources');
        db.prepare('INSERT INTO sources (product_id, source_type, url) VALUES (?, ?, ?)').run(arcon.id, 'blog', 'https://arconnet.com/blog');
    }
    const featureExists = db.prepare('SELECT id FROM features WHERE product_id = ? AND name = ?');
    const insertFeature = db.prepare(`
    INSERT INTO features (product_id, name, category, sub_category, status, notes, source_url, last_updated)
    VALUES (?, ?, ?, ?, 'Available', ?, 'https://arconnet.com', ?)
  `);
    for (const feature of arconFeatures) {
        const existing = featureExists.get(arcon.id, feature.name);
        if (existing) {
            db.prepare(`
        UPDATE features
        SET category = ?, sub_category = ?, status = 'Available', notes = ?, source_url = 'https://arconnet.com', last_updated = ?
        WHERE id = ?
      `).run(feature.category, feature.subCategory, 'Provided by ARCON feature input.', now, existing.id);
            continue;
        }
        insertFeature.run(arcon.id, feature.name, feature.category, feature.subCategory, 'Provided by ARCON feature input.', now);
    }
    db.prepare(`
    INSERT INTO updates (product_id, update_type, title, detail, source_url)
    VALUES (?, 'changed', ?, ?, 'https://arconnet.com')
  `).run(arcon.id, 'ARCON|EPM profile synchronized', 'Primary product renamed and enriched with the full ARCON feature catalog.');
}
