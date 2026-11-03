import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  BatteryCharging, 
  Bell, 
  Play, 
  RotateCcw,
  Palette
} from 'lucide-react';
import { EdgeLightingConfig } from '../../types/theme';
import { EDGE_LIGHTING_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface EdgeLightingStudioProps {
  currentConfig: EdgeLightingConfig;
  onUpdateConfig: (config: EdgeLightingConfig) => void;
  onApplyConfig: () => void;
}

export const EdgeLightingStudio: React.FC<EdgeLightingStudioProps> = ({
  currentConfig,
  onUpdateConfig,
  onApplyConfig,
}) => {
  const [config, setConfig] = useState<EdgeLightingConfig>(currentConfig);
  const [chargingAnimationActive, setChargingAnimationActive] = useState<boolean>(false);

  const handleSelectPreset = (preset: EdgeLightingConfig) => {
    playCyberHaptic(950);
    setConfig(preset);
    onUpdateConfig(preset);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span>RGB & Edge Lighting Studio (10+ Presets)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic perimeter glows, incoming call sweeps, and 5000 mAh fast charging animations.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1100);
            onApplyConfig();
          }}
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Apply Edge Lighting</span>
        </button>
      </div>

      {/* 10 RGB Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Edge Lighting Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {EDGE_LIGHTING_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                config.id === preset.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                {preset.colors.map((c, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="text-xs font-bold text-white truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-400 capitalize mt-0.5">{preset.animationType.replace('-', ' ')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Controls & Animated Simulation Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders: Thickness, Speed & Triggers */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Border Thickness & Speed</span>
          </h2>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Neon Border Thickness</span>
              <span className="font-mono">{config.thickness} px</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              value={config.thickness}
              onChange={(e) => {
                const newConfig = { ...config, thickness: Number(e.target.value) };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Glow Pulse Velocity</span>
              <span className="font-mono">{config.speed}x Speed</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={config.speed}
              onChange={(e) => {
                const newConfig = { ...config, speed: Number(e.target.value) };
                setConfig(newConfig);
                onUpdateConfig(newConfig);
              }}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Trigger scenarios */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <label className="text-xs text-slate-300 font-medium">Automatic Activation Triggers:</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  playCyberHaptic(900);
                  setChargingAnimationActive(!chargingAnimationActive);
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                  chargingAnimationActive ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 border-white/5 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-1.5"><BatteryCharging className="w-3.5 h-3.5" /> Fast Charging</span>
                <span className="text-[10px] font-mono">{chargingAnimationActive ? 'ON' : 'OFF'}</span>
              </button>
              <div className="p-2.5 rounded-xl border bg-cyan-500/20 text-cyan-300 border-cyan-500/40 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5" /> Notifications</span>
                <span className="text-[10px] font-mono">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas Border Preview */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-xs text-slate-400 mb-3">Live Frame Aura Simulation</div>
          
          <div
            className="w-56 h-80 rounded-[36px] bg-slate-950 flex flex-col items-center justify-center p-4 transition-all duration-300 relative"
            style={{
              borderWidth: `${config.thickness}px`,
              borderColor: config.colors[0],
              boxShadow: `0 0 25px ${config.colors[0]}90, inset 0 0 16px ${config.colors[1] || config.colors[0]}60`,
            }}
          >
            {chargingAnimationActive ? (
              <div className="text-center space-y-2 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white">18W Fast Charge</div>
                <div className="text-xs text-emerald-400 font-mono">87% · Turbo Active</div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">{config.name}</div>
                <div className="text-[10px] text-slate-400">Vivo T2x 5G AMOLED Edge</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
