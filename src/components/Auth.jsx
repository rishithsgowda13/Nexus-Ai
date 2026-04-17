"use client";
import { useState } from 'react';
import { Shield, Lock, User, Layers, Cpu, GitBranch, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const layers = [
    { icon: Layers, label: "INGEST", desc: "Data Normalization" },
    { icon: Cpu, label: "DETECT", desc: "ML Classification" },
    { icon: GitBranch, label: "CORRELATE", desc: "Event Fusion" },
    { icon: FileText, label: "OUTPUT", desc: "SOC Explainability" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: email.split('@')[0] });
  };

  return (
    <div className="grid-bg scanline" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="pulse-dot" />
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>System Status: Online</span>
      </div>
      <div style={{ position: 'absolute', top: 24, right: 32 }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#444', textTransform: 'uppercase', fontWeight: 500 }}>Nexus.AI v2.0</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Logo */}
        <motion.div
          className="float-animation glow-border-animation"
          style={{ width: 72, height: 72, border: '2px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 18, marginBottom: 24, background: '#000' }}
        >
          <Shield size={36} color="#D4AF37" />
        </motion.div>

        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '2.8rem', color: '#D4AF37', letterSpacing: '-0.03em', marginBottom: 6 }}>NEXUS.AI</h1>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.5em', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: 40 }}>Threat Detection & Simulation</p>

        {/* 4-Layer Architecture Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%', marginBottom: 40 }}>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card"
              style={{ padding: '16px 12px', textAlign: 'center', cursor: 'default' }}
            >
              <layer.icon size={20} color="#D4AF37" style={{ marginBottom: 8 }} />
              <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', marginBottom: 2 }}>{layer.label}</p>
              <p style={{ fontSize: '0.6rem', color: '#555', fontWeight: 500 }}>{layer.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Login Card */}
        <div className="glass-card" style={{ width: '100%', padding: '40px 36px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, marginLeft: 4 }}>Operator Identity</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#555" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nexus-input"
                  placeholder="admin@nexus.ai"
                />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, marginLeft: 4 }}>Encrypted Token</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#555" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="nexus-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-gold"
              style={{ width: '100%' }}
            >
              Access Command Center
            </motion.button>
          </form>
        </div>

        {/* Footer info */}
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.15)' }} />
          <span style={{ fontSize: '0.6rem', color: '#444', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Secured by 4-Layer Neural Architecture</span>
          <div style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.15)' }} />
        </div>
      </motion.div>
    </div>
  );
}
