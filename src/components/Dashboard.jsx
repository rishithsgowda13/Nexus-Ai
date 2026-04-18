"use client";
import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  Shield, AlertTriangle, Activity, MessageSquare, History, LogOut, 
  Search, Bell, Zap, CheckCircle, XCircle, Layers, Play, RefreshCw,
  ChevronRight, Hexagon, Radio, FileText, Download, Clock,
  Terminal, Cpu, CpuIcon, X, Check, ArrowRight, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreatFeed from './ThreatFeed';
import AIChat from './AIChat';
import ThreatStats from './ThreatStats';
import GlobalMap from './GlobalMap';
import { supabase } from '../lib/supabase';

const API = "http://localhost:8000";

const generateIncidentPDF = (t) => {
  if (!t) return;
  const doc = new jsPDF();
  
  // Styling constants
  const accentColor = [0, 212, 256]; // Light Blue
  const criticalColor = [255, 59, 92]; // Red
  const grayColor = [100, 100, 100];
  const textColor = [20, 20, 20];

  const drawSectionHeader = (title, y) => {
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, y);
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(0.8);
    doc.line(20, y + 2, 190, y + 2);
    return y + 12;
  };
  
  // --- PAGE 1 HEADER ---
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, 210, 50, 'F');
  
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("NEXUS.AI", 20, 32);
  
  doc.setFontSize(10);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text("SECURITY OPERATIONS CENTER | FORENSIC INTELLIGENCE DOSSIER", 20, 42);

  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text(`CASE_REF: ${t.id}`, 190, 15, { align: 'right' });
  doc.text(`GENERATED: ${new Date().toLocaleString()}`, 190, 22, { align: 'right' });

  let yPos = 65;

  // --- 1. EXECUTIVE SUMMARY ---
  yPos = drawSectionHeader("1. EXECUTIVE INCIDENT SUMMARY", yPos);
  
  doc.setFontSize(10);
  const metadata = [
    { label: "Target Host:", value: t.alert?.source || 'Internal Segment' },
    { label: "Detected Threat:", value: t.alert?.threat_type || 'Unknown' },
    { label: "Severity Level:", value: t.alert?.severity || 'High', colorAt: true },
    { label: "Confidence Rating:", value: `${t.alert?.confidence_score}%` },
    { label: "First Seen:", value: t.timestamp || 'N/A' },
    { label: "GeoIP Origin:", value: t.alert?.lat ? `${t.alert.lat}, ${t.alert.lon}` : 'Undisclosed' }
  ];

  metadata.forEach((m, i) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(m.label, 25, yPos);
    
    doc.setFont("helvetica", "bold");
    if (m.label === "Severity Level:") {
      const s = m.value.toUpperCase();
      if (s === 'CRITICAL') doc.setTextColor(criticalColor[0], criticalColor[1], criticalColor[2]);
      else if (s === 'HIGH') doc.setTextColor(245, 197, 66);
      else doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    } else {
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    }
    doc.text(String(m.value), 75, yPos);
    yPos += 8;
  });

  yPos += 10;

  // --- 2. TECHNICAL ANALYSIS ---
  yPos = drawSectionHeader("2. TECHNICAL ANALYSIS & NEURAL REASONING", yPos);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  const techSummary = `The NEXUS 4-Layer adaptive pipeline flagged this event based on a high-entropy variance in network traffic patterns. Layer 2 (ML Ensemble) correlated the request signatures with known ${t.alert?.threat_type} attack vectors. Further analysis via Layer 3 identifies a successful cross-layer match between the network-level egress spike and the underlying endpoint process modification.`;
  const techSummaryLines = doc.splitTextToSize(techSummary, 170);
  doc.text(techSummaryLines, 20, yPos);
  yPos += (techSummaryLines.length * 5) + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Detection Logic Detail (XAI Output):", 20, yPos);
  yPos += 6;
  doc.setFont("helvetica", "italic");
  const xaiText = t.explainability || "No specific neural reasoning provided for this incident.";
  const xaiLines = doc.splitTextToSize(xaiText, 170);
  doc.text(xaiLines, 20, yPos);
  yPos += (xaiLines.length * 5) + 15;

  // --- 3. IMMEDIATE MITIGATION ---
  if (yPos > 240) { doc.addPage(); yPos = 30; }
  yPos = drawSectionHeader("3. IMMEDIATE TACTICAL MITIGATION", yPos);
  
  if (t.playbook && t.playbook.length > 0) {
    t.playbook.forEach((step, idx) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${idx + 1}.`, 25, yPos);
      doc.setFont("helvetica", "normal");
      const stepLines = doc.splitTextToSize(step, 155);
      doc.text(stepLines, 32, yPos);
      yPos += (stepLines.length * 5) + 4;
      if (yPos > 275) { doc.addPage(); yPos = 30; }
    });
  } else {
    doc.text("Standard automated isolation triggered. No manual remediation required at this stage.", 20, yPos);
    yPos += 10;
  }

  yPos += 10;

  // --- 4. STRATEGIC PREVENTION ---
  if (yPos > 240) { doc.addPage(); yPos = 30; }
  yPos = drawSectionHeader("4. STRATEGIC PREVENTION & RECOMMENDATIONS", yPos);
  
  doc.setFont("helvetica", "normal");
  const recommendations = [
    `• Perform a comprehensive audit of all ${t.alert?.threat_type} susceptible modules.`,
    "• Update Web Application Firewall (WAF) rules to include deep-packet inspection (DPI).",
    "• Implement micro-segmentation for the affected network host to limit lateral movement.",
    "• Rotate all administrative credentials and API tokens on the target node.",
    "• Review access control lists (ACLs) to ensure strict adherence to Least Privilege (PoLP)."
  ];
  
  recommendations.forEach(r => {
    doc.text(r, 25, yPos);
    yPos += 7;
  });

  // --- FOOTER ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text("CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY | NEXUS AI SOC INTEL", 105, 287, { align: "center" });
    doc.text(`REFERENCE: SOC-DOSSIER-${t.id} | Page ${i} of ${pageCount}`, 190, 280, { align: 'right' });
  }

  doc.save(`NexusAI_Forensic_Report_${t.id}.pdf`);
};

const menuItems = [
  { id: 'overview', icon: Activity, label: 'Overview' },
  { id: 'threats', icon: Shield, label: 'Intelligence' },
  { id: 'nexus-ai', icon: MessageSquare, label: 'Nexus AI' },
  { id: 'map', icon: Globe, label: 'Cyber Map' },
  { id: 'history', icon: History, label: 'History' },
];

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [time, setTime] = useState('');
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [threats, setThreats] = useState([]);
  const [simulating, setSimulating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [toasts, setToasts] = useState([]);
  const lastProcessedIdRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchHealth(), fetchStats(), fetchThreats()]);
      setTimeout(() => setLoading(false), 2000); 
    };
    init();

    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    
    const pollId = setInterval(() => {
      fetchStats();
      fetchThreats();
      fetchHealth();
    }, 3000);

    return () => {
      clearInterval(id);
      clearInterval(pollId);
    };
  }, []);

  // Reset state and refresh data when switching to forensic-heavy tabs
  useEffect(() => {
    if (activeTab === 'overview') {
      setSelectedThreat(null);
      fetchStats();
      fetchThreats();
      fetchHealth();
    } else if (activeTab === 'threats' || activeTab === 'history') {
      setSelectedThreat(null);
    }
  }, [activeTab]);

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
      const newThreats = data.threats || [];
      
      // Notification Logic
      if (newThreats.length > 0) {
        if (!lastProcessedIdRef.current) {
          lastProcessedIdRef.current = newThreats[newThreats.length - 1].id;
        } else {
          // Find threats with IDs "greater" than last processed (assuming sequential TX-XXXX)
          const latest = newThreats.filter(t => t.id > lastProcessedIdRef.current);
          latest.forEach(t => {
            if (t.alert?.severity === 'High' || t.alert?.severity === 'Critical') {
              triggerNotification(t);
            }
          });
          if (latest.length > 0) {
            lastProcessedIdRef.current = latest[latest.length - 1].id;
          }
        }
      }
      
      setThreats(newThreats);
    } catch { setThreats([]); }
  };

  const triggerNotification = (threat) => {
    const newNotif = {
      id: Date.now() + Math.random(),
      threatId: threat.id,
      type: threat.alert?.threat_type,
      severity: threat.alert?.severity,
      time: threat.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setNotifications(prev => [newNotif, ...prev].slice(0, 20));
    
    // Add to toasts
    const toastId = Date.now();
    setToasts(prev => [...prev, { ...newNotif, id: toastId }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 5000);
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
    { key: "L1_Ingestion", label: "L1 Ingest", color: "#f5c542" },
    { key: "L2_Detection", label: "L2 Detect", color: "#ffa600" },
    { key: "L3_Correlation", label: "L3 Correlate", color: "#ff8400" },
    { key: "L4_Output", label: "L4 Output", color: "#ff9d00" },
  ];

  return (
    <div className="scanline grid-bg" style={{ display: 'flex', height: '100vh', overflow: 'hidden', color: '#fff', background: 'transparent' }}>
      <aside style={{
        width: 280,
        borderRight: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(20px)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ padding: '32px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 72, height: 72,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14,
            transition: 'transform 0.3s',
          }}>
            <img src="/icon.png" alt="Nexus AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.2em',
            background: 'linear-gradient(to bottom, #f5c542, #b08d26)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>NEXUS.AI</span>
          <span style={{
            fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.3em', marginTop: 6,
            textTransform: 'uppercase',
          }}>Command Center</span>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`sidebar-tab ${activeTab === item.id ? 'active' : ''}`}>
              <div className="tab-icon"><item.icon size={16} /></div>
              <span style={{
                letterSpacing: '0.12em', textTransform: 'uppercase',
                fontSize: '0.7rem', fontWeight: 600,
              }}>{item.label}</span>
              {activeTab === item.id && (
                <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{
            fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 600, marginBottom: 14,
            fontFamily: 'Orbitron, sans-serif',
          }}>Core Layers</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {layerList.map(l => {
              const status = layers[l.key] || 'offline';
              const color = status === 'active' ? l.color : '#ff3b5c';
              return (
                <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="layer-dot" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <span style={{
                    fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)',
                    fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{l.label}</span>
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.5rem', fontFamily: 'JetBrains Mono, monospace',
                    color, fontWeight: 600, textTransform: 'uppercase',
                  }}>{status}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="glass-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, borderRadius: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(0,212,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.15)',
              fontSize: '0.85rem',
              fontFamily: 'Orbitron, sans-serif',
            }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{
                fontSize: '0.75rem', fontWeight: 700,
                color: '#00d4ff',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{user?.name || 'Admin'}</p>
              <p style={{
                fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>SOC Analyst</p>
            </div>
          </div>
          <button onClick={onLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
            padding: '10px', borderRadius: 10,
            border: '1px solid rgba(255,59,92,0.12)',
            color: '#ff3b5c', background: 'transparent',
            cursor: 'pointer', fontSize: '0.6rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(255,59,92,0.04)'; e.target.style.borderColor = 'rgba(255,59,92,0.25)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,59,92,0.12)'; }}
          >
            <LogOut size={13} /> Disconnect
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <header style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6 }} />
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase', fontWeight: 500,
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {health ? 'System Online' : 'Connecting...'}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.08)', margin: '0 4px' }}>|</span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 500,
              textShadow: '0 0 12px rgba(245,197,66,0.2)',
            }}>{time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={runSimulation} disabled={simulating} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 18px', borderRadius: 10,
              border: '1px solid rgba(0,212,255,0.15)',
              background: simulating ? 'rgba(0,212,255,0.04)' : 'transparent',
              color: '#00d4ff', cursor: 'pointer',
              fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.3s',
              fontFamily: 'Orbitron, sans-serif',
            }}
            onMouseEnter={e => { if (!simulating) e.target.style.background = 'rgba(0,212,255,0.04)'; }}
            onMouseLeave={e => { if (!simulating) e.target.style.background = 'transparent'; }}
            >
              {simulating ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Play size={13} />}
              {simulating ? 'Processing...' : 'Simulate'}
            </button>
            <button onClick={() => { fetchStats(); fetchThreats(); }} style={{
              padding: '8px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'transparent', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
            }}>
              <RefreshCw size={14} />
            </button>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                style={{
                  position: 'relative', padding: 10,
                  border: showNotifMenu ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, background: showNotifMenu ? 'rgba(245,197,66,0.05)' : 'transparent', cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <Bell size={16} color={showNotifMenu ? 'var(--accent)' : "rgba(255,255,255,0.3)"} />
                {notifications.some(n => !n.read) && <span style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 6, height: 6, background: '#ff3b5c',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #ff3b5c',
                }} />}
              </button>

              <AnimatePresence>
                {showNotifMenu && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setShowNotifMenu(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                        width: 320, background: '#0f0f0f',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 16, padding: '20px 0',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        zIndex: 101, overflow: 'hidden'
                      }}
                    >
                      <div style={{ padding: '0 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>NOTIFICATIONS</span>
                         <button 
                          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                          style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '0.55rem', fontWeight: 700, cursor: 'pointer' }}
                         >
                           MARK ALL READ
                         </button>
                      </div>
                      <div style={{ maxHeight: 310, overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                            <Bell size={24} color="rgba(255,255,255,0.05)" style={{ marginBottom: 12 }} />
                            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)' }}>No recent alerts</p>
                          </div>
                        ) : (
                          notifications.map(n => (
                            <div 
                              key={n.id}
                              style={{ 
                                padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)',
                                background: n.read ? 'transparent' : 'rgba(255,255,255,0.02)',
                                display: 'flex', gap: 14, cursor: 'pointer', transition: 'background 0.3s'
                              }}
                              onClick={() => {
                                const threat = threats.find(t => t.id === n.threatId);
                                if (threat) {
                                  setSelectedThreat(threat);
                                  setActiveTab('nexus-ai');
                                }
                                setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                                setShowNotifMenu(false);
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                              onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(255,255,255,0.02)'}
                            >
                              <div style={{ 
                                width: 32, height: 32, borderRadius: 8, background: `${n.severity === 'Critical' ? '#ff3b5c' : '#f5c542'}15`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                border: `1px solid ${n.severity === 'Critical' ? '#ff3b5c' : '#f5c542'}30`
                              }}>
                                <Zap size={14} color={n.severity === 'Critical' ? '#ff3b5c' : '#f5c542'} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                  <span style={{ fontSize: '0.5rem', fontWeight: 800, color: n.severity === 'Critical' ? '#ff3b5c' : '#f5c542' }}>{n.severity}</span>
                                  <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.2)' }}>{n.time}</span>
                                </div>
                                <h4 style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.type}</h4>
                                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>ID: {n.threatId}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                         <button 
                          onClick={() => { setActiveTab('history'); setShowNotifMenu(false); }}
                          style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.55rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em' }}
                         >
                           VIEW ALL HISTORY
                         </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div className="skeleton" style={{ width: 400, height: 48 }} />
                  <div className="skeleton" style={{ width: 300, height: 12 }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} className="skeleton-card" style={{ height: 120 }}>
                      <div className="skeleton" style={{ margin: 20, width: '40%', height: 14 }} />
                      <div className="skeleton" style={{ margin: '0 20px', width: '60%', height: 28 }} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
                   <div className="skeleton-card" style={{ height: 400 }} />
                   <div className="skeleton-card" style={{ height: 400 }} />
                </div>
              </motion.div>
            ) : (
              <>
                {activeTab === 'overview' && <OverviewTab key="ov" stats={stats} threats={threats} isIntelligence={false} selectedThreat={selectedThreat} setSelectedThreat={setSelectedThreat} />}
                {activeTab === 'threats' && <IntelligenceTab key="th" threats={threats} onNavigate={setActiveTab} onSendToAgent={setSelectedThreat} selectedThreat={selectedThreat} />}
                {activeTab === 'nexus-ai' && <NexusAITab key="ai" threats={threats} selectedThreat={selectedThreat} onSelectThreat={setSelectedThreat} />}
                {activeTab === 'map' && <GlobalMapTab key="map" threats={threats} />}
                {activeTab === 'history' && <HistoryTab threats={threats} />}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* NOTIFICATION TOASTS */}
        <div style={{ position: 'fixed', top: 100, right: 32, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none' }}>
           <AnimatePresence>
             {toasts.map(t => (
               <motion.div 
                 key={t.id}
                 initial={{ opacity: 0, x: 50, scale: 0.9 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                 style={{
                   width: 320,
                   background: 'rgba(15,15,15,0.95)',
                   backdropFilter: 'blur(20px)',
                   borderLeft: `4px solid ${t.severity === 'Critical' ? '#ff3b5c' : '#f5c542'}`,
                   borderRight: '1px solid rgba(255,255,255,0.1)',
                   borderTop: '1px solid rgba(255,255,255,0.1)',
                   borderBottom: '1px solid rgba(255,255,255,0.1)',
                   borderRadius: '0 12px 12px 0',
                   padding: 20,
                   boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                   pointerEvents: 'auto',
                   display: 'flex', gap: 16, alignItems: 'flex-start'
                 }}
               >
                 <div style={{ 
                   width: 36, height: 36, borderRadius: 10, background: `${t.severity === 'Critical' ? '#ff3b5c' : '#f5c542'}15`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                 }}>
                   <AlertTriangle size={18} color={t.severity === 'Critical' ? '#ff3b5c' : '#f5c542'} />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                     <span style={{ fontSize: '0.55rem', fontWeight: 800, color: t.severity === 'Critical' ? '#ff3b5c' : '#f5c542', letterSpacing: '0.1em' }}>{t.severity} ALERT</span>
                     <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>{t.time}</span>
                   </div>
                   <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', margin: 0, marginBottom: 4 }}>{t.type}</h4>
                   <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>ID: {t.threatId} detected in neural link.</p>
                 </div>
                 <button onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 4 }}>
                    <X size={14} />
                 </button>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {/* Global Inspector Modal */}
        <AnimatePresence>
          {activeTab === 'overview' && selectedThreat && (
            <ThreatInspector 
              threat={selectedThreat} 
              onClose={() => setSelectedThreat(null)} 
              onExecute={() => setActiveTab('nexus-ai')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function OverviewTab({ stats, threats, isIntelligence, selectedThreat, setSelectedThreat }) {
  const statCards = [
    { label: "Data Throughput", value: stats?.throughput || "—", trend: `${stats?.events_per_sec || 0} evt/s`, icon: Activity, layer: "L1", color: "#f5c542" },
    { label: "Anomaly Count", value: String(stats?.anomaly_count || 0), trend: "Total", icon: AlertTriangle, layer: "L2", color: "#ffa600" },
    { label: "Verified Threats", value: String(stats?.genuine_threats || 0), trend: "Genuine", icon: CheckCircle, layer: "L3", color: "#ff8400" },
    { label: "False Positives", value: String(stats?.false_positives || 0), trend: "Filtered", icon: XCircle, layer: "L4", color: "#ff9d00" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="glass-card stat-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: `${s.color}08`, border: `1px solid ${s.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={18} color={s.color} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 600,
                  color: s.color, letterSpacing: '0.05em',
                }}>{s.trend}</span>
                <span style={{
                  fontSize: '0.48rem', color: 'rgba(255,255,255,0.2)',
                  fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>{s.layer}</span>
              </div>
            </div>
            <p style={{
              fontSize: '0.58rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6,
            }}>{s.label}</p>
            <p style={{
              fontSize: '1.5rem', fontWeight: 800, color: '#fff',
              fontFamily: 'Orbitron, sans-serif',
            }}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={16} color="#00d4ff" />
              <span style={{
                fontSize: '0.65rem', fontWeight: 700,
                color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: 'Orbitron, sans-serif',
              }}>Neural Threat Stream</span>
            </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: '0.55rem', fontWeight: 600,
                  color: '#f5c542', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>Live</span>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#f5c542', boxShadow: '0 0 8px #f5c542, 0 0 16px rgba(245, 197, 66, 0.2)',
                }} />
              </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <ThreatFeed threats={threats} onSelectThreat={setSelectedThreat} selectedId={selectedThreat?.id} expanded={false} />
          </div>
        </div>
        <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 600 }}>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700,
              color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Orbitron, sans-serif',
            }}>ML Platform Analytics</span>
          </div>
           <ThreatStats stats={stats} />
        </div>
      </div>
    </motion.div>
  );
}

