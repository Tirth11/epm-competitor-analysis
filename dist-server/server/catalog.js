// Curated competitor catalog for EPM and EDR products.
// Hand-curated from public vendor product pages, datasheets, and documentation.
// References (URLs) are linked per-product so users can verify each capability claim.

// ---------------------------------------------------------------------------
// EPM Categories used across the catalog (kept consistent so the comparison
// matrix lines up across vendors).
// ---------------------------------------------------------------------------
const EPM_CAT = {
  PLATFORM: 'Platform Support',
  ELEVATION: 'Privilege Control & Elevation',
  CRED: 'Credential & Emergency Access Management',
  WORKFLOW: 'Workflow, Approval & Integrations',
  AUTH: 'Authentication & MFA',
  AUDIT: 'Monitoring, Auditing & Compliance',
  POLICY: 'Policy, Identity & Organizational Management',
  ENDPOINT: 'Endpoint Control, Restrictions & Device Security',
  REMOTE: 'Remote Operations, Resilience & Endpoint Management',
  RISK: 'Security & Risk Management',
};

const EDR_CAT = {
  DETECTION: 'Threat Detection & Prevention',
  RESPONSE: 'Response & Remediation',
  HUNTING: 'Threat Hunting & Forensics',
  TELEMETRY: 'Telemetry & Visibility',
  AI: 'AI / Behavioral Analytics',
  PLATFORM: 'Platform & Coverage',
  INTEGRATION: 'Integrations & SOAR',
  COMPLIANCE: 'Compliance & Reporting',
  MANAGED: 'Managed Services (MDR / Threat Ops)',
  IDENTITY: 'Identity Threat Detection',
};

// ---------------------------------------------------------------------------
// EPM COMPETITORS
// ---------------------------------------------------------------------------

