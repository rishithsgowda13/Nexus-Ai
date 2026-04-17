"use client";
import { ShieldAlert, ShieldCheck, Clock, ExternalLink, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const sevClass = { Critical: 'badge-critical', High: 'badge-high', Medium: 'badge-high', Low: 'badge-low', Info: 'badge-info' };

export default function ThreatFeed({ threats = [] }) {

  if (threats.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <ShieldCheck size={40} color="#333" />
        <p style={{ fontSize: '0.8rem', color: '#444', fontWeight: 600 }}>No threats detected yet</p>
        <p style={{ fontSize: '0.65rem', color: '#333' }}>Click <strong>"Run Simulation"</strong> to process sample logs through the 4-layer pipeline</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {threats.map((t, i) => {
        const alert = t.alert || {};
        const sev = alert.severity || 'Info';
        const isGenuine = alert.status === 'Genuine';

        return (
          <motion.div
            key={t.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="threat-row"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isGenuine ? 'rgba(239,68,68,0.08)' : 'rgba(0,255,136,0.06)' }}>
                {isGenuine ? <ShieldAlert size={20} color="#ef4444" /> : <ShieldCheck size={20} color="#00ff88" />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#555', letterSpacing: '0.1em' }}>{t.id}</span>
                  <span className={`badge ${sevClass[sev] || 'badge-info'}`}>{sev}</span>
                  <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#D4AF37', background: 'rgba(212,175,55,0.08)', padding: '2px 8px', borderRadius: 4 }}>
                    ML {alert.confidence_score || 0}%
                  </span>
                  <span style={{ fontSize: '0.52rem', color: '#555', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: 4 }}>
                    {t.raw_source?.toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{alert.threat_type || 'Unknown'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.68rem', color: '#555' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} color="#D4AF37" /> {t.timestamp}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#333' }} />
                  <span>{alert.source || 'N/A'}</span>
                  {alert.cross_layer_match && (
                    <>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#333' }} />
                      <span style={{ color: '#D4AF37', display: 'flex', alignItems: 'center', gap: 4 }}><Layers size={11} /> {alert.cross_layer_match}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span className={`badge ${isGenuine ? 'badge-genuine' : 'badge-fp'}`} style={{ padding: '4px 12px' }}>
                {alert.status}
              </span>
              {t.playbook && (
                <span style={{ fontSize: '0.5rem', color: '#D4AF37', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {t.playbook.length} STEPS
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