function ThreatInspector({ threat, onClose, onExecute }) {
  const isGenuine = threat.alert?.status === 'Genuine';
  const severity = threat.alert?.severity || 'LOW';

  const layers = [
    { 
      label: "Ingestion Pipeline", 
      status: "CAPTURED", 
      detail: "Normalized from cef source stream.",
      subDetail: threat.raw_source ? `RAW_BUF: ${JSON.stringify(threat.raw_source).substring(0,20)}...` : "RAW_BUF: 0xFD2A...",
      icon: Terminal, 
      color: "#00d4ff" 
    },
    { 
      label: "ML Classification", 
      status: "ANALYZED", 
      detail: `Ensemble (XGB+RF) flagged ${threat.alert?.threat_type} signature.`,
      subDetail: `Conf: ${threat.alert?.confidence_score}%`,
      icon: Cpu, 
      color: "#f5c542" 
    },
    { 
      label: "Neural Correlation", 
      status: "CORRELATED", 
      detail: isGenuine ? "Linked: Network -> Endpoint Process" : "Uncorrelated / Noise", 
      subDetail: "Nodes: 57 connected",
      icon: Activity, 
      color: "#a855f7" 
    },
    { 
      label: "Expert Output", 
      status: "STABILIZED", 
      detail: "Playbook generated and injected into operator console.", 
      subDetail: "READY",
      icon: Zap, 
      color: "#00ff88" 
    },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-card"
        style={{
          width: '100%', maxWidth: 1000,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24,
          padding: 48,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{threat.id}</span>
              <span className={`badge ${severity === 'CRITICAL' ? 'badge-critical' : severity === 'HIGH' ? 'badge-high' : 'badge-low'}`}>
                {severity}
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'Orbitron, sans-serif', margin: 0 }}>
              {threat.alert?.threat_type}
            </h1>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', 
              borderRadius: 12, padding: 12, cursor: 'pointer', color: 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64 }}>
          {/* Left: Forensic Path */}
          <div>
            <h3 style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>Neural Forensic Path</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              {layers.map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, minHeight: 110, position: 'relative' }}>
                   {/* Vertical Line */}
                   {i < layers.length - 1 && (
                     <div style={{
                       position: 'absolute', top: 40, left: 19, bottom: 0,
                       width: 2, background: 'rgba(255,255,255,0.05)'
                     }} />
                   )}
                   
                   <div style={{ 
                     width: 40, height: 40, borderRadius: 12, background: `${l.color}15`, 
                     border: `1px solid ${l.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                     flexShrink: 0, zIndex: 1
                   }}>
                     <l.icon size={18} color={l.color} />
                   </div>

                   <div style={{ flex: 1, paddingBottom: 32 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                       <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{l.label}</span>
                       <span style={{ fontSize: '0.5rem', fontWeight: 800, color: l.color, letterSpacing: '0.05em' }}>{l.status}</span>
                     </div>
                     <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px 0' }}>{l.detail}</p>
                     <div style={{ 
                       background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: 4, 
                       fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace'
                     }}>
                       {l.subDetail}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tactical Playbook */}
          <div>
            <h3 style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>Tactical Playbook</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {(threat.playbook || ["ISOLATE SOURCE", "RE-ROUTE TRAFFIC", "CAPTURE TELEMETRY", "NOTIFY SYSTEMS"]).map((step, i) => (
                <div key={i} className="glass-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, borderRadius: 16 }}>
                  <div style={{ 
                    width: 20, height: 20, borderRadius: 6, border: '2px solid rgba(0,255,136,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Check size={12} color="#00ff88" style={{ opacity: 0.8 }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>{i + 1}. {step}</span>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>Lockdown protocol initiated...</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onExecute}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: 16,
                background: '#00ff88',
                border: 'none',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.75rem',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                boxShadow: '0 0 30px rgba(0,255,136,0.2)'
              }}
            >
              <CheckCircle size={18} /> Execute All Measures
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color, onClick, disabled }) {
  return (
    <button 
      className="glass-card" 
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 8,
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.05)' : color + '22'}`,
        background: 'rgba(255,255,255,0.02)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = `${color}11`; e.currentTarget.style.borderColor = `${color}44`; } }}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = `${color}22`; } }}
    >
      <Icon size={14} color={disabled ? 'rgba(255,255,255,0.2)' : color} />
      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>{label}</span>
    </button>
  );
}

