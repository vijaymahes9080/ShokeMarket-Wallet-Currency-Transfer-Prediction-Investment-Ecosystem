import {
  initialWalletBalances,
  initialFxRates,
  initialTransactions,
  initialShokePredictions,
  initialStartups,
  initialTradingAssets,
  userSecurityProfile
} from './mockData';

class ShokeMarketState {
  constructor() {
    this.wallet = { ...initialWalletBalances };
    this.rates = JSON.parse(JSON.stringify(initialFxRates));
    this.transactions = [...initialTransactions];
    this.predictions = [...initialShokePredictions];
    this.startups = JSON.parse(JSON.stringify(initialStartups));
    this.assets = [...initialTradingAssets];
    this.user = { ...userSecurityProfile };
    this.subscribers = new Set();

    // Start live rate simulation interval
    this.startLiveFeedSimulation();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.getState()));
  }

  getState() {
    return {
      wallet: this.wallet,
      rates: this.rates,
      transactions: this.transactions,
      predictions: this.predictions,
      startups: this.startups,
      assets: this.assets,
      user: this.user
    };
  }

  // Calculate Net Worth in USD
  calculateNetWorthInUSD() {
    let totalUSD = 0;
    Object.keys(this.wallet).forEach(curr => {
      const amount = this.wallet[curr];
      const rateToUSD = this.rates[curr]?.USD || 1.0;
      totalUSD += amount * rateToUSD;
    });
    return totalUSD;
  }

  // Currency Converter
  convertCurrency(fromCurr, toCurr, amount) {
    if (!this.wallet[fromCurr] || this.wallet[fromCurr] < amount) {
      throw new Error(`Insufficient ${fromCurr} balance!`);
    }

    const rate = this.rates[fromCurr][toCurr];
    const convertedAmount = amount * rate;

    this.wallet[fromCurr] -= amount;
    this.wallet[toCurr] = (this.wallet[toCurr] || 0) + convertedAmount;

    const tx = {
      id: `tx-${Date.now()}`,
      type: 'Convert',
      title: `Converted ${fromCurr} to ${toCurr}`,
      amount: amount,
      currency: fromCurr,
      targetCurrency: toCurr,
      targetAmount: convertedAmount,
      fee: 0.00,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      reference: `SHK-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    this.transactions.unshift(tx);
    this.notify();
    return tx;
  }

  // Add Money / Deposit
  addMoney(currency, amount, paymentMethod = 'Stripe Card') {
    this.wallet[currency] = (this.wallet[currency] || 0) + amount;

    const tx = {
      id: `tx-${Date.now()}`,
      type: 'Deposit',
      title: `Express Deposit via ${paymentMethod}`,
      amount: amount,
      currency: currency,
      fee: 0.00,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      reference: `SHK-DEP-${Math.floor(1000 + Math.random() * 9000)}`
    };

    this.transactions.unshift(tx);
    this.notify();
    return tx;
  }

  // Money Transfer
  sendMoney({ recipientName, recipientEmail, amount, sourceCurrency, targetCurrency, notes }) {
    if (this.wallet[sourceCurrency] < amount) {
      throw new Error(`Insufficient ${sourceCurrency} balance for transfer!`);
    }

    const rate = this.rates[sourceCurrency][targetCurrency];
    const feeRate = 0.0035; // 0.35% low transparent fee
    const fee = amount * feeRate;
    const netAmount = amount - fee;
    const recipientReceives = netAmount * rate;

    // Deduct from wallet
    this.wallet[sourceCurrency] -= amount;

    const tx = {
      id: `tx-${Date.now()}`,
      type: 'Transfer',
      title: `Transfer to ${recipientName}`,
      amount: amount,
      currency: sourceCurrency,
      recipientCurrency: targetCurrency,
      recipientAmount: recipientReceives,
      fee: fee,
      recipientEmail: recipientEmail,
      notes: notes,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      reference: `SHK-TRF-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    this.transactions.unshift(tx);
    this.notify();
    return tx;
  }

  // Invest in Startup
  investInStartup(startupId, amountUSD) {
    if (this.wallet.USD < amountUSD) {
      throw new Error('Insufficient USD balance to complete investment!');
    }

    const startup = this.startups.find(s => s.id === startupId);
    if (!startup) throw new Error('Startup not found!');

    this.wallet.USD -= amountUSD;

    // Calculate approximate equity share percentage
    const equityPct = (amountUSD / startup.targetValuationRaw) * 100;
    const equityShareFormatted = `${equityPct.toFixed(4)}%`;

    const tx = {
      id: `tx-${Date.now()}`,
      type: 'Investment',
      title: `Equity Investment in ${startup.name}`,
      amount: amountUSD,
      currency: 'USD',
      equityShare: equityShareFormatted,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      reference: `SHK-INV-${Math.floor(1000 + Math.random() * 9000)}`
    };

    startup.investorsCount += 1;
    this.transactions.unshift(tx);
    this.notify();
    return { tx, equityShareFormatted };
  }

  // Execute Trading Order
  executeTrade({ symbol, type, amountUSD }) {
    if (this.wallet.USD < amountUSD && type === 'BUY') {
      throw new Error('Insufficient USD balance for trade order!');
    }

    const asset = this.assets.find(a => a.symbol === symbol);
    if (!asset) throw new Error('Asset not found');

    if (type === 'BUY') {
      this.wallet.USD -= amountUSD;
    } else {
      this.wallet.USD += amountUSD;
    }

    const tx = {
      id: `tx-${Date.now()}`,
      type: 'Trade',
      title: `${type === 'BUY' ? 'Bought' : 'Sold'} ${symbol}`,
      amount: amountUSD,
      currency: 'USD',
      status: 'Completed',
      timestamp: new Date().toISOString(),
      reference: `SHK-TRD-${Math.floor(1000 + Math.random() * 9000)}`
    };

    this.transactions.unshift(tx);
    this.notify();
    return tx;
  }

  // Live Feed Simulation
  startLiveFeedSimulation() {
    setInterval(() => {
      // Micro-fluctuate USD/INR, EUR/USD, BTC/USD
      const deltaINR = (Math.random() - 0.49) * 0.05;
      const deltaEUR = (Math.random() - 0.50) * 0.001;

      this.rates.USD.INR = parseFloat((this.rates.USD.INR + deltaINR).toFixed(2));
      this.rates.USD.EUR = parseFloat((this.rates.USD.EUR + deltaEUR).toFixed(4));
      this.rates.INR.USD = parseFloat((1 / this.rates.USD.INR).toFixed(4));

      // Fluctuate asset prices slightly
      this.assets.forEach(asset => {
        const factor = 1 + (Math.random() - 0.49) * 0.004;
        asset.price = parseFloat((asset.price * factor).toFixed(2));
      });

      this.notify();
    }, 4000);
  }

  // AI Assistant Chat Response Generator
  generateAIChatResponse(userPrompt) {
    const prompt = userPrompt.toLowerCase();

    if (prompt.includes('portfolio') || prompt.includes('wealth') || prompt.includes('net worth')) {
      const netWorth = this.calculateNetWorthInUSD();
      return `📊 **Portfolio Analysis**: Your total net worth is **$${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD**. Your portfolio is well-diversified across 6 fiat currencies with strongest holdings in USD and INR. Based on current AI Shoke models, we recommend allocating 10-15% into high-growth tech startups like NeuroPay AI.`;
    }

    if (prompt.includes('prediction') || prompt.includes('shoke') || prompt.includes('usd/inr')) {
      return `🔮 **Shoke AI Prediction Highlight**: USD/INR has a **94% Bullish Confidence score** for the next 24 hours (Targeting ₹84.15). High institutional FX demand is driving momentum. Signal: **STRONG BUY**.`;
    }

    if (prompt.includes('transfer') || prompt.includes('fee') || prompt.includes('remittance')) {
      return `💸 **Wise-like Remittance Info**: ShokeMarket applies a flat 0.35% mid-market forex spread. For example, transferring $500 to INR incurs only ~$1.75 in transparent fees compared to traditional banks charging 3-5%.`;
    }

    if (prompt.includes('startup') || prompt.includes('invest') || prompt.includes('equity')) {
      return `🏢 **Startup Marketplace Recommendation**: NeuroPay AI is currently trending with $2.4M raised towards its $3M Seed target. Minimum investment is just $50 USD with a SAFE note discount of 20%.`;
    }

    return `🤖 **Shoke AI Financial Advisor**: I can help you analyze live forex rates, predict currency movements using our 94%-accurate ML model, optimize cross-border transfer fees, or invest in early-stage startups. How can I assist your financial journey today?`;
  }
}

export const shokeState = new ShokeMarketState();
