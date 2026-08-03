export const initialWalletBalances = {
  USD: 2500.00,
  INR: 50000.00,
  EUR: 1850.50,
  GBP: 1200.00,
  JPY: 350000.00,
  AED: 5000.00
};

export const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'AED '
};

export const currencyFlags = {
  USD: '🇺🇸',
  INR: '🇮🇳',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  AED: '🇦🇪'
};

export const initialFxRates = {
  USD: { USD: 1.0, INR: 83.45, EUR: 0.92, GBP: 0.79, JPY: 154.20, AED: 3.67 },
  INR: { USD: 0.012, INR: 1.0, EUR: 0.011, GBP: 0.0095, JPY: 1.85, AED: 0.044 },
  EUR: { USD: 1.087, INR: 90.70, EUR: 1.0, GBP: 0.86, JPY: 167.60, AED: 3.99 },
  GBP: { USD: 1.265, INR: 105.63, EUR: 1.16, GBP: 1.0, JPY: 195.18, AED: 4.65 },
  JPY: { USD: 0.0065, INR: 0.54, EUR: 0.006, GBP: 0.0051, JPY: 1.0, AED: 0.024 },
  AED: { USD: 0.272, INR: 22.74, EUR: 0.25, GBP: 0.215, JPY: 42.01, AED: 1.0 }
};

export const initialTransactions = [
  {
    id: 'tx-1001',
    type: 'Transfer',
    title: 'Cross-Border Transfer to Alex Vance',
    amount: 350.00,
    currency: 'USD',
    recipientCurrency: 'EUR',
    recipientAmount: 322.00,
    fee: 1.45,
    status: 'Completed',
    timestamp: '2026-08-03T04:15:00Z',
    reference: 'SHK-89230192'
  },
  {
    id: 'tx-1002',
    type: 'Convert',
    title: 'Converted INR to USD',
    amount: 15000.00,
    currency: 'INR',
    targetCurrency: 'USD',
    targetAmount: 179.74,
    fee: 0.00,
    status: 'Completed',
    timestamp: '2026-08-02T18:30:00Z',
    reference: 'SHK-55219402'
  },
  {
    id: 'tx-1003',
    type: 'Investment',
    title: 'Equity Investment in NeuroPay AI',
    amount: 250.00,
    currency: 'USD',
    equityShare: '0.0014%',
    status: 'Completed',
    timestamp: '2026-08-01T12:00:00Z',
    reference: 'SHK-INV-9921'
  },
  {
    id: 'tx-1004',
    type: 'Deposit',
    title: 'Express Deposit via Stripe',
    amount: 1000.00,
    currency: 'USD',
    fee: 0.00,
    status: 'Completed',
    timestamp: '2026-07-31T09:45:00Z',
    reference: 'SHK-DEP-4410'
  },
  {
    id: 'tx-1005',
    type: 'Trade',
    title: 'Bought 0.015 BTC',
    amount: 980.00,
    currency: 'USD',
    status: 'Completed',
    timestamp: '2026-07-30T16:20:00Z',
    reference: 'SHK-TRD-7712'
  }
];

export const initialShokePredictions = [
  {
    id: 'pred-1',
    asset: 'USD/INR',
    category: 'Forex',
    direction: 'UP',
    changePercent: '+0.85%',
    timeframe: '24 Hours',
    confidence: 94,
    sentiment: 'Strongly Bullish',
    sentimentScore: 88,
    signal: 'STRONG BUY',
    reasoning: 'US Fed rate pause expectations combined with foreign institutional capital inflows. Momentum RSI at 64 showing upside breakout.',
    historicalAccuracy: '92.4%',
    chartData: [
      { time: '00:00', price: 83.20 },
      { time: '04:00', price: 83.25 },
      { time: '08:00', price: 83.32 },
      { time: '12:00', price: 83.45 },
      { time: '16:00', price: 83.60 },
      { time: '20:00', price: 83.78 },
      { time: '24:00 (Est)', price: 84.15 }
    ]
  },
  {
    id: 'pred-2',
    asset: 'EUR/USD',
    category: 'Forex',
    direction: 'DOWN',
    changePercent: '-0.42%',
    timeframe: '12 Hours',
    confidence: 89,
    sentiment: 'Bearish',
    sentimentScore: 32,
    signal: 'SELL',
    reasoning: 'ECB inflation prints undershooting forecast; Eurozone manufacturing index contracted to 46.2.',
    historicalAccuracy: '88.9%',
    chartData: [
      { time: '00:00', price: 1.092 },
      { time: '04:00', price: 1.090 },
      { time: '08:00', price: 1.088 },
      { time: '12:00', price: 1.087 },
      { time: '16:00', price: 1.084 },
      { time: '20:00 (Est)', price: 1.082 }
    ]
  },
  {
    id: 'pred-3',
    asset: 'BTC/USD',
    category: 'Crypto',
    direction: 'UP',
    changePercent: '+3.75%',
    timeframe: '48 Hours',
    confidence: 91,
    sentiment: 'Bullish Surge',
    sentimentScore: 92,
    signal: 'STRONG BUY',
    reasoning: 'Net inflow of $420M into spot ETFs over last 2 sessions. Exchange reserves reached 3-year low.',
    historicalAccuracy: '87.1%',
    chartData: [
      { time: 'Day 1', price: 64500 },
      { time: 'Day 2', price: 65200 },
      { time: 'Day 3 (Est)', price: 67800 }
    ]
  },
  {
    id: 'pred-4',
    asset: 'NVDA',
    category: 'Stock',
    direction: 'UP',
    changePercent: '+2.10%',
    timeframe: '24 Hours',
    confidence: 86,
    sentiment: 'Bullish',
    sentimentScore: 81,
    signal: 'BUY',
    reasoning: 'Hyperscaler capex guidance increased by 22% across major cloud providers.',
    historicalAccuracy: '89.5%',
    chartData: [
      { time: '9:30 AM', price: 128.5 },
      { time: '12:00 PM', price: 130.2 },
      { time: '4:00 PM (Est)', price: 132.8 }
    ]
  }
];

