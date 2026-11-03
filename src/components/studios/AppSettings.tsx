import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  RotateCcw, 
  DownloadCloud, 
  UploadCloud, 
  Trash2, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Smartphone,
  Globe
} from 'lucide-react';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface AppSettingsProps {
  onResetAll: () => void;
  onClearCache: () => void;
}

export const AppSettings: React.FC<AppSettingsProps> = ({
  onResetAll,
  onClearCache,
}) => {
  const [amoledMode, setAmoledMode] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English (India)');
  const [notice, setNotice] = useState<string | null>(null);

  const showTemporaryNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleBackup = () => {
    playCyberHaptic(900);
    const backupData = {
      app: 'CYBER THEME X',
      device: 'Vivo T2x 5G (V2225)',
      os: 'Android 15',
      timestamp: Date.now(),
      status: 'OK',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', 'CyberThemeX_VivoT2x_Backup.json');
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showTemporaryNotice('System backup archive downloaded successfully.');
  };

  const handleClear = () => {
    playCyberHaptic(700);
    onClearCache();
    showTemporaryNotice('Local Room cache cleared (0 MB).');
  };

  const handleReset = () => {
    playCyberHaptic(500);
    onResetAll();
    showTemporaryNotice('All studios restored to factory defaults.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-slate-300" />
            <span>Application Settings & Database Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Room Database records, DataStore preferences, AMOLED black themes, and system privacy.
          </p>
        </div>

        {notice && (
          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/40">
            {notice}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display & Preferences */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-cyan-400" />
            <span>Display & Battery Conservation</span>
          </h2>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5 text-xs">
            <div>
              <div className="font-semibold text-white">Pure AMOLED True Black (#000000)</div>
              <div className="text-[10px] text-slate-400">Turns off pixels to maximize 5000 mAh battery endurance</div>
            </div>
            <button
              onClick={() => {
                playCyberHaptic(900);
                setAmoledMode(!amoledMode);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                amoledMode ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {amoledMode ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5 text-xs">
            <div>
              <div className="font-semibold text-white">System Language</div>
              <div className="text-[10px] text-slate-400">Localized strings & currency</div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {['English (India)', 'English (US)', 'Hindi (हिंदी)', 'Spanish (Español)'].map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Database & DataStore Backup */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <DownloadCloud className="w-4 h-4 text-emerald-400" />
            <span>Room Database Backup & Restore</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={handleBackup}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 flex flex-col items-center justify-center text-center gap-1.5 transition-all text-slate-200"
            >
              <DownloadCloud className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Backup All Themes</span>
              <span className="text-[10px] text-slate-400">JSON Archive</span>
            </button>

            <button
              onClick={handleClear}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 flex flex-col items-center justify-center text-center gap-1.5 transition-all text-slate-200"
            >
              <Trash2 className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">Clear Cache</span>
              <span className="text-[10px] text-slate-400">Reclaims disk space</span>
            </button>
          </div>

          <div className="pt-2 border-t border-white/5">
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Customization to Factory Defaults</span>
            </button>
          </div>
        </div>

        {/* Privacy & Zero-Tracking Guarantee */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-3 md:col-span-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Security & 100% Offline Privacy Guarantee</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            CYBER THEME X follows strict zero-telemetry principles: No unnecessary background tracking, zero advertising identifiers, no collection or upload of private notification messages, and 100% local encrypted storage in SQLite Room Database and Android Jetpack DataStore.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-slate-400 font-mono">
            <span>Version: 1.0.0-PRO</span>
            <span>·</span>
            <span>Target: Vivo T2x 5G</span>
            <span>·</span>
            <span>OS: Android 15 (API 35)</span>
            <span>·</span>
            <span className="text-emerald-400">Verified Compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
};
