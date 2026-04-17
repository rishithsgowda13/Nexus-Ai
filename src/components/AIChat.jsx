"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "INTELLIGENCE SYSTEMS INITIALIZED. I AM NEXUS PRE-V1. STANDING BY FOR COMMANDS." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "ANALYSIS COMPLETE: LOCAL TOPOLOGY REMAINS WITHIN NOMINAL PARAMETERS.";
      if (input.toLowerCase().includes('threat')) {
        aiResponse = "INTELLIGENCE SCAN DETECTED: 15% ELEVATION IN ASYMMETRIC ATTACK VECTORS FROM EXTERNAL SUBNETS. RECOMMENDING IMMEDIATE GEOGRAPHIC ISOLATION.";
      } else if (input.toLowerCase().includes('sql')) {
        aiResponse = "ALERT: INJECTION PATTERN RECOGNIZED IN LOG TX-9421. ORIGIN 192.168.1.105 HAS BEEN QUARANTINED BY NEURAL PROTOCOL.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 glass p-8 flex flex-col min-h-0">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white-5">
          <div className="p-3 border border-accent-30 bg-black rounded-xl">
            <Terminal className="text-accent" size={24} />
          </div>
          <div>
            <h2 className="brand-font text-lg tracking-widest text-accent uppercase">Nexus Neural Link</h2>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">Protocol v1.5 [ELITE-SPEC]</p>
          </div>
          <div className="ml-auto p-2 px-4 rounded-lg bg-accent-5 border border-accent-20 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-accent animate-pulse rounded-full"></span>
            <span className="text-xs font-black text-accent tracking-widest uppercase">Encryption Link: ACTIVE</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto mb-8 space-y-8 pr-4 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 rounded-lg ${
                    msg.role === 'user' ? 'border-accent bg-accent text-black' : 'border-white-10 bg-black text-accent'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`p-5 rounded-2xl ${
                    msg.role === 'user' ? 'bg-accent-5 border border-accent-30' : 'bg-black-50 border border-white-5'
                  }`}>
                    <p className={`text-sm leading-relaxed tracking-wider ${msg.role === 'assistant' ? 'font-mono uppercase text-accent' : 'text-white'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="p-4 border border-white-5 bg-black-40 rounded-xl flex gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse [animation-delay:0.4s]"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <form onSubmit={handleSend} className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER SYSTEM COMMAND OR QUERY NEURAL CORE..."
          className="w-full bg-black border border-white-10 rounded-xl p-5 pl-8 pr-24 focus:border-accent transition-all text-xs tracking-widest outline-none text-white uppercase placeholder-white-20 shadow-xl"
        />
        <div className="absolute right-3 top-half translate-y-half">
          <button
            type="submit"
            className="bg-accent text-black p-3 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-gold border-none cursor-pointer"
          >
           <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
