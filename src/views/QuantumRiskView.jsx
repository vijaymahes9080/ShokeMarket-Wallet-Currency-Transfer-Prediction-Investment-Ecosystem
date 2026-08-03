import React, { useState } from 'react';
import {
  Cpu,
  TrendingUp,
  ShieldAlert,
  Zap,
  Sliders,
  CheckCircle2,
  BarChart2,
  RefreshCw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { runMonteCarloSimulation } from '../services/quantumEngine';

export default function QuantumRiskView({ state }) {
  const [volatility, setVolatility] = useState(0.18);
  const [inflationRate, setInflationRate] = useState(0.035);
  const [interestRate, setInterestRate] = useState(0.045);
  const [simResults, setSimResults] = useState(
    runMonteCarloSimulation({ volatility: 0.18, inflationRate: 0.035, interestRate: 0.045 })
  );

  const handleRecalculate = () => {
    const res = runMonteCarloSimulation({ volatility, inflationRate, interestRate });
    setSimResults(res);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
              <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              Quantum Monte Carlo Engine (10,000 Scenario Iterations)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Macroeconomic Stress Tester
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Simulates portfolio resilience against hyper-inflation, interest rate spikes, and black swan market events over a 5-year forecast horizon.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Portfolio Survival Probability</p>
              <p className="text-xl font-extrabold text-emerald-400 font-mono">{simResults.survivalRate}%</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">5-Yr Median Forecast</p>
              <p className="text-xl font-extrabold text-purple-400 font-mono">${simResults.finalMedian.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Inputs + Forecast Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Panel */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400" /> Macro Shock Parameters
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Market Volatility Index (VIX)</span>
                <span className="font-mono text-purple-400">{(volatility * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.01"
                value={volatility}
                onChange={e => setVolatility(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Global Inflation Rate</span>
                <span className="font-mono text-rose-400">{(inflationRate * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.12"
                step="0.005"
                value={inflationRate}
                onChange={e => setInflationRate(parseFloat(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Fed Benchmark Interest Rate</span>
                <span className="font-mono text-indigo-400">{(interestRate * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.10"
                step="0.005"
                value={interestRate}
                onChange={e => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <button
              onClick={handleRecalculate}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run 10,000 Monte Carlo Iterations</span>
            </button>
          </div>
        </div>

        {/* Fan Chart View */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">5-Year Portfolio Confidence Intervals</h3>
              <p className="text-xs text-slate-400">95th Percentile (Optimistic) vs Median vs 5th Percentile (Pessimistic)</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
              GBM Model Active
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simResults.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="p95Color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="p95" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#p95Color)" name="95th Percentile" />
                <Area type="monotone" dataKey="median" stroke="#6366f1" strokeWidth={3} fill="none" name="Median Forecast" />
                <Area type="monotone" dataKey="p5" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="3 3" fill="none" name="5th Percentile Shock" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
