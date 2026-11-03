import React, { useState } from 'react';
import { 
  Activity, 
  Battery, 
  Wifi, 
  Radio, 
  Clock, 
  CheckCircle2, 
  Palette, 
  Layers, 
  Sliders,
  Info
} from 'lucide-react';
import { StatusBarConfig } from '../../types/theme';
import { STATUS_BAR_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface StatusBarStudioProps {
  currentConfig: StatusBarConfig;
  onUpdateConfig: (config: StatusBarConfig) => void;
  onApplyConfig: () => void;
}

export const StatusBarStudio: React.FC<StatusBarStudioProps> = ({
  currentConfig,
  onUpdateConfig,
  onApplyConfig,
}) => {
  const [config, setConfig] = useState<StatusBarConfig>(currentConfig);

  const handleSelectPreset = (preset: StatusBarConfig) => {
    playCyberHaptic(950);
    setConfig(preset);
    onUpdateConfig(preset);
  };

  const batteryStyles: { id: StatusBarConfig['batteryStyle']; label: string }[] = [
    { id: 'horizontal-pill', label: 'Horizontal Pill' },
    { id: 'circle-ring', label: 'Circular Ring' },
    { id: 'vertical-bar', label: 'Vertical Gauge' },
    { id: 'lightning-pill', label: 'Lightning Fast' },
    { id: 'numeric', label: 'Numeric Only' },
  ];

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span>Status Bar Studio (10+ Presets)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize top status bar indicators, clock positioning, network telemetry, and battery styles.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1100);
            onApplyConfig();
          }}
          className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Apply Status Bar</span>
        </button>
      </div>

      {/* Vivo & Android 15 Status Bar Architecture Clarification */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">System Framework Note:</span>
          <p className="text-slate-300 leading-relaxed">
            Status bar styles apply globally across the CYBER THEME X Launcher, immersive in-app views, and preview modes. On Android 15 & Funtouch OS 15, system status bar colors adapt to app window insets using WindowInsetsControllerCompat.
          </p>
        </div>
      </div>

      {/* Preset Picker (10 styles) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Select Status Bar Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {STATUS_BAR_PRESETS.map((preset) => (
            <button
              key={preset.presetId}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                config.presetId === preset.presetId
                  ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{preset.presetName}</div>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{preset.clockFormat}</span>
                <span>·</span>
                <span className="capitalize">{preset.clockPosition}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Customization Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clock & Date Configuration */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Clock & Positioning</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Clock Format:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: '12h', label: '12-Hour (05:34)' },
                { id: '24h', label: '24-Hour (17:34)' },
                { id: '12h-sec', label: '12-Hour + Secs' },
                { id: '24h-sec', label: '24-Hour + Secs' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => {
                    const newConfig = { ...config, clockFormat: fmt.id as StatusBarConfig['clockFormat'] };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    config.clockFormat === fmt.id
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Clock Alignment:</label>
            <div className="grid grid-cols-3 gap-2">
              {['left', 'center', 'right'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    const newConfig = { ...config, clockPosition: pos as 'left' | 'center' | 'right' };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border capitalize text-center transition-all ${
                    config.clockPosition === pos
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Network Speed Toggle */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">Show Real-Time Speed (KB/s)</span>
            <button
              onClick={() => {
                const newConfig = { ...config, showSpeed: !config.showSpeed };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                config.showSpeed ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {config.showSpeed ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Battery & Network Style */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Battery className="w-4 h-4 text-cyan-400" />
            <span>Battery Icon & Gauge</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Battery Icon Preset:</label>
            <div className="grid grid-cols-2 gap-2">
              {batteryStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    const newConfig = { ...config, batteryStyle: style.id };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    config.batteryStyle === style.id
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Battery Percentage Text:</label>
            <div className="grid grid-cols-3 gap-2">
              {['inside', 'outside', 'hidden'].map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    const newConfig = { ...config, batteryPercentage: pct as 'inside' | 'outside' | 'hidden' };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border capitalize text-center transition-all ${
                    config.batteryPercentage === pct
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {pct}
                </button>
              ))}
            </div>
          </div>

          {/* Icon Spacing */}
          <div className="pt-2 border-t border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Status Bar Icon Margin Spacing</span>
              <span className="font-mono">{config.iconSpacing}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={config.iconSpacing}
              onChange={(e) => {
                const newConfig = { ...config, iconSpacing: Number(e.target.value) };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
