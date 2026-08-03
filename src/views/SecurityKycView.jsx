import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertOctagon,
  Key,
  Globe,
  Trash2
} from 'lucide-react';

export default function SecurityKycView({ state }) {
  const { user } = state;
  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);
  const [biometrics, setBiometrics] = useState(user.biometricsEnabled);
  const [sessions, setSessions] = useState(user.activeSessions);

  const handleRevokeSession = (ip) => {
    setSessions(prev => prev.filter(s => s.ip !== ip));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-400" /> Enterprise Security & KYC Compliance Center
        </h2>
        <p className="text-xs text-slate-400">
          Bank-grade 256-bit encryption, biometric authentication, and global KYC/AML compliance monitoring.
        </p>
      </div>

      {/* KYC Status & Security Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">KYC Verification</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-white">{user.kycStatus}</h3>
          <p className="text-[11px] text-slate-400">Unlocks unlimited FX transfers & high-tier startup allocations.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">2-Factor Authentication</span>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded transition ${
                twoFactor ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-400 bg-slate-800'
              }`}
            >
              {twoFactor ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
          <h3 className="text-lg font-extrabold text-white">Google Authenticator</h3>
          <p className="text-[11px] text-slate-400">Requires 6-digit TOTP token for all wire transfers and withdrawals.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biometric Auth</span>
            <button
              onClick={() => setBiometrics(!biometrics)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded transition ${
                biometrics ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-400 bg-slate-800'
              }`}
            >
              {biometrics ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
          <h3 className="text-lg font-extrabold text-white">FaceID / TouchID</h3>
          <p className="text-[11px] text-slate-400">Hardware-backed passkey authentication enabled.</p>
        </div>

      </div>

      {/* Active Sessions Manager */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-indigo-400" /> Active Login Sessions
        </h3>
        <div className="divide-y divide-slate-800/80">
          {sessions.map((s, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  {s.device} {s.current && <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">Current Device</span>}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{s.location} • IP: {s.ip}</p>
              </div>

              {!s.current && (
                <button
                  onClick={() => handleRevokeSession(s.ip)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                  title="Revoke Session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-400" /> Immutable Security Audit Logs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Security Event</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {user.auditLogs.map((log, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-semibold text-white">{log.event}</td>
                  <td className="px-4 py-3 text-[11px] text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