const cyberark = {
  name: 'CyberArk Endpoint Privilege Manager',
  vendor: 'CyberArk',
  productType: 'EPM',
  website: 'https://www.cyberark.com/products/endpoint-privilege-manager/',
  description:
    'SaaS-first endpoint privilege management with policy-based least privilege, application control, credential theft protection, and ransomware defense for Windows, macOS, and Linux.',
  sources: [
    { type: 'product_page', url: 'https://www.cyberark.com/products/endpoint-privilege-manager/' },
    { type: 'docs', url: 'https://docs.cyberark.com/EPM/Latest/en/Content/LandingPages/LPEndUser.htm' },
    { type: 'release_notes', url: 'https://docs.cyberark.com/EPM/Latest/en/Content/ReleaseNotes/EPM-Release-Notes.htm' },
    { type: 'blog', url: 'https://www.cyberark.com/resources/blog' },
  ],
  features: [
    { name: 'Cross-platform agent (Windows, macOS, Linux)', category: EPM_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Policy-based least privilege enforcement', category: EPM_CAT.ELEVATION, subCategory: 'Policy elevation' },
    { name: 'Just-in-Time elevation with approval workflows', category: EPM_CAT.ELEVATION, subCategory: 'JIT' },
    { name: 'Application control: allow / block / restrict / elevate', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Threat protection: credential theft blocking', category: EPM_CAT.RISK, subCategory: 'Credential theft defense' },
    { name: 'Ransomware protection (read/write/delete fences)', category: EPM_CAT.RISK, subCategory: 'Ransomware controls' },
    { name: 'Trusted source publishing (greenlists)', category: EPM_CAT.ENDPOINT, subCategory: 'Trusted publishers' },
    { name: 'Loosely connected / offline policy enforcement', category: EPM_CAT.REMOTE, subCategory: 'Offline mode' },
    { name: 'macOS system extension and TCC management', category: EPM_CAT.PLATFORM, subCategory: 'macOS specific' },
    { name: 'Linux sudoers-style command elevation', category: EPM_CAT.ELEVATION, subCategory: 'Linux commands' },
    { name: 'SIEM / Splunk integration via syslog and APIs', category: EPM_CAT.AUDIT, subCategory: 'SIEM' },
    { name: 'Identity provider integration (Azure AD, Okta, ADFS)', category: EPM_CAT.POLICY, subCategory: 'IdP' },
    { name: 'REST API for policies, events, and reporting', category: EPM_CAT.WORKFLOW, subCategory: 'API' },
    { name: 'Application risk analysis service', category: EPM_CAT.RISK, subCategory: 'App risk scoring' },
    { name: 'Audit-ready reporting and compliance dashboards', category: EPM_CAT.AUDIT, subCategory: 'Compliance reports' },
  ],
  useCases: [
    {
      title: 'Remove local admin rights without breaking productivity',
      category: 'Least Privilege Adoption',
      industry: 'Financial Services',
      problem: 'Standard users had local admin rights, exposing the environment to ransomware and lateral movement.',
      solution: 'Deployed CyberArk EPM with granular elevation policies and on-demand elevation prompts.',
      outcome: 'Local admin rights removed for 100% of standard users while preserving daily workflows via JIT.',
    },
    {
      title: 'Stop ransomware from encrypting protected files',
      category: 'Ransomware Defense',
      problem: 'Endpoints were vulnerable to ransomware encrypting business-critical file shares.',
      solution: 'Enabled CyberArk EPM ransomware protection with read/write/delete fences and trusted writer lists.',
      outcome: 'Blocked unknown processes from modifying protected directories during simulated ransomware tests.',
    },
    {
      title: 'Defend privileged credentials from theft on endpoints',
      category: 'Credential Theft Protection',
      problem: 'Mimikatz-style attacks targeting LSASS memory put cached credentials at risk.',
      solution: 'Activated EPM credential theft protection rules to block credential dumping attempts.',
      outcome: 'Reduced LSASS access alerts and improved Tier 0 protection for domain credentials.',
    },
  ],
};

const beyondtrust = {
  name: 'BeyondTrust Endpoint Privilege Management',
  vendor: 'BeyondTrust',
  productType: 'EPM',
  website: 'https://www.beyondtrust.com/products/endpoint-privilege-management',
  description:
    'Combines least privilege, application control, and trusted application protection across Windows, macOS, Unix/Linux, with granular rule-based policies and analytics.',
  sources: [
    { type: 'product_page', url: 'https://www.beyondtrust.com/products/endpoint-privilege-management' },
    { type: 'docs', url: 'https://www.beyondtrust.com/docs/privilege-management/index.htm' },
    { type: 'release_notes', url: 'https://www.beyondtrust.com/docs/release-notes/privilege-management/index.htm' },
    { type: 'blog', url: 'https://www.beyondtrust.com/blog' },
  ],
  features: [
    { name: 'Windows, macOS, Unix and Linux agent coverage', category: EPM_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Rule-based privilege elevation policies', category: EPM_CAT.ELEVATION, subCategory: 'Rule-based policies' },
    { name: 'Trusted Application Protection (TAP)', category: EPM_CAT.ENDPOINT, subCategory: 'Trusted apps' },
    { name: 'Quickstart policy templates and policy editor', category: EPM_CAT.POLICY, subCategory: 'Policy authoring' },
    { name: 'Power Rules for dynamic policy decisions', category: EPM_CAT.ELEVATION, subCategory: 'Dynamic rules' },
    { name: 'Privilege Management Reporting and analytics', category: EPM_CAT.AUDIT, subCategory: 'Analytics' },
    { name: 'Sudo replacement and command control on Linux/Unix', category: EPM_CAT.ELEVATION, subCategory: 'Linux commands' },
    { name: 'Application allow / block / passive audit modes', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Challenge / Response offline elevation codes', category: EPM_CAT.REMOTE, subCategory: 'Offline approvals' },
    { name: 'Active Directory and Entra ID integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'BeyondInsight central management', category: EPM_CAT.POLICY, subCategory: 'Console' },
    { name: 'SIEM and ITSM integrations (Splunk, ServiceNow)', category: EPM_CAT.WORKFLOW, subCategory: 'Integrations' },
    { name: 'macOS authorization DB and TCC handling', category: EPM_CAT.PLATFORM, subCategory: 'macOS specific' },
    { name: 'Application risk and trust scoring', category: EPM_CAT.RISK, subCategory: 'App risk scoring' },
  ],
  useCases: [
    {
      title: 'Replace sudo across a Linux estate',
      category: 'Linux Command Control',
      industry: 'Telecom',
      problem: 'Sprawling sudoers files were inconsistent, hard to audit, and often over-permissive.',
      solution: 'Centralized privileged command policies via BeyondTrust Privilege Management for Unix and Linux.',
      outcome: 'One pane of glass for command authorization with full session keystroke logging.',
    },
    {
      title: 'Allow developers to elevate without granting full admin',
      category: 'Developer Productivity',
      problem: 'Developers needed admin for IDE updates, drivers, and tooling.',
      solution: 'Deployed Power Rules to elevate signed developer tools and prompt for justification on others.',
      outcome: 'Removed permanent admin while keeping developer self-service intact.',
    },
  ],
};

const delinea = {
  name: 'Delinea Privilege Manager',
  vendor: 'Delinea',
  productType: 'EPM',
  website: 'https://delinea.com/products/privilege-manager',
  description:
    'Endpoint privilege management for workstations and servers with application control, MFA at depth, and SaaS or on-prem deployment options.',
  sources: [
    { type: 'product_page', url: 'https://delinea.com/products/privilege-manager' },
    { type: 'docs', url: 'https://docs.delinea.com/online-help/privilege-manager/start.htm' },
    { type: 'release_notes', url: 'https://docs.delinea.com/online-help/privilege-manager/release-notes/index.htm' },
    { type: 'blog', url: 'https://delinea.com/blog' },
  ],
  features: [
    { name: 'Windows, macOS and Linux endpoint agents', category: EPM_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Application allowlisting and denylisting', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Application elevation and reputation lookup', category: EPM_CAT.ELEVATION, subCategory: 'App reputation' },
    { name: 'Out-of-the-box policy templates', category: EPM_CAT.POLICY, subCategory: 'Templates' },
    { name: 'Local user and group management', category: EPM_CAT.POLICY, subCategory: 'Local accounts' },
    { name: 'MFA at privilege elevation', category: EPM_CAT.AUTH, subCategory: 'Step-up MFA' },
    { name: 'ServiceNow and ITSM workflow integrations', category: EPM_CAT.WORKFLOW, subCategory: 'ITSM' },
    { name: 'SaaS and on-premises deployment options', category: EPM_CAT.PLATFORM, subCategory: 'Deployment' },
    { name: 'Granular auditing and event reporting', category: EPM_CAT.AUDIT, subCategory: 'Audit logs' },
    { name: 'Privilege behavior analytics', category: EPM_CAT.RISK, subCategory: 'Behavior analytics' },
    { name: 'Active Directory bridge for Linux/macOS', category: EPM_CAT.POLICY, subCategory: 'Directory bridge' },
    { name: 'REST APIs for automation and orchestration', category: EPM_CAT.WORKFLOW, subCategory: 'API' },
  ],
  useCases: [
    {
      title: 'Achieve PCI DSS least privilege on cardholder workstations',
      category: 'Compliance',
      industry: 'Retail',
      problem: 'PCI auditors flagged excessive admin rights on POS and back-office workstations.',
      solution: 'Rolled out Privilege Manager with policy templates aligned to PCI DSS least privilege.',
      outcome: 'Closed PCI DSS finding and reduced workstation attack surface.',
    },
    {
      title: 'Stop unknown applications from executing on endpoints',
      category: 'Application Control',
      problem: 'Endpoints occasionally ran unsanctioned binaries from email and browser downloads.',
      solution: 'Configured Privilege Manager allowlists with reputation lookups.',
      outcome: 'Blocked unknown binaries while preserving known-good business software.',
    },
  ],
};

const me_endpoint_central = {
  name: 'ManageEngine Endpoint Central',
  vendor: 'ManageEngine',
  productType: 'EPM',
  website: 'https://www.manageengine.com/products/desktop-central/',
  description:
    'Unified endpoint management with patching, software deployment, configurations, mobile device management, and add-on privilege management capabilities.',
  sources: [
    { type: 'product_page', url: 'https://www.manageengine.com/products/desktop-central/' },
    { type: 'docs', url: 'https://www.manageengine.com/products/desktop-central/help/index.html' },
    { type: 'release_notes', url: 'https://www.manageengine.com/products/desktop-central/release-notes.html' },
  ],
  features: [
    { name: 'Patch management for OS and 3rd party apps', category: EPM_CAT.REMOTE, subCategory: 'Patching' },
    { name: 'Software deployment and self-service portal', category: EPM_CAT.REMOTE, subCategory: 'Deployment' },
    { name: 'Configuration management and policies', category: EPM_CAT.POLICY, subCategory: 'Configurations' },
    { name: 'Mobile device management (MDM)', category: EPM_CAT.PLATFORM, subCategory: 'MDM' },
    { name: 'Application control add-on', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Privilege Management add-on', category: EPM_CAT.ELEVATION, subCategory: 'Add-on EPM' },
    { name: 'USB and peripheral device control', category: EPM_CAT.ENDPOINT, subCategory: 'Device control' },
    { name: 'Browser security plugin', category: EPM_CAT.ENDPOINT, subCategory: 'Browser controls' },
    { name: 'Vulnerability management and risk insights', category: EPM_CAT.RISK, subCategory: 'Vulnerability mgmt' },
    { name: 'Remote control and troubleshooting', category: EPM_CAT.REMOTE, subCategory: 'Remote operations' },
    { name: 'Asset and software inventory', category: EPM_CAT.AUDIT, subCategory: 'Inventory' },
  ],
  useCases: [
    {
      title: 'Patch entire estate within SLA from a single console',
      category: 'Patch Management',
      industry: 'Mid-market IT',
      problem: 'Patching across Windows, Linux, macOS, and 3rd party apps took disparate tools and weeks.',
      solution: 'Used Endpoint Central automated patch policies and test/approval rings.',
      outcome: 'Reduced patch SLA from weeks to days and improved vulnerability posture.',
    },
  ],
};

const me_pam360 = {
  name: 'ManageEngine PAM360',
  vendor: 'ManageEngine',
  productType: 'EPM',
  website: 'https://www.manageengine.com/privileged-access-management/',
  description:
    'Enterprise privileged access management suite with credential vaulting, session management, JIT elevation, and integrations with ITSM and SIEM platforms.',
  sources: [
    { type: 'product_page', url: 'https://www.manageengine.com/privileged-access-management/' },
    { type: 'docs', url: 'https://www.manageengine.com/privileged-access-management/help/' },
  ],
  features: [
    { name: 'Privileged credential vault and rotation', category: EPM_CAT.CRED, subCategory: 'Vaulting' },
    { name: 'Privileged session management and recording', category: EPM_CAT.AUDIT, subCategory: 'Session recording' },
    { name: 'Just-In-Time privilege elevation', category: EPM_CAT.ELEVATION, subCategory: 'JIT' },
    { name: 'SSH key management', category: EPM_CAT.CRED, subCategory: 'SSH keys' },
    { name: 'AD / Azure AD integration and provisioning', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'MFA and adaptive authentication', category: EPM_CAT.AUTH, subCategory: 'Adaptive MFA' },
    { name: 'ITSM (ServiceNow, Jira) approval workflows', category: EPM_CAT.WORKFLOW, subCategory: 'ITSM' },
    { name: 'REST API for automation', category: EPM_CAT.WORKFLOW, subCategory: 'API' },
    { name: 'Real-time session monitoring', category: EPM_CAT.AUDIT, subCategory: 'Live monitoring' },
    { name: 'Privileged behavior analytics', category: EPM_CAT.RISK, subCategory: 'UBA' },
  ],
  useCases: [
    {
      title: 'Vault and rotate shared service account passwords',
      category: 'Credential Vaulting',
      problem: 'Shared service account passwords were stored in spreadsheets and rarely rotated.',
      solution: 'Imported accounts into PAM360 with scheduled rotation and check-in/check-out flows.',
      outcome: 'Eliminated stale credentials and produced an auditable trail of every use.',
    },
  ],
};

const netwrix = {
  name: 'Netwrix Endpoint Privilege Manager',
  vendor: 'Netwrix',
  productType: 'EPM',
  website: 'https://www.netwrix.com/endpoint_privilege_manager.html',
  description:
    'Endpoint privilege management focused on removing local admin rights with elevation policies, application control, and detailed audit trails.',
  sources: [
    { type: 'product_page', url: 'https://www.netwrix.com/endpoint_privilege_manager.html' },
    { type: 'docs', url: 'https://helpcenter.netwrix.com/' },
  ],
  features: [
    { name: 'Local admin rights removal and elevation', category: EPM_CAT.ELEVATION, subCategory: 'Admin removal' },
    { name: 'Application allowlist / denylist policies', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Just-in-time admin requests with approval', category: EPM_CAT.ELEVATION, subCategory: 'JIT' },
    { name: 'Audit trail and policy reports', category: EPM_CAT.AUDIT, subCategory: 'Audit reports' },
    { name: 'Active Directory integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'Centralized policy management console', category: EPM_CAT.POLICY, subCategory: 'Console' },
    { name: 'Behavior-based privilege analytics', category: EPM_CAT.RISK, subCategory: 'UBA' },
    { name: 'Integration with Netwrix Auditor', category: EPM_CAT.AUDIT, subCategory: 'Auditor integration' },
  ],
  useCases: [
    {
      title: 'Remove local admin to satisfy ISO 27001 controls',
      category: 'Compliance',
      problem: 'ISO 27001 audit highlighted excess admin rights on user endpoints.',
      solution: 'Used Netwrix EPM elevation policies to enforce least privilege.',
      outcome: 'Closed audit finding and reduced privileged exposure.',
    },
  ],
};

const policypak = {
  name: 'PolicyPak Least Privilege Manager',
  vendor: 'Netwrix (PolicyPak)',
  productType: 'EPM',
  website: 'https://www.policypak.com/products/least-privilege-manager/',
  description:
    'Group Policy and MDM-driven least privilege manager that elevates specific applications, scripts, MSIs, and Control Panel applets without granting full admin.',
  sources: [
    { type: 'product_page', url: 'https://www.policypak.com/products/least-privilege-manager/' },
    { type: 'docs', url: 'https://kb.policypak.com/' },
  ],
  features: [
    { name: 'Per-application elevation rules', category: EPM_CAT.ELEVATION, subCategory: 'Per-app elevation' },
    { name: 'Group Policy and Intune delivery', category: EPM_CAT.POLICY, subCategory: 'GPO/Intune' },
    { name: 'Control Panel applet elevation', category: EPM_CAT.ELEVATION, subCategory: 'Control Panel' },
    { name: 'Hash, path, publisher, and certificate rules', category: EPM_CAT.ENDPOINT, subCategory: 'Rule types' },
    { name: 'On-demand admin run-as for users', category: EPM_CAT.ELEVATION, subCategory: 'Run as admin' },
    { name: 'Reporting via Netwrix integration', category: EPM_CAT.AUDIT, subCategory: 'Reporting' },
  ],
  useCases: [
    {
      title: 'Elevate legacy line-of-business apps without giving admin',
      category: 'Application Elevation',
      problem: 'A legacy ERP client required admin to launch on Windows 10/11.',
      solution: 'Configured PolicyPak rule to elevate only that signed binary on demand.',
      outcome: 'Removed admin rights from finance users while keeping the ERP client functional.',
    },
  ],
};

const securden = {
  name: 'Securden Endpoint Privilege Manager',
  vendor: 'Securden',
  productType: 'EPM',
  website: 'https://www.securden.com/windows-privilege-manager/index.html',
  description:
    'Lightweight EPM that removes local admin rights, enforces application control, and provides one-time admin tokens with detailed auditing.',
  sources: [
    { type: 'product_page', url: 'https://www.securden.com/windows-privilege-manager/index.html' },
    { type: 'docs', url: 'https://www.securden.com/endpoint-privilege-manager/help/index.html' },
  ],
  features: [
    { name: 'Local admin rights removal', category: EPM_CAT.ELEVATION, subCategory: 'Admin removal' },
    { name: 'Application allowlist and elevation', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'On-demand admin token elevation', category: EPM_CAT.ELEVATION, subCategory: 'Token elevation' },
    { name: 'Self-service request portal', category: EPM_CAT.WORKFLOW, subCategory: 'Self-service' },
    { name: 'Reporting and dashboards', category: EPM_CAT.AUDIT, subCategory: 'Dashboards' },
    { name: 'Active Directory integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'macOS endpoint agent', category: EPM_CAT.PLATFORM, subCategory: 'macOS' },
  ],
  useCases: [
    {
      title: 'Replace permanent admin with on-demand admin tokens',
      category: 'Just-in-Time Admin',
      problem: 'IT staff and power users had permanent local admin accounts.',
      solution: 'Deployed Securden EPM with on-demand elevation tokens that expire automatically.',
      outcome: 'Reduced standing privilege and produced an auditable elevation log.',
    },
  ],
};

const heimdal = {
  name: 'Heimdal Privileged Access Management',
  vendor: 'Heimdal Security',
  productType: 'EPM',
  website: 'https://heimdalsecurity.com/en/products/privileged-access-management',
  description:
    'Privileged access management module within the Heimdal unified security platform, with auto de-elevation on threat detection.',
  sources: [
    { type: 'product_page', url: 'https://heimdalsecurity.com/en/products/privileged-access-management' },
    { type: 'docs', url: 'https://support.heimdalsecurity.com/' },
  ],
  features: [
    { name: 'Privilege elevation with approval workflows', category: EPM_CAT.ELEVATION, subCategory: 'Approval' },
    { name: 'Auto de-elevation on threat detection', category: EPM_CAT.RISK, subCategory: 'Threat-aware EPM' },
    { name: 'Application control via Heimdal app suite', category: EPM_CAT.ENDPOINT, subCategory: 'Application control' },
    { name: 'Patching integration', category: EPM_CAT.REMOTE, subCategory: 'Patching' },
    { name: 'Email, DNS, and endpoint security correlation', category: EPM_CAT.RISK, subCategory: 'Cross-product correlation' },
    { name: 'Active Directory integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
  ],
  useCases: [
    {
      title: 'Automatically revoke admin if endpoint shows compromise',
      category: 'Adaptive Privilege',
      problem: 'Compromised endpoints with active admin sessions could escalate damage.',
      solution: 'Heimdal PAM auto-revoked elevated rights when correlated DNS or endpoint signals fired.',
      outcome: 'Reduced dwell time of attacker actions during simulated incidents.',
    },
  ],
};

const intune_epm = {
  name: 'Microsoft Intune Endpoint Privilege Management',
  vendor: 'Microsoft',
  productType: 'EPM',
  website: 'https://learn.microsoft.com/en-us/mem/intune/protect/epm-overview',
  description:
    'Intune add-on that lets standard users run approved elevated tasks on Windows with file/path/publisher rules and detailed reporting.',
  sources: [
    { type: 'product_page', url: 'https://learn.microsoft.com/en-us/mem/intune/protect/epm-overview' },
    { type: 'docs', url: 'https://learn.microsoft.com/en-us/mem/intune/protect/epm-policies' },
    { type: 'release_notes', url: 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/whats-new' },
  ],
  features: [
    { name: 'Windows-only elevation rules (file hash, path, publisher)', category: EPM_CAT.ELEVATION, subCategory: 'Rule types' },
    { name: 'Automatic and user-confirmed elevation', category: EPM_CAT.ELEVATION, subCategory: 'Elevation modes' },
    { name: 'Support approved (admin-approved) elevation', category: EPM_CAT.ELEVATION, subCategory: 'Approval' },
    { name: 'Elevation reports and analytics', category: EPM_CAT.AUDIT, subCategory: 'Reporting' },
    { name: 'Native Intune / Entra ID integration', category: EPM_CAT.POLICY, subCategory: 'Entra ID' },
    { name: 'Conditional Access alignment', category: EPM_CAT.AUTH, subCategory: 'Conditional Access' },
    { name: 'Policy-as-code via Microsoft Graph', category: EPM_CAT.WORKFLOW, subCategory: 'API' },
  ],
  useCases: [
    {
      title: 'Roll out least privilege to Windows fleets already managed by Intune',
      category: 'Least Privilege Adoption',
      problem: 'Organizations standardized on Intune wanted EPM without adding a new vendor.',
      solution: 'Activated Intune EPM add-on with rules for common admin scenarios.',
      outcome: 'Removed local admin while reusing existing Entra identities and reporting.',
    },
  ],
};

const ivanti_em = {
  name: 'Ivanti Endpoint Manager',
  vendor: 'Ivanti',
  productType: 'EPM',
  website: 'https://www.ivanti.com/products/endpoint-manager',
  description:
    'Unified endpoint management with software distribution, patching, OS provisioning, remote control, and policy-based admin rights management.',
  sources: [
    { type: 'product_page', url: 'https://www.ivanti.com/products/endpoint-manager' },
    { type: 'docs', url: 'https://help.ivanti.com/' },
  ],
  features: [
    { name: 'Software distribution and self-service portal', category: EPM_CAT.REMOTE, subCategory: 'Deployment' },
    { name: 'Patch management', category: EPM_CAT.REMOTE, subCategory: 'Patching' },
    { name: 'OS provisioning and imaging', category: EPM_CAT.REMOTE, subCategory: 'Imaging' },
    { name: 'Remote control', category: EPM_CAT.REMOTE, subCategory: 'Remote support' },
    { name: 'Inventory and asset management', category: EPM_CAT.AUDIT, subCategory: 'Inventory' },
    { name: 'Power management and cost reporting', category: EPM_CAT.RISK, subCategory: 'Power' },
    { name: 'AD / LDAP integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
  ],
  useCases: [
    {
      title: 'Image and onboard thousands of endpoints consistently',
      category: 'Endpoint Provisioning',
      problem: 'Onboarding new endpoints across distributed offices was inconsistent and slow.',
      solution: 'Used Ivanti Endpoint Manager imaging and provisioning policies.',
      outcome: 'Cut deployment time per device and reduced configuration drift.',
    },
  ],
};

const ivanti_app_control = {
  name: 'Ivanti Application Control',
  vendor: 'Ivanti',
  productType: 'EPM',
  website: 'https://www.ivanti.com/products/application-control',
  description:
    'Trusted ownership-based application control with privilege management and contextual policies for Windows desktops and servers.',
  sources: [
    { type: 'product_page', url: 'https://www.ivanti.com/products/application-control' },
    { type: 'docs', url: 'https://help.ivanti.com/' },
  ],
  features: [
    { name: 'Trusted ownership-based execution control', category: EPM_CAT.ENDPOINT, subCategory: 'Trusted ownership' },
    { name: 'Privilege management and elevation', category: EPM_CAT.ELEVATION, subCategory: 'Elevation' },
    { name: 'User personalization with context-aware policy', category: EPM_CAT.POLICY, subCategory: 'Contextual policy' },
    { name: 'License management and audit', category: EPM_CAT.AUDIT, subCategory: 'License audit' },
    { name: 'AD-driven user and group policies', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'Application elevation prompts and audit', category: EPM_CAT.ELEVATION, subCategory: 'Audit' },
  ],
  useCases: [
    {
      title: 'Stop untrusted executables from running on critical servers',
      category: 'Application Control',
      problem: 'Servers occasionally executed unauthorized scripts and binaries.',
      solution: 'Activated Ivanti Application Control trusted ownership rules.',
      outcome: 'Blocked unauthorized binaries by default while permitting OS-managed updates.',
    },
  ],
};

const broadcom = {
  name: 'Broadcom (Symantec) Endpoint Privilege Management',
  vendor: 'Broadcom',
  productType: 'EPM',
  website: 'https://www.broadcom.com/products/cybersecurity/endpoint/endpoint-privilege-management',
  description:
    'Enterprise privileged access controls with policy enforcement, broker-based access, and Symantec Endpoint Security platform integration.',
  sources: [
    {
      type: 'product_page',
      url: 'https://www.broadcom.com/products/cybersecurity/endpoint/endpoint-privilege-management',
    },
  ],
  features: [
    { name: 'Privilege elevation policy enforcement', category: EPM_CAT.ELEVATION, subCategory: 'Policy' },
    { name: 'Broker-based privileged access control', category: EPM_CAT.WORKFLOW, subCategory: 'Brokered access' },
    { name: 'Symantec Endpoint Security integration', category: EPM_CAT.RISK, subCategory: 'EDR correlation' },
    { name: 'Audit logs and compliance reporting', category: EPM_CAT.AUDIT, subCategory: 'Compliance' },
    { name: 'Active Directory integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'Server and workstation coverage', category: EPM_CAT.PLATFORM, subCategory: 'Endpoint coverage' },
  ],
  useCases: [
    {
      title: 'Combine privilege control with existing Symantec EDR signals',
      category: 'EDR + EPM Integration',
      problem: 'Privilege misuse on endpoints was hard to correlate with EDR detections.',
      solution: 'Linked Broadcom EPM with Symantec Endpoint Security threat events.',
      outcome: 'Created joined dashboards showing privileged events alongside EDR detections.',
    },
  ],
};

const adminbyrequest = {
  name: 'Admin By Request',
  vendor: 'FastTrack Software',
  productType: 'EPM',
  website: 'https://www.adminbyrequest.com/en/endpoint-privilege-management',
  description:
    'Cloud-managed endpoint privilege management with on-demand admin sessions, application elevation, and machine learning-driven policy recommendations.',
  sources: [
    { type: 'product_page', url: 'https://www.adminbyrequest.com/en/endpoint-privilege-management' },
    { type: 'docs', url: 'https://www.adminbyrequest.com/en/docs' },
  ],
  features: [
    { name: 'On-demand admin session with reason capture', category: EPM_CAT.ELEVATION, subCategory: 'Admin session' },
    { name: 'Run-as-admin elevation per application', category: EPM_CAT.ELEVATION, subCategory: 'Per-app elevation' },
    { name: 'Cloud-only management portal', category: EPM_CAT.PLATFORM, subCategory: 'SaaS' },
    { name: 'OPSWAT MetaDefender malware scanning', category: EPM_CAT.RISK, subCategory: 'Malware scan' },
    { name: 'Pre-approved applications and code-signing rules', category: EPM_CAT.ENDPOINT, subCategory: 'Pre-approval' },
    { name: 'Inventory and audit logs', category: EPM_CAT.AUDIT, subCategory: 'Inventory + audit' },
    { name: 'Windows, macOS, and Linux endpoint agents', category: EPM_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Microsoft Intune and Entra ID integration', category: EPM_CAT.POLICY, subCategory: 'Entra ID' },
  ],
  useCases: [
    {
      title: 'Self-service admin for remote workforce without help desk tickets',
      category: 'Self-service Elevation',
      industry: 'Distributed Workforce',
      problem: 'Remote workers raised constant tickets to install printers, drivers, and approved apps.',
      solution: 'Deployed Admin By Request for time-boxed admin sessions with reason capture.',
      outcome: 'Help desk tickets dropped sharply while still maintaining audit and least privilege.',
    },
  ],
};

const threatlocker = {
  name: 'ThreatLocker',
  vendor: 'ThreatLocker',
  productType: 'EPM',
  website: 'https://www.threatlocker.com/platform/application-control',
  description:
    'Default-deny application allowlisting with ringfencing, storage control, and elevation control. Heavy MSP and mid-market focus.',
  sources: [
    { type: 'product_page', url: 'https://www.threatlocker.com/platform/application-control' },
    { type: 'docs', url: 'https://docs.threatlocker.com/' },
  ],
  features: [
    { name: 'Default-deny application allowlisting', category: EPM_CAT.ENDPOINT, subCategory: 'Allowlisting' },
    { name: 'Ringfencing inter-app behavior policies', category: EPM_CAT.ENDPOINT, subCategory: 'Ringfencing' },
    { name: 'Elevation control for approved apps', category: EPM_CAT.ELEVATION, subCategory: 'Elevation control' },
    { name: 'Storage control for USB and shares', category: EPM_CAT.ENDPOINT, subCategory: 'Storage control' },
    { name: 'Network access control (deny-by-default firewall)', category: EPM_CAT.ENDPOINT, subCategory: 'Network control' },
    { name: 'Built-in 24x7 Cyber Hero approval team', category: EPM_CAT.WORKFLOW, subCategory: 'Managed approvals' },
    { name: 'Detailed unified audit log', category: EPM_CAT.AUDIT, subCategory: 'Unified audit' },
    { name: 'Cloud-managed multi-tenant console (MSP)', category: EPM_CAT.PLATFORM, subCategory: 'MSP console' },
  ],
  useCases: [
    {
      title: 'Block ransomware via default-deny allowlisting',
      category: 'Application Control',
      industry: 'MSP / SMB',
      problem: 'SMB clients lacked layered defenses against novel ransomware.',
      solution: 'Activated ThreatLocker default-deny + ringfencing for high-risk apps like Office.',
      outcome: 'Stopped unauthorized child processes typical of ransomware kill chains.',
    },
  ],
};

const oneidentity = {
  name: 'One Identity Safeguard',
  vendor: 'One Identity',
  productType: 'EPM',
  website: 'https://www.oneidentity.com/products/safeguard/',
  description:
    'Integrated PAM suite covering privileged passwords, sessions, analytics, and remote access for hybrid environments.',
  sources: [
    { type: 'product_page', url: 'https://www.oneidentity.com/products/safeguard/' },
    { type: 'docs', url: 'https://support.oneidentity.com/safeguard-for-privileged-passwords' },
  ],
  features: [
    { name: 'Privileged password vault and rotation', category: EPM_CAT.CRED, subCategory: 'Vaulting' },
    { name: 'Privileged session manager and recording', category: EPM_CAT.AUDIT, subCategory: 'Session recording' },
    { name: 'Privileged behavior analytics', category: EPM_CAT.RISK, subCategory: 'UBA' },
    { name: 'Approval workflows and ticketing integration', category: EPM_CAT.WORKFLOW, subCategory: 'Workflow' },
    { name: 'Hardened virtual or hardware appliance', category: EPM_CAT.PLATFORM, subCategory: 'Appliance' },
    { name: 'Active Directory and Azure AD integration', category: EPM_CAT.POLICY, subCategory: 'Directory' },
    { name: 'API for automation and DevOps secrets', category: EPM_CAT.WORKFLOW, subCategory: 'API' },
  ],
  useCases: [
    {
      title: 'Record privileged sessions for compliance audits',
      category: 'Session Recording',
      problem: 'Compliance frameworks required full attestation of privileged session activity.',
      solution: 'Routed admin SSH/RDP sessions through Safeguard Session Manager.',
      outcome: 'Produced searchable, tamper-evident session recordings for auditors.',
    },
  ],
};

const avecto = {
  name: 'Avecto Defendpoint (Legacy Reference)',
  vendor: 'BeyondTrust (Legacy)',
  productType: 'EPM',
  website: 'https://www.beyondtrust.com/resources/glossary/avecto-defendpoint',
  description:
    'Legacy Avecto Defendpoint product line, now branded as BeyondTrust Privilege Management. Listed for historical and migration context.',
  sources: [
    { type: 'product_page', url: 'https://www.beyondtrust.com/resources/glossary/avecto-defendpoint' },
  ],
  features: [
    { name: 'Privilege Guard policy engine (legacy)', category: EPM_CAT.ELEVATION, subCategory: 'Policy engine' },
    { name: 'Application reputation and trust', category: EPM_CAT.RISK, subCategory: 'App trust' },
    { name: 'Sandbox isolation for risky content', category: EPM_CAT.ENDPOINT, subCategory: 'Sandbox' },
    { name: 'Migrated into BeyondTrust EPM platform', category: EPM_CAT.PLATFORM, subCategory: 'Migration' },
  ],
  useCases: [
    {
      title: 'Plan migration from Avecto Defendpoint to BeyondTrust EPM',
      category: 'Migration',
      problem: 'Legacy Avecto deployments still required upgrade planning.',
      solution: 'Mapped Defendpoint policies to BeyondTrust Privilege Management equivalents.',
      outcome: 'Upgraded to supported BeyondTrust platform without losing policy fidelity.',
    },
  ],
};

// ---------------------------------------------------------------------------
// EDR COMPETITORS
// ---------------------------------------------------------------------------

const sentinelone = {
  name: 'SentinelOne Singularity Endpoint',
  vendor: 'SentinelOne',
  productType: 'EDR',
  website: 'https://www.sentinelone.com/platform/singularity-endpoint/',
  description:
    'AI-driven EDR/XDR with autonomous prevention, detection, and response across endpoints, cloud workloads, and identities. Strong rollback and Storyline correlation.',
  sources: [
    { type: 'product_page', url: 'https://www.sentinelone.com/platform/singularity-endpoint/' },
    { type: 'docs', url: 'https://www.sentinelone.com/resources/' },
    { type: 'release_notes', url: 'https://www.sentinelone.com/blog/' },
  ],
  features: [
    { name: 'Behavioral AI (static + dynamic) for prevention', category: EDR_CAT.AI, subCategory: 'Behavioral AI' },
    { name: 'Autonomous response and one-click remediation', category: EDR_CAT.RESPONSE, subCategory: 'Autonomous response' },
    { name: 'Storyline cross-process attack correlation', category: EDR_CAT.HUNTING, subCategory: 'Story correlation' },
    { name: 'Ransomware rollback (Windows VSS)', category: EDR_CAT.RESPONSE, subCategory: 'Rollback' },
    { name: 'Deep Visibility threat hunting query language', category: EDR_CAT.HUNTING, subCategory: 'Hunting language' },
    { name: 'Singularity XDR with cloud workload protection', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
    { name: 'Singularity Identity (Active Directory protection)', category: EDR_CAT.IDENTITY, subCategory: 'AD threat detection' },
    { name: 'Vigilance MDR managed service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'macOS, Windows, Linux, and Kubernetes coverage', category: EDR_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Offline-capable agent with local AI', category: EDR_CAT.PLATFORM, subCategory: 'Offline detection' },
    { name: 'Native firewall and device control', category: EDR_CAT.PLATFORM, subCategory: 'Firewall + device' },
    { name: 'Singularity Marketplace integrations', category: EDR_CAT.INTEGRATION, subCategory: 'Marketplace' },
  ],
  useCases: [
    {
      title: 'Roll back ransomware-encrypted endpoints in minutes',
      category: 'Ransomware Recovery',
      industry: 'Healthcare',
      problem: 'Ransomware encrypted user files on a clinician laptop.',
      solution: 'SentinelOne detected the ransomware and triggered rollback to pre-encryption state.',
      outcome: 'Recovered the endpoint without restoring from backup or paying ransom.',
    },
    {
      title: 'Autonomously contain a fileless attack chain',
      category: 'Autonomous Response',
      problem: 'A multi-stage fileless attack used PowerShell to download and execute payloads.',
      solution: 'Storyline correlated parent and child processes; agent killed and quarantined the chain.',
      outcome: 'Attack contained at the endpoint without analyst intervention.',
    },
    {
      title: 'Detect attacker reconnaissance against Active Directory',
      category: 'Identity Threat Detection',
      problem: 'Attackers performed AD enumeration to find privileged accounts post-compromise.',
      solution: 'Singularity Identity raised deception and recon detections in real time.',
      outcome: 'Spotted lateral movement attempts before privilege escalation.',
    },
  ],
};

const crowdstrike = {
  name: 'CrowdStrike Falcon Insight XDR',
  vendor: 'CrowdStrike',
  productType: 'EDR',
  website: 'https://www.crowdstrike.com/platform/endpoint-security/edr/',
  description:
    'Cloud-native EDR/XDR built on the Falcon platform, with single-agent architecture, threat graph correlation, and integrated managed threat hunting (Falcon OverWatch).',
  sources: [
    { type: 'product_page', url: 'https://www.crowdstrike.com/platform/endpoint-security/edr/' },
    { type: 'docs', url: 'https://www.crowdstrike.com/resources/' },
    { type: 'blog', url: 'https://www.crowdstrike.com/blog/' },
  ],
  features: [
    { name: 'Single lightweight Falcon agent (cloud-delivered)', category: EDR_CAT.PLATFORM, subCategory: 'Single agent' },
    { name: 'Threat Graph telemetry correlation', category: EDR_CAT.TELEMETRY, subCategory: 'Threat Graph' },
    { name: 'Indicator of Attack (IOA) behavioral detection', category: EDR_CAT.DETECTION, subCategory: 'IOA' },
    { name: 'Real Time Response (RTR) shell', category: EDR_CAT.RESPONSE, subCategory: 'RTR' },
    { name: 'Falcon OverWatch managed threat hunting', category: EDR_CAT.MANAGED, subCategory: 'Threat hunting' },
    { name: 'Falcon Complete fully-managed MDR', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Falcon Identity Protection (ITDR)', category: EDR_CAT.IDENTITY, subCategory: 'ITDR' },
    { name: 'Falcon Discover asset inventory', category: EDR_CAT.TELEMETRY, subCategory: 'Asset discovery' },
    { name: 'Falcon Spotlight vulnerability assessment', category: EDR_CAT.COMPLIANCE, subCategory: 'Vulnerability mgmt' },
    { name: 'Falcon Fusion SOAR-style workflows', category: EDR_CAT.INTEGRATION, subCategory: 'SOAR-style' },
    { name: 'macOS, Windows, Linux, ChromeOS coverage', category: EDR_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Charlotte AI security analyst', category: EDR_CAT.AI, subCategory: 'GenAI assistant' },
  ],
  useCases: [
    {
      title: '24/7 managed threat hunting catches stealthy intrusions',
      category: 'Managed Threat Hunting',
      industry: 'Financial Services',
      problem: 'Limited in-house SOC capacity to chase low-and-slow intrusion behavior.',
      solution: 'Subscribed to Falcon OverWatch human-led managed threat hunting.',
      outcome: 'OverWatch identified hands-on-keyboard activity that automated rules missed.',
    },
    {
      title: 'Investigate and respond from a remote shell',
      category: 'Incident Response',
      problem: 'Field laptops were compromised but unreachable physically.',
      solution: 'Used Falcon Real Time Response to triage, collect artifacts, and isolate hosts.',
      outcome: 'Contained incidents remotely within an hour without shipping hardware.',
    },
    {
      title: 'Correlate identity attacks with endpoint telemetry',
      category: 'Identity + Endpoint XDR',
      problem: 'Pass-the-hash and Kerberoasting attempts went undetected at the identity layer.',
      solution: 'Falcon Identity Protection correlated AD events with endpoint Threat Graph data.',
      outcome: 'Detected and blocked credential misuse with one unified workflow.',
    },
  ],
};

const defender = {
  name: 'Microsoft Defender for Endpoint',
  vendor: 'Microsoft',
  productType: 'EDR',
  website: 'https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint',
  description:
    'Enterprise EDR built into Windows with cross-platform agents, deep Microsoft 365 Defender integration, attack surface reduction, and automated investigations.',
  sources: [
    {
      type: 'product_page',
      url: 'https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint',
    },
    { type: 'docs', url: 'https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/' },
    { type: 'release_notes', url: 'https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/whats-new-in-microsoft-defender-endpoint' },
  ],
  features: [
    { name: 'Built-in agent on Windows 10/11 and Server', category: EDR_CAT.PLATFORM, subCategory: 'Native agent' },
    { name: 'Cross-platform agents (macOS, Linux, iOS, Android)', category: EDR_CAT.PLATFORM, subCategory: 'OS coverage' },
    { name: 'Behavior-based EDR with cloud-delivered protection', category: EDR_CAT.DETECTION, subCategory: 'Behavior detection' },
    { name: 'Attack Surface Reduction rules', category: EDR_CAT.DETECTION, subCategory: 'ASR' },
    { name: 'Automated investigation and response (AIR)', category: EDR_CAT.RESPONSE, subCategory: 'AIR' },
    { name: 'Live Response shell for remote forensics', category: EDR_CAT.RESPONSE, subCategory: 'Live Response' },
    { name: 'Threat and vulnerability management', category: EDR_CAT.COMPLIANCE, subCategory: 'TVM' },
    { name: 'Microsoft 365 Defender XDR integration', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
    { name: 'Defender for Identity correlation', category: EDR_CAT.IDENTITY, subCategory: 'Identity TDR' },
    { name: 'Advanced hunting via KQL', category: EDR_CAT.HUNTING, subCategory: 'KQL hunting' },
    { name: 'Microsoft Threat Experts MDR add-on', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Sentinel SIEM bidirectional integration', category: EDR_CAT.INTEGRATION, subCategory: 'Sentinel' },
  ],
  useCases: [
    {
      title: 'Consolidate EDR + identity + email signals in M365 Defender',
      category: 'XDR Consolidation',
      industry: 'Enterprise IT',
      problem: 'Separate EDR, email, and identity tools created investigation silos.',
      solution: 'Enabled Defender XDR to correlate endpoint, identity, email, and cloud app signals.',
      outcome: 'Reduced mean-time-to-investigate using cross-domain incident graphs.',
    },
    {
      title: 'Hunt across endpoints with Kusto Query Language',
      category: 'Threat Hunting',
      problem: 'Custom hunting required exporting telemetry to a separate SIEM.',
      solution: 'Used Defender Advanced Hunting (KQL) over native endpoint telemetry.',
      outcome: 'Reusable hunting queries built directly into the Defender console.',
    },
  ],
};

const cortex_xdr = {
  name: 'Palo Alto Cortex XDR',
  vendor: 'Palo Alto Networks',
  productType: 'EDR',
  website: 'https://www.paloaltonetworks.com/cortex/cortex-xdr',
  description:
    'Extended detection and response platform unifying endpoint, network, identity, and cloud telemetry with behavioral analytics and managed response.',
  sources: [
    { type: 'product_page', url: 'https://www.paloaltonetworks.com/cortex/cortex-xdr' },
    { type: 'docs', url: 'https://docs.paloaltonetworks.com/cortex' },
  ],
  features: [
    { name: 'Cortex XDR Pro endpoint and network analytics', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
    { name: 'Behavioral analytics and ML-driven detections', category: EDR_CAT.AI, subCategory: 'Behavioral AI' },
    { name: 'Causality view (root cause graph)', category: EDR_CAT.HUNTING, subCategory: 'Causality chain' },
    { name: 'Endpoint protection (EPP) with malware prevention', category: EDR_CAT.DETECTION, subCategory: 'EPP' },
    { name: 'Live Terminal remote shell', category: EDR_CAT.RESPONSE, subCategory: 'Remote shell' },
    { name: 'Managed Threat Hunting service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Cortex XSOAR SOAR integration', category: EDR_CAT.INTEGRATION, subCategory: 'SOAR' },
    { name: 'Identity analytics module', category: EDR_CAT.IDENTITY, subCategory: 'Identity analytics' },
    { name: 'Wildfire malware analysis cloud', category: EDR_CAT.DETECTION, subCategory: 'Sandbox' },
    { name: 'Windows, macOS, Linux coverage', category: EDR_CAT.PLATFORM, subCategory: 'OS coverage' },
  ],
  useCases: [
    {
      title: 'Stitch network firewall and endpoint signals into one investigation',
      category: 'XDR Consolidation',
      problem: 'Network and endpoint detections were investigated separately.',
      solution: 'Enabled Cortex XDR Pro to ingest NGFW, endpoint, and identity telemetry.',
      outcome: 'Reduced investigation steps with unified causality chains.',
    },
  ],
};

const trellix = {
  name: 'Trellix EDR',
  vendor: 'Trellix',
  productType: 'EDR',
  website: 'https://www.trellix.com/products/edr/',
  description:
    'Cloud-managed EDR (formerly McAfee MVISION EDR) with guided investigation, threat intelligence, and integration into the Trellix XDR platform.',
  sources: [
    { type: 'product_page', url: 'https://www.trellix.com/products/edr/' },
    { type: 'docs', url: 'https://docs.trellix.com/' },
  ],
  features: [
    { name: 'Cloud-managed EDR console', category: EDR_CAT.PLATFORM, subCategory: 'SaaS' },
    { name: 'Guided investigation with AI co-pilot', category: EDR_CAT.AI, subCategory: 'Guided investigation' },
    { name: 'Real-time and historical search', category: EDR_CAT.HUNTING, subCategory: 'Search' },
    { name: 'Threat intelligence enrichment', category: EDR_CAT.DETECTION, subCategory: 'Threat intel' },
    { name: 'Action history and rollback support', category: EDR_CAT.RESPONSE, subCategory: 'Rollback' },
    { name: 'Trellix XDR integration', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
    { name: 'MITRE ATT&CK mapping in console', category: EDR_CAT.DETECTION, subCategory: 'ATT&CK mapping' },
  ],
  useCases: [
    {
      title: 'Onboard junior analysts with guided investigations',
      category: 'Analyst Enablement',
      problem: 'Junior SOC analysts struggled with deep EDR investigations.',
      solution: 'Used Trellix EDR guided investigation to walk through suspect activity.',
      outcome: 'Reduced training ramp time and improved investigation consistency.',
    },
  ],
};

const sophos_intercept = {
  name: 'Sophos Intercept X with XDR',
  vendor: 'Sophos',
  productType: 'EDR',
  website: 'https://www.sophos.com/en-us/products/endpoint-antivirus',
  description:
    'Endpoint protection plus EDR/XDR with deep learning malware prevention, exploit protection, CryptoGuard ransomware rollback, and integrated MDR.',
  sources: [
    { type: 'product_page', url: 'https://www.sophos.com/en-us/products/endpoint-antivirus' },
    { type: 'docs', url: 'https://docs.sophos.com/' },
  ],
  features: [
    { name: 'Deep learning malware prevention', category: EDR_CAT.AI, subCategory: 'Deep learning' },
    { name: 'CryptoGuard ransomware protection and rollback', category: EDR_CAT.RESPONSE, subCategory: 'Rollback' },
    { name: 'Exploit prevention and HitmanPro tech', category: EDR_CAT.DETECTION, subCategory: 'Exploit prevention' },
    { name: 'XDR data lake (cross-product hunting)', category: EDR_CAT.HUNTING, subCategory: 'Data lake' },
    { name: 'Sophos MDR managed service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Live Discover and Live Response', category: EDR_CAT.RESPONSE, subCategory: 'Live Response' },
    { name: 'Sophos Central management console', category: EDR_CAT.PLATFORM, subCategory: 'Console' },
    { name: 'Synchronized Security with firewall', category: EDR_CAT.INTEGRATION, subCategory: 'Firewall + EDR' },
  ],
  useCases: [
    {
      title: 'Combine EDR with managed response for lean security teams',
      category: 'MDR for SMB',
      industry: 'SMB',
      problem: 'Small security teams cannot run a 24/7 SOC.',
      solution: 'Activated Sophos MDR on top of Intercept X.',
      outcome: 'Outsourced 24/7 detection and response while keeping endpoint policy in-house.',
    },
  ],
};

const cybereason = {
  name: 'Cybereason Defense Platform',
  vendor: 'Cybereason',
  productType: 'EDR',
  website: 'https://www.cybereason.com/platform/endpoint-detection-response-edr',
  description:
    'Operation-centric EDR/XDR that correlates related telemetry into MalOps, with strong fileless attack detection and managed services.',
  sources: [
    { type: 'product_page', url: 'https://www.cybereason.com/platform/endpoint-detection-response-edr' },
    { type: 'docs', url: 'https://docs.cybereason.com/' },
  ],
  features: [
    { name: 'MalOp correlated incident view', category: EDR_CAT.HUNTING, subCategory: 'Operation view' },
    { name: 'Behavioral and fileless attack detection', category: EDR_CAT.DETECTION, subCategory: 'Fileless attacks' },
    { name: 'Anti-ransomware with rollback', category: EDR_CAT.RESPONSE, subCategory: 'Rollback' },
    { name: 'Cybereason MDR service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'NGAV with multi-engine prevention', category: EDR_CAT.DETECTION, subCategory: 'NGAV' },
    { name: 'Cross-machine correlation graph', category: EDR_CAT.TELEMETRY, subCategory: 'Cross-machine graph' },
    { name: 'Mobile threat defense module', category: EDR_CAT.PLATFORM, subCategory: 'Mobile' },
  ],
  useCases: [
    {
      title: 'See an entire intrusion as one MalOp',
      category: 'Incident Correlation',
      problem: 'Traditional alert lists made it hard to see the full attack story.',
      solution: 'Used Cybereason MalOps to correlate every related artifact into a single incident.',
      outcome: 'Investigators worked one MalOp instead of dozens of disconnected alerts.',
    },
  ],
};

const trendmicro = {
  name: 'Trend Micro Vision One Endpoint Security',
  vendor: 'Trend Micro',
  productType: 'EDR',
  website: 'https://www.trendmicro.com/en_us/business/products/user-protection/sps/endpoint.html',
  description:
    'Endpoint protection and EDR delivered via the Trend Vision One XDR platform with Risk Insights, attack surface management, and managed services.',
  sources: [
    {
      type: 'product_page',
      url: 'https://www.trendmicro.com/en_us/business/products/user-protection/sps/endpoint.html',
    },
    { type: 'docs', url: 'https://docs.trendmicro.com/' },
  ],
  features: [
    { name: 'Vision One XDR data lake', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
    { name: 'Workbench correlated detection model', category: EDR_CAT.DETECTION, subCategory: 'Workbench' },
    { name: 'Risk Insights and attack surface mgmt', category: EDR_CAT.COMPLIANCE, subCategory: 'ASRM' },
    { name: 'Endpoint Sensor for EDR telemetry', category: EDR_CAT.TELEMETRY, subCategory: 'Sensor' },
    { name: 'Managed XDR (MDR) service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Apex One endpoint protection', category: EDR_CAT.DETECTION, subCategory: 'EPP' },
    { name: 'Cloud-native virtual patching', category: EDR_CAT.DETECTION, subCategory: 'Virtual patching' },
  ],
  useCases: [
    {
      title: 'Continuously assess attack surface risk per endpoint',
      category: 'Risk-based Security',
      problem: 'Security leaders lacked a single risk score per asset.',
      solution: 'Enabled Vision One Risk Insights with telemetry from endpoints and identities.',
      outcome: 'Prioritized remediation by quantified risk, not by alert volume.',
    },
  ],
};

const eset = {
  name: 'ESET Inspect',
  vendor: 'ESET',
  productType: 'EDR',
  website: 'https://www.eset.com/int/business/inspect/',
  description:
    'EDR component of the ESET PROTECT platform with rule-based detections, cross-system threat hunting, and remote response.',
  sources: [
    { type: 'product_page', url: 'https://www.eset.com/int/business/inspect/' },
    { type: 'docs', url: 'https://help.eset.com/' },
  ],
  features: [
    { name: 'Rule editor for custom detections', category: EDR_CAT.DETECTION, subCategory: 'Custom rules' },
    { name: 'MITRE ATT&CK aligned detection set', category: EDR_CAT.DETECTION, subCategory: 'ATT&CK' },
    { name: 'Threat hunting across endpoints', category: EDR_CAT.HUNTING, subCategory: 'Cross-endpoint hunting' },
    { name: 'Process tree and module reputation lookup', category: EDR_CAT.HUNTING, subCategory: 'Process tree' },
    { name: 'Remote isolation and remediation', category: EDR_CAT.RESPONSE, subCategory: 'Isolation' },
    { name: 'ESET PROTECT integrated console', category: EDR_CAT.PLATFORM, subCategory: 'Console' },
    { name: 'On-prem or cloud deployment', category: EDR_CAT.PLATFORM, subCategory: 'Deployment' },
  ],
  useCases: [
    {
      title: 'Customize EDR rules for environment-specific behaviors',
      category: 'Detection Engineering',
      problem: 'Out-of-the-box rules generated noise in a niche industrial environment.',
      solution: 'Authored custom ESET Inspect rules tied to specific OT and IT behaviors.',
      outcome: 'Reduced false positives and surfaced environment-specific threats.',
    },
  ],
};

const bitdefender = {
  name: 'Bitdefender GravityZone XDR',
  vendor: 'Bitdefender',
  productType: 'EDR',
  website: 'https://www.bitdefender.com/business/products/business-security-platform.html',
  description:
    'GravityZone Business Security with EDR/XDR, risk analytics, and Managed Detection and Response services from Bitdefender.',
  sources: [
    { type: 'product_page', url: 'https://www.bitdefender.com/business/products/business-security-platform.html' },
    { type: 'docs', url: 'https://www.bitdefender.com/business/support/' },
  ],
  features: [
    { name: 'Single-agent EPP + EDR + XDR architecture', category: EDR_CAT.PLATFORM, subCategory: 'Single agent' },
    { name: 'GravityZone risk analytics', category: EDR_CAT.COMPLIANCE, subCategory: 'Risk analytics' },
    { name: 'HyperDetect tunable ML detection layer', category: EDR_CAT.AI, subCategory: 'HyperDetect ML' },
    { name: 'Cross-product XDR sensors (network, identity, cloud)', category: EDR_CAT.PLATFORM, subCategory: 'XDR sensors' },
    { name: 'Bitdefender MDR service', category: EDR_CAT.MANAGED, subCategory: 'MDR' },
    { name: 'Patch management add-on', category: EDR_CAT.COMPLIANCE, subCategory: 'Patching' },
    { name: 'Email security integration', category: EDR_CAT.INTEGRATION, subCategory: 'Email' },
  ],
  useCases: [
    {
      title: 'Quantify endpoint risk to drive remediation priorities',
      category: 'Risk Reduction',
      problem: 'Patching and config drift left risk invisible at the endpoint level.',
      solution: 'Activated GravityZone Risk Analytics on managed endpoints.',
      outcome: 'Created prioritized risk dashboards for IT and security teams.',
    },
  ],
};

const carbonblack = {
  name: 'VMware Carbon Black Cloud',
  vendor: 'Broadcom (VMware)',
  productType: 'EDR',
  website: 'https://www.vmware.com/products/carbon-black-cloud.html',
  description:
    'Cloud-native endpoint and workload protection with EDR, advanced threat hunting, and live response across VDI, servers, and workstations.',
  sources: [
    { type: 'product_page', url: 'https://www.vmware.com/products/carbon-black-cloud.html' },
    { type: 'docs', url: 'https://docs.vmware.com/en/VMware-Carbon-Black-Cloud/' },
  ],
  features: [
    { name: 'Streaming prevention with cloud analytics', category: EDR_CAT.DETECTION, subCategory: 'Streaming prevention' },
    { name: 'Endpoint Standard NGAV', category: EDR_CAT.DETECTION, subCategory: 'NGAV' },
    { name: 'Enterprise EDR threat hunting', category: EDR_CAT.HUNTING, subCategory: 'Hunting' },
    { name: 'Audit and Remediation (live query)', category: EDR_CAT.RESPONSE, subCategory: 'Live query' },
    { name: 'Workload protection for VMs and Kubernetes', category: EDR_CAT.PLATFORM, subCategory: 'Workloads' },
    { name: 'Container security module', category: EDR_CAT.PLATFORM, subCategory: 'Containers' },
    { name: 'XDR via VMware integrations', category: EDR_CAT.PLATFORM, subCategory: 'XDR' },
  ],
  useCases: [
    {
      title: 'Hunt across all endpoints with osquery-style live queries',
      category: 'Threat Hunting',
      problem: 'Hunters needed real-time data from endpoints, not just stored telemetry.',
      solution: 'Used Carbon Black Audit and Remediation to issue live queries fleet-wide.',
      outcome: 'Found misconfigured hosts and IOCs in minutes instead of days.',
    },
  ],
};

const elastic = {
  name: 'Elastic Security (Elastic Defend)',
  vendor: 'Elastic',
  productType: 'EDR',
  website: 'https://www.elastic.co/security',
  description:
    'Open-extensible EDR/XDR/SIEM combo built on the Elastic Stack with prebuilt detections, host isolation, and customizable hunting via ES|QL.',
  sources: [
    { type: 'product_page', url: 'https://www.elastic.co/security' },
    { type: 'docs', url: 'https://www.elastic.co/guide/en/security/current/index.html' },
  ],
  features: [
    { name: 'Elastic Defend agent (EDR + EPP)', category: EDR_CAT.PLATFORM, subCategory: 'Agent' },
    { name: 'Prebuilt detection rules library', category: EDR_CAT.DETECTION, subCategory: 'Detection rules' },
    { name: 'ES|QL and KQL hunting', category: EDR_CAT.HUNTING, subCategory: 'Query languages' },
    { name: 'Host and network isolation', category: EDR_CAT.RESPONSE, subCategory: 'Isolation' },
    { name: 'SIEM + EDR + XDR unified console', category: EDR_CAT.PLATFORM, subCategory: 'Unified' },
    { name: 'Cloud security posture (CSPM) module', category: EDR_CAT.COMPLIANCE, subCategory: 'CSPM' },
    { name: 'Open detection engineering with public rule repo', category: EDR_CAT.DETECTION, subCategory: 'Open rules' },
    { name: 'Generative AI assistant', category: EDR_CAT.AI, subCategory: 'AI assistant' },
  ],
  useCases: [
    {
      title: 'Bring detection engineering rules under version control',
      category: 'Detection Engineering',
      problem: 'Detection rules were difficult to manage as code in legacy SIEM tools.',
      solution: 'Adopted Elastic Security with public rule repository and CI/CD-friendly format.',
      outcome: 'Detection content treated as code with peer reviews and history.',
    },
  ],
};

// ---------------------------------------------------------------------------
// ARCON|EPM (primary)
// ---------------------------------------------------------------------------

const arconEpm = {
  name: 'ARCON|EPM',
  vendor: 'ARCON',
  productType: 'EPM',
  website: 'https://arconnet.com',
  isPrimary: true,
  description:
    'ARCON Endpoint Privilege Management secures privileged endpoint access with elevation control, application/device control, MFA at depth, and FIM-driven monitoring.',
  sources: [
    { type: 'product_page', url: 'https://arconnet.com' },
    { type: 'release_notes', url: 'https://arconnet.com/resources' },
    { type: 'blog', url: 'https://arconnet.com/blog' },
  ],
  features: [
    { name: 'Platform support for Windows, macOS, and Linux/Unix', category: EPM_CAT.PLATFORM, subCategory: 'Cross-platform endpoints' },
    { name: 'Whitelist, Blacklist, and Elevation Profiles', category: EPM_CAT.ELEVATION, subCategory: 'Policy profiles' },
    { name: 'Elevation Control and Privilege Configuration', category: EPM_CAT.ELEVATION, subCategory: 'Privilege policy tuning' },
    { name: 'Just-In-Time (JIT) Elevation', category: EPM_CAT.ELEVATION, subCategory: 'Time-bound privilege access' },
    { name: 'Elevation Extension', category: EPM_CAT.ELEVATION, subCategory: 'Session extension' },
    { name: 'Elevation Based on Windows Group Policy', category: EPM_CAT.ELEVATION, subCategory: 'Role-based access' },
    { name: 'Elevation Based on Parent-Child Process', category: EPM_CAT.ELEVATION, subCategory: 'Process controls' },
    { name: 'Temporary and Permanent Admin Privileges', category: EPM_CAT.ELEVATION, subCategory: 'Admin right assignments' },
    { name: 'Ephemeral Admin Account Access', category: EPM_CAT.ELEVATION, subCategory: 'Temporary local admin accounts' },
    { name: 'Linux Command Elevation', category: EPM_CAT.ELEVATION, subCategory: 'Command-level elevation' },
    { name: 'macOS System Settings Elevation for Specific Privileges', category: EPM_CAT.ELEVATION, subCategory: 'Fine-grained macOS admin' },
    { name: 'Password Rotation', category: EPM_CAT.CRED, subCategory: 'Credential lifecycle' },
    { name: 'Envelope Scheduler for Break Glass Access', category: EPM_CAT.CRED, subCategory: 'Outage-safe emergency access' },
    { name: 'Workflow and Approval Management', category: EPM_CAT.WORKFLOW, subCategory: 'Multi-level approvals' },
    { name: 'ITSM Integration for Approval and Incident Management', category: EPM_CAT.WORKFLOW, subCategory: 'ServiceNow and ITSM workflows' },
    { name: 'API Integration Support', category: EPM_CAT.WORKFLOW, subCategory: 'External platform integrations' },
    { name: 'MFA Integration with EPM Agent', category: EPM_CAT.AUTH, subCategory: 'Agent-based MFA' },
    { name: 'Endpoint MFA Support (Windows and Linux)', category: EPM_CAT.AUTH, subCategory: 'OS login and privileged actions' },
    { name: 'Process MFA for Thick Client Applications', category: EPM_CAT.AUTH, subCategory: 'Desktop app MFA gates' },
    { name: 'File Integrity Monitoring (FIM) with Incident Management and Alert Correlation', category: EPM_CAT.AUDIT, subCategory: 'FIM and SOC workflows' },
    { name: 'SIEM Integration and Syslog Forwarding', category: EPM_CAT.AUDIT, subCategory: 'Centralized monitoring' },
    { name: 'Reports and Auditing', category: EPM_CAT.AUDIT, subCategory: 'Audit evidence and governance' },
    { name: 'Report Scheduler', category: EPM_CAT.AUDIT, subCategory: 'Automated report delivery' },
    { name: 'Archival and Purging of Endpoint and Reports', category: EPM_CAT.AUDIT, subCategory: 'Retention controls' },
    { name: 'Endpoint Agent Pulling Logs from Endpoint', category: EPM_CAT.AUDIT, subCategory: 'Endpoint log collection' },
    { name: 'Auto Profiling', category: EPM_CAT.POLICY, subCategory: 'Behavior-based policying' },
    { name: 'Group-Based Policy Management', category: EPM_CAT.POLICY, subCategory: 'Group-driven policy assignment' },
    { name: 'Line of Business (LOB) Based Management', category: EPM_CAT.POLICY, subCategory: 'Business unit controls' },
    { name: 'AD, LDAP, LDAPS, and Azure AD Integration', category: EPM_CAT.POLICY, subCategory: 'Directory sync' },
    { name: 'Central Inventory Management', category: EPM_CAT.ENDPOINT, subCategory: 'Asset and software inventory' },
    { name: 'Peripheral Device Control with Granular Restriction and Elevation', category: EPM_CAT.ENDPOINT, subCategory: 'USB, SD card, and CD-ROM controls' },
    { name: 'URL Restriction and Monitoring', category: EPM_CAT.ENDPOINT, subCategory: 'Web access control' },
    { name: 'Server-Based Restrictions and Elevation', category: EPM_CAT.ENDPOINT, subCategory: 'IP/IP-range controls' },
    { name: 'Outside ARCON PAM Monitoring and Restriction', category: EPM_CAT.ENDPOINT, subCategory: 'Out-of-band privileged activity' },
    { name: 'Endpoint Quarantine', category: EPM_CAT.ENDPOINT, subCategory: 'Threat response isolation' },
    { name: 'Script Firing / Automated Remediation', category: EPM_CAT.ENDPOINT, subCategory: 'Automated response actions' },
    { name: 'Data Classification and DLP on Endpoints', category: EPM_CAT.ENDPOINT, subCategory: 'Data protection policies' },
    { name: 'Remote Endpoint Access and Command Execution', category: EPM_CAT.REMOTE, subCategory: 'Remote operations' },
    { name: 'Offline Elevation', category: EPM_CAT.REMOTE, subCategory: 'Disconnected mode controls' },
    { name: 'Screen Capturing and Session Monitoring', category: EPM_CAT.REMOTE, subCategory: 'Session evidence and monitoring' },
    { name: 'Endpoint Backup and Restore', category: EPM_CAT.REMOTE, subCategory: 'Operational resilience' },
    { name: 'Vulnerability Scanning for Processes', category: EPM_CAT.RISK, subCategory: 'CVE-based process risk detection' },
  ],
  useCases: [
    {
      title: 'Reduce blast radius by removing standing local admin',
      category: 'Least Privilege Adoption',
      industry: 'BFSI',
      problem: 'Banking endpoints had persistent local admin used by IT staff.',
      solution: 'Enforced ARCON|EPM elevation profiles with JIT and just-enough privilege.',
      outcome: 'Eliminated standing admin while preserving daily IT operations.',
    },
    {
      title: 'Detect privileged file changes in real time',
      category: 'File Integrity Monitoring',
      problem: 'Sensitive system files were modified without correlation to user activity.',
      solution: 'Activated ARCON|EPM File Integrity Monitoring with alert correlation to SIEM.',
      outcome: 'Security teams investigated changes the moment they happened.',
    },
    {
      title: 'Enforce MFA at thick-client and OS login',
      category: 'Authentication & MFA',
      problem: 'Sensitive desktop apps and elevated commands lacked step-up MFA.',
      solution: 'Used ARCON|EPM Process MFA and Endpoint MFA for Windows/Linux logins.',
      outcome: 'Added a second-factor gate on privileged actions without re-platforming apps.',
    },
  ],
};

// ---------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------

export const CATALOG = [
  arconEpm,
  // EPM competitors
  cyberark,
  beyondtrust,
  delinea,
  me_endpoint_central,
  me_pam360,
  netwrix,
  policypak,
  securden,
  heimdal,
  intune_epm,
  ivanti_em,
  ivanti_app_control,
  broadcom,
  adminbyrequest,
  threatlocker,
  oneidentity,
  avecto,
  // EDR competitors
  sentinelone,
  crowdstrike,
  defender,
  cortex_xdr,
  trellix,
  sophos_intercept,
  cybereason,
  trendmicro,
  eset,
  bitdefender,
  carbonblack,
  elastic,
];