function IntelligenceTab({ threats, onNavigate, onSendToAgent, selectedThreat }) {
  const handleAgentPush = (threat) => {
    onSendToAgent(threat);
    onNavigate('nexus-ai');
  };

  const majorThreats = (threats || []).filter(t => t.alert?.status === 'Genuine');
  const [leftWidth, setLeftWidth] = useState(40);

  const startResizing = (e) => {
    e.preventDefault();
    const startWidth = leftWidth;
    const startX = e.clientX;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = window.innerWidth - 352;
      const deltaPercent = (deltaX / containerWidth) * 100;
      let newWidth = startWidth + deltaPercent;
      if (newWidth < 20) newWidth = 20;
      if (newWidth > 80) newWidth = 80;
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', height: '100%' }}>
      <div className="glass-card" style={{ width: `calc(${leftWidth}% - 12px)`, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 500, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertTriangle size={16} color="#ff3b5c" />
            <span style={{
              fontSize: '0.65rem', fontWeight: 700,
              color: '#ff3b5c', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Orbitron, sans-serif',
            }}>Critial / Major Threats</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
           <ThreatFeed threats={majorThreats} onSelectThreat={handleAgentPush} selectedId={selectedThreat?.id} expanded={false} />
        </div>
      </div>
      
      <div 
        onMouseDown={startResizing}
        style={{ 
          width: 24, 
          cursor: 'col-resize', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 10
        }}
      >
        <div style={{ 
          width: 4, height: 32, 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: 2, transition: 'background 0.3s' 
        }} 
        onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.4)'}
        onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
        />
      </div>

      <div className="glass-card" style={{ flex: 1, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 500, overflow: 'hidden', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Zap size={16} color="#00d4ff" />
            <span style={{
              fontSize: '0.65rem', fontWeight: 700,
              color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Orbitron, sans-serif',
            }}>All Incoming Real-Time Threats</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: '0.55rem', fontWeight: 600,
              color: '#00ff88', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>Auto-Resolving False Positives</span>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#00ff88', boxShadow: '0 0 8px #00ff88, 0 0 16px rgba(0, 255, 136, 0.2)',
            }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
           <ThreatFeed threats={threats} expanded={false} selectedId={selectedThreat?.id} />
        </div>
      </div>
    </motion.div>
  );
}

function NexusAITab({ threats, selectedThreat, onSelectThreat }) {
  const [leftWidth, setLeftWidth] = useState(50);
  const chatRef = useRef(null);

  const startResizing = (e) => {
    e.preventDefault();
    const startWidth = leftWidth;
    const startX = e.clientX;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = window.innerWidth - 352;
      const deltaPercent = (deltaX / containerWidth) * 100;
      let newWidth = startWidth + deltaPercent;
      if (newWidth < 20) newWidth = 20;
      if (newWidth > 80) newWidth = 80;
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
  };

  const explainThreat = () => {
    if (!selectedThreat || !chatRef.current) return;
    chatRef.current.addMessage('action', `ANALYZING THREAT: ${selectedThreat.id}\n\nType: ${selectedThreat.alert?.threat_type}\nSource: ${selectedThreat.alert?.source}\nSeverity: ${selectedThreat.alert?.severity}\nConfidence: ${selectedThreat.alert?.confidence_score}%\n\nEXPLANATION: ${selectedThreat.explainability}\n\nImpact Assessment: High risk to peripheral nodes. Possible lateral movement detected.`, { actionType: 'Threat Analysis' });
  };

  const simulatePlaybook = () => {
    if (!selectedThreat || !chatRef.current) return;
    
    // Directly generate and download PDF
    generateIncidentPDF(selectedThreat);
    
    // Notify in chat
    chatRef.current.addMessage('action', `TACTICAL SIMULATION COMPLETE\n\nTarget: ${selectedThreat.id}\nStatus: PDF REPORT GENERATED\n\nSimulation results have been compiled and downloaded successfully.`, { actionType: 'Defense Simulation' });
  };

  const defendSystem = () => {
    if (!selectedThreat || !chatRef.current) return;
    chatRef.current.addMessage('action', `⚠ AUTOMATED DEFENSE TRIGGERED: Attempting to neutralize ${selectedThreat.id}...\n\nAction: Isolate Source IP (${selectedThreat.alert?.source})\nStatus: PENDING USER APPROVAL\n\nPlease confirm: Should I proceed with the neutralization of this threat? (Type 'Approve' or 'Reject')`, { actionType: 'Threat Containment' });
  };

  return (
    <motion.div 
      key="ai" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div className={`glass-card ${selectedThreat ? 'selected-threat-border' : ''}`} style={{ width: `calc(${leftWidth}% - 12px)`, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: selectedThreat ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Radio size={14} className="pulse-text" style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0, letterSpacing: '0.1em', color: 'var(--accent)' }}>LIVE NEURAL STREAM</h3>
            </div>
            {selectedThreat && (
              <button 
                onClick={() => onSelectThreat(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.6rem' }}
              >
                Clear Selection
              </button>
            )}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            <ThreatFeed threats={threats} expanded={true} onSelectThreat={onSelectThreat} selectedId={selectedThreat?.id} />
          </div>
        </div>
        
        <div 
          onMouseDown={startResizing}
          style={{ 
            width: 24, 
            cursor: 'col-resize', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 10
          }}
        >
          <div style={{ 
            width: 4, height: 32, 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: 2, transition: 'background 0.3s' 
          }} 
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          />
        </div>

        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <MessageSquare size={14} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0, letterSpacing: '0.1em', color: 'var(--accent)' }}>NEXUS AI ANALYST</h3>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <AIChat ref={chatRef} />
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em' }}>TACTICAL ACTIONS:</span>
        <div style={{ display: 'flex', gap: 12, flex: 1 }}>
          <ActionButton 
            icon={Shield} 
            label="DEFEND SYSTEM" 
            color="#f5c542" 
            disabled={!selectedThreat} 
            onClick={defendSystem}
          />
          <ActionButton 
            icon={Play} 
            label="EXPLAIN THREAT" 
            color="#ffa600" 
            disabled={!selectedThreat} 
            onClick={explainThreat}
          />
          <ActionButton 
            icon={Zap} 
            label="SIMULATE" 
            color="#ff8400" 
            disabled={!selectedThreat} 
            onClick={simulatePlaybook}
          />

        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(245,197,66,0.05)', border: '1px solid rgba(245,197,66,0.1)', borderRadius: 8 }}>
           <span className="pulse-text" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em' }}>NEURAL LINK: ENCRYPTED</span>
        </div>
      </div>
    </motion.div>
  );
}

function HistoryTab({ threats }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header with Stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, padding: '0 4px' }}>
        <div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '0.1em', margin: 0 }}>THREAT REPOSITORY</h2>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: 6, letterSpacing: '0.05em' }}>ARCHIVE OF NEURAL ANALYSIS & RESPONSE PLAYBOOKS</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
            <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12, border: '1px solid rgba(0,255,136,0.1)' }}>
                <CheckCircle size={14} color="#00ff88" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800, fontFamily: 'Orbitron, sans-serif' }}>{threats.filter(t => t.alert?.status === 'False Positive').length}</span>
                  <span style={{ fontSize: '0.45rem', color: 'rgba(0,255,136,0.6)', fontWeight: 700, letterSpacing: '0.1em' }}>SOLVED</span>
                </div>
            </div>
            <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12, border: '1px solid rgba(255,59,92,0.1)' }}>
                <AlertTriangle size={14} color="#ff3b5c" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800, fontFamily: 'Orbitron, sans-serif' }}>{threats.filter(t => t.alert?.status === 'Genuine').length}</span>
                  <span style={{ fontSize: '0.45rem', color: 'rgba(255,59,92,0.6)', fontWeight: 700, letterSpacing: '0.1em' }}>ACTIVE</span>
                </div>
            </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {threats.length === 0 ? (
          <div className="glass-card" style={{ padding: 80, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 20 }}>
            <History size={48} color="rgba(0,212,255,0.1)" style={{ marginBottom: 20 }} />
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>The neural vault is currently empty.</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>Simulate threats to populate the history.</p>
          </div>
        ) : (
          threats.map((t, i) => (
            <motion.div 
              key={t.id || i} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.05 }}
              className="glass-card history-row" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderLeft: `4px solid ${t.alert?.status === 'Genuine' ? '#ff3b5c' : '#00ff88'}`, 
                borderRadius: 16,
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 120 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>{t.id}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.alert?.threat_type}</span>
                </div>
                
                <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.04)', flexShrink: 0 }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Detection Time</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}><Clock size={12} color="#00d4ff" /> {t.timestamp}</span>
                </div>

                <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.04)', flexShrink: 0 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Certainty</span>
                  <span style={{ fontSize: '0.75rem', color: '#00d4ff', fontWeight: 800, fontFamily: 'Orbitron, sans-serif' }}>{t.alert?.confidence_score}%</span>
                </div>

                <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.04)', flexShrink: 0 }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>System Status</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.alert?.status === 'Genuine' ? '#ff3b5c' : '#00ff88', boxShadow: `0 0 8px ${t.alert?.status === 'Genuine' ? '#ff3b5c' : '#00ff88'}` }} />
                    <span style={{ fontSize: '0.65rem', color: t.alert?.status === 'Genuine' ? '#ff3b5c' : '#00ff88', fontWeight: 800, letterSpacing: '0.05em' }}>{t.alert?.status === 'Genuine' ? 'UNRESOLVED' : 'RESOLVED'}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 'auto' }}>
                <button 
                  onClick={() => generateIncidentPDF(t)}
                  className="download-btn"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', borderRadius: 10,
                    background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)',
                    color: '#00d4ff', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                    letterSpacing: '0.08em'
                  }}
                >
                  <FileText size={16} /> DOWNLOAD INCIDENT REPORT
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function GlobalMapTab({ threats }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -12 }}
      style={{ height: 'calc(100vh - 120px)', minHeight: 600 }}
    >
      <GlobalMap threats={threats} />
    </motion.div>
  );
}
