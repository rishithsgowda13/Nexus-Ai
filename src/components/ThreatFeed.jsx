"use client";
import { ShieldAlert, ShieldCheck, Clock, ExternalLink, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const sevClass = { Critical: 'badge-critical', High: 'badge-high', Medium: 'badge-high', Low: 'badge-low', Info: 'badge-info' };

export default function ThreatFeed({ threats = [], expanded = false, onSelectThreat, selectedId }) {

  if (threats.length === 0) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ShieldCheck size={28} color="rgba(255,255,255,0.15)" />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>No threats detected yet</p>
        <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.15)', textAlign: 'center', lineHeight: 1.6 }}>
          Click <strong style={{ color: '#00d4ff' }}>"Simulate"</strong> to process sample logs through the 4-layer pipeline
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {threats.map((t, i) => {
        const alert = t.alert || {};
        const sev = alert.severity || 'Info';
        const isGenuine = alert.status === 'Genuine';
        const isSelected = selectedId && t.id === selectedId;

        return (
          <motion.div
            key={t.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`threat-row ${isSelected ? 'selected-row-active' : ''}`}
            onClick={() => onSelectThreat && onSelectThreat(t)}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              cursor: onSelectThreat ? 'pointer' : 'default',
              padding: isSelected ? '16px' : '0',
              background: isSelected ? 'rgba(245, 197, 66, 0.05)' : 'transparent',
              borderRadius: isSelected ? '12px' : '0',
              border: isSelected ? '1px solid rgba(245, 197, 66, 0.2)' : '1px solid transparent',
              boxShadow: isSelected ? '0 0 25px rgba(245, 197, 66, 0.08)' : 'none',
              transition: 'all 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isGenuine ? 'rgba(255,59,92,0.05)' : 'rgba(0,255,136,0.03)',
                  border: `1px solid ${isGenuine ? 'rgba(255,59,92,0.1)' : 'rgba(0,255,136,0.08)'}`,
                  flexShrink: 0
                }}>
                  {isGenuine ? <ShieldAlert size={20} color="#ff3b5c" /> : <ShieldCheck size={20} color="#00ff88" />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
                    }}>{t.id}</span>
                    <span className={`badge ${sevClass[sev] || 'badge-info'}`}>{sev}</span>
                    {sev === 'Critical' && (
                      <span style={{
                        fontSize: '0.55rem', fontWeight: 800, color: '#ff3b5c',
                        background: 'rgba(255,59,92,0.1)', padding: '2px 8px', borderRadius: 4,
                        border: '1px solid rgba(255,59,92,0.2)',
                        display: 'flex', alignItems: 'center', gap: 4
                      }}>
                        SEVERITY: 98.4%
                      </span>
                    )}
                    <span style={{
                      fontSize: '0.55rem', fontWeight: 600, color: '#00d4ff',
                      background: 'rgba(0,212,255,0.05)', padding: '2px 8px', borderRadius: 4,
                      border: '1px solid rgba(0,212,255,0.08)',
                    }}>
                      ML {alert.confidence_score || 0}%
                    </span>
                    <span style={{
                      fontSize: '0.50rem', color: sev === 'Critical' ? '#ff3b5c' : 'rgba(255,255,255,0.25)',
                      background: sev === 'Critical' ? 'rgba(255,59,92,0.05)' : 'rgba(255,255,255,0.02)',
                      padding: '2px 6px', borderRadius: 4,
                      border: sev === 'Critical' ? '1px solid rgba(255,59,92,0.2)' : '1px solid rgba(255,255,255,0.04)',
                      fontWeight: sev === 'Critical' ? 700 : 400
                    }}>
                      SENSOR: {t.raw_source?.toString().toUpperCase() || 'UNKNOWN'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{alert.threat_type || 'Unknown'}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} color="#00d4ff" /> {t.timestamp}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                    <span>{alert.source || 'N/A'}</span>

                  </div>
                </div>
              </div>

              {expanded && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span className={`badge ${isGenuine ? 'badge-genuine' : 'badge-fp'}`} style={{ padding: '4px 12px' }}>
                    {alert.status}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                    {t.playbook && t.playbook.length > 0 && (
                      <span style={{
                        fontSize: '0.48rem', color: '#00d4ff', fontWeight: 500,
                        letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {t.playbook.length} STEPS
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Explanation Section */}
            {expanded && t.explainability && (
              <div style={{ 
                marginTop: 16, paddingTop: 16, borderTop: '1px dashed rgba(255,255,255,0.05)',
                fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 
              }}>
                <strong style={{ color: '#a855f7', marginRight: 8, fontSize: '0.65rem', letterSpacing: '0.05em' }}>EXPLANATION:</strong>
                {t.explainability}
              </div>
            )}

            {/* Playbook Section */}
            {expanded && t.playbook && t.playbook.length > 0 && (
              <div style={{ 
                marginTop: 12, padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                <strong style={{ display: 'block', color: '#00d4ff', fontSize: '0.65rem', letterSpacing: '0.1em', marginBottom: 8, fontWeight: 700 }}>
                  RESPONSE PLAYBOOK
                </strong>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {t.playbook.map((step, idx) => (
                    <li key={idx} style={{ 
                      fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 8 
                    }}>
                      <span style={{ color: '#ff3b5c' }}>›</span> {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
