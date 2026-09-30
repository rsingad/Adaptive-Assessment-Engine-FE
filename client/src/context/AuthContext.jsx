import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import authService from '../services/authService';

/**
 * AuthContext — manages user authentication and subject selection state.
 * Connects to live backend API when VITE_USE_MOCK=false, with seamless mock fallback.
 */
const AuthContext = createContext(null);

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

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
    // silently ignore quota errors
  }
}

function loadPersistedSubject() {
  try {
    const raw = localStorage.getItem('adaptilearn_selected_subject_v1');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSubject(subject) {
  try {
    if (subject) {
      localStorage.setItem('adaptilearn_selected_subject_v1', JSON.stringify(subject));
    } else {
      localStorage.removeItem('adaptilearn_selected_subject_v1');
    }
  } catch {
    // silently ignore
  }
}

// ─── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadPersistedUser());
  const [selectedSubject, setSelectedSubjectState] = useState(() => loadPersistedSubject());
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const setSelectedSubject = useCallback((subject) => {
    setSelectedSubjectState(subject);
    persistSubject(subject);
  }, []);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    persistUser(user);
  }, [user]);

  /**
   * Login user with real API
   */
  const login = useCallback(async ({ email, password }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (!IS_MOCK_MODE) {
        const response = await authService.login({ email, password });
        // Response format: { message, user: { id, name, email } }
        setUser(response.user);
        return { success: true, user: response.user };
      }

      // Mock mode fallback
      await new Promise((r) => setTimeout(r, 400));
      if (!email.trim() || !password.trim()) {
        throw new Error('Email and password are required.');
      }
      if (password.length < 6) {
        throw new Error('Invalid credentials. Password must be at least 6 characters.');
      }
      const mockUser = {
        id: 'mock-user-001',
        name: email.split('@')[0],
        email: email.trim().toLowerCase(),
      };
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (err) {
      const errorMsg = err.data?.error || err.message || 'Login failed. Please verify credentials.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /**
   * Register user with real API
   */
  const register = useCallback(async ({ name, email, password, confirmPassword }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (!name.trim() || !email.trim() || !password) {
        throw new Error('All fields are required.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      if (!IS_MOCK_MODE) {
        const response = await authService.register({ name, email, password });
        return { success: true, user: response.user };
      }

      // Mock mode fallback
      await new Promise((r) => setTimeout(r, 400));
      return { success: true };
    } catch (err) {
      const errorMsg = err.data?.error || err.message || 'Registration failed.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /** Log out and clear state */
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSubjectState(null);
    persistSubject(null);
    setAuthError(null);
  }, []);

  /** Clear any standing auth error */
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

export default AuthContext;