export const initialStartups = [
  {
    id: 'startup-101',
    name: 'NeuroPay AI',
    tagline: 'Autonomous AI Agents for Real-time Micro-Remittances & Forex',
    category: 'FinTech / AI',
    logo: '🧠',
    valuation: '$18,000,000',
    targetValuationRaw: 18000000,
    raised: '$2,400,000',
    target: '$3,000,000',
    minInvestment: 50,
    cagr: '+185%',
    founders: [
      { name: 'Dr. Evelyn Reed', role: 'CEO (ex-Stripe AI Lead)', avatar: '👩‍💻' },
      { name: 'Marcus Chen', role: 'CTO (MIT CS PhD)', avatar: '👨‍🔬' }
    ],
    pitchSummary: 'NeuroPay leverages decentralized AI agent networks to route cross-border payments with near-zero latency and zero FX spread markup.',
    keyMetrics: {
      arr: '$840,000',
      monthlyGrowth: '+28%',
      activeUsers: '42,000+'
    },
    dealType: 'SAFE Note (20% Discount, $15M Cap)',
    investorsCount: 340
  },
  {
    id: 'startup-102',
    name: 'QuantumGrid CleanTech',
    tagline: 'Next-Generation AI Battery Infrastructure for EV Fleets',
    category: 'CleanTech / Hardware',
    logo: '⚡',
    valuation: '$35,000,000',
    targetValuationRaw: 35000000,
    raised: '$6,100,000',
    target: '$8,000,000',
    minInvestment: 100,
    cagr: '+240%',
    founders: [
      { name: 'Vikram Mehta', role: 'CEO (ex-Tesla Energy)', avatar: '👨‍💼' },
      { name: 'Sarah Lin', role: 'Chief Scientist', avatar: '👩‍🔬' }
    ],
    pitchSummary: 'Proprietary solid-state thermal management software increasing EV fleet battery longevity by 40%.',
    keyMetrics: {
      arr: '$2,100,000',
      monthlyGrowth: '+34%',
      activeUsers: '18 Enterprise Fleets'
    },
    dealType: 'Priced Seed Equity ($35M Cap)',
    investorsCount: 520
  },
  {
    id: 'startup-103',
    name: 'AetherHealth',
    tagline: 'Predictive Genomic Diagnostics Powered by Quantum Machine Learning',
    category: 'MedTech / Bio',
    logo: '🧬',
    valuation: '$12,000,000',
    targetValuationRaw: 12000000,
    raised: '$1,800,000',
    target: '$2,500,000',
    minInvestment: 25,
    cagr: '+140%',
    founders: [
      { name: 'Dr. Aris Thorne', role: 'Founder & MD', avatar: '👨‍⚕️' }
    ],
    pitchSummary: 'FDA-cleared early oncology detection algorithms capable of predicting cellular mutations 18 months in advance.',
    keyMetrics: {
      arr: '$420,000',
      monthlyGrowth: '+19%',
      activeUsers: '12 Clinical Labs'
    },
    dealType: 'SAFE Note (15% Discount)',
    investorsCount: 215
  }
];

export const initialTradingAssets = [
  {
    symbol: 'USD/INR',
    name: 'US Dollar / Indian Rupee',
    type: 'Forex',
    price: 83.45,
    change: +0.28,
    changePercent: '+0.34%',
    high: 83.62,
    low: 83.15,
    volume: '$4.2B'
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'Forex',
    price: 1.0872,
    change: -0.0034,
    changePercent: '-0.31%',
    high: 1.0915,
    low: 1.0860,
    volume: '$12.8B'
  },
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin / USD',
    type: 'Crypto',
    price: 66420.00,
    change: +1840.00,
    changePercent: '+2.85%',
    high: 67100.00,
    low: 64200.00,
    volume: '$28.4B'
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum / USD',
    type: 'Crypto',
    price: 3450.50,
    change: +112.30,
    changePercent: '+3.36%',
    high: 3490.00,
    low: 3310.00,
    volume: '$14.1B'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'Stock',
    price: 129.80,
    change: +3.45,
    changePercent: '+2.73%',
    high: 131.20,
    low: 126.10,
    volume: '$9.8B'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Stock',
    price: 224.50,
    change: -1.20,
    changePercent: '-0.53%',
    high: 226.80,
    low: 223.10,
    volume: '$6.5B'
  }
];

export const userSecurityProfile = {
  name: 'Vijay Kumar',
  email: 'vijay@shokemarket.com',
  kycStatus: 'Verified (Tier 3)',
  twoFactorEnabled: true,
  biometricsEnabled: true,
  healthScore: 92,
  activeSessions: [
    { device: 'MacBook Pro (Chrome)', location: 'Mumbai, IN', ip: '103.21.12.88', current: true },
    { device: 'iPhone 15 Pro (App)', location: 'Mumbai, IN', ip: '103.21.12.92', current: false }
  ],
  auditLogs: [
    { event: '2FA Verification Successful', timestamp: '2026-08-03T06:10:00Z', status: 'Success' },
    { event: 'Currency Conversion INR -> USD', timestamp: '2026-08-02T18:30:00Z', status: 'Success' },
    { event: 'API Key Created (Trading Bot)', timestamp: '2026-08-01T14:15:00Z', status: 'Success' }
  ]
};
