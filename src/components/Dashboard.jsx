"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, Activity, MessageSquare, 
  Settings, LogOut, Search, Bell, Radio, Zap, CheckCircle, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreatFeed from './ThreatFeed';
import AIChat from './AIChat';
import ThreatStats from './ThreatStats';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [displayText, setDisplayText] = useState('');
  const fullText = "SECURE TELEMETRY INTERFACE";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [activeTab]);

  const menuItems = [
    { id: 'overview', icon: Activity, label: 'OVERVIEW' },
    { id: 'threats', icon: Shield, label: 'INTELLIGENCE' },
    { id: 'nexus-ai', icon: MessageSquare, label: 'NEXUS AI' },
    { id: 'settings', icon: Settings, label: 'SETTINGS' },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-white bg-black">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white-5 flex flex-col pt-10">
        <div className="flex flex-col items-center mb-16">
          <div className="w-14 h-14 border border-accent flex items-center justify-center rounded-xl mb-4 bg-black shadow-gold group">
            <Shield className="text-accent group-hover:scale-110 transition-transform" size={28} />
          </div>
          <span className="brand-font text-xl tracking-widest text-accent uppercase animate-fade-in">Nexus Registry</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`tab-button ${activeTab === item.id ? 'active' : ''}`}
            >
              <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-accent-10' : 'bg-white-5'}`}>
                <item.icon size={18} />
              </div>
              <span className="tracking-widest uppercase text-xs font-black">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white-5 bg-black-40">
          <div className="p-4 glass mb-4 flex items-center gap-4 hover:border-accent-20 transition-all">
            <div className="w-10 h-10 rounded-lg bg-accent-10 flex items-center justify-center font-bold text-accent border border-accent-20">
              {user?.name?.[0].toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black truncate text-accent">{user?.name || 'ADMIN'}</p>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Operator V3</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-danger-20 text-danger hover:bg-danger/10 transition-all cursor-pointer bg-transparent uppercase text-xs font-black tracking-widest"
          >
            <LogOut size={12} />
            <span>Termination Mode</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between p-6 px-10 border-b border-white-5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest font-bold text-text-secondary">System Online: Neural Core v1.5</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative">
              <Search className="absolute left-3 top-half translate-y-half text-text-secondary" size={14} />
              <input 
                type="text" 
                placeholder="Global telemetry..."
                className="bg-black-40 border border-white-10 rounded-lg py-2.5 pl-10 pr-4 focus:border-accent transition-all text-xs text-white placeholder-white-20 w-[240px] outline-none"
              />
            </div>
            <button className="relative p-2.5 border border-white-10 rounded-lg hover:border-accent transition-colors bg-transparent cursor-pointer">
              <Bell size={16} className="text-text-secondary" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-accent rounded-full shadow-gold"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex flex-col items-center mb-16">
                   <h2 className="text-4xl font-black text-white text-center mb-4 tracking-tighter min-h-[48px]">
                      {displayText}<span className="animate-pulse">|</span>
                   </h2>
                   <div className="flex items-center gap-4">
                      <div className="h-[1px] w-20 bg-accent-30"></div>
                      <p className="text-xs text-text-secondary tracking-widest uppercase font-bold text-center">Elite Threat Intelligence & Simulation</p>
                      <div className="h-[1px] w-20 bg-accent-30"></div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Network Wave" value="842.2 TB" trend="+12.4%" icon={Activity} />
                  <StatCard label="Divergence" value="482" trend="+3.1%" icon={AlertTriangle} />
                  <StatCard label="Confirmed" value="128" trend="-5.2%" icon={CheckCircle} />
                  <StatCard label="Discarded" value="354" trend="+8.4%" icon={XCircle} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 glass p-8 min-h-[600px] flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white-5">
                      <h3 className="text-xs font-black flex items-center gap-3 tracking-widest text-accent uppercase">
                        <Zap size={16} className="animate-pulse" /> 
                        NEURAL THREAT STREAM
                      </h3>
                      <div className="flex items-center gap-4">
                         <span className="text-xs text-success font-black tracking-widest uppercase">Live Polling</span>
                         <span className="w-2 h-2 bg-success rounded-full animate-ping"></span>
                      </div>
                    </div>
                    <ThreatFeed />
                  </div>

                  <div className="glass p-8 min-h-[600px] flex flex-col">
                    <h3 className="text-xs font-black mb-8 pb-4 border-b border-white-5 tracking-widest text-accent uppercase">DATA CLUSTERS</h3>
                    <ThreatStats />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'nexus-ai' && (
               <motion.div key="nexus-ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <AIChat />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon: Icon }) => (
  <div className="glass p-6 group cursor-pointer hover:border-accent-20 transition-all hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(212,175,55,0.05)]">
    <div className="flex justify-between items-start mb-6">
      <div className="p-2.5 rounded-xl bg-black border border-white-10 group-hover:border-accent transition-all shadow-lg">
        <Icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
      </div>
      <span className={`text-xs font-black tracking-widest ${trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
        {trend}
      </span>
    </div>
    <p className="text-text-secondary text-xs font-black tracking-widest uppercase mb-1">{label}</p>
    <p className="text-2xl font-black text-white group-hover:text-accent transition-colors">{value}</p>
  </div>
);

export default Dashboard;
