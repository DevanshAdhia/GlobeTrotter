/**
 * utils/formatters.js
 * Date, currency, number, and string formatters used across the app.
 */

/* Currency */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

/* Compact number: 12500 → ₹12.5K */
export const formatCompact = (amount, currency = 'INR') => {
  if (amount >= 100000) return `${currency === 'INR' ? '₹' : '$'}${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)   return `${currency === 'INR' ? '₹' : '$'}${(amount / 1000).toFixed(1)}K`;
  return formatCurrency(amount, currency);
};

/* Date */
export const formatDate = (date, opts = {}) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    ...opts,
  });
};

export const formatDateRange = (start, end) => {
  if (!start) return '—';
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const mo = (d) => d.toLocaleDateString('en-IN', { month: 'short' });
  const da = (d) => d.getDate();
  const yr = (d) => d.getFullYear();
  if (!e) return `${da(s)} ${mo(s)} ${yr(s)}`;
  if (yr(s) !== yr(e)) return `${da(s)} ${mo(s)} ${yr(s)} – ${da(e)} ${mo(e)} ${yr(e)}`;
  if (mo(s) !== mo(e)) return `${da(s)} ${mo(s)} – ${da(e)} ${mo(e)} ${yr(e)}`;
  return `${da(s)}–${da(e)} ${mo(s)} ${yr(s)}`;
};

/* Duration */
export const getTripDuration = (start, end) => {
  if (!start || !end) return null;
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.round(diff));
};

export const formatDuration = (minutes) => {
  if (!minutes) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/* Initials from name */
export const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

/* Truncate text */
export const truncate = (str, max = 80) =>
  str?.length > max ? str.slice(0, max - 1) + '…' : str || '';

/* Capitalize first letter */
export const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);

/* Slugify */
export const slugify = (str = '') =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* Random ID */
export const uid = () => `_${Math.random().toString(36).slice(2, 9)}`;
