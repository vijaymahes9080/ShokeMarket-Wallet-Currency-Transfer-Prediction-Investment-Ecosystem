import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldCheck,
  Zap,
  HelpCircle,
  Brain
} from 'lucide-react';
import { shokeState } from '../services/api';

export default function AIAdvisorView({ state }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '👋 Hello Vijay! I am your **Shoke AI Financial Advisor**. How can I help optimize your multi-currency wallet, FX transfers, or startup investment strategy today?'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');

  const promptChips = [
    'Analyze my portfolio risk & net worth',
    'Predict USD/INR 24h market trend',
    'How do Shoke transfer fees compare to banks?',
    'Recommend top startups to invest in'
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');

    // Generate bot reply
    setTimeout(() => {
      const replyText = shokeState.generateAIChatResponse(text);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: replyText };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" /> Shoke AI Personal Financial Advisor
          </h2>
          <p className="text-xs text-slate-400">
            24/7 intelligent assistant for portfolio optimization, tax calculation estimates, and automated fraud prevention.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
          <span>Model: Shoke-GPT 4.5 FinTech</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chat Thread Panel */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col h-[520px]">
          
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-tr from-indigo-500 to-emerald-400 text-slate-950 font-bold'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="pt-3 border-t border-slate-800 flex overflow-x-auto gap-2 no-scrollbar mb-3">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="text-[11px] font-semibold text-slate-300 bg-slate-900/80 hover:bg-indigo-600/20 hover:text-indigo-300 border border-slate-800 rounded-lg px-3 py-1.5 whitespace-nowrap transition"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="Ask Shoke AI anything about forex, investments, predictions, or tax..."
              className="flex-1 glass-input px-4 py-3 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-glow-indigo"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* AI Financial Health & Risk Assessment */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-400" /> Automated Risk Score Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Currency Spread Risk</span>
                <span className="font-mono text-emerald-400 font-bold">LOW (12%)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[12%]"></div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">Liquidity Coverage</span>
                <span className="font-mono text-indigo-300 font-bold">EXCELLENT (96%)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full w-[96%]"></div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Recommended Action
              </div>
              <p className="text-[10px] text-slate-400">
                Consider converting 10% INR to EUR to capture predicted +0.65% ECB rate appreciation next week.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
