/**
 * services/requestStore.js
 * Persists Phase 10 trip requests to localStorage.
 * Shared between Phase 10 (write) and Phase 11 (read).
 */
const KEY = 'amt_requests';

export const requestStore = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch { return []; }
  },

  save(request) {
    const all = this.getAll();
    const exists = all.findIndex(r => r.requestId === request.requestId);
    if (exists >= 0) all[exists] = request;
    else all.unshift(request);
    localStorage.setItem(KEY, JSON.stringify(all));
  },

  getById(requestId) {
    return this.getAll().find(r => r.requestId === requestId) || null;
  },

  associateUser(userId) {
    const all = this.getAll().map(r => r.userId ? r : { ...r, userId });
    localStorage.setItem(KEY, JSON.stringify(all));
  },

  getForUser(userId) {
    return this.getAll().filter(r => r.userId === userId || !r.userId);
  },
};
