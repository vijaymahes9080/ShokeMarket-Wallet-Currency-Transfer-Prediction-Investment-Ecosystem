import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  PieChart,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StartupHubView({ state, onInvestInStartup }) {
  const { startups, wallet } = state;
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [investAmount, setInvestAmount] = useState('250');
  const [investSuccessMsg, setInvestSuccessMsg] = useState('');

  const handleInvestSubmit = (e) => {
    e.preventDefault();
    if (!selectedStartup) return;
    const amt = parseFloat(investAmount);
    if (isNaN(amt) || amt < selectedStartup.minInvestment) {
      alert(`Minimum investment for ${selectedStartup.name} is $${selectedStartup.minInvestment} USD`);
      return;
    }

    try {
      const { tx, equityShareFormatted } = onInvestInStartup(selectedStartup.id, amt);

      setInvestSuccessMsg(`Investment Confirmed! Allocated ${equityShareFormatted} equity in ${selectedStartup.name} for $${amt} USD.`);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

      setTimeout(() => setInvestSuccessMsg(''), 6000);
      setSelectedStartup(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" /> Startup Equity Investment Marketplace
          </h2>
          <p className="text-xs text-slate-400">
            AngelList-style platform allowing accredited & retail investors to buy equity in high-growth startups starting from $25 USD.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs">
          <span className="text-slate-400 font-semibold px-2">USD Capital:</span>
          <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            ${wallet.USD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {investSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{investSuccessMsg}</span>
        </div>
      )}

      {/* Startups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {startups.map(s => (
          <div key={s.id} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.logo}</span>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  {s.category}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white mt-3">{s.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.tagline}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Valuation Cap</p>
                <p className="font-extrabold font-mono text-white mt-0.5">{s.valuation}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">ARR Growth</p>
                <p className="font-extrabold font-mono text-emerald-400 mt-0.5">{s.cagr}</p>
              </div>
              <div className="mt-2">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Raised</p>
                <p className="font-bold text-slate-300 mt-0.5">{s.raised}</p>
              </div>
              <div className="mt-2">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Min Invest</p>
                <p className="font-bold font-mono text-indigo-400 mt-0.5">${s.minInvestment} USD</p>
              </div>
            </div>

            {/* Pitch Summary & Founders */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                {s.founders.map((f, i) => (
                  <span key={i} className="text-xs" title={`${f.name} - ${f.role}`}>
                    {f.avatar} <span className="text-[10px] text-slate-300">{f.name.split(' ')[0]}</span>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{s.pitchSummary}</p>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => { setSelectedStartup(s); setInvestAmount(s.minInvestment.toString()); }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-glow-indigo flex items-center justify-center space-x-1"
              >
                <span>Invest in Deal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Investment & Pitch Deck Modal */}
      {selectedStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedStartup.logo}</span>
                <div>
                  <h3 className="text-base font-extrabold text-white">{selectedStartup.name} Pitch & Equity Terminal</h3>
                  <p className="text-[10px] text-slate-400">{selectedStartup.dealType}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStartup(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Pitch Rationale */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" /> Executive Pitch Rationale
              </h4>
              <p className="text-slate-300 leading-relaxed">{selectedStartup.pitchSummary}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500">ARR Revenue:</span> <span className="font-bold text-white">{selectedStartup.keyMetrics.arr}</span>
                </div>
                <div>
                  <span className="text-slate-500">Monthly Growth:</span> <span className="font-bold text-emerald-400">{selectedStartup.keyMetrics.monthlyGrowth}</span>
                </div>
              </div>
            </div>

            {/* Investment Form */}
            <form onSubmit={handleInvestSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Investment Amount (USD)</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">$</span>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={e => setInvestAmount(e.target.value)}
                    min={selectedStartup.minInvestment}
                    required
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono outline-none focus:border-indigo-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Minimum check size: ${selectedStartup.minInvestment} USD</p>
              </div>

              {/* Dynamic Equity Simulator */}
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                <div className="flex justify-between font-bold text-indigo-300">
                  <span>Estimated Equity Allocation:</span>
                  <span className="font-mono text-emerald-400">
                    {(((parseFloat(investAmount) || 0) / selectedStartup.targetValuationRaw) * 100).toFixed(4)}%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  SAFE Agreement backed by SEC Regulation CF compliance simulation.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-glow-indigo"
              >
                Confirm Equity Investment
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
