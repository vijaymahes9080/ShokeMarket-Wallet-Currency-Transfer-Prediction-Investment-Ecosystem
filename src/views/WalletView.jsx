import React, { useState } from 'react';
import {
  Wallet,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  ArrowRight,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { currencySymbols, currencyFlags } from '../services/mockData';

export default function WalletView({ state, onAddMoney, onConvertCurrency }) {
  const { wallet, rates, transactions } = state;

  // Add Money Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addCurr, setAddCurr] = useState('USD');
  const [addAmount, setAddAmount] = useState('500');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  // Convert Currency State
  const [fromCurr, setFromCurr] = useState('INR');
  const [toCurr, setToCurr] = useState('USD');
  const [convertAmount, setConvertAmount] = useState('10000');
  const [convertSuccessMsg, setConvertSuccessMsg] = useState('');

  // Ledger Filter
  const [filterType, setFilterType] = useState('ALL');

  // Handle Add Money Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) return;

    onAddMoney(addCurr, amt, paymentMethod);

    // Trigger confetti effect
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

    setShowAddModal(false);
    setAddAmount('500');
  };

  // Handle Instant Conversion Submit
  const handleConvertSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(convertAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const tx = onConvertCurrency(fromCurr, toCurr, amt);
      setConvertSuccessMsg(`Successfully converted ${currencySymbols[fromCurr]}${amt} to ${currencySymbols[toCurr]}${tx.targetAmount.toFixed(2)}`);
      
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
      
      setTimeout(() => setConvertSuccessMsg(''), 5000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Calculate live conversion preview
  const rate = rates[fromCurr]?.[toCurr] || 1.0;
  const previewConverted = (parseFloat(convertAmount) || 0) * rate;

  // Filtered ledger transactions
  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'ALL') return true;
    return tx.type.toUpperCase() === filterType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-indigo-400" /> Multi-Currency Wallet Engine
          </h2>
          <p className="text-xs text-slate-400">
            Hold, convert, and manage 6 global fiat currencies with instant mid-market exchange rates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold transition shadow-glow-emerald"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Express Add Money</span>
        </button>
      </div>

      {/* Currency Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(wallet).map(curr => {
          const balance = wallet[curr];
          const rateToUSD = rates[curr]?.USD || 1.0;
          const usdVal = balance * rateToUSD;

          return (
            <div key={curr} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{currencyFlags[curr]}</span>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{curr} Wallet</h4>
                    <p className="text-[10px] text-slate-400">≈ ${usdVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                  Active
                </span>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-extrabold font-mono text-white tracking-tight">
                  {currencySymbols[curr]}{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500">1 {curr} = {rates[curr]?.USD} USD</span>
                <button
                  onClick={() => { setFromCurr(curr); }}
                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Convert →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Currency Converter Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-400" /> Instant Currency Exchange Engine
            </h3>
            <p className="text-xs text-slate-400">Zero hidden fees, live real-time rate matching</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            ⚡ Instant Execution
          </span>
        </div>

        {convertSuccessMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{convertSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleConvertSubmit} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          
          {/* From Currency & Amount */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-semibold text-slate-300">You Convert From</label>
            <div className="flex rounded-xl overflow-hidden glass-input">
              <select
                value={fromCurr}
                onChange={e => setFromCurr(e.target.value)}
                className="bg-slate-900 text-white text-xs font-bold px-3 py-2.5 border-r border-slate-700 outline-none"
              >
                {Object.keys(wallet).map(c => (
                  <option key={c} value={c}>{currencyFlags[c]} {c}</option>
                ))}
              </select>
              <input
                type="number"
                value={convertAmount}
                onChange={e => setConvertAmount(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-xs text-white font-mono outline-none"
                placeholder="Amount"
              />
            </div>
            <p className="text-[10px] text-slate-500">Available: {currencySymbols[fromCurr]}{wallet[fromCurr]?.toLocaleString()}</p>
          </div>

          {/* Swap Indicator Icon */}
          <div className="md:col-span-1 flex items-center justify-center pb-2">
            <button
              type="button"
              onClick={() => { const temp = fromCurr; setFromCurr(toCurr); setToCurr(temp); }}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 transition"
              title="Swap Currencies"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* To Currency & Converted Result */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-semibold text-slate-300">You Receive (Estimated)</label>
            <div className="flex rounded-xl overflow-hidden glass-input">
              <select
                value={toCurr}
                onChange={e => setToCurr(e.target.value)}
                className="bg-slate-900 text-white text-xs font-bold px-3 py-2.5 border-r border-slate-700 outline-none"
              >
                {Object.keys(wallet).map(c => (
                  <option key={c} value={c}>{currencyFlags[c]} {c}</option>
                ))}
              </select>
              <div className="w-full bg-slate-900/40 px-3 py-2.5 text-xs text-emerald-400 font-mono font-bold flex items-center">
                {currencySymbols[toCurr]}{previewConverted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <p className="text-[10px] text-slate-400">1 {fromCurr} = {rate} {toCurr}</p>
          </div>

          {/* Convert Submit Button */}
          <div className="md:col-span-7 mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-glow-indigo"
            >
              Confirm Currency Exchange Now
            </button>
          </div>

        </form>
      </div>

      {/* Transaction History Ledger */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Full Transaction Ledger</h3>
            <p className="text-xs text-slate-400">Immutable ledger log for all financial events</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-[11px]">
            {['ALL', 'TRANSFER', 'CONVERT', 'DEPOSIT', 'INVESTMENT', 'TRADE'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  filterType === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Reference Code</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-4 py-3 font-semibold text-white">{tx.title}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-indigo-400">{tx.type}</td>
                  <td className="px-4 py-3 font-mono font-bold text-white">
                    {currencySymbols[tx.currency]}{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{tx.reference}</td>
                  <td className="px-4 py-3 text-[11px] text-slate-400">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Express Add Money Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" /> Express Add Funds
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Select Currency</label>
                <select
                  value={addCurr}
                  onChange={e => setAddCurr(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none"
                >
                  {Object.keys(wallet).map(c => (
                    <option key={c} value={c}>{currencyFlags[c]} {c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Deposit Amount</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{currencySymbols[addCurr]}</span>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={e => setAddAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Payment Gateway</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Stripe')}
                    className={`py-2 rounded-xl border text-xs font-bold ${paymentMethod === 'Stripe' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                  >
                    💳 Stripe Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Razorpay')}
                    className={`py-2 rounded-xl border text-xs font-bold ${paymentMethod === 'Razorpay' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                  >
                    ⚡ Razorpay / UPI
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-glow-emerald"
                >
                  Pay & Credit Instantly
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
