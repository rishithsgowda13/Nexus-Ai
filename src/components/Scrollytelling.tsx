import React from 'react';
import { 
  ShieldAlert, Cpu, Zap, 
  ShieldCheck, ChevronDown, 
  Layers, Terminal, Globe,
  AlertTriangle, Target, Activity,
  Users, Calendar, CheckCircle2
} from 'lucide-react';

const Scrollytelling: React.FC = () => {
  return (
    <>
      {/* Slide 1: Hero */}
      <section className="scrolly-section">
        <div className="scrolly-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', top: '40px', left: 0, padding: '0 40px', fontSize: '12px', color: 'var(--accent-gold)', opacity: 0.6, letterSpacing: '2px' }}>
            <span>● SYSTEM STATUS: ONLINE</span>
            <span>NEXUS.AI V1.0</span>
          </div>
          
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '20px', border: '1px solid var(--accent-gold)', borderRadius: '12px' }}>
              <ShieldAlert size={40} color="var(--accent-gold)" />
            </div>
          </div>
          
          <h1 className="logo-text" style={{ fontSize: '4rem', color: 'var(--accent-gold)', marginBottom: '10px' }}>NEXUS<span style={{ color: '#fff' }}>.AI</span></h1>
          <p style={{ letterSpacing: '4px', fontSize: '14px', marginBottom: '40px', opacity: 0.8 }}>THREAT DETECTION & SIMULATION</p>
          
          <h2 className="scrolly-title" style={{ fontSize: '3rem' }}>AI-Driven Threat Detection & Simulation Engine</h2>
          
          <div className="slide-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '900px', margin: '40px auto' }}>
            <div className="slide-card" style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '14px', marginBottom: '8px' }}>DETECT</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Multi-layer threat discovery</p>
            </div>
            <div className="slide-card" style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '14px', marginBottom: '8px' }}>EXPLAIN</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Reasoning behind alerts</p>
            </div>
            <div className="slide-card" style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '14px', marginBottom: '8px' }}>SIMULATE</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Future attack scenarios</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', padding: '20px', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <div>
              <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px' }}>TEAM NAME</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Tech Nexus</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(212, 175, 55, 0.2)' }}></div>
            <div>
              <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px' }}>HACKATHON NAME</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Hack Malenadu '26</p>
            </div>
          </div>
          
          <div className="scroll-indicator">
            <ChevronDown size={24} color="var(--accent-gold)" />
          </div>
        </div>
      </section>

      {/* Slide 2: The Problem */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● PROBLEM FIT & MARKET NEED</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>The <span style={{ color: 'var(--accent-gold)' }}>Problem</span></h2>
          <p className="scrolly-subtitle" style={{ marginLeft: 0 }}>SOC teams are drowning in alert volume without enough context.</p>
          
          <div className="slide-grid" style={{ gridTemplateColumns: '1fr 1fr 1.5fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="slide-card">
                <h3 style={{ fontSize: '2rem' }}>10,000+</h3>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Alerts per day</p>
                <div style={{ height: '4px', background: 'rgba(212, 175, 55, 0.1)', marginTop: '10px', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '80%', background: 'var(--accent-gold)' }}></div>
                </div>
                <p style={{ fontSize: '10px', color: 'var(--accent-gold)', marginTop: '5px' }}>High alert volume</p>
              </div>
              <div className="slide-card">
                <h3 style={{ fontSize: '2rem' }}>Zero-day</h3>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Blind spot for signatures</p>
                <div style={{ height: '4px', background: 'rgba(212, 175, 55, 0.1)', marginTop: '10px', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '60%', background: '#ffb86c' }}></div>
                </div>
                <p style={{ fontSize: '10px', color: '#ffb86c', marginTop: '5px' }}>Missed novel threats</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="slide-card">
                <h3 style={{ fontSize: '2rem' }}>60–70%</h3>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>False positives</p>
                <div style={{ height: '4px', background: 'rgba(212, 175, 55, 0.1)', marginTop: '10px', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '70%', background: 'var(--status-critical)' }}></div>
                </div>
                <p style={{ fontSize: '10px', color: 'var(--status-critical)', marginTop: '5px' }}>Analyst fatigue</p>
              </div>
              <div className="slide-card">
                <h3 style={{ fontSize: '2rem' }}>Rule-based</h3>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Legacy detection logic</p>
                <div style={{ height: '4px', background: 'rgba(212, 175, 55, 0.1)', marginTop: '10px', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '40%', background: 'var(--status-critical)' }}></div>
                </div>
                <p style={{ fontSize: '10px', color: 'var(--status-critical)', marginTop: '5px' }}>Weak against APT patterns</p>
              </div>
            </div>

            <div className="slide-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Market Need</h4>
              <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                <div>
                  <h3 style={{ fontSize: '2.5rem' }}>$200B+</h3>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>Cybersecurity market</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '2.5rem' }}>~30%</h3>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>XDR CAGR</p>
                </div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', borderLeft: '2px solid var(--accent-gold)' }}>
                <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '10px' }}>Growth pressure on modern SOC tooling</p>
                <div style={{ height: '2px', background: 'rgba(212, 175, 55, 0.1)' }}>
                  <div style={{ height: '100%', width: '85%', background: 'var(--accent-gold)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: Market Context (New) */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● 1.3 MARKET CONTEXT</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>Market <span style={{ color: 'var(--accent-gold)' }}>Context</span></h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            <div className="slide-card" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', padding: '25px', background: 'rgba(212, 175, 55, 0.03)' }}>
              <h4 style={{ color: 'var(--accent-gold)' }}>Market Size</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
                The global XDR (Extended Detection & Response) market is projected to exceed <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>$2.5 billion by 2027</span>, growing at <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>19%+ CAGR</span>.
              </p>
            </div>
            
            <div className="slide-card" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', padding: '25px' }}>
              <h4 style={{ color: '#ff5555' }}>Key Gap</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.7 }}>
                Existing tools (Splunk, CrowdStrike, SentinelOne) offer detection but <span style={{ color: '#ff5555' }}>lack native explainability (XAI)</span> and built-in simulation.
              </p>
            </div>

            <div className="slide-card" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', padding: '25px', border: '1px solid var(--accent-gold)' }}>
              <h4 style={{ color: 'var(--accent-gold)' }}>Our Differentiation</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Nexus.AI XDR</span> is the only system that detects, explains in plain English, and self-validates through red-team simulation in one unified engine.
              </p>
            </div>

            <div className="slide-card" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', padding: '25px' }}>
              <h4 style={{ color: 'var(--accent-cyan)' }}>Use Case Focus</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.7 }}>
                Enterprise network security monitoring — specifically targeting the <span style={{ color: 'var(--accent-cyan)' }}>4 most common and damaging threat categories</span> mapped to MITRE ATT&CK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Our Approach */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● USE CASE & SOLUTION</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 className="scrolly-title" style={{ textAlign: 'left', margin: 0 }}>Our <span style={{ color: 'var(--accent-gold)' }}>Approach</span></h2>
              <p style={{ fontSize: '18px', opacity: 0.6 }}>Use case: Enterprise SOC monitoring</p>
            </div>
            <div style={{ padding: '8px 16px', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', fontSize: '12px' }}>
              Focus: Mentor Round 1
            </div>
          </div>

          <div className="slide-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="slide-card">
              <p style={{ color: 'var(--accent-gold)', fontSize: '10px', letterSpacing: '1px', marginBottom: '10px' }}>DETECT</p>
              <h3 style={{ marginBottom: '15px' }}>Detect</h3>
              <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: '1.6', marginBottom: '20px' }}>
                Identify threats across network, endpoint, and application layers in real time.
              </p>
              <p style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>Cross-layer visibility</p>
              <div style={{ height: '2px', background: 'var(--accent-gold)', marginTop: '5px' }}></div>
            </div>
            <div className="slide-card">
              <p style={{ color: 'var(--accent-gold)', fontSize: '10px', letterSpacing: '1px', marginBottom: '10px' }}>EXPLAIN</p>
              <h3 style={{ marginBottom: '15px' }}>Explain</h3>
              <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: '1.6', marginBottom: '20px' }}>
                Show why an alert fired using evidence, context, and AI-assisted reasoning.
              </p>
              <p style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>Analyst-ready evidence</p>
              <div style={{ height: '2px', background: 'var(--accent-gold)', marginTop: '5px' }}></div>
            </div>
            <div className="slide-card">
              <p style={{ color: 'var(--accent-gold)', fontSize: '10px', letterSpacing: '1px', marginBottom: '10px' }}>SIMULATE</p>
              <h3 style={{ marginBottom: '15px' }}>Simulate</h3>
              <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: '1.6', marginBottom: '20px' }}>
                Project possible next steps of an attack to support proactive defense planning.
              </p>
              <p style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>Prevention-oriented</p>
              <div style={{ height: '2px', background: 'var(--accent-gold)', marginTop: '5px' }}></div>
            </div>
          </div>

          <div className="slide-card" style={{ marginTop: '40px', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ margin: 0 }}>Core flow</h4>
              <p style={{ fontSize: '11px', opacity: 0.5 }}>Logs → AI Engine → Detection → Explanation → Simulation</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Logs</p>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>Network + Endpoint</p>
              </div>
              <div style={{ padding: '0 10px', opacity: 0.3 }}>→</div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>AI Engine</p>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>Normalization + features</p>
              </div>
              <div style={{ padding: '0 10px', opacity: 0.3 }}>→</div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Detection</p>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>Threat logic</p>
              </div>
              <div style={{ padding: '0 10px', opacity: 0.3 }}>→</div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Explanation</p>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>Context + evidence</p>
              </div>
              <div style={{ padding: '0 10px', opacity: 0.3 }}>→</div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Simulation</p>
                <p style={{ fontSize: '10px', opacity: 0.6 }}>Future scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: System Architecture */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● ARCHITECTURE & TECHNICAL APPROACH</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>System <span style={{ color: 'var(--accent-gold)' }}>Architecture</span></h2>
          <p className="scrolly-subtitle" style={{ marginLeft: 0 }}>Diagram-first view of the technical pipeline</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
                <div className="slide-card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Network Logs</p>
                  <p style={{ fontSize: '9px', opacity: 0.6 }}>Packets / flows</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', opacity: 0.5 }}>+</div>
                <div className="slide-card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Endpoint Logs</p>
                  <p style={{ fontSize: '9px', opacity: 0.6 }}>Sysmon / host events</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', opacity: 0.5 }}>+</div>
                <div className="slide-card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>App Logs</p>
                  <p style={{ fontSize: '9px', opacity: 0.6 }}>Simulated Web/API</p>
                </div>
              </div>
              <div style={{ opacity: 0.3, fontSize: '14px' }}>↓</div>
              <div className="slide-card" style={{ width: '100%', textAlign: 'center', padding: '15px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Data Normalization</p>
                <p style={{ fontSize: '9px', opacity: 0.6 }}>Unified schema + time alignment</p>
              </div>
              <div style={{ opacity: 0.3, fontSize: '14px' }}>↓</div>
              <div className="slide-card" style={{ width: '100%', textAlign: 'center', padding: '15px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Feature Engineering</p>
                <p style={{ fontSize: '9px', opacity: 0.6 }}>Rates, sequences, anomalies, sessions</p>
              </div>
              <div style={{ opacity: 0.3, fontSize: '14px' }}>↓</div>
              <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
                <div className="slide-card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Detection Models</p>
                  <p style={{ fontSize: '9px', opacity: 0.6 }}>Anomaly + pattern-based</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', opacity: 0.5 }}>→</div>
                <div className="slide-card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Correlation Engine</p>
                  <p style={{ fontSize: '9px', opacity: 0.6 }}>Cross-layer aggregation</p>
                </div>
              </div>
              <div style={{ opacity: 0.3, fontSize: '14px' }}>↓</div>
              <div className="slide-card" style={{ width: '100%', textAlign: 'center', padding: '15px', border: '1px solid var(--accent-gold)' }}>
                <p style={{ fontWeight: 'bold', color: 'var(--accent-gold)', fontSize: '14px' }}>Explainability + Simulation</p>
                <p style={{ fontSize: '9px', opacity: 0.6 }}>Evidence + possible next attack steps</p>
              </div>
            </div>

            <div className="slide-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
              <h4 style={{ color: 'var(--accent-gold)' }}>Pipeline Focus</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', padding: 0 }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '6px' }}></div>
                  Multi-source ingestion from network and endpoint layers
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '6px' }}></div>
                  Normalized events make downstream detection consistent
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '6px' }}></div>
                  Hybrid models balance novelty detection and known patterns
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '6px' }}></div>
                  Correlation boosts confidence before escalation
                </li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '6px' }}></div>
                  Explainability keeps analysts in control
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Data Strategy */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● DATA STRATEGY & REALISM</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>Data <span style={{ color: 'var(--accent-gold)' }}>Strategy</span></h2>
          <p className="scrolly-subtitle" style={{ marginLeft: 0 }}>Designed for noisy, real-world security telemetry.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', marginTop: '40px' }}>
            <div className="slide-card">
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Core datasets</h4>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold' }}>CICIDS 2017</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '10px' }}>Network intrusion behaviors for baseline and malicious flow patterns.</p>
                </div>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold' }}>UNSW-NB15</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '10px' }}>Modern network attack categories for robust feature evaluation.</p>
                </div>
              </div>
              <div style={{ padding: '15px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
                <p style={{ fontSize: '13px' }}>Synthetic endpoint logs add host-level realism.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div className="slide-card" style={{ flex: 1 }}>
                  <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '10px' }}>Benign traffic</h4>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>Normal enterprise activity, routine browsing, regular file access, common service communication.</p>
                </div>
                <div className="slide-card" style={{ flex: 1 }}>
                  <h4 style={{ color: '#ffb86c', marginBottom: '10px' }}>Malicious traffic</h4>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>Attack traces for brute force, lateral movement, exfiltration, and beacon-like sessions.</p>
                </div>
              </div>
              <div className="slide-card">
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>False positive scenario</h4>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Admin bulk transfer intentionally resembles exfiltration to test analyst trust and scoring behavior.</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-title)' }}>Designed to handle noisy, real-world data.</p>
            <div style={{ display: 'flex', gap: '40px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>2</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>+ synthetic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Threat Detection Logic */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● DETECTION LOGIC & FEASIBILITY</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>Threat Detection <span style={{ color: 'var(--accent-gold)' }}>Logic</span></h2>
          <p className="scrolly-subtitle" style={{ marginLeft: 0 }}>Cross-layer signals increase confidence and reduce noisy escalation.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', marginTop: '40px' }}>
            <div className="slide-grid" style={{ gridTemplateColumns: '1fr 1fr', margin: 0 }}>
              <div className="slide-card">
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Brute force</h4>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Repeated login failures, velocity spikes, and repeated auth attempts.</p>
              </div>
              <div className="slide-card">
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Lateral movement</h4>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Unusual internal traffic, unexpected host-to-host access, privilege spread.</p>
              </div>
              <div className="slide-card">
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Data exfiltration</h4>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Large outbound transfers, atypical destinations, bursty transfer behavior.</p>
              </div>
              <div className="slide-card">
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>C2 beaconing</h4>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Periodic connections, recurring low-volume callbacks, timing regularity.</p>
              </div>
            </div>

            <div className="slide-card">
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Scoring & severity</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                    <span>Confidence</span>
                    <span>0–100</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--accent-gold)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                    <span>Severity</span>
                    <span>Low–High</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ width: '60%', height: '100%', background: '#ffb86c' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                    <span>Correlation</span>
                    <span>Cross-layer</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ width: '90%', height: '100%', background: 'var(--accent-gold)' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '40px', padding: '15px', background: 'rgba(212, 175, 55, 0.05)', borderLeft: '3px solid var(--accent-gold)' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Cross-layer correlation increases accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Execution Plan */}
      <section className="scrolly-section">
        <div className="scrolly-content" style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginBottom: '20px' }}>● EXECUTION PLAN & READINESS</div>
          <h2 className="scrolly-title" style={{ textAlign: 'left' }}>Execution <span style={{ color: 'var(--accent-gold)' }}>Plan & Readiness</span></h2>
          <p className="scrolly-subtitle" style={{ marginLeft: 0 }}>Focused scope for hackathon delivery.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', marginTop: '40px' }}>
            <div className="slide-card">
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '24px' }}>Team roles</h4>
              <div className="slide-grid" style={{ gridTemplateColumns: '1fr 1fr', margin: 0, gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Data & Ingestion</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '5px' }}>Dataset prep, parsers, flow consolidation</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>ML & Detection</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '5px' }}>Threat logic, scoring, anomaly detection</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Backend</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '5px' }}>Pipelines, APIs, event handling</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Dashboard</p>
                  <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '5px' }}>Analyst UI, alerts, explainability views</p>
                </div>
              </div>
            </div>

            <div className="slide-card">
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '24px' }}>Hackathon timeline</h4>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderTop: '2px solid var(--accent-gold)' }}>
                  <p style={{ fontSize: '10px', opacity: 0.4 }}>PHASE 1</p>
                  <p style={{ fontWeight: 'bold', color: 'var(--accent-gold)', margin: '5px 0' }}>Data + ingestion</p>
                  <p style={{ fontSize: '11px', opacity: 0.6 }}>Load datasets, create schemas, normalize logs, prepare test inputs.</p>
                </div>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderTop: '2px solid var(--accent-gold)' }}>
                  <p style={{ fontSize: '10px', opacity: 0.4 }}>PHASE 2</p>
                  <p style={{ fontWeight: 'bold', color: 'var(--accent-gold)', margin: '5px 0' }}>Detection logic</p>
                  <p style={{ fontSize: '11px', opacity: 0.6 }}>Implement rules, anomaly features, confidence scoring, and correlation.</p>
                </div>
                <div style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderTop: '2px solid var(--accent-gold)' }}>
                  <p style={{ fontSize: '10px', opacity: 0.4 }}>PHASE 3</p>
                  <p style={{ fontWeight: 'bold', color: 'var(--accent-gold)', margin: '5px 0' }}>Integration + UI</p>
                  <p style={{ fontSize: '11px', opacity: 0.6 }}>Connect backend outputs to the dashboard and demo analyst workflow.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(80, 250, 123, 0.05)', borderRadius: '8px', border: '1px solid rgba(80, 250, 123, 0.2)', borderLeft: '4px solid var(--accent-cyan)' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Focused, feasible, and implementable within hackathon time.</p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button 
              className="action-btn" 
              style={{ padding: '16px 40px', fontSize: '1.2rem', background: 'var(--accent-gold)', border: 'none', color: '#000' }}
              onClick={() => document.querySelector('.app-container')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ShieldCheck size={24} />
              Launch Live Simulation
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Scrollytelling;
