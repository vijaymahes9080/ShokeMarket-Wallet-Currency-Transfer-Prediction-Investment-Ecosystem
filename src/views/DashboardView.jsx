import React from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Building2,
  RefreshCw,
  Zap,
  Globe,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { currencySymbols, currencyFlags } from '../services/mockData';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#8b5cf6'];

export default function DashboardView({ state, setActiveTab, onQuickConvert, onQuickTransfer }) {
  const { wallet, rates, transactions, predictions, user } = state;

  // Calculate Net Worth in USD
  let totalNetWorthUSD = 0;
  const pieData = Object.keys(wallet).map(curr => {
    const amt = wallet[curr];
    const rateToUSD = rates[curr]?.USD || 1.0;
    const usdVal = amt * rateToUSD;
    totalNetWorthUSD += usdVal;
    return { name: curr, value: parseFloat(usdVal.toFixed(2)), rawAmount: amt };
  });

  // Net Worth growth chart mock data
  const growthChartData = [
    { month: 'Jan', netWorth: 18500 },
    { month: 'Feb', netWorth: 21200 },
    { month: 'Mar', netWorth: 24800 },
    { month: 'Apr', netWorth: 23900 },
    { month: 'May', netWorth: 27500 },
    { month: 'Jun', netWorth: 31000 },
    { month: 'Jul', netWorth: 34200 },
    { month: 'Aug', netWorth: totalNetWorthUSD }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-20 top-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Real-Time Global System Online
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient-indigo">Vijay</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Your multi-currency wallet, AI market trend predictions, and startup investment portfolio are performing smoothly.
            </p>
          </div>

          {/* Quick Transfer / Convert Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('transfer')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-glow-indigo"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Send Money Global</span>
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>Convert Currency</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Net Worth */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Net Worth</p>
              <h3 className="text-xl font-extrabold text-white font-mono mt-1">
                ${totalNetWorthUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% this month</span>
            <span className="text-slate-500 font-normal ml-1">vs last month</span>
          </div>
        </div>

        {/* AI Shoke Prediction Signal */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition cursor-pointer" onClick={() => setActiveTab('predictions')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Top AI Signal
              </p>
              <h3 className="text-xl font-extrabold text-white mt-1">USD/INR 🔥</h3>
            </div>
            <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
              94% BUY
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 leading-tight">
            Target <span className="font-mono text-emerald-400 font-bold">₹84.15</span> (+0.85% in 24h)
          </div>
        </div>

        {/* Remittance Fee Savings */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Wise Fee Savings</p>
              <h3 className="text-xl font-extrabold text-emerald-400 font-mono mt-1">$482.50</h3>
            </div>
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Saved on FX spreads vs traditional banks
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Shoke Health Score</p>
              <h3 className="text-xl font-extrabold text-indigo-400 mt-1">{user.healthScore}/100</h3>
            </div>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Excellent risk diversification
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Net Worth Growth Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Portfolio Growth Projection</h3>
              <p className="text-xs text-slate-400">Real-time valuation across all holding currencies</p>
            </div>
            <span className="text-xs font-mono bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-500/20 font-bold">
              USD Equivalent
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Net Worth']}
                />
                <Area type="monotone" dataKey="netWorth" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorNetWorth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Currency Allocation Breakdown (Pie Chart) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Currency Allocation</h3>
            <p className="text-xs text-slate-400 mb-4">Distribution across multi-currency wallets</p>
            
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(val) => [`$${val.toLocaleString()}`, 'USD Value']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {pieData.slice(0, 4).map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="font-semibold text-slate-300">{currencyFlags[item.name]} {item.name}</span>
                </div>
                <span className="font-mono text-slate-400">
                  {currencySymbols[item.name]}{item.rawAmount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Split Row: Recent Activity + AI Shoke Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Ledger Activity */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Recent Transactions</h3>
            <button
              onClick={() => setActiveTab('wallet')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              View Full Ledger →
            </button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 4).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${tx.type === 'Transfer' ? 'bg-indigo-500/10 text-indigo-400' : tx.type === 'Convert' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {tx.type === 'Transfer' ? <ArrowUpRight className="w-4 h-4" /> : tx.type === 'Convert' ? <RefreshCw className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{tx.title}</p>
                    <p className="text-[10px] text-slate-400">{new Date(tx.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold font-mono text-white">
                    {currencySymbols[tx.currency]}{tx.amount.toLocaleString()}
                  </p>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Shoke Prediction Signal Highlights */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Live AI Shoke Signals</h3>
            </div>
            <button
              onClick={() => setActiveTab('predictions')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              Open AI Radar →
            </button>
          </div>

          <div className="space-y-3">
            {predictions.slice(0, 3).map(pred => (
              <div key={pred.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-white">{pred.asset}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">{pred.category}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${pred.signal.includes('BUY') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                    {pred.signal} ({pred.confidence}%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{pred.reasoning}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
