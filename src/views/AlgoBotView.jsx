import React, { useState } from 'react';
import {
  Bot,
  Play,
  Pause,
  PlusCircle,
  Sliders,
  CheckCircle2,
  Zap,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialAlgoBots } from '../services/algoBotEngine';

export default function AlgoBotView({ state }) {
  const [bots, setBots] = useState(initialAlgoBots);
  const [botName, setBotName] = useState('My Custom Shoke Bot');
  const [pair, setPair] = useState('EUR/USD');
  const [indicator, setIndicator] = useState('RSI < 30');
  const [actionAmount, setActionAmount] = useState('100');

  const toggleBot = (id) => {
    setBots(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : b));
  };

  const handleCreateBot = (e) => {
    e.preventDefault();
    const newBot = {
      id: `bot-${Date.now()}`,
      name: botName,
      pair: pair,
      condition: `IF ${indicator} AND Shoke AI = BUY`,
      action: `BUY $${actionAmount} USD`,
      winRate: '87.5%',
      totalProfit: '+$0.00',
      status: 'ACTIVE'
    };

    setBots(prev => [newBot, ...prev]);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setBotName('My Custom Shoke Bot');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3 border border-rose-500/30">
              <Bot className="w-3.5 h-3.5 text-rose-400" />
              No-Code Algorithmic Trading Bot Builder ("Shoke Flow")
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Automated Algorithmic Bots
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Build rules-based automated trading bots linked to live AI Shoke signals and technical indicators.
            </p>
          </div>
        </div>
      </div>

      {/* Bot Builder + Active Bots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* New Bot Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-rose-400" /> Deploy New Automated Bot
          </h3>

          <form onSubmit={handleCreateBot} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-300">Bot Strategy Name</label>
              <input
                type="text"
                value={botName}
                onChange={e => setBotName(e.target.value)}
                required
                className="w-full mt-1 glass-input px-3 py-2 rounded-xl text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300">Target Asset Pair</label>
              <select
                value={pair}
                onChange={e => setPair(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-2.5 outline-none"
              >
                <option value="USD/INR">USD/INR</option>
                <option value="EUR/USD">EUR/USD</option>
                <option value="BTC/USD">BTC/USD</option>
                <option value="NVDA">NVDA</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300">Technical Condition Trigger</label>
              <select
                value={indicator}
                onChange={e => setIndicator(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-2.5 outline-none"
              >
                <option value="RSI < 30 (Oversold)">RSI &lt; 30 (Oversold)</option>
                <option value="MACD Bullish Cross">MACD Bullish Cross</option>
                <option value="200 MA Support Bounce">200 MA Support Bounce</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300">Order Execution Amount (USD)</label>
              <input
                type="number"
                value={actionAmount}
                onChange={e => setActionAmount(e.target.value)}
                required
                className="w-full mt-1 glass-input px-3 py-2 rounded-xl text-xs text-white outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg flex items-center justify-center space-x-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Deploy Bot Strategy Instantly</span>
            </button>
          </form>
        </div>

        {/* Active Bots Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Active Strategy Bots</h3>
            
            <div className="space-y-3">
              {bots.map(b => (
                <div key={b.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-white">{b.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">{b.pair}</span>
                    </div>
                    <p className="text-[11px] text-indigo-300 mt-1 font-mono">{b.condition} ➔ {b.action}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Win Rate: {b.winRate} | Profit: <span className="text-emerald-400 font-bold">{b.totalProfit}</span></p>
                  </div>

                  <button
                    onClick={() => toggleBot(b.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      b.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {b.status === 'ACTIVE' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{b.status}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
