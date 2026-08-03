export const initialLiquidityPools = [
  {
    id: 'pool-1',
    pair: 'USD-INR LP',
    protocol: 'Shoke Bridge V3',
    tvl: '$14,850,000',
    apy: '18.4%',
    userStaked: 1200.00,
    earnedSHK: 42.80,
    status: 'High Yield'
  },
  {
    id: 'pool-2',
    pair: 'EUR-USD LP',
    protocol: 'Cross-Chain ZK',
    tvl: '$42,100,000',
    apy: '12.2%',
    userStaked: 500.00,
    earnedSHK: 15.40,
    status: 'Audited'
  },
  {
    id: 'pool-3',
    pair: 'BTC-USD LP',
    protocol: 'Decentralized Vault',
    tvl: '$89,400,000',
    apy: '24.6%',
    userStaked: 0.00,
    earnedSHK: 0.00,
    status: 'Trending'
  }
];

export const zkBridgeTransactions = [
  { hash: '0x892a...e41b', fromChain: 'Polygon POS', toChain: 'Shoke L2 Network', amount: '$450.00 USD', privacy: 'ZK-SNARK Shielded', status: 'Verified' },
  { hash: '0x331f...991c', fromChain: 'Ethereum', toChain: 'Shoke L2 Network', amount: '$1,200.00 USD', privacy: 'ZK-SNARK Shielded', status: 'Verified' }
];
