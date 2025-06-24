import React, { useState } from 'react';
import LoginPage from './components/login/LoginPage';
import MainLayout from './components/layout/MainLayout';

const AuthWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <MainLayout />;
};

export default AuthWrapper;
