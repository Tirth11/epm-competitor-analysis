import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchComparison,
  fetchInsights,
  fetchProducts,
  fetchUpdates,
  fetchUseCases,
  runCheckNow,
} from './api';
import type { ComparisonRow, Insights, Product, ProductType, UpdateItem, UseCase } from './types';

type Filters = {
  product: string;
  category: string;
  changeType: string;
  search: string;
  recentlyUpdated: boolean;
};

const defaultFilters: Filters = {
  product: '',
  category: '',
  changeType: '',
  search: '',
  recentlyUpdated: false,
};

type Tab = 'epm' | 'edr' | 'use-cases';

function App() {
  const [tab, setTab] = useState<Tab>('epm');
  const [products, setProducts] = useState<Product[]>([]);
  const [rows, setRows] = useState<ComparisonRow[]>([]);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [insights, setInsights] = useState<Insights>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isChecking, setIsChecking] = useState(false);
  const [loadError, setLoadError] = useState('');

  const productType: ProductType | '' = tab === 'epm' ? 'EPM' : tab === 'edr' ? 'EDR' : '';

  const categories = useMemo(
    () => [...new Set(rows.map((r) => r.category))].sort((a, b) => a.localeCompare(b)),
    [rows]
  );

  const filteredProducts = useMemo(
    () => (productType ? products.filter((p) => p.product_type === productType) : products),
    [products, productType]
  );

  const loadAll = useCallback(async () => {
    const query: Record<string, string> = {};
    if (productType) query.type = productType;
    if (filters.product) query.product = filters.product;
    if (filters.category) query.category = filters.category;
    if (filters.changeType) query.changeType = filters.changeType;
    if (filters.search) query.search = filters.search;
    if (filters.recentlyUpdated) query.recentlyUpdated = 'true';

    const [p, c, uc, u, i] = await Promise.all([
      fetchProducts(),
      fetchComparison(query),
      fetchUseCases(productType ? { type: productType } : {}),
      fetchUpdates(),
      fetchInsights(),
    ]);
    setLoadError('');
    setProducts(p);
    setRows(c);
    setUseCases(uc);
    setUpdates(u);
    setInsights(i);
  }, [productType, filters]);

  useEffect(() => {
    let cancelled = false;
    const tryLoad = async () => {
      try {
        await loadAll();
      } catch {
        if (!cancelled) setLoadError('Data source is starting up, retrying...');
      }
    };
    void tryLoad();
    const interval = setInterval(() => void tryLoad(), 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [loadAll]);

  const epmCount = products.filter((p) => p.product_type === 'EPM').length;
  const edrCount = products.filter((p) => p.product_type === 'EDR').length;

  return (
    <div className="page">
      {/* Header */}
      <header className="topbar">
        <div>
          <h1>EPM &amp; EDR Competitor Intelligence</h1>
          <p className="muted">
            {epmCount} EPM products &middot; {edrCount} EDR products &middot; {rows.length} features tracked
          </p>
        </div>
        <div className="top-actions">
          <button
            onClick={async () => {
              setIsChecking(true);
              await runCheckNow();
              await loadAll();
              setIsChecking(false);
            }}
            disabled={isChecking}
          >
            {isChecking ? 'Checking...' : 'Refresh sources'}
          </button>
          <a className="btn-link" href="/api/export/comparison.csv" target="_blank" rel="noreferrer">
            Export CSV
          </a>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        <button className={`tab ${tab === 'epm' ? 'active' : ''}`} onClick={() => { setTab('epm'); setFilters(defaultFilters); }}>
          EPM Competitors
        </button>
        <button className={`tab ${tab === 'edr' ? 'active' : ''}`} onClick={() => { setTab('edr'); setFilters(defaultFilters); }}>
          EDR Competitors
        </button>
        <button className={`tab ${tab === 'use-cases' ? 'active' : ''}`} onClick={() => { setTab('use-cases'); setFilters(defaultFilters); }}>
          Use Cases
        </button>
      </nav>

      {/* Filters */}
      {tab !== 'use-cases' && (
        <section className="filters">
          <select value={filters.product} onChange={(e) => setFilters({ ...filters, product: e.target.value })}>
            <option value="">All products</option>
            {filteredProducts.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={filters.changeType} onChange={(e) => setFilters({ ...filters, changeType: e.target.value })}>
            <option value="">All changes</option>
            <option value="new">New</option>
            <option value="updated">Updated</option>
            <option value="removed">Removed</option>
          </select>
          <input
            placeholder="Search features..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.recentlyUpdated}
              onChange={(e) => setFilters({ ...filters, recentlyUpdated: e.target.checked })}
            />
            Last 14 days
          </label>
        </section>
      )}

      {loadError && <p className="muted">{loadError}</p>}

      {/* Main Content */}
      {tab !== 'use-cases' ? (
        <main className="layout">
          <section className="card table-card">
            <h2>
              {tab === 'epm' ? 'EPM' : 'EDR'} Feature Comparison
              <span className="badge">{rows.length}</span>
            </h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Feature</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>References</th>
                    <th>Last Updated</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className={r.isPrimary ? 'row-primary' : ''}>
                      <td className="cell-product">
                        <span className={r.isPrimary ? 'product-primary' : ''}>{r.product}</span>
                      </td>
                      <td>{r.feature}</td>
                      <td>
                        <span className="cat-label">{r.category}</span>
                        {r.subCategory && <span className="sub-label">{r.subCategory}</span>}
                      </td>
                      <td><span className={`status status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                      <td className="cell-desc">{r.description || '-'}</td>
                      <td>
                        {r.references.length ? (
                          <div className="reference-list">
                            {r.references.slice(0, 3).map((ref, idx) => (
                              <a key={`${r.id}-${idx}`} href={ref} target="_blank" rel="noreferrer">
                                [{idx + 1}]
                              </a>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td>{new Date(r.lastUpdated).toLocaleDateString()}</td>
                      <td><span className={`status status-${r.changeType}`}>{r.changeType}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="side">
            <section className="card">
              <h3>Insights</h3>
              {insights?.gaps && insights.gaps.length > 0 && (
                <>
                  <p className="muted">Feature gaps (competitors have, we don't):</p>
                  <ul className="compact-list">
                    {insights.gaps.slice(0, 6).map((g) => <li key={g}>{g}</li>)}
                  </ul>
                </>
              )}
              {insights?.differentiators && insights.differentiators.length > 0 && (
                <>
                  <p className="muted">Our differentiators:</p>
                  <ul className="compact-list">
                    {insights.differentiators.slice(0, 6).map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </>
              )}
              {insights?.fastestInnovation && insights.fastestInnovation.length > 0 && (
                <>
                  <p className="muted">Most active (30 days):</p>
                  <ul className="compact-list">
                    {insights.fastestInnovation.slice(0, 5).map((i) => (
                      <li key={i.name}>{i.name} ({i.update_count})</li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            <section className="card">
              <h3>Recent Updates</h3>
              <div className="updates-list">
                {updates.slice(0, 10).map((u) => (
                  <article key={u.id} className="update-item">
                    <strong>{u.title}</strong>
                    <p className="muted">{u.product} &middot; {new Date(u.createdAt).toLocaleDateString()}</p>
                    {u.sourceUrl && <a href={u.sourceUrl} target="_blank" rel="noreferrer">Source</a>}
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </main>
      ) : (
        /* ── Use Cases Tab ── */
        <main className="use-cases-grid">
          {useCases.length === 0 && <p className="muted">No use cases available yet.</p>}
          {useCases.map((uc) => (
            <article key={uc.id} className="use-case-card card">
              <header className="uc-header">
                <span className={`uc-type uc-type-${uc.productType.toLowerCase()}`}>{uc.productType}</span>
                <span className="uc-product">{uc.product}</span>
                {uc.industry && <span className="uc-industry">{uc.industry}</span>}
              </header>
              <h3>{uc.title}</h3>
              <div className="uc-body">
                <div className="uc-section">
                  <strong>Problem</strong>
                  <p>{uc.problem}</p>
                </div>
                <div className="uc-section">
                  <strong>Solution</strong>
                  <p>{uc.solution}</p>
                </div>
                <div className="uc-section">
                  <strong>Outcome</strong>
                  <p>{uc.outcome}</p>
                </div>
              </div>
              <footer className="uc-footer">
                <span className="uc-cat">{uc.category}</span>
                {uc.sourceUrl && <a href={uc.sourceUrl} target="_blank" rel="noreferrer">Source</a>}
              </footer>
            </article>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
