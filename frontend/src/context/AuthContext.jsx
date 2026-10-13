import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('rg_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If token exists, verify or load user
    const checkUser = async () => {
      if (!token) {
        // If no token, set default demo researcher profile for instant exploration
        setUser({
          _id: 'guest_researcher_01',
          name: 'Dr. Alexis Chen',
          email: 'alexis.chen@observatory.edu',
          role: 'Lead Researcher',
          institution: 'Institute for Advanced Computational Studies',
          avatar: null
        });
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.warn('Could not verify token with server, using local session', err);
        // Fallback to local user
        const storedUser = localStorage.getItem('rg_user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            setUser({
              _id: 'guest_researcher_01',
              name: 'Dr. Alexis Chen',
              email: 'alexis.chen@observatory.edu',
              role: 'Lead Researcher',
              institution: 'Institute for Advanced Computational Studies'
            });
          }
        } else {
          setUser({
            _id: 'guest_researcher_01',
            name: 'Dr. Alexis Chen',
            email: 'alexis.chen@observatory.edu',
            role: 'Lead Researcher',
            institution: 'Institute for Advanced Computational Studies'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('rg_token', newToken);
    localStorage.setItem('rg_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('rg_token');
    localStorage.removeItem('rg_user');
    setToken(null);
    setUser({
      _id: 'guest_researcher_01',
      name: 'Dr. Alexis Chen',
      email: 'alexis.chen@observatory.edu',
      role: 'Lead Researcher',
      institution: 'Institute for Advanced Computational Studies'
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
