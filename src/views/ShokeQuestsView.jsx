import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Zap,
  CheckCircle2,
  Lock,
  Star,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialQuests } from '../services/questEngine';

export default function ShokeQuestsView({ state }) {
  const [quests, setQuests] = useState(initialQuests);

  const totalXP = quests.reduce((acc, q) => acc + (q.completed ? q.rewardXP : 0), 0);
  const currentLevel = Math.floor(totalXP / 500) + 1;

  const handleClaimQuest = (id) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: true, progress: 100 } : q));
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Gamified Financial Health & Shoke Quests
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Level {currentLevel} VIP Investor ({totalXP} XP)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Complete financial quests to earn XP, unlock zero-fee transfer tiers, and earn exclusive investor badges.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">VIP Status Tier</p>
              <p className="text-lg font-extrabold text-amber-400 font-mono">Gold Level {currentLevel}</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Transfer Fee Perk</p>
              <p className="text-lg font-extrabold text-emerald-400 font-mono">0.20% (-40%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map(q => (
          <div key={q.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {q.badge}
                </span>
                <h4 className="text-base font-extrabold text-white mt-1.5">{q.title}</h4>
              </div>
              <span className="text-xs font-bold text-indigo-400 font-mono bg-indigo-500/10 px-2 py-1 rounded-lg">
                +{q.rewardXP} XP
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{q.description}</p>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>Progress</span>
                <span>{q.progress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${q.completed ? 'bg-emerald-400' : 'bg-amber-500'}`}
                  style={{ width: `${q.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              {q.completed ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Quest Completed
                </span>
              ) : (
                <button
                  onClick={() => handleClaimQuest(q.id)}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md"
                >
                  Complete Quest
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
