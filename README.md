# EPM Competitor Analysis Platform

Professional web platform to track and compare Endpoint Privilege Management (EPM) products, monitor competitor updates, and generate executive insights.

## What it includes

- React + TypeScript dashboard with a modern analyst-focused UX
- Express + SQLite API with flexible data schema for EPM/PAM expansion
- Comparison matrix with filters, search, and recency toggles
- Automated competitor source checks (scheduled every 6 hours)
- Update history/change log and alert feed
- Insights engine for feature gaps, differentiators, trends, and innovation velocity
- Weekly/monthly report endpoints and CSV export

## Key folders

- `src/` - dashboard UI and API client
- `server/` - backend API, database schema, seeding, insights, automated source checks
- `epm_competitor.db` - SQLite database (generated at runtime)

## Run locally

```bash
npm install
npm run dev
```

This runs:
- frontend on `http://localhost:5173`
- API on `http://localhost:4000`

## Useful API endpoints

- `GET /api/comparison`
- `GET /api/products`
- `GET /api/updates`
- `GET /api/insights`
- `POST /api/check-now`
- `GET /api/reports/weekly`
- `GET /api/reports/monthly`
- `GET /api/export/comparison.csv`

## Run as background service (no npm dev terminal)

Use this mode when you want the app to stay up independently.

```bash
npm run build:prod
npm run daemon:start
npm run daemon:save
```

Open:
- `http://localhost:4000`
- `http://<your-ip>:4000`

Useful daemon commands:

```bash
npm run daemon:restart
npm run daemon:logs
npm run daemon:stop
```

To auto-start after Windows reboot (run once):

```bash
npx pm2 startup
```

## Build and lint

```bash
npm run lint
npm run build
```
