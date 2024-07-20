import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    history.push('/');
  };

  const signup = async (userData) => {
    const user = await authService.signup(userData);
    setCurrentUser(user);
    history.push('/');
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
