import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * AuthContext — manages user authentication and subject selection state.
 *
 * This is MOCK-only for Phase 2. No backend calls are made here.
 * When the backend is ready, replace the mock helpers inside authService.js
 * and set IS_MOCK_MODE=false — the context API remains identical.
 */
const AuthContext = createContext(null);

// ─── Helpers for localStorage persistence ─────────────────────────────────────
function loadPersistedUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  } catch {
    // silently ignore quota / private-mode errors
  }
}

// ─── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadPersistedUser());
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const isAuthenticated = Boolean(user);

  // Keep localStorage in sync whenever user changes
  useEffect(() => {
    persistUser(user);
  }, [user]);

  /**
   * Mock login — simulates a successful auth response.
   * Replace body with a real API call when backend is ready.
   */
  const login = useCallback(async ({ email, password }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      // ── MOCK: Accept any non-empty credentials ──────────────────────────────
      await new Promise((r) => setTimeout(r, 600)); // simulate network latency
      if (!email.trim() || !password.trim()) {
        throw new Error('Email and password are required.');
      }
      if (password.length < 6) {
        throw new Error('Invalid credentials. Please try again.');
      }
      const mockUser = {
        id: 'mock-user-001',
        name: email.split('@')[0],
        email: email.trim().toLowerCase(),
      };
      // ── END MOCK ─────────────────────────────────────────────────────────────
      setUser(mockUser);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /**
   * Mock register — simulates account creation then redirects to login.
   */
  const register = useCallback(async ({ name, email, password, confirmPassword }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        throw new Error('All fields are required.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      // Registration succeeds — user must now log in (no auto-login by design)
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /** Log out and wipe state */
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSubject(null);
    setAuthError(null);
  }, []);

  /** Clear any standing auth error (e.g. on field change) */
  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value = {
    user,
    isAuthenticated,
    selectedSubject,
    authError,
    authLoading,
    login,
    register,
    logout,
    setSelectedSubject,
    clearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
