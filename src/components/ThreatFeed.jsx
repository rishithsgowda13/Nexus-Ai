"use client";
import React from 'react';
import { ShieldAlert, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

const ThreatFeed = () => {
  const threats = [
    {
      id: 'TX-9421',
      source: '192.168.1.105',
      type: 'SQL Injection Attempt',
      mlScore: 0.98,
      status: 'Genuine',
      time: '2 mins ago',
      severity: 'Critical'
    },
    {
      id: 'TX-9420',
      source: '10.0.4.12',
      type: 'Brute Force SSH',
      mlScore: 0.12,
      status: 'False Positive',
      time: '5 mins ago',
      severity: 'Low'
    },
    {
      id: 'TX-9419',
      source: 'Internal Scanner',
      type: 'Port Scan Detection',
      mlScore: 0.05,
      status: 'False Positive',
      time: '12 mins ago',
      severity: 'Info'
    },
    {
      id: 'TX-9418',
      source: '213.44.12.9',
      type: 'XSS Payload Detected',
      mlScore: 0.89,
      status: 'Genuine',
      time: '18 mins ago',
      severity: 'High'
    },
    {
      id: 'TX-9417',
      source: '45.12.1.22',
      type: 'DDoS Pattern Recognized',
      mlScore: 0.95,
      status: 'Genuine',
      time: '24 mins ago',
      severity: 'Critical'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
      {threats.map((threat) => (
        <div key={threat.id} className="group p-5 bg-white-5 hover:bg-white-10 border border-white-5 rounded-2xl transition-all flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-xl ${
              threat.status === 'Genuine' ? 'bg-danger-20 text-danger' : 'bg-success-20 text-success'
            }`}>
              {threat.status === 'Genuine' ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">{threat.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold text-white uppercase tracking-wider ${
                  threat.status === 'Genuine' ? 'bg-danger' : 'bg-accent text-black'
                }`}>
                  {threat.severity}
                </span>
                <span className="text-xs text-accent font-bold uppercase tracking-widest bg-accent-5 px-2 py-0.5">ML {Math.round(threat.mlScore * 100)}% Match</span>
              </div>
              <p className="font-bold text-lg mt-1 tracking-tight text-white">{threat.type}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary font-medium">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent" /> {threat.time}</span>
                <span className="w-1 h-1 bg-white-10 rounded-full"></span>
                <span>ORIGIN: {threat.source}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className={`text-xs font-black tracking-widest ${
              threat.status === 'Genuine' ? 'text-danger' : 'text-success'
            }`}>
              {threat.status.toUpperCase()}
            </div>
            <button className="p-2 bg-white-5 rounded-lg hover:bg-accent hover:text-black transition-all border-none cursor-pointer">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreatFeed;
