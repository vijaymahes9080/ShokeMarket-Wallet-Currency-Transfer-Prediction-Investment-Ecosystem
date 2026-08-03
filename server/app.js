import express from 'express';
import { initialWalletBalances, initialFxRates, initialTransactions, initialShokePredictions, initialStartups } from '../src/services/mockData.js';

const app = express();
app.use(express.json());

// In-Memory Database State
let state = {
  wallet: { ...initialWalletBalances },
  rates: { ...initialFxRates },
  transactions: [...initialTransactions],
  predictions: [...initialShokePredictions],
  startups: [...initialStartups]
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'ShokeMarket Global Engine', timestamp: new Date().toISOString() });
});

// Wallet Endpoint
app.get('/api/wallet', (req, res) => {
  res.json({ success: true, wallet: state.wallet, rates: state.rates });
});

// Money Transfer Endpoint
app.post('/api/transfer', (req, res) => {
  const { recipientName, recipientEmail, amount, sourceCurrency, targetCurrency } = req.body;
  if (!amount || amount <= 0 || state.wallet[sourceCurrency] < amount) {
    return res.status(400).json({ success: false, message: 'Invalid amount or insufficient balance' });
  }

  const rate = state.rates[sourceCurrency][targetCurrency] || 1.0;
  const fee = amount * 0.0035;
  const netAmount = amount - fee;
  const recipientAmount = netAmount * rate;

  state.wallet[sourceCurrency] -= amount;

  const tx = {
    id: `tx-${Date.now()}`,
    type: 'Transfer',
    title: `Transfer to ${recipientName}`,
    amount,
    currency: sourceCurrency,
    recipientCurrency: targetCurrency,
    recipientAmount,
    fee,
    status: 'Completed',
    timestamp: new Date().toISOString(),
    reference: `SHK-TRF-${Math.floor(10000000 + Math.random() * 90000000)}`
  };

  state.transactions.unshift(tx);
  res.json({ success: true, transaction: tx, wallet: state.wallet });
});

// AI Predictions Endpoint
app.get('/api/predictions', (req, res) => {
  res.json({ success: true, predictions: state.predictions });
});

// Startup Marketplace Endpoint
app.get('/api/startups', (req, res) => {
  res.json({ success: true, startups: state.startups });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`ShokeMarket Backend Server running on port ${PORT}`);
});
