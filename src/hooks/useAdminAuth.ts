import { useState } from 'react';
import { portfolioApi } from '../api/portfolioApi';

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('admin_username'));

  const login = async (user: string, pass: string) => {
    try {
      const data = await portfolioApi.login(user, pass);
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_username', data.username);
      setToken(data.token);
      setUsername(data.username);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    setToken(null);
    setUsername(null);
  };

  const isAuthenticated = !!token;

  return {
    isAuthenticated,
    token,
    username,
    login,
    logout,
  };
}
