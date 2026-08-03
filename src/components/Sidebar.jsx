import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Sparkles,
  TrendingUp,
  Building2,
  Bot,
  ShieldCheck,
  Cpu,
  Link2,
  Trophy,
  Globe,
  Sliders
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Multi-Currency Wallet', icon: Wallet, badge: '6 Currencies' },
    { id: 'transfer', label: 'Money Transfer', icon: ArrowRightLeft, badge: 'Instant' },
    { id: 'predictions', label: 'AI Shoke Predictions', icon: Sparkles, badge: '94% Acc', highlight: true },
    { id: 'quantum', label: 'Quantum Stress Tester', icon: Cpu, badge: '10k Scenarios' },
    { id: 'web3', label: 'Web3 ZK Bridge', icon: Link2, badge: '18.4% APY' },
    { id: 'quests', label: 'VIP Quests & XP', icon: Trophy, badge: 'Level 2' },
    { id: 'sentiment', label: 'Global Sentiment Map', icon: Globe, badge: 'Live NLP' },
    { id: 'algobot', label: 'No-Code Algo Bot', icon: Sliders, badge: 'Automation' },
    { id: 'trading', label: 'Trading Platform', icon: TrendingUp },
    { id: 'startups', label: 'Startup Hub', icon: Building2 },
    { id: 'advisor', label: 'AI Advisor', icon: Bot },
    { id: 'security', label: 'Security & KYC', icon: ShieldCheck }
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800/80 p-4 shrink-0">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          FinTech Super-App Modules
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
    </aside>
  );
}
