import React, { useState } from 'react';
import {
  Link2,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRightLeft,
  Coins,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialLiquidityPools, zkBridgeTransactions } from '../services/web3Protocol';

export default function Web3BridgeView({ state }) {
  const [pools, setPools] = useState(initialLiquidityPools);
  const [zkShield, setZkShield] = useState(true);
  const [stakeAmount, setStakeAmount] = useState('250');
  const [stakeSuccessMsg, setStakeSuccessMsg] = useState('');

  const handleStake = (poolId) => {
    const amt = parseFloat(stakeAmount);
    if (isNaN(amt) || amt <= 0) return;

    setPools(prev => prev.map(p => {
      if (p.id === poolId) {
        return { ...p, userStaked: p.userStaked + amt };
      }
      return p;
    }));

    setStakeSuccessMsg(`Staked $${amt} USD successfully into liquidity pool! Earning 18.4% APY.`);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    setTimeout(() => setStakeSuccessMsg(''), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
              <Link2 className="w-3.5 h-3.5 text-emerald-400" />
              Web3 Cross-Chain FX Bridge & ZK-Privacy Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Decentralized Liquidity & Bridge
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Stake cross-border FX liquidity tokens, earn automated yield rewards, and bridge assets using Zero-Knowledge proofs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-2 border border-slate-800 rounded-2xl">
            <span className="text-xs font-bold text-slate-300 pl-2">ZK-SNARK Privacy Shield:</span>
            <button
              onClick={() => setZkShield(!zkShield)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                zkShield ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{zkShield ? 'SHIELDED ACTIVE' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {stakeSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{stakeSuccessMsg}</span>
        </div>
      )}

      {/* Liquidity Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pools.map(p => (
          <div key={p.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {p.protocol}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1.5">{p.pair}</h3>
              </div>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-500/30">
                {p.apy} APY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Liquidity</p>
                <p className="font-extrabold font-mono text-white mt-0.5">{p.tvl}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Your Deposit</p>
                <p className="font-extrabold font-mono text-indigo-400 mt-0.5">${p.userStaked.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-300">Amount to Stake (USD)</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={e => setStakeAmount(e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white outline-none font-mono"
              />
              <button
                onClick={() => handleStake(p.id)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-glow-emerald flex items-center justify-center space-x-1"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Stake & Earn SHK</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ZK Bridge Activity */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Shielded ZK Cross-Chain Bridge History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Tx Hash</th>
                <th className="px-4 py-3">From Chain</th>
                <th className="px-4 py-3">To Network</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Privacy Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {zkBridgeTransactions.map((tx, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-indigo-400">{tx.hash}</td>
                  <td className="px-4 py-3 text-slate-300 font-sans">{tx.fromChain}</td>
                  <td className="px-4 py-3 text-slate-300 font-sans">{tx.toChain}</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">{tx.amount}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tx.privacy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
