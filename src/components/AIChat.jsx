"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = "http://localhost:8000";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'NEXUS Neural Link v2.0 initialized. All 4 layers connected to live backend. Try: "layer status", "simulate", "threat summary"' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'system', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'system', content: '⚠ Connection to Core API failed. Ensure server.py is running on port 8000.' }]);
    }
    setIsTyping(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
      <div className="glass-card" style={{ flex: 1, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="glow-border-animation" style={{ width: 44, height: 44, border: '1.5px solid rgba(212,175,55,0.25)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
            <Terminal size={22} color="#D4AF37" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1rem', color: '#D4AF37', letterSpacing: '0.15em' }}>NEXUS NEURAL LINK</h2>
            <p style={{ fontSize: '0.58rem', color: '#555', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>Connected to Core API • 4-Layer Intelligence</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 8, background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.12)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
            <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#00ff88', letterSpacing: '0.12em', textTransform: 'uppercase' }}>API Live</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingRight: 8 }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, maxWidth: '80%', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: msg.role === 'user' ? '#D4AF37' : 'rgba(255,255,255,0.04)', border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                    {msg.role === 'user' ? <User size={16} color="#000" /> : <Bot size={16} color="#D4AF37" />}
                  </div>
                  <div style={{ padding: '16px 20px', borderRadius: 16, background: msg.role === 'user' ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${msg.role === 'user' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)'}` }}>
                    <p style={{ fontSize: msg.role === 'system' ? '0.75rem' : '0.82rem', lineHeight: 1.7, color: msg.role === 'user' ? '#fff' : '#ccc', whiteSpace: 'pre-line', fontFamily: msg.role === 'system' ? 'JetBrains Mono, monospace' : 'inherit' }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} color="#D4AF37" />
                </div>
                <div style={{ padding: '14px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', opacity: 0.4, animation: `pulse 1.4s ${d * 0.2}s infinite` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ position: 'relative' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about threats, layers, or type 'simulate' to run live analysis…"
          style={{ width: '100%', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '18px 80px 18px 24px', fontSize: '0.82rem', color: '#fff', outline: 'none', transition: 'all 0.3s', fontFamily: 'Outfit, sans-serif' }}
          onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.3)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
        />
        <button type="submit" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #D4AF37, #B8962E)', border: 'none', borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Send size={18} color="#000" />
        </button>
      </form>
    </div>
  );
}
