import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  CheckCircle2,
  Sliders,
  DollarSign,
  BarChart2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import confetti from 'canvas-confetti';

export default function TradingView({ state, onExecuteTrade }) {
  const { assets, wallet } = state;
  const [selectedSymbol, setSelectedSymbol] = useState('USD/INR');

  const selectedAsset = assets.find(a => a.symbol === selectedSymbol) || assets[0];

  // Order form state
  const [orderType, setOrderType] = useState('BUY');
  const [tradeAmount, setTradeAmount] = useState('100');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState('');

  // Generate smooth price chart data
  const generateChartData = (basePrice) => {
    const data = [];
    let price = basePrice * 0.98;
    for (let i = 0; i < 20; i++) {
      price = price * (1 + (Math.random() - 0.48) * 0.006);
      data.push({
        time: `${i * 2}:00`,
        price: parseFloat(price.toFixed(2))
      });
    }
    data.push({ time: 'Now', price: basePrice });
    return data;
  };

  const chartData = generateChartData(selectedAsset.price);

  // Simulated Order Book
  const orderBookBids = [
    { price: (selectedAsset.price * 0.999).toFixed(2), size: '1.45', total: '$14,500' },
    { price: (selectedAsset.price * 0.998).toFixed(2), size: '2.80', total: '$28,000' },
    { price: (selectedAsset.price * 0.997).toFixed(2), size: '5.10', total: '$51,000' }
  ];

  const orderBookAsks = [
    { price: (selectedAsset.price * 1.001).toFixed(2), size: '1.20', total: '$12,000' },
    { price: (selectedAsset.price * 1.002).toFixed(2), size: '3.40', total: '$34,000' },
    { price: (selectedAsset.price * 1.003).toFixed(2), size: '6.15', total: '$61,500' }
  ];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(tradeAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      onExecuteTrade({
        symbol: selectedAsset.symbol,
        type: orderType,
        amountUSD: amt
      });

      setTradeSuccessMsg(`Order Executed! ${orderType} $${amt} of ${selectedAsset.symbol} filled at $${selectedAsset.price}`);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      setTimeout(() => setTradeSuccessMsg(''), 5000);
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
            <TrendingUp className="w-6 h-6 text-indigo-400" /> Real-Time Asset & Forex Trading Platform
          </h2>
          <p className="text-xs text-slate-400">
            Robinhood-style instant execution for global Forex pairs, Stocks, and Crypto assets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs">
          <span className="text-slate-400 font-semibold px-2">USD Balance:</span>
          <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            ${wallet.USD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Asset Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
        {assets.map(asset => {
          const isSelected = asset.symbol === selectedSymbol;
          const isUp = asset.change >= 0;

          return (
            <button
              key={asset.symbol}
              onClick={() => setSelectedSymbol(asset.symbol)}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 text-white shadow-glow-indigo'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{asset.symbol}</span>
              <span className="font-mono text-slate-200">${asset.price}</span>
              <span className={`text-[10px] ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {asset.changePercent}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Price Chart Panel */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-white">{selectedAsset.name} ({selectedAsset.symbol})</h3>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {selectedAsset.type}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">24h Vol: {selectedAsset.volume} | High: ${selectedAsset.high} | Low: ${selectedAsset.low}</p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-extrabold font-mono text-white">${selectedAsset.price}</p>
              <span className={`inline-flex items-center text-xs font-bold ${selectedAsset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change} ({selectedAsset.changePercent})
              </span>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tradingColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedAsset.change >= 0 ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={selectedAsset.change >= 0 ? '#10b981' : '#f43f5e'} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={selectedAsset.change >= 0 ? '#10b981' : '#f43f5e'}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tradingColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Book & Execution Form */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Order Execution Panel */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            {/* BUY / SELL Switch */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  orderType === 'BUY' ? 'bg-emerald-600 text-white shadow-glow-emerald' : 'text-slate-400 hover:text-white'
                }`}
              >
                BUY {selectedAsset.symbol}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  orderType === 'SELL' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                SELL {selectedAsset.symbol}
              </button>
            </div>

            {tradeSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{tradeSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Order Amount (USD)</label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={e => setTradeAmount(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono outline-none focus:border-indigo-500"
                    placeholder="100.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Stop Loss</label>
                  <input
                    type="number"
                    value={stopLoss}
                    onChange={e => setStopLoss(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono outline-none"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Take Profit</label>
                  <input
                    type="number"
                    value={takeProfit}
                    onChange={e => setTakeProfit(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white text-xs font-bold rounded-xl transition mt-2 ${
                  orderType === 'BUY'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-glow-emerald'
                    : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 shadow-lg'
                }`}
              >
                Execute {orderType} Order Instantly
              </button>
            </form>
          </div>

          {/* Live Depth Order Book Preview */}
          <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" /> Live Order Book Depth
            </h4>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="text-[9px] uppercase text-slate-500 flex justify-between font-bold border-b border-slate-800 pb-1">
                <span>Price</span>
                <span>Size</span>
                <span>Total</span>
              </div>
              {orderBookAsks.map((ask, idx) => (
                <div key={idx} className="flex justify-between text-rose-400">
                  <span>${ask.price}</span>
                  <span className="text-slate-400">{ask.size}</span>
                  <span>{ask.total}</span>
                </div>
              ))}
              <div className="py-1 text-center font-bold text-white bg-slate-800/60 rounded">
                ${selectedAsset.price} (Spread 0.01)
              </div>
              {orderBookBids.map((bid, idx) => (
                <div key={idx} className="flex justify-between text-emerald-400">
                  <span>${bid.price}</span>
                  <span className="text-slate-400">{bid.size}</span>
                  <span>{bid.total}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
