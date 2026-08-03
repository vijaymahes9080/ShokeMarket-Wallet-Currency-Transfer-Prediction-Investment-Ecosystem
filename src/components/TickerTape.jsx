import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TickerTape({ assets, rates }) {
  const items = [
    { label: 'USD/INR', value: `₹${rates.USD?.INR || 83.45}`, change: '+0.34%', up: true },
    { label: 'EUR/USD', value: `$${rates.EUR?.USD || 1.087}`, change: '-0.31%', up: false },
    { label: 'GBP/USD', value: `$${rates.GBP?.USD || 1.265}`, change: '+0.18%', up: true },
    { label: 'USD/JPY', value: `¥${rates.USD?.JPY || 154.20}`, change: '+0.45%', up: true },
    { label: 'BTC/USD', value: `$${assets.find(a => a.symbol === 'BTC/USD')?.price || 66420}`, change: '+2.85%', up: true },
    { label: 'NVDA', value: `$${assets.find(a => a.symbol === 'NVDA')?.price || 129.80}`, change: '+2.73%', up: true },
    { label: 'USD/AED', value: `${rates.USD?.AED || 3.67}`, change: '0.00%', up: true },
  ];

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 py-1.5 px-4 overflow-hidden select-none text-xs">
      <div className="flex items-center space-x-6 animate-shimmer whitespace-nowrap overflow-x-auto no-scrollbar">
        <span className="flex items-center gap-1 font-bold text-indigo-400 uppercase tracking-wider text-[11px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          LIVE MARKET FEED:
        </span>
        {items.map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-2 bg-slate-800/40 px-2.5 py-1 rounded-md border border-slate-700/40">
            <span className="font-semibold text-slate-300">{item.label}</span>
            <span className="font-mono text-slate-100">{item.value}</span>
            <span className={`inline-flex items-center text-[10px] font-semibold px-1 rounded ${item.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
              {item.up ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
