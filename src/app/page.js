"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Disable SSR to prevent hydration mismatches from browser extensions
const Auth = dynamic(() => import('../components/Auth'), { ssr: false });
const Dashboard = dynamic(() => import('../components/Dashboard'), { ssr: false });

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
