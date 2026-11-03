import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Info, 
  Sun, 
  Battery, 
  Music, 
  Flashlight, 
  Camera, 
  Terminal, 
  Calculator,
  Sliders,
  Palette
} from 'lucide-react';
import { LockScreenConfig } from '../../types/theme';
import { LOCK_SCREEN_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface LockScreenStudioProps {
  currentConfig: LockScreenConfig;
  onUpdateConfig: (config: LockScreenConfig) => void;
  onPreviewInSimulator: (config: LockScreenConfig) => void;
}

export const LockScreenStudio: React.FC<LockScreenStudioProps> = ({
  currentConfig,
  onUpdateConfig,
  onPreviewInSimulator,
}) => {
  const [config, setConfig] = useState<LockScreenConfig>(currentConfig);

  const handleSelectPreset = (preset: LockScreenConfig) => {
    playCyberHaptic(950);
    setConfig(preset);
    onUpdateConfig(preset);
    onPreviewInSimulator(preset);
  };

  const shortcutOptions = [
    { id: 'flashlight', label: 'Flashlight', icon: Flashlight },
    { id: 'camera', label: 'Camera', icon: Camera },
    { id: 'terminal', label: 'Cyber Terminal', icon: Terminal },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
  ];

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-amber-400" />
            <span>Advanced Lock Screen Designer (10+ Designs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure lock screen analog and digital clocks, depth typography, weather cards, and corner shortcuts.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1100);
            onPreviewInSimulator(config);
          }}
          className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          <span>Preview on Vivo T2x 5G Screen</span>
        </button>
      </div>

      {/* Android Security & System Lock Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Android 15 Biometric Security Compliance:</span>
          <p className="text-slate-300 leading-relaxed">
            In compliance with Android 15 Keystore &amp; Biometric security protocols, third-party applications never touch or replace device PIN/fingerprint unlock hardware. CYBER THEME X provides visual Always-On Display (AOD) custom faces, analog chronometers, and lock screen companion widgets.
          </p>
        </div>
      </div>

      {/* 10 Lock Screen Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Lock Screen Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {LOCK_SCREEN_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                config.id === preset.id
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-400 capitalize mt-1">
                {preset.clockStyle.replace('-', ' ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Customization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clock & Widgets */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Clock Typography &amp; Face Style</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Clock Face Style:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cyber-hud', label: 'Cyber Neon HUD' },
                { id: 'analog-classic', label: 'Analog Chronometer' },
                { id: 'material-huge', label: 'Material You 15' },
                { id: 'analog-neon', label: 'Analog Neon Dial' },
                { id: 'nothing-dot', label: 'Nothing Dot Matrix' },
                { id: 'ios-depth', label: 'iOS 18 Depth Clock' },
                { id: 'minimal-line', label: 'Minimalist Line' },
                { id: 'dual-world', label: 'Dual World Traveler' },
              ].map((face) => (
                <button
                  key={face.id}
                  onClick={() => {
                    playCyberHaptic(900);
                    const newConfig = { ...config, clockStyle: face.id as LockScreenConfig['clockStyle'] };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    config.clockStyle === face.id
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {face.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">Lockscreen Weather Pill</span>
            <button
              onClick={() => {
                const newConfig = { ...config, showWeatherWidget: !config.showWeatherWidget };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                config.showWeatherWidget ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {config.showWeatherWidget ? 'Enabled' : 'Hidden'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Lockscreen Music Player Card</span>
            <button
              onClick={() => {
                const newConfig = { ...config, showMusicWidget: !config.showMusicWidget };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                config.showMusicWidget ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {config.showMusicWidget ? 'Enabled' : 'Hidden'}
            </button>
          </div>
        </div>

        {/* Bottom Corner Shortcuts */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Corner Launch Shortcuts</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Bottom Left Corner Shortcut:</label>
            <div className="grid grid-cols-2 gap-2">
              {shortcutOptions.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    const newConfig = { ...config, leftShortcut: sc.id as LockScreenConfig['leftShortcut'] };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    config.leftShortcut === sc.id
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <sc.icon className="w-3.5 h-3.5" />
                  <span>{sc.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Bottom Right Corner Shortcut:</label>
            <div className="grid grid-cols-2 gap-2">
              {shortcutOptions.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    const newConfig = { ...config, rightShortcut: sc.id as LockScreenConfig['rightShortcut'] };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    config.rightShortcut === sc.id
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <sc.icon className="w-3.5 h-3.5" />
                  <span>{sc.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
