"use client";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, User, Bot, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = "http://localhost:8000";

const AIChat = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'NEXUS Neural Link v2.0 initialized. All 4 layers connected to live backend. Try: "layer status", "simulate", "threat summary"' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useImperativeHandle(ref, () => ({
    addMessage: (role, content, metadata = {}) => {
      setMessages(prev => [...prev, { role, content, ...metadata }]);
    }
  }));

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
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 24, paddingBottom: 20,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            width: 44, height: 44,
            border: '1px solid rgba(245,197,66,0.15)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(245,197,66,0.02)',
            animation: 'glow-border 3s ease-in-out infinite',
          }}>
            <Terminal size={22} color="#f5c542" />
          </div>
          <div>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif', fontWeight: 800,
              fontSize: '0.9rem', color: '#f5c542',
              letterSpacing: '0.15em',
              textShadow: '0 0 15px rgba(245,197,66,0.2)',
            }}>NEXUS NEURAL LINK</h2>
            <p style={{
              fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.2em', fontWeight: 400, textTransform: 'uppercase',
            }}>Connected to Core API • 4-Layer Intelligence</p>
          </div>
          <div style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            background: 'rgba(245,197,66,0.03)',
            border: '1px solid rgba(245,197,66,0.1)',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#f5c542',
              boxShadow: '0 0 6px #f5c542, 0 0 12px rgba(245,197,66,0.2)',
            }} />
            <span style={{
              fontSize: '0.55rem', fontWeight: 600, color: '#f5c542',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>API Live</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingRight: 8 }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isAction = msg.role === 'action';
              const isUser = msg.role === 'user';
              
              if (isAction) {
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    style={{ marginBottom: 8 }}
                  >
                      <div style={{
                        padding: '24px',
                        background: 'rgba(20,20,20,0.4)',
                        backgroundImage: `
                          linear-gradient(rgba(245, 197, 66, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(245, 197, 66, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        border: '1px solid rgba(245,197,66,0.2)',
                        borderRadius: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                      }}>
                        <div style={{
                          position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
                          background: '#f5c542', boxShadow: '0 0 15px rgba(245,197,66,0.6)'
                        }} />
                        {/* Scanner Effect */}
                        <motion.div 
                          animate={{ y: [0, 100, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          style={{
                            position: 'absolute', top: 0, left: 4, right: 0, height: '40px',
                            background: 'linear-gradient(to bottom, transparent, rgba(245,197,66,0.05), transparent)',
                            pointerEvents: 'none'
                          }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ 
                            width: 36, height: 36, borderRadius: 10, background: 'rgba(245,197,66,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(245,197,66,0.2)'
                          }}>
                            <Sparkles size={18} color="#f5c542" />
                          </div>
                          <div>
                            <span style={{ 
                              fontSize: '0.65rem', fontWeight: 800, color: '#f5c542', 
                              letterSpacing: '0.18em', textTransform: 'uppercase',
                              fontFamily: 'Orbitron, sans-serif', display: 'block'
                            }}>
                              {msg.actionType || 'Tactical Intelligence'}
                            </span>
                            <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>NEURAL LINK: VERIFIED RESPONSE</span>
                          </div>
                        </div>
                        <p style={{
                          fontSize: '0.78rem',
                          lineHeight: 1.7,
                          color: '#fff',
                          whiteSpace: 'pre-line',
                          fontFamily: 'JetBrains Mono, monospace',
                          margin: 0,
                          padding: '0 4px',
                          textShadow: '0 0 10px rgba(0,0,0,0.5)'
                        }}>
                          {msg.content}
                        </p>
                      </div>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{ display: 'flex', gap: 12, maxWidth: '85%', flexDirection: isUser ? 'row-reverse' : 'row' }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      background: isUser
                        ? 'linear-gradient(135deg, #f5c542, #b08d26)'
                        : 'rgba(255,255,255,0.02)',
                      border: isUser ? 'none' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: isUser ? '0 0 15px rgba(245,197,66,0.2)' : 'none',
                    }}>
                      {isUser
                        ? <User size={16} color="#000" />
                        : <Bot size={16} color="#f5c542" />
                      }
                    </div>
                    <div style={{
                      padding: '16px 20px', borderRadius: 16,
                      background: isUser
                        ? 'rgba(245,197,66,0.04)'
                        : 'rgba(255,255,255,0.015)',
                      border: `1px solid ${isUser
                        ? 'rgba(245,197,66,0.1)'
                        : 'rgba(255,255,255,0.04)'}`,
                    }}>
                      <p style={{
                        fontSize: isUser ? '0.82rem' : '0.8rem',
                        lineHeight: 1.8,
                        color: isUser ? '#fff' : 'rgba(255,255,255,0.65)',
                        whiteSpace: 'pre-line',
                        fontFamily: !isUser ? 'JetBrains Mono, monospace' : 'inherit',
                        margin: 0
                      }}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={16} color="#00d4ff" />
                </div>
                <div style={{
                  padding: '14px 20px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#f5c542',
                      animation: `pulse 1.4s ${d * 0.2}s infinite`,
                    }} />
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
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: '18px 80px 18px 24px',
            fontSize: '0.82rem', color: '#fff',
            outline: 'none', transition: 'all 0.3s',
            fontFamily: 'Inter, sans-serif',
            backdropFilter: 'blur(12px)',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(245,197,66,0.2)';
            e.target.style.boxShadow = '0 0 20px rgba(245,197,66,0.03)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.06)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button type="submit" style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          background: 'linear-gradient(135deg, #f5c542, #b08d26)',
          border: 'none', borderRadius: 10,
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(245,197,66,0.2)',
          transition: 'all 0.3s',
        }}>
          <Send size={18} color="#000" />
        </button>
      </form>
    </div>
  );
});

export default AIChat;

