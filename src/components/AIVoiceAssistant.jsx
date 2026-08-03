import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Sparkles } from 'lucide-react';

export default function AIVoiceAssistant({ state }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakMarketBriefing = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const netWorth = state.wallet.USD + (state.wallet.INR / 83.45);
    const briefingText = `Good morning Vijay. Welcome to Shoke Market. Your net worth is estimated at ${Math.round(netWorth)} US dollars. The top AI Shoke signal today is USD to INR with a 94 percent bullish confidence target of 84 rupees and 15 paise.`;

    const utterance = new SpeechSynthesisUtterance(briefingText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={speakMarketBriefing}
        className={`flex items-center space-x-2 px-4 py-3 rounded-2xl shadow-2xl transition border ${
          isSpeaking
            ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white border-emerald-400 animate-pulse'
            : 'bg-slate-900/90 text-slate-200 hover:text-white border-slate-800 backdrop-blur-md'
        }`}
        title="AI Audio Market Briefing"
      >
        {isSpeaking ? <VolumeX className="w-5 h-5 text-emerald-300" /> : <Volume2 className="w-5 h-5 text-indigo-400" />}
        <span className="text-xs font-bold">
          {isSpeaking ? 'Stop Audio Briefing' : 'AI Audio Briefing'}
        </span>
      </button>
    </div>
  );
}
