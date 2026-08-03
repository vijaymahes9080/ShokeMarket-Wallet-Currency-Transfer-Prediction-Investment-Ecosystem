import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Sparkles,
  TrendingUp,
  Building2,
  Bot,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'wallet', label: 'Multi-Currency Wallet', icon: Wallet, badge: '6 Currencies' },
    { id: 'transfer', label: 'Money Transfer', icon: ArrowRightLeft, badge: 'Instant' },
    { id: 'predictions', label: 'AI Shoke Predictions', icon: Sparkles, badge: '94% Acc', highlight: true },
    { id: 'trading', label: 'Trading Platform', icon: TrendingUp, badge: 'Live' },
    { id: 'startups', label: 'Startup Hub', icon: Building2, badge: 'AngelList' },
    { id: 'advisor', label: 'AI Advisor', icon: Bot, badge: '24/7' },
    { id: 'security', label: 'Security & KYC', icon: ShieldCheck, badge: 'Verified' }
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800/80 p-4 shrink-0">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Core Modules
        </p>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-glow-indigo'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.highlight
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Upgrade Banner Card */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-emerald-950/40 border border-indigo-800/40 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="inline-flex p-2 rounded-xl bg-indigo-500/20 text-indigo-400 mb-2">
          <Sparkles className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-white">Shoke Pro Ecosystem</h4>
        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
          Zero-spread transfers, unlimited AI predictions & priority SAFE startup allocations.
        </p>
        <button
          onClick={() => setActiveTab('predictions')}
          className="mt-3 w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition shadow-md"
        >
          Explore Shoke AI Pro
        </button>
      </div>
    </aside>
  );
}
