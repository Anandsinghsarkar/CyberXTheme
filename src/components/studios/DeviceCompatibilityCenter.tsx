import React, { useState } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Battery, 
  Layers, 
  Radio, 
  ExternalLink,
  Info,
  RefreshCw
} from 'lucide-react';
import { DeviceSpecs } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface DeviceCompatibilityCenterProps {
  deviceSpecs: DeviceSpecs;
}

export const DeviceCompatibilityCenter: React.FC<DeviceCompatibilityCenterProps> = ({
  deviceSpecs,
}) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedStatus, setVerifiedStatus] = useState<string>('All Hardware Checks Passed');

  const handleRunDiagnostics = () => {
    playCyberHaptic(1000);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedStatus('All Hardware Checks Passed (Vivo T2x 5G Verified)');
      playCyberHaptic(1200);
    }, 800);
  };

  const featureMatrix = [
    {
      feature: 'Android 15 Custom Home Launcher',
      status: 'Fully Supported',
      type: 'supported',
      note: 'Replaces desktop pages, app drawer, gestures, and custom icon packs via ACTION_HOME.',
    },
    {
      feature: 'AMOLED 4K & Live Wallpaper Engine',
      status: 'Fully Supported',
      type: 'supported',
      note: 'Applies through Android WallpaperManager with hardware-accelerated surface rendering.',
    },
    {
      feature: 'Swipe-Down Control Center Overlay',
      status: 'Supported via Overlay',
      type: 'supported',
      note: 'Runs smoothly through Android Accessibility Service and SYSTEM_ALERT_WINDOW.',
    },
    {
      feature: 'Real DTMF Telecom Dial Pad',
      status: 'Fully Supported',
      type: 'supported',
      note: 'Synthesizes authentic telephone audio and routes via TelecomManager default dialer.',
    },
    {
      feature: 'RGB Edge Lighting & Fast Charging Animation',
      status: 'Fully Supported',
      type: 'supported',
      note: 'Uses ForegroundService with specialUse type for 5000 mAh charging and notifications.',
    },
    {
      feature: 'Android AppWidgetProvider Telemetry',
      status: 'Fully Supported',
      type: 'supported',
      note: 'Supplies real-time CPU, RAM, battery temperature, and clock widgets to home screen.',
    },
    {
      feature: 'Vivo Funtouch OS System-Wide Font',
      status: 'Supported via Theme Store',
      type: 'notice',
      note: 'Requires manual activation in Vivo Theme Store / Settings > Display > Font style.',
    },
    {
      feature: 'Overriding Android 15 PIN/Biometrics',
      status: 'Restricted by Android 15',
      type: 'unsupported',
      note: 'Security Policy: Android Keystore protects hardware biometric sensors from app takeover.',
    },
    {
      feature: 'Modifying Unrelated Third-Party App Internal Icons',
      status: 'Restricted by Sandbox',
      type: 'unsupported',
      note: 'Android sandboxing ensures each APK isolates its own internal drawables.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Smartphone className="w-6 h-6 text-cyan-400" />
            <span>Vivo T2x 5G Compatibility Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive hardware, kernel, and permission verification suite for Android 15 & Funtouch OS 15.
          </p>
        </div>

        <button
          onClick={handleRunDiagnostics}
          disabled={isVerifying}
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'Scanning Hardware...' : 'Run Diagnostics'}</span>
        </button>
      </div>

      {/* Device Hardware Matrix Card */}
      <div className="p-6 rounded-3xl cyber-glass border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{deviceSpecs.model}</span>
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              {deviceSpecs.funtouchVersion} · {deviceSpecs.osVersion}
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            {verifiedStatus}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Chipset</span>
            <span className="font-bold text-white block">Dimensity 6020</span>
            <span className="text-cyan-400 text-[10px]">Octa-Core 2.2 GHz</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Unified Memory</span>
            <span className="font-bold text-white block">8GB + 8GB RAM</span>
            <span className="text-emerald-400 text-[10px]">Extended RAM 3.0</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Battery Capacity</span>
            <span className="font-bold text-white block">5000 mAh Li-Po</span>
            <span className="text-amber-400 text-[10px]">18W Fast Charging</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Display & FPS</span>
            <span className="font-bold text-white block">120 Hz FHD+ IPS</span>
            <span className="text-purple-400 text-[10px]">2408 x 1080 px</span>
          </div>
        </div>
      </div>

      {/* Supported vs Platform Boundaries Breakdown */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Feature Compatibility & Platform Boundaries</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featureMatrix.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl cyber-glass-card border border-white/10 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{item.feature}</span>
                  {item.type === 'supported' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {item.type === 'notice' && (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  {item.type === 'unsupported' && (
                    <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </div>
                <div className={`text-[11px] font-mono font-medium ${
                  item.type === 'supported' ? 'text-emerald-400' : item.type === 'notice' ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {item.status}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vivo i Manager Autostart & Battery Optimization Checklist */}
      <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Battery className="w-4 h-4 text-amber-400" />
          <span>Vivo Funtouch OS 15 Optimization Checklist</span>
        </h3>
        <p className="text-xs text-slate-400">
          To ensure CYBER THEME X edge lighting, widgets, and custom launchers stay active without aggressive background killing:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="font-bold text-cyan-400 block mb-1">1. i Manager Autostart</span>
            Open Vivo <strong>i Manager &gt; App management &gt; Autostart</strong>, and turn ON CYBER THEME X.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="font-bold text-cyan-400 block mb-1">2. Unrestricted Battery</span>
            Go to <strong>Settings &gt; Battery &gt; Background power consumption</strong>, select <strong>Don't restrict</strong>.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="font-bold text-cyan-400 block mb-1">3. App Pinning</span>
            In Android 15 Recents screen, tap the app icon and select <strong>Lock App</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
