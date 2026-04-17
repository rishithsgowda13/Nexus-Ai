"use client";
import { useState, useEffect } from 'react';
import { Shield, Lock, User, Layers, Cpu, GitBranch, FileText, ChevronRight, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [particles, setParticles] = useState([]);

  const layers = [
    { icon: Layers, label: "INGEST", desc: "Data Normalization", color: "#00d4ff" },
    { icon: Cpu, label: "DETECT", desc: "ML Classification", color: "#a855f7" },
    { icon: GitBranch, label: "CORRELATE", desc: "Event Fusion", color: "#00ff88" },
    { icon: FileText, label: "OUTPUT", desc: "SOC Explainability", color: "#ff8c42" },
  ];

  // Floating particles
  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.03,
    }));
    setParticles(pts);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: email.split('@')[0] });
  };

  return (
    <div className="grid-bg scanline" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
    }}>

      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          background: '#00d4ff',
          borderRadius: '50%',
          opacity: p.opacity,
          animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          pointerEvents: 'none', zIndex: 0,
          boxShadow: '0 0 6px rgba(0,212,255,0.15)',
        }} />
      ))}

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <div className="pulse-dot" style={{ width: 6, height: 6 }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 500, fontFamily: 'JetBrains Mono, monospace' }}>
          Secure Connection Established
        </span>
      </div>
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 2 }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', fontWeight: 400, fontFamily: 'JetBrains Mono, monospace' }}>
          Nexus.AI v2.0
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}
      >
        {/* Logo */}
        <motion.div
          className="float-animation"
          style={{
            width: 80, height: 80,
            border: '1px solid rgba(0,212,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, marginBottom: 28,
            background: 'rgba(0,212,255,0.02)',
            animation: 'float 4s ease-in-out infinite, glow-border 3s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(0,212,255,0.05)',
          }}
        >
          <Shield size={38} color="#00d4ff" />
        </motion.div>

        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900, fontSize: '2.6rem',
          color: '#fff', letterSpacing: '0.05em',
          marginBottom: 8,
        }}>
          NEXUS<span style={{ color: '#00d4ff' }}>.AI</span>
        </h1>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          fontWeight: 400,
          marginBottom: 44,
          fontFamily: 'Inter, sans-serif',
        }}>
          Threat Detection & Simulation
        </p>

        {/* 4-Layer Architecture Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%', marginBottom: 40 }}>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card"
              style={{
                padding: '18px 12px', textAlign: 'center',
                cursor: 'default',
                borderColor: `${layer.color}10`,
              }}
            >
              <layer.icon size={20} color={layer.color} style={{ marginBottom: 10 }} />
              <p style={{
                fontSize: '0.6rem', fontWeight: 700,
                color: layer.color, letterSpacing: '0.15em',
                marginBottom: 4, fontFamily: 'Orbitron, sans-serif',
              }}>{layer.label}</p>
              <p style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>{layer.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Login Card */}
        <div className="glass-card" style={{
          width: '100%', padding: '44px 40px',
          border: '1px solid rgba(0,212,255,0.06)',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.6rem', fontWeight: 600,
                color: '#00d4ff', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: 12, marginLeft: 4,
                fontFamily: 'Orbitron, sans-serif',
              }}>
                <Fingerprint size={12} />
                Operator Identity
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="rgba(255,255,255,0.2)" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nexus-input"
                  placeholder="operator@nexus.ai"
                />
              </div>
            </div>

            <div style={{ marginBottom: 36 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.6rem', fontWeight: 600,
                color: '#00d4ff', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: 12, marginLeft: 4,
                fontFamily: 'Orbitron, sans-serif',
              }}>
                <Lock size={12} />
                Encrypted Token
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="rgba(255,255,255,0.2)" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }} />
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
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              Access Command Center
              <ChevronRight size={16} />
            </motion.button>
          </form>
        </div>

        {/* Footer info */}
        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15))' }} />
          <span style={{
            fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 400,
          }}>
            Secured by 4-Layer Neural Architecture
          </span>
          <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, rgba(0,212,255,0.15), transparent)' }} />
        </div>
      </motion.div>
    </div>
  );
}
