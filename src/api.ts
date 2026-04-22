import type { ComparisonRow, Insights, Product, UpdateItem } from './types';

const base = '/api';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${base}/products`);
  return res.json();
}

export async function fetchComparison(filters: Record<string, string>): Promise<ComparisonRow[]> {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${base}/comparison${query ? `?${query}` : ''}`);
  return res.json();
}

export async function fetchUpdates(): Promise<UpdateItem[]> {
  const res = await fetch(`${base}/updates`);
  return res.json();
}

export async function fetchInsights(): Promise<Insights> {
  const res = await fetch(`${base}/insights`);
  return res.json();
}

export async function runCheckNow() {
  const res = await fetch(`${base}/check-now`, { method: 'POST' });
  return res.json();
}
