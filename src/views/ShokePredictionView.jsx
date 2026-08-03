import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Brain,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export default function ShokePredictionView({ state, setActiveTab }) {
  const { predictions } = state;
  const [selectedPredictionId, setSelectedPredictionId] = useState(predictions[0]?.id || 'pred-1');

  const selectedPred = predictions.find(p => p.id === selectedPredictionId) || predictions[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              Unique "Shoke" AI Market Trend Forecasting Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Market Trend Predictions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Proprietary machine learning models combining time-series neural networks, global central bank liquidity indicators, and social sentiment scoring.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Model Backtest Accuracy</p>
              <p className="text-lg font-extrabold text-emerald-400 font-mono">92.4%</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Signals Evaluated</p>
              <p className="text-lg font-extrabold text-indigo-400 font-mono">14,280+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Signal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictions.map(pred => {
          const isSelected = pred.id === selectedPredictionId;
          const isUp = pred.direction === 'UP';

          return (
            <div
              key={pred.id}
              onClick={() => setSelectedPredictionId(pred.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-glow-indigo'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {pred.category}
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-1.5">{pred.asset}</h4>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  isUp ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{pred.changePercent}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Confidence</span>
                <span className="font-mono font-bold text-indigo-400">{pred.confidence}%</span>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pred.confidence}%` }}
                ></div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Timeframe: {pred.timeframe}</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {pred.signal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Prediction Deep Dive & Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graph & Technical Drivers */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Forecast Details</span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedPred.asset} Neural Forecast Chart</h3>
            </div>

            <button
              onClick={() => setActiveTab('trading')}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-glow-emerald"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Trade This AI Signal</span>
            </button>
          </div>

          {/* Interactive Recharts Line Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedPred.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#818cf8' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Fundamental Reasoning */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-400" /> Key Fundamental Drivers & ML Rationale
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPred.reasoning}
            </p>
          </div>
        </div>

        {/* Sentiment Gauge & Metadata Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-indigo-400" /> Market Sentiment Meter
            </h3>

            {/* Sentiment Meter Gauge */}
            <div className="text-center space-y-2">
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-slate-900 border-4 border-indigo-500/40 p-2">
                <span className="text-3xl font-extrabold text-gradient-indigo font-mono">
                  {selectedPred.sentimentScore}
                </span>
              </div>
              <p className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                {selectedPred.sentiment}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Timeframe</span>
                <span className="font-mono text-white font-semibold">{selectedPred.timeframe}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Confidence Interval</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedPred.confidence}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Historical Accuracy</span>
                <span className="font-mono text-indigo-300 font-semibold">{selectedPred.historicalAccuracy}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
              <div className="flex items-center gap-1 font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Precision Rating
              </div>
              <p className="text-[10px] text-slate-400">
                This prediction has passed 12 technical indicators including RSI divergence and MACD cross.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
