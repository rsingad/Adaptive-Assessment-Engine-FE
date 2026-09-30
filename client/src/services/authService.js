import apiClient from './apiClient';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Service providing authentication actions with real backend.
 */
export const authService = {
  /**
   * Register a new user
   * POST /api/auth/register
   * @param {Object} data - { name, email, password }
   */
  async register({ name, email, password }) {
    return await apiClient.post(API_ENDPOINTS.REGISTER, {
      name,
      email: email.trim().toLowerCase(),
      password,
    });
  },

  /**
   * Login an existing user
   * POST /api/auth/login
   * @param {Object} data - { email, password }
   */
  async login({ email, password }) {
    return await apiClient.post(API_ENDPOINTS.LOGIN, {
      email: email.trim().toLowerCase(),
      password,
    });
  },

  /**
   * Check backend health
   * GET /health
   */
  async checkHealth() {
    return await apiClient.get(API_ENDPOINTS.HEALTH);
  }
};

export default authService;
