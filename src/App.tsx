import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchComparison, fetchInsights, fetchProducts, fetchUpdates, runCheckNow } from './api';
import type { ComparisonRow, Insights, Product, UpdateItem } from './types';

type Filters = {
  product: string;
  category: string;
  status: string;
  search: string;
  recentlyUpdated: boolean;
};

const defaultFilters: Filters = {
  product: '',
  category: '',
  status: '',
  search: '',
  recentlyUpdated: false,
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [rows, setRows] = useState<ComparisonRow[]>([]);
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [insights, setInsights] = useState<Insights>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isChecking, setIsChecking] = useState(false);
  const [loadError, setLoadError] = useState('');

  const categories = useMemo(
    () => [...new Set(rows.map((r) => r.category))].sort((a, b) => a.localeCompare(b)),
    [rows]
  );

  const loadAll = useCallback(async () => {
    const query: Record<string, string> = {};
    if (filters.product) query.product = filters.product;
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    if (filters.search) query.search = filters.search;
    if (filters.recentlyUpdated) query.recentlyUpdated = 'true';

    const [p, c, u, i] = await Promise.all([
      fetchProducts(),
      fetchComparison(query),
      fetchUpdates(),
      fetchInsights(),
    ]);
    setLoadError('');
    setProducts(p);
    setRows(c);
    setUpdates(u);
    setInsights(i);
  }, [filters.product, filters.category, filters.status, filters.search, filters.recentlyUpdated]);

  useEffect(() => {
    let cancelled = false;

    const tryLoad = async () => {
      try {
        await loadAll();
      } catch {
        if (!cancelled) {
          setLoadError('Data source is starting up, retrying automatically...');
        }
      }
    };

    void tryLoad();
    const interval = setInterval(() => {
      void tryLoad();
    }, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [loadAll]);

  const alertItems = updates.filter(
    (u) => u.updateType === 'added' || u.updateType === 'deprecated'
  );

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>EPM Competitor Intelligence Dashboard</h1>
          <p>
            Compare endpoint privilege management capabilities, monitor competitor change velocity, and
            identify strategic feature gaps.
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
            {isChecking ? 'Checking sources...' : 'Run source check now'}
          </button>
          <a href="/api/export/comparison.csv" target="_blank" rel="noreferrer">
            Export CSV
          </a>
        </div>
      </header>

      <section className="filters">
        <select value={filters.product} onChange={(e) => setFilters({ ...filters, product: e.target.value })}>
          <option value="">All products</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option>
          <option value="Available">Available</option>
          <option value="Partial">Partial</option>
          <option value="Planned">Planned</option>
          <option value="Deprecated">Deprecated</option>
        </select>
        <input
          placeholder="Search feature or notes"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={filters.recentlyUpdated}
            onChange={(e) => setFilters({ ...filters, recentlyUpdated: e.target.checked })}
          />
          Recently updated
        </label>
      </section>
      {loadError && <p className="muted">{loadError}</p>}

      <main className="layout">
        <section className="card table-card">
          <h2>Feature Comparison Table</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Feature</th>
                  <th>Category</th>
                  <th>Sub-category</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Source</th>
                  <th>Last updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.product}</td>
                    <td>{r.feature}</td>
                    <td>{r.category}</td>
                    <td>{r.subCategory || '-'}</td>
                    <td>
                      <span className={`status status-${r.status.toLowerCase()}`}>{r.status}</span>
                    </td>
                    <td>{r.notes || '-'}</td>
                    <td>{r.sourceUrl ? <a href={r.sourceUrl}>Reference</a> : '-'}</td>
                    <td>{new Date(r.lastUpdated).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="side">
          <section className="card">
            <h3>Executive Insights</h3>
            <p className="muted">Features competitors have that we currently do not:</p>
            <ul>{insights?.gaps.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="muted">Our differentiators:</p>
            <ul>{insights?.differentiators.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="muted">Fastest innovation pace (30 days):</p>
            <ul>
              {insights?.fastestInnovation.map((i) => (
                <li key={i.name}>
                  {i.name} ({i.update_count} updates)
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3>Recent Updates</h3>
            <div className="updates-list">
              {updates.slice(0, 12).map((u) => (
                <article key={u.id} className="update-item">
                  <strong>{u.title}</strong>
                  <p>
                    {u.product} - {new Date(u.createdAt).toLocaleDateString()}
                  </p>
                  {u.sourceUrl && (
                    <a href={u.sourceUrl} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Alerts</h3>
            <ul>
              {alertItems.slice(0, 8).map((a) => (
                <li key={a.id}>
                  {a.updateType.toUpperCase()}: {a.title}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
