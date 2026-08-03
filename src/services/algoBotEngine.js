export const initialAlgoBots = [
  {
    id: 'bot-1',
    name: 'Shoke AI Forex Scalper',
    pair: 'USD/INR',
    condition: 'IF RSI < 35 AND Shoke Signal = STRONG BUY',
    action: 'BUY $250 USD',
    winRate: '88.4%',
    totalProfit: '+$1,420.50',
    status: 'ACTIVE'
  },
  {
    id: 'bot-2',
    name: 'Crypto Momentum Vault',
    pair: 'BTC/USD',
    condition: 'IF 24h ETF Inflow > $300M AND Momentum > 70',
    action: 'BUY $500 USD',
    winRate: '91.2%',
    totalProfit: '+$3,850.00',
    status: 'ACTIVE'
  }
];
