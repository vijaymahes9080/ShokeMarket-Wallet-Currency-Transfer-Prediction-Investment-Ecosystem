import React, { useState } from 'react';
import {
  Zap,
  Bell,
  Search,
  User,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Navbar({ netWorthUSD, isDark, toggleDark, activeTab, setActiveTab }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'AI Prediction Alert', msg: 'USD/INR 94% Bullish signal triggered target ₹84.15', time: '5m ago', type: 'ai' },
    { id: 2, title: 'Transfer Completed', msg: '350.00 USD sent to Alex Vance (EUR 322.00)', time: '1h ago', type: 'success' },
    { id: 3, title: 'KYC Verified', msg: 'Tier 3 Global Investor KYC verified successfully', time: '1d ago', type: 'info' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-glow-indigo">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Shoke<span className="text-gradient-indigo">Market</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                  Global
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Real-Time FinTech Ecosystem</p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search currencies, startups, trades, predictions (e.g. USD/INR, NeuroPay)..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
              <span className="absolute right-2.5 top-2.5 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">⌘K</span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            
            {/* Live Net Worth Pill */}
            <div className="hidden lg:flex items-center space-x-2 bg-indigo-950/40 border border-indigo-800/50 rounded-xl px-3 py-1.5">
              <Globe className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              <div className="text-left">
                <p className="text-[10px] font-medium text-indigo-300 uppercase tracking-wider">Net Worth</p>
                <p className="text-xs font-bold font-mono text-emerald-400">
                  ${netWorthUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
              title="Toggle Dark / Light Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
              </button>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-indigo-400" /> Live Alerts & AI Signals
                    </h4>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-semibold">3 New</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/30 transition">
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{n.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill & KYC Status */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 pr-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-white">
                  VK
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-none">Vijay K.</p>
                  <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-2.5 h-2.5" /> Tier 3 KYC
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">Vijay Kumar</p>
                    <p className="text-[10px] text-slate-400">vijay@shokemarket.com</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> KYC Verified Investor
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { setActiveTab('security'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition"
                    >
                      Security & 2FA Settings
                    </button>
                    <button
                      onClick={() => { setActiveTab('wallet'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition"
                    >
                      Manage Multi-Currency Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
