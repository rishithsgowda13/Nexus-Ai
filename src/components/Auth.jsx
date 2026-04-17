"use client";
import React, { useState } from 'react';
import { Shield, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: email.split('@')[0] });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 grid-bg relative">
      <div className="absolute top-8 left-8 flex items-center gap-3">
         <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
         <span className="text-xs uppercase tracking-widest font-medium text-text-secondary">System Online</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="w-16 h-16 border border-accent flex items-center justify-center rounded-xl mb-6 bg-black shadow-gold cursor-pointer"
          >
             <Shield size={32} className="text-accent" />
          </motion.div>
          <h1 className="brand-font text-4xl text-accent tracking-tighter mb-2">NEXUS.AI</h1>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Intelligence Gateway</p>
        </div>

        <div className="w-full glass p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-accent font-bold block ml-1">Access Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-half translate-y-half text-text-secondary" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@nexus.ai"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-accent font-bold block ml-1">Security Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-half translate-y-half text-text-secondary" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="primary-button mt-4"
            >
              {isLogin ? 'Establish Link' : 'Register Core'}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs tracking-widest uppercase text-text-secondary hover:text-accent transition-colors bg-transparent border-none cursor-pointer underline-offset-4 hover:underline"
            >
              Request Access Hierarchy Override
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
