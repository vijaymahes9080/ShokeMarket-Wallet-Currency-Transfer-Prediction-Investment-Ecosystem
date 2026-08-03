import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TickerTape from './components/TickerTape';

import DashboardView from './views/DashboardView';
import WalletView from './views/WalletView';
import TransferView from './views/TransferView';
import ShokePredictionView from './views/ShokePredictionView';
import TradingView from './views/TradingView';
import StartupHubView from './views/StartupHubView';
import AIAdvisorView from './views/AIAdvisorView';
import SecurityKycView from './views/SecurityKycView';

import { shokeState } from './services/api';

export default function App() {
  const [state, setState] = useState(shokeState.getState());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);

  // Subscribe to live state updates
  useEffect(() => {
    const unsubscribe = shokeState.subscribe(newState => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  // Theme toggle handler
  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // State mutation wrappers
  const handleAddMoney = (curr, amt, pm) => shokeState.addMoney(curr, amt, pm);
  const handleConvertCurrency = (from, to, amt) => shokeState.convertCurrency(from, to, amt);
  const handleSendMoney = (payload) => shokeState.sendMoney(payload);
  const handleInvestInStartup = (id, amt) => shokeState.investInStartup(id, amt);
  const handleExecuteTrade = (payload) => shokeState.executeTrade(payload);

  const netWorthUSD = shokeState.calculateNetWorthInUSD();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation */}
      <Navbar
        netWorthUSD={netWorthUSD}
        isDark={isDark}
        toggleDark={toggleDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Real-time FX & Stock Ticker Tape */}
      <TickerTape assets={state.assets} rates={state.rates} />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              state={state}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletView
              state={state}
              onAddMoney={handleAddMoney}
              onConvertCurrency={handleConvertCurrency}
            />
          )}

          {activeTab === 'transfer' && (
            <TransferView
              state={state}
              onSendMoney={handleSendMoney}
            />
          )}

          {activeTab === 'predictions' && (
            <ShokePredictionView
              state={state}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'trading' && (
            <TradingView
              state={state}
              onExecuteTrade={handleExecuteTrade}
            />
          )}

          {activeTab === 'startups' && (
            <StartupHubView
              state={state}
              onInvestInStartup={handleInvestInStartup}
            />
          )}

          {activeTab === 'advisor' && (
            <AIAdvisorView
              state={state}
            />
          )}

          {activeTab === 'security' && (
            <SecurityKycView
              state={state}
            />
          )}
        </main>
      </div>

    </div>
  );
}
