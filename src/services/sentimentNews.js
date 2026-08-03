export const initialNewsSentiment = [
  {
    id: 'news-1',
    headline: 'US Fed Signals Rate Pause as Inflation Cools to 2.4%',
    region: 'North America',
    impact: 'High',
    sentiment: 'Bullish (+84%)',
    category: 'Central Banking',
    timestamp: '10m ago'
  },
  {
    id: 'news-2',
    headline: 'India Q2 GDP Expansion Reaches 7.4% Driven by Tech Exports & FX Reserves',
    region: 'Asia-Pacific',
    impact: 'High',
    sentiment: 'Strongly Bullish (+92%)',
    category: 'Emerging Markets',
    timestamp: '25m ago'
  },
  {
    id: 'news-3',
    headline: 'ECB Maintains Neutral Policy Stance Amid Eurozone Manufacturing Stabilization',
    region: 'Europe',
    impact: 'Medium',
    sentiment: 'Neutral (50%)',
    category: 'Forex',
    timestamp: '1h ago'
  }
];

export const globalRegionHeatmap = [
  { region: 'North America 🇺🇸', score: 82, trend: 'Bullish', topCurrency: 'USD' },
  { region: 'Asia Pacific 🇮🇳', score: 91, trend: 'Surging', topCurrency: 'INR' },
  { region: 'Europe 🇪🇺', score: 54, trend: 'Neutral', topCurrency: 'EUR' },
  { region: 'United Kingdom 🇬🇧', score: 68, trend: 'Moderate', topCurrency: 'GBP' },
  { region: 'Middle East 🇦🇪', score: 88, trend: 'Bullish', topCurrency: 'AED' }
];
