/**
 * API Service - Connects React frontend to Odoo backend
 * All property data is fetched from the advanced_property_management module.
 */

// Odoo backend URL - uses proxy in development, direct in production
const API_BASE = process.env.REACT_APP_ODOO_URL || '';

/**
 * Fetch all properties with optional filters
 */
export async function fetchProperties({ search, type, sale_rent, priceMin, priceMax, sort, limit, offset } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (type) params.append('type', type);
  if (sale_rent) params.append('sale_rent', sale_rent);
  if (priceMin) params.append('price_min', priceMin);
  if (priceMax) params.append('price_max', priceMax);
  if (sort) params.append('sort', sort);
  if (limit) params.append('limit', limit);
  if (offset) params.append('offset', offset);

  const res = await fetch(`${API_BASE}/api/properties?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

/**
 * Fetch single property detail
 */
export async function fetchPropertyDetail(id) {
  const res = await fetch(`${API_BASE}/api/properties/${id}`);
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
}

/**
 * Fetch property types for filter dropdowns
 */
export async function fetchPropertyTypes() {
  const res = await fetch(`${API_BASE}/api/property-types`);
  if (!res.ok) throw new Error('Failed to fetch types');
  return res.json();
}

/**
 * Submit property inquiry (creates CRM lead in Odoo)
 */
export async function submitInquiry({ property_id, name, email, phone, message }) {
  const res = await fetch(`${API_BASE}/api/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ property_id, name, email, phone, message }),
  });
  if (!res.ok) throw new Error('Failed to submit inquiry');
  return res.json();
}

/**
 * Submit contact form (creates general CRM lead in Odoo)
 */
export async function submitContact({ name, email, phone, subject, message }) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, subject, message }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

/**
 * Build Odoo image URL for a property
 */
export function getPropertyImageUrl(propertyId) {
  return `${API_BASE}/web/image/property.property/${propertyId}/image`;
}

/**
 * Build Odoo image URL for a property gallery image
 */
export function getGalleryImageUrl(imageId) {
  return `${API_BASE}/web/image/property.image/${imageId}/image`;
}

/**
 * Fix image URLs from Odoo - replace Odoo's web.base.url with our proxy
 * Odoo may return absolute URLs with its internal base URL, but
 * we need them relative so they go through the React proxy.
 */
export function fixImageUrl(url) {
  if (!url) return PLACEHOLDER_IMAGE;
  // If already relative, return as-is
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  // Extract the path portion (/web/image/...) from Odoo absolute URLs
  try {
    const parsed = new URL(url);
    return `${API_BASE}${parsed.pathname}`;
  } catch {
    return url;
  }
}

/**
 * Process property data from API to fix image URLs
 */
export function processPropertyData(prop) {
  return {
    ...prop,
    image: prop.image ? fixImageUrl(prop.image) : '',
    images: (prop.images || []).map(fixImageUrl),
    agent: prop.agent ? {
      ...prop.agent,
      image: prop.agent.image ? fixImageUrl(prop.agent.image) : '',
    } : null,
  };
}

/**
 * Placeholder image when no image available
 */
export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
