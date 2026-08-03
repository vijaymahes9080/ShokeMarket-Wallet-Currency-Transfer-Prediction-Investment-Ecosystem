import React from 'react';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Radio,
  Zap
} from 'lucide-react';
import { initialNewsSentiment, globalRegionHeatmap } from '../services/sentimentNews';

export default function GlobalSentimentMapView({ state }) {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-3 border border-cyan-500/30">
              <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              Real-Time Geopolitical Market Sentiment Radar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Global News Heatmap & Sentiment
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Natural Language Processing (NLP) sentiment scoring of breaking financial news across global central banks and markets.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs font-bold text-emerald-400">
            <Radio className="w-4 h-4 animate-ping" />
            <span>Streaming Live Financial Wire</span>
          </div>
        </div>
      </div>

      {/* Region Heatmap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {globalRegionHeatmap.map(r => (
          <div key={r.region} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-xs font-bold text-white">{r.region}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-cyan-400">{r.score}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.score > 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                {r.trend}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Dominant Pair: {r.topCurrency}</p>
          </div>
        ))}
      </div>

      {/* Live Financial News Stream */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-cyan-400" /> AI Sentiment Scored News Wire
        </h3>

        <div className="space-y-3">
          {initialNewsSentiment.map(n => (
            <div key={n.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {n.region}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{n.category}</span>
                  <span className="text-[10px] text-slate-500">• {n.timestamp}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{n.headline}</h4>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/30">
                  {n.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
