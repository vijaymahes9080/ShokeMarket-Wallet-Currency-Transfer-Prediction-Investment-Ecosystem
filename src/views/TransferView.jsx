import React, { useState } from 'react';
import {
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { currencySymbols, currencyFlags } from '../services/mockData';

export default function TransferView({ state, onSendMoney }) {
  const { wallet, rates } = state;

  const [recipientName, setRecipientName] = useState('Alex Vance');
  const [recipientEmail, setRecipientEmail] = useState('alex.vance@fintech.io');
  const [amount, setAmount] = useState('350');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [notes, setNotes] = useState('Invoice payment #492');

  const [transferReceipt, setTransferReceipt] = useState(null);

  // Live calculation
  const sendAmt = parseFloat(amount) || 0;
  const rate = rates[sourceCurrency]?.[targetCurrency] || 1.0;
  const fee = sendAmt * 0.0035; // 0.35% fee
  const amountToConvert = Math.max(0, sendAmt - fee);
  const recipientGets = amountToConvert * rate;

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (sendAmt <= 0) return;

    try {
      const tx = onSendMoney({
        recipientName,
        recipientEmail,
        amount: sendAmt,
        sourceCurrency,
        targetCurrency,
        notes
      });

      setTransferReceipt(tx);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-indigo-400" /> Real-Time Money Transfer (Wise-like Remittance)
        </h2>
        <p className="text-xs text-slate-400">
          Send funds globally with zero markups, live exchange rate locks, and instant recipient settlement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Transfer Form Card */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          
          <form onSubmit={handleTransferSubmit} className="space-y-5">
            
            {/* Recipient Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" /> 1. Recipient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    required
                    className="w-full mt-1 glass-input px-3 py-2.5 rounded-xl text-xs text-white outline-none"
                    placeholder="Full Legal Name"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Recipient Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)}
                    required
                    className="w-full mt-1 glass-input px-3 py-2.5 rounded-xl text-xs text-white outline-none"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Transfer Amounts & Currency Select */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400" /> 2. Amount & Currencies
              </h3>

              {/* Source Amount */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300">You Send Exactly</label>
                <div className="flex rounded-xl overflow-hidden glass-input mt-1">
                  <select
                    value={sourceCurrency}
                    onChange={e => setSourceCurrency(e.target.value)}
                    className="bg-slate-900 text-white text-xs font-bold px-3 py-2.5 border-r border-slate-700 outline-none"
                  >
                    {Object.keys(wallet).map(c => (
                      <option key={c} value={c}>{currencyFlags[c]} {c}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white font-mono outline-none"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Available in {sourceCurrency}: {currencySymbols[sourceCurrency]}{wallet[sourceCurrency]?.toLocaleString()}
                </p>
              </div>

              {/* Target Amount Preview */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Recipient Gets (Guaranteed)</label>
                <div className="flex rounded-xl overflow-hidden glass-input mt-1">
                  <select
                    value={targetCurrency}
                    onChange={e => setTargetCurrency(e.target.value)}
                    className="bg-slate-900 text-white text-xs font-bold px-3 py-2.5 border-r border-slate-700 outline-none"
                  >
                    {Object.keys(wallet).map(c => (
                      <option key={c} value={c}>{currencyFlags[c]} {c}</option>
                    ))}
                  </select>
                  <div className="w-full bg-slate-900/40 px-3 py-2.5 text-xs text-emerald-400 font-mono font-bold flex items-center">
                    {currencySymbols[targetCurrency]}{recipientGets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Optional Reference Notes */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Reference / Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full mt-1 glass-input px-3 py-2 rounded-xl text-xs text-white outline-none"
                  placeholder="e.g. Invoice #102 or Family Support"
                />
              </div>
            </div>

            {/* Confirm Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-glow-indigo flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Send Money Instantly Now</span>
            </button>

          </form>

        </div>

        {/* Wise-Style Fee Breakdown Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" /> Fee Transparency Guarantee
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                <Clock className="w-3 h-3" /> Rate Locked (15m)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Transfer Amount</span>
                <span className="font-mono text-white font-semibold">{currencySymbols[sourceCurrency]}{sendAmt.toFixed(2)} {sourceCurrency}</span>
              </div>

              <div className="flex justify-between items-center text-emerald-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Shoke Low Fee (0.35%)
                </span>
                <span className="font-mono font-bold">-{currencySymbols[sourceCurrency]}{fee.toFixed(2)} {sourceCurrency}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Amount We Convert</span>
                <span className="font-mono text-white font-semibold">{currencySymbols[sourceCurrency]}{amountToConvert.toFixed(2)} {sourceCurrency}</span>
              </div>

              <div className="flex justify-between items-center text-indigo-300">
                <span className="text-slate-400">Guaranteed Mid-Market FX Rate</span>
                <span className="font-mono font-bold">1 {sourceCurrency} = {rate} {targetCurrency}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="font-bold text-white">Recipient Should Receive</span>
                <span className="font-mono font-extrabold text-base text-emerald-400">
                  {currencySymbols[targetCurrency]}{recipientGets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {targetCurrency}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Encryption
              </div>
              <p className="text-[10px] text-slate-400">
                Transactions are authorized via bank-grade tokenization with automated anti-fraud monitoring.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Remittance Success Modal Receipt */}
      {transferReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Transfer Completed!</h3>
              <p className="text-xs text-slate-400">Funds have been routed instantly via SWIFT/SEPA Fast Track.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Reference ID:</span>
                <span className="text-indigo-400 font-bold">{transferReceipt.reference}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Recipient:</span>
                <span className="text-white">{transferReceipt.title}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sent Amount:</span>
                <span className="text-white">{currencySymbols[transferReceipt.currency]}{transferReceipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Recipient Received:</span>
                <span className="text-emerald-400 font-bold">
                  {currencySymbols[transferReceipt.recipientCurrency]}{transferReceipt.recipientAmount.toFixed(2)} {transferReceipt.recipientCurrency}
                </span>
              </div>
            </div>

            <button
              onClick={() => setTransferReceipt(null)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-glow-indigo"
            >
              Done & Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
