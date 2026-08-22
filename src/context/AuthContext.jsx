/**
 * AuthContext.jsx — Ajay Modi Travels
 * Replaces the legacy GlobeTrotter AuthContext.
 * Provides user state, login, signup, logout, updateUser.
 * Persists to localStorage (non-sensitive mock data only).
 */
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'amt_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [isLoading, setIsLoading] = useState(false);

  const persist = (u) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else    localStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback((userData) => {
    setUser(userData);
    persist(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persist(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      persist(updated);
      return updated;
    });
  }, []);

  const signup = useCallback(async ({ firstName, lastName, email, phone, password }) => {
    setIsLoading(true);
    // Mock API — swap for real backend
    await new Promise(r => setTimeout(r, 800));
    const newUser = {
      id:        `u_${Date.now()}`,
      firstName,
      lastName,
      name:      `${firstName} ${lastName}`,
      email,
      phone:     phone || '',
      avatar:    null,
      memberSince: new Date().toISOString(),
    };
    login(newUser);
    setIsLoading(false);
    return newUser;
  }, [login]);

  const forgotPassword = useCallback(async (email) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false);
    return true; // mock success
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isLoading,
      login, logout, updateUser, signup, forgotPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
