/**
 * services/authService.js
 * Mock auth service — API-abstracted.
 * Replace with Firebase / Supabase / backend calls when ready.
 */

const DEMO_USERS = [
  { email: 'demo@ajaymoditravels.com', password: 'Demo@1234', firstName: 'Premwati', lastName: 'Rathor', phone: '+91 98765 43210' },
  { email: 'test@test.com',            password: 'Test@1234', firstName: 'Test',     lastName: 'User',   phone: '+91 99999 00000' },
];

export const authService = {
  async login(email, password) {
    await new Promise(r => setTimeout(r, 700));
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    return {
      id:          `u_${Date.now()}`,
      firstName:   found.firstName,
      lastName:    found.lastName,
      name:        `${found.firstName} ${found.lastName}`,
      email:       found.email,
      phone:       found.phone,
      avatar:      null,
      memberSince: '2024-01-15T00:00:00Z',
    };
  },

  async signup({ firstName, lastName, email, phone }) {
    await new Promise(r => setTimeout(r, 800));
    return {
      id:          `u_${Date.now()}`,
      firstName,
      lastName,
      name:        `${firstName} ${lastName}`,
      email,
      phone:       phone || '',
      avatar:      null,
      memberSince: new Date().toISOString(),
    };
  },

  async forgotPassword(email) {
    await new Promise(r => setTimeout(r, 700));
    return true;
  },

  async updateProfile(updates) {
    await new Promise(r => setTimeout(r, 500));
    return updates;
  },
};
