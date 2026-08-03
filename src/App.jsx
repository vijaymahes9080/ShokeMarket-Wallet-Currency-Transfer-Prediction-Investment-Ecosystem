import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TickerTape from './components/TickerTape';
import AIVoiceAssistant from './components/AIVoiceAssistant';

import DashboardView from './views/DashboardView';
import WalletView from './views/WalletView';
import TransferView from './views/TransferView';
import ShokePredictionView from './views/ShokePredictionView';
import QuantumRiskView from './views/QuantumRiskView';
import Web3BridgeView from './views/Web3BridgeView';
import ShokeQuestsView from './views/ShokeQuestsView';
import GlobalSentimentMapView from './views/GlobalSentimentMapView';
import AlgoBotView from './views/AlgoBotView';
import TradingView from './views/TradingView';
import StartupHubView from './views/StartupHubView';
import AIAdvisorView from './views/AIAdvisorView';
import SecurityKycView from './views/SecurityKycView';

import { shokeState } from './services/api';

export default function App() {
  const [state, setState] = useState(shokeState.getState());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const unsubscribe = shokeState.subscribe(newState => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddMoney = (curr, amt, pm) => shokeState.addMoney(curr, amt, pm);
  const handleConvertCurrency = (from, to, amt) => shokeState.convertCurrency(from, to, amt);
  const handleSendMoney = (payload) => shokeState.sendMoney(payload);
  const handleInvestInStartup = (id, amt) => shokeState.investInStartup(id, amt);
  const handleExecuteTrade = (payload) => shokeState.executeTrade(payload);

  const netWorthUSD = shokeState.calculateNetWorthInUSD();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <Navbar
        netWorthUSD={netWorthUSD}
        isDark={isDark}
        toggleDark={toggleDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <TickerTape assets={state.assets} rates={state.rates} />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView state={state} setActiveTab={setActiveTab} />}
          {activeTab === 'wallet' && <WalletView state={state} onAddMoney={handleAddMoney} onConvertCurrency={handleConvertCurrency} />}
          {activeTab === 'transfer' && <TransferView state={state} onSendMoney={handleSendMoney} />}
          {activeTab === 'predictions' && <ShokePredictionView state={state} setActiveTab={setActiveTab} />}
          {activeTab === 'quantum' && <QuantumRiskView state={state} />}
          {activeTab === 'web3' && <Web3BridgeView state={state} />}
          {activeTab === 'quests' && <ShokeQuestsView state={state} />}
          {activeTab === 'sentiment' && <GlobalSentimentMapView state={state} />}
          {activeTab === 'algobot' && <AlgoBotView state={state} />}
          {activeTab === 'trading' && <TradingView state={state} onExecuteTrade={handleExecuteTrade} />}
          {activeTab === 'startups' && <StartupHubView state={state} onInvestInStartup={handleInvestInStartup} />}
          {activeTab === 'advisor' && <AIAdvisorView state={state} />}
          {activeTab === 'security' && <SecurityKycView state={state} />}
        </main>
      </div>

      {/* Floating AI Voice Assistant */}
      <AIVoiceAssistant state={state} />

    </div>
  );
}
