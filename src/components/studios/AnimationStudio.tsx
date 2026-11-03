import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Zap, 
  RotateCcw, 
  Gauge, 
  BatteryCharging 
} from 'lucide-react';
import { ANIMATION_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

export const AnimationStudio: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>('anim-warp');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleTestAnimation = () => {
    playCyberHaptic(1000);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 900 / speedMultiplier);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Play className="w-6 h-6 text-rose-400" />
            <span>Animation Studio (10+ Presets)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure system motion curves, charging ring rotational velocity, and 120Hz display fluidity.
          </p>
        </div>

        <button
          onClick={handleTestAnimation}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Trigger Motion Test</span>
        </button>
      </div>

      {/* Global Speed & Reduce Motion Toggles */}
      <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-rose-400" />
          <div>
            <div className="text-xs font-bold text-white">System Window Animation Scale</div>
            <div className="text-[11px] text-slate-400">Controls Vivo T2x 5G transition speed</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[0.5, 1.0, 1.5, 2.0].map((s) => (
            <button
              key={s}
              onClick={() => {
                playCyberHaptic(900);
                setSpeedMultiplier(s);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                speedMultiplier === s
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}

          <button
            onClick={() => {
              playCyberHaptic(1000);
              setReduceMotion(!reduceMotion);
            }}
            className={`ml-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              reduceMotion ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-900 border-white/5 text-slate-400'
            }`}
          >
            {reduceMotion ? 'Reduce Motion ON' : 'Full Motion (120Hz)'}
          </button>
        </div>
      </div>

      {/* 10 Animation Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {ANIMATION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              playCyberHaptic(900);
              setActivePreset(preset.id);
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all ${
              activePreset === preset.id
                ? 'bg-rose-500/20 border-rose-400 text-white shadow-md'
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold text-white truncate">{preset.name}</div>
            <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">{preset.desc}</div>
          </button>
        ))}
      </div>

      {/* Visual Sandbox Box */}
      <div className="p-8 rounded-3xl cyber-glass-card border border-white/10 flex flex-col items-center justify-center min-h-[220px]">
        <div
          className={`w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-400 border border-white/20 shadow-2xl flex items-center justify-center text-black font-extrabold text-sm transition-all ${
            isAnimating ? 'scale-125 rotate-12 shadow-rose-500/50' : 'scale-100 rotate-0'
          }`}
          style={{
            transitionDuration: `${reduceMotion ? '0.01s' : `${0.4 / speedMultiplier}s`}`,
            transitionTimingFunction: ANIMATION_PRESETS.find((p) => p.id === activePreset)?.curve || 'ease',
          }}
        >
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="text-xs text-slate-400 mt-4">Click "Trigger Motion Test" above to execute curve</span>
      </div>
    </div>
  );
};
