"use client";
import { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, Activity, MessageSquare, Settings, LogOut, 
  Search, Bell, Zap, CheckCircle, XCircle, Layers, Play, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreatFeed from './ThreatFeed';
import AIChat from './AIChat';
import ThreatStats from './ThreatStats';

const API = "http://localhost:8000";

const menuItems = [
  { id: 'overview', icon: Activity, label: 'Overview' },
  { id: 'threats', icon: Shield, label: 'Intelligence' },
  { id: 'nexus-ai', icon: MessageSquare, label: 'Nexus AI' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [time, setTime] = useState('');
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [threats, setThreats] = useState([]);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch health + stats on mount
  useEffect(() => {
    fetchHealth();
    fetchStats();
    fetchThreats();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch(`${API}/api/health`);
      setHealth(await res.json());
    } catch { setHealth(null); }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/api/stats`);
      setStats(await res.json());
    } catch { setStats(null); }
  };

  const fetchThreats = async () => {
    try {
      const res = await fetch(`${API}/api/threats`);
      const data = await res.json();
      setThreats(data.threats || []);
    } catch { setThreats([]); }
  };

  const runSimulation = async () => {
    setSimulating(true);
    try {
      await fetch(`${API}/api/simulate`, { method: 'POST' });
      await fetchStats();
      await fetchThreats();
    } catch (e) { console.error(e); }
    setSimulating(false);
  };

  const layers = health?.layers || {};
  const layerList = [
    { key: "L1_Ingestion", label: "L1 Ingest" },
    { key: "L2_Detection", label: "L2 Detect" },
    { key: "L3_Correlation", label: "L3 Correlate" },
    { key: "L4_Output", label: "L4 Output" },
  ];

  return (
    <div className="scanline" style={{ display: 'flex', height: '100vh', overflow: 'hidden', color: '#fff', background: '#000' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: 280, borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.6)' }}>
        <div style={{ padding: '32px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="glow-border-animation" style={{ width: 52, height: 52, border: '1.5px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, marginBottom: 14, background: '#000' }}>
            <Shield size={26} color="#D4AF37" />
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#D4AF37', letterSpacing: '0.2em' }}>NEXUS.AI</span>
          <span style={{ fontSize: '0.55rem', color: '#444', letterSpacing: '0.3em', marginTop: 4, textTransform: 'uppercase' }}>Command Center</span>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`sidebar-tab ${activeTab === item.id ? 'active' : ''}`}>
              <div className="tab-icon"><item.icon size={16} /></div>
              <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700 }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Live Layer Status from API */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Core Layers (Live)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {layerList.map(l => {
              const status = layers[l.key] || 'offline';
              const color = status === 'active' ? '#00ff88' : '#ef4444';
              return (
                <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="layer-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  <span style={{ fontSize: '0.62rem', color: '#666', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.55rem', color, fontWeight: 700, textTransform: 'uppercase' }}>{status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* User */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="glass-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, borderRadius: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)', fontSize: '0.85rem' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D4AF37', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Admin'}</p>
              <p style={{ fontSize: '0.55rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SOC Analyst</p>
            </div>
          </div>
          <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.15)', color: '#ef4444', background: 'transparent', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <LogOut size={13} /> Disconnect
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#555', textTransform: 'uppercase', fontWeight: 600 }}>
              {health ? 'System Online' : 'Connecting...'}
            </span>
            <span style={{ fontSize: '0.65rem', color: '#333', margin: '0 8px' }}>|</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#D4AF37', fontWeight: 500 }}>{time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={runSimulation} disabled={simulating} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(212,175,55,0.2)', background: simulating ? 'rgba(212,175,55,0.05)' : 'transparent', color: '#D4AF37', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s' }}>
              {simulating ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Play size={13} />}
              {simulating ? 'Processing...' : 'Run Simulation'}
            </button>
            <button onClick={() => { fetchStats(); fetchThreats(); }} style={{ padding: '8px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', cursor: 'pointer', color: '#666' }}>
              <RefreshCw size={14} />
            </button>
            <button style={{ position: 'relative', padding: 10, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, background: 'transparent', cursor: 'pointer' }}>
              <Bell size={16} color="#666" />
              {threats.length > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: '#D4AF37', borderRadius: '50%' }} />}
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewTab key="ov" stats={stats} threats={threats} />}
            {activeTab === 'threats' && <OverviewTab key="th" stats={stats} threats={threats} />}
            {activeTab === 'nexus-ai' && (
              <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                <AIChat />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: '0.8rem', color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Configuration Module — Coming Soon</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ stats, threats }) {
  const statCards = [
    { label: "Data Throughput", value: stats?.throughput || "—", trend: `${stats?.events_per_sec || 0} evt/s`, icon: Activity, layer: "L1" },
    { label: "Anomaly Count", value: String(stats?.anomaly_count || 0), trend: "Total", icon: AlertTriangle, layer: "L2" },
    { label: "Verified Threats", value: String(stats?.genuine_threats || 0), trend: "Genuine", icon: CheckCircle, layer: "L3", color: "#ef4444" },
    { label: "False Positives", value: String(stats?.false_positives || 0), trend: "Filtered", icon: XCircle, layer: "L4", color: "#00ff88" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
          AI-Driven <span style={{ color: '#00ff88' }}>Threat Detection</span> & Simulation
        </h1>
        <p style={{ fontSize: '0.7rem', color: '#555', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600 }}>4-Layer Neural Architecture • Real-Time Processing</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="glass-card stat-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={18} color="#D4AF37" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: s.color || '#D4AF37', letterSpacing: '0.05em' }}>{s.trend}</span>
                <span style={{ fontSize: '0.5rem', color: '#444', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.layer}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={16} color="#D4AF37" />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Neural Threat Stream</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#00ff88', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live</span>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
            </div>
          </div>
          <ThreatFeed threats={threats} />
        </div>
        <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ML Analytics</span>
          </div>
          <ThreatStats stats={stats} />
        </div>
      </div>
    </motion.div>
  );
}
