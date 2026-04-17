import { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, LayoutDashboard, Crosshair, 
  BookOpen, Settings, Bell, Search, User, Filter, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { initialThreats, generateRandomEvent } from './data/mockData';
import type { ThreatAlert } from './data/mockData';
import './index.css';

const App = () => {
  const [threats, setThreats] = useState<ThreatAlert[]>(initialThreats);
  const [selectedThreat, setSelectedThreat] = useState<ThreatAlert | null>(null);
  const [stats, setStats] = useState({ eps: 452, total: 1450230 });

  // Simulate real-time data ingestion
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        eps: Math.floor(Math.random() * 100) + 400,
        total: prev.total + Math.floor(Math.random() * 100) + 400
      }));

      // Occasionally add a new threat
      if (Math.random() > 0.8) {
        // We only show high/critical initially, but random ones can be low/med
        const newThreat = generateRandomEvent() as ThreatAlert;
        setThreats(prev => [newThreat, ...prev].slice(0, 50)); 
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = Array.from({ length: 20 }, (_, i) => ({
    time: `-${20 - i}m`,
    network: Math.floor(Math.random() * 300) + 100,
    endpoint: Math.floor(Math.random() * 200) + 50,
    app: Math.floor(Math.random() * 100) + 20,
  }));

  const getSeverityClass = (sev: string) => {
    switch(sev) {
      case 'Critical': return 'bg-critical';
      case 'High': return 'bg-high';
      case 'Medium': return 'bg-medium';
      case 'Low': return 'bg-low';
      case 'False Positive': return 'bg-fp';
      default: return 'bg-low';
    }
  };

  const criticalCount = threats.filter(t => t.severity === 'Critical').length;
  const highCount = threats.filter(t => t.severity === 'High').length;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel" style={{ borderLeft: 'none', borderTop: 'none', borderBottom: 'none', borderRight: '1px solid var(--panel-border)', borderRadius: 0 }}>
        <div className="logo-container">
          <ShieldAlert size={32} className="logo-icon" />
          <div className="logo-text">NEXUS.AI</div>
        </div>
        
        <div className="nav-item active">
          <LayoutDashboard size={20} />
          <span>SOC Dashboard</span>
        </div>
        <div className="nav-item">
          <Crosshair size={20} />
          <span>Threat Intel</span>
        </div>
        <div className="nav-item">
          <Activity size={20} />
          <span>Simulations</span>
        </div>
        <div className="nav-item">
          <BookOpen size={20} />
          <span>Playbooks</span>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="status-indicator">
            <div className="pulse"></div>
            <span>SYSTEM ONLINE • {stats.eps} EVENTS/SEC</span>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', gap: '8px', borderRadius: '20px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search IPs, Hashes..." 
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '200px' }}
              />
            </div>
            <Bell size={20} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(69, 250, 221, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="var(--accent-cyan)" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Lead Analyst</span>
            </div>
          </div>
        </header>

        <div className="dashboard-scroll">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="glass-panel stat-card">
              <div className="stat-title">Signals Ingested (24h)</div>
              <div className="stat-value">
                {(stats.total / 1000000).toFixed(2)}M
                <span className="stat-trend" style={{ color: '#00d2ff' }}>+12%</span>
              </div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-title">Active Critical Threats</div>
              <div className="stat-value" style={{ color: 'var(--status-critical)' }}>
                {criticalCount}
                <AlertTriangle size={24} color="var(--status-critical)" />
              </div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-title">Active High Threats</div>
              <div className="stat-value" style={{ color: 'var(--status-high)' }}>
                {highCount}
                <Activity size={24} color="var(--status-high)" />
              </div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-title">Auto-Mitigated</div>
              <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>
                1,420
                <ShieldCheck size={24} color="var(--accent-cyan)" />
              </div>
            </div>
          </div>

          {/* Charts Panel */}
          <div className="glass-panel chart-panel">
            <h3 className="panel-title">
              <Activity size={20} color="var(--accent-cyan)" />
              Multi-Layer Signal Correlation
            </h3>
            <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEnd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                  <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ background: 'rgba(11,12,16,0.9)', border: '1px solid rgba(69,250,221,0.3)', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="network" stroke="var(--accent-cyan)" fillOpacity={1} fill="url(#colorNet)" name="Network Logs" />
                  <Area type="monotone" dataKey="endpoint" stroke="var(--accent-purple)" fillOpacity={1} fill="url(#colorEnd)" name="Endpoint Logs" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Threat Feed */}
          <div className="glass-panel feed-panel" style={{ gridRow: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="panel-title" style={{ margin: 0 }}>
                <ShieldAlert size={20} color="var(--status-critical)" />
                Real-Time Threat Feed
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="glass-panel" style={{ padding: '6px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <Filter size={14} /> Filter
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {threats.map((threat) => (
                <div key={threat.id} className="feed-item" onClick={() => setSelectedThreat(threat)}>
                  <div className="feed-header">
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '15px' }}>{threat.category}</span>
                    <span className={`severity-badge ${getSeverityClass(threat.severity)}`}>
                      {threat.severity} ({threat.confidence}%)
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{threat.sourceIp} → {threat.destinationIp}</span>
                    <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    {threat.layers.map(layer => (
                      <span key={layer} className="layer-badge">
                        {layer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Explanation placeholder if no threat selected or small widget */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Activity size={48} color="rgba(69, 250, 221, 0.2)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-muted)' }}>AI Simulation Engine Active</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
              Ingesting network, endpoint, and application signals. Click on a threat in the feed to view AI explainability and response playbooks.
            </p>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedThreat && (
        <div className="detail-modal-bg" onClick={() => setSelectedThreat(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px' }}>
                  {selectedThreat.category}
                  <span className={`severity-badge ${getSeverityClass(selectedThreat.severity)}`} style={{ fontSize: '14px' }}>
                    {selectedThreat.severity} Severity
                  </span>
                </h2>
                <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '14px' }}>
                  Detected at: {new Date(selectedThreat.timestamp).toLocaleString()} | ID: {selectedThreat.id.split('-')[0]}
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedThreat(null)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div>
                <div className="section-title">
                  <Activity size={18} />
                  Context & Explainability
                </div>
                <div className="code-block" style={{ marginBottom: '20px' }}>
                  <span style={{ color: '#fff' }}><strong>AI Analysis:</strong></span><br/><br/>
                  {selectedThreat.explainability || selectedThreat.description}
                  <br/><br/>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <strong>Correlated Layers:</strong>
                    {selectedThreat.layers.map(l => <span key={l} style={{ color: 'var(--accent-cyan)' }}>[{l}]</span>)}
                  </div>
                </div>
                
                <div className="section-title">
                  <ShieldAlert size={18} />
                  Network Trajectory
                </div>
                <div className="glass-panel" style={{ padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#ff2a55' }}>{selectedThreat.sourceIp}</span>
                    <span style={{ color: 'var(--text-muted)' }}>―――➔</span>
                    <span style={{ color: '#00d2ff' }}>{selectedThreat.destinationIp}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="section-title">
                  <BookOpen size={18} />
                  Generated Preventative Playbook
                </div>
                <ul className="playbook-list">
                  {selectedThreat.playbook && selectedThreat.playbook.length > 0 ? (
                    selectedThreat.playbook.map((step, idx) => (
                      <li key={idx} className="playbook-item">
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(157, 78, 221, 0.2)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                          {idx + 1}
                        </div>
                        <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.5, color: '#e2e8f0' }}>
                          {step}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="playbook-item" style={{ borderLeftColor: 'var(--status-fp)' }}>
                      <div style={{ flex: 1, fontSize: '14px', color: 'var(--text-muted)' }}>
                        No specific playbook generated for this generic alert.
                      </div>
                    </li>
                  )}
                </ul>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button className="action-btn" style={{ flex: 1, justifyContent: 'center' }}>
                    <ShieldCheck size={18} />
                    Execute Playbook
                  </button>
                  <button className="action-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                    Isolate Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
