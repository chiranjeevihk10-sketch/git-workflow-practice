
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginUser } from '../services/auth';
import type { LoginRequest } from '../types/api';

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser, setToken } = auth;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);

      if (response.success && response.data) {
        const loggedInUser = {
          _id: response.data.user._id,
          email: credentials.email,
        };

        setUser(loggedInUser);
        setToken(response.data.token);
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: Boolean(user),
    loading,
    error,
  };
};

export default useAuth;
