import type { ComparisonRow, Insights, Product, UpdateItem, UseCase } from './types';

const base = '/api';

export async function fetchProducts(type?: string): Promise<Product[]> {
  const query = type ? `?type=${type}` : '';
  const res = await fetch(`${base}/products${query}`);
  return res.json();
}

export async function fetchComparison(filters: Record<string, string>): Promise<ComparisonRow[]> {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${base}/comparison${query ? `?${query}` : ''}`);
  return res.json();
}

export async function fetchUseCases(filters: Record<string, string>): Promise<UseCase[]> {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${base}/use-cases${query ? `?${query}` : ''}`);
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
