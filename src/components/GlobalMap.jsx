"use client";
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const LOCATIONS = [
  { id: 'NYC', lat: 40.7128, lon: -74.0060, name: 'New York', color: '#00d4ff' },
  { id: 'LON', lat: 51.5074, lon: -0.1278, name: 'London', color: '#00d4ff' },
  { id: 'FRA', lat: 50.1109, lon: 8.6821, name: 'Frankfurt', color: '#00d4ff' },
  { id: 'MOS', lat: 55.7558, lon: 37.6173, name: 'Moscow', color: '#ff3b5c' },
  { id: 'BEI', lat: 39.9042, lon: 116.4074, name: 'Beijing', color: '#ff3b5c' },
  { id: 'TOK', lat: 35.6762, lon: 139.6503, name: 'Tokyo', color: '#ff3b5c' },
  { id: 'SYD', lat: -33.8688, lon: 151.2093, name: 'Sydney', color: '#00ff88' },
  { id: 'SAO', lat: -23.5505, lon: -46.6333, name: 'Sao Paulo', color: '#f5c542' },
  { id: 'SIN', lat: 1.3521, lon: 103.8198, name: 'Singapore', color: '#f5c542' },
  { id: 'DEL', lat: 28.6139, lon: 77.2090, name: 'New Delhi', color: '#00d4ff' },
  { id: 'VAL', lat: 37.7749, lon: -122.4194, name: 'Silicon Valley', color: '#00d4ff' },
  { id: 'DUB', lat: 25.2048, lon: 55.2708, name: 'Dubai', color: '#f5c542' },
];

export default function GlobalMap({ threats = [] }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeMarkers = useMemo(() => {
    return threats.map(t => {
      const alert = t.alert || {};
      if (alert.lat && alert.lon) {
        return { ...t, lat: alert.lat, lon: alert.lon };
      }
      return null;
    }).filter(Boolean);
  }, [threats]);

  const [ambientAttacks, setAmbientAttacks] = useState([]);
  
  const generateLeafletAttacks = () => {
    const attacks = [];
    for (let i = 0; i < 6; i++) {
      const from = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      let to = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      while (to.id === from.id) to = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      
      attacks.push({
        id: Math.random().toString(36).substr(2, 9),
        coords: [[from.lat, from.lon], [to.lat, to.lon]],
        color: ['#ff3b5c', '#f5c542', '#00d4ff'][Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.4 + 0.1
      });
    }
    return attacks;
  };

  useEffect(() => {
    setAmbientAttacks(generateLeafletAttacks());
  }, []);

  if (!mounted) return null;

  return (
    <div className="glass-card" style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Map Header Overlay */}
      <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 1000, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff3b5c', boxShadow: '0 0 15px #ff3b5c', display: 'inline-block', opacity: 0.8 }} />
          LIVE CYBER-WAR ACTIVITY
        </h2>
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Real-time GeoIP Detection Link</p>
      </div>

      <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 1000, textAlign: 'right', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 4 }}>TOTAL ATTACKS (24H)</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f5c542', fontFamily: 'Orbitron, sans-serif' }}>1,284,930</p>
          </div>
          <div>
            <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 4 }}>ATTACKS PREVENTED</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00ff88', fontFamily: 'Orbitron, sans-serif' }}>1,142,800</p>
          </div>
          <div>
            <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 4 }}>CRITICAL NODES</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff3b5c', fontFamily: 'Orbitron, sans-serif' }}>42</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', background: '#050505' }}>
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          minZoom={2}
          maxZoom={8}
          style={{ height: '100%', width: '100%', background: '#050505' }}
          zoomControl={false}
          attributionControl={false}
          worldCopyJump={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.35}
            className="map-tiles-grayscale"
          />
          
          {/* Attack Lines (Ambient Simulation) */}
          <AnimatePresence>
            {ambientAttacks.map(attack => (
              <Polyline
                key={attack.id}
                positions={attack.coords}
                pathOptions={{ 
                  color: attack.color, 
                  weight: 1.5, 
                  opacity: 0.6,
                  dashArray: '10, 20',
                  className: 'attack-line-animation'
                }}
              />
            ))}
          </AnimatePresence>

          {/* Static Locations (Sensors) */}
          {LOCATIONS.map(loc => (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lon]}
              radius={4}
              pathOptions={{ fillColor: loc.color, color: loc.color, weight: 1, fillOpacity: 0.4 }}
            >
              <Popup>
                <div style={{ background: '#0a0a0a', color: '#fff', padding: '8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent)' }}>{loc.name}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.65rem', opacity: 0.6 }}>Nexus Sensor Node: {loc.id}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Active Threats */}
          {activeMarkers.map(t => (
            <CircleMarker
              key={t.id}
              center={[t.lat, t.lon]}
              radius={12}
              pathOptions={{ 
                fillColor: '#ff3b5c', 
                color: '#ff3b5c', 
                weight: 2, 
                fillOpacity: 0.2,
                className: 'pulse-animation'
              }}
            >
              <Popup>
                <div style={{ background: '#0a0a0a', color: '#fff', padding: '12px', border: '1px solid rgba(255,59,92,0.3)', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.8rem', color: '#ff3b5c' }}>{t.alert?.threat_type || 'Unknown Threat'}</p>
                  <p style={{ margin: '6px 0 0', fontSize: '0.7rem' }}>{t.id}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.65rem', opacity: 0.5 }}>Confidence: {t.alert?.confidence_score}%</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
