import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Sliders, 
  Grid, 
  Compass, 
  Settings, 
  CheckCircle2, 
  Info, 
  ChevronRight,
  Search,
  ExternalLink
} from 'lucide-react';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface LauncherStudioProps {
  onSwitchToLauncherSimulation: () => void;
}

export const LauncherStudio: React.FC<LauncherStudioProps> = ({
  onSwitchToLauncherSimulation,
}) => {
  const [gridSize, setGridSize] = useState<'4x5' | '4x6' | '5x6'>('4x5');
  const [dockCount, setDockCount] = useState<number>(4);
  const [swipeDownAction, setSwipeDownAction] = useState<string>('Control Center');
  const [doubleTapAction, setDoubleTapAction] = useState<string>('Lock Screen');
  const [searchEngine, setSearchEngine] = useState<string>('Cyber Quick Search');

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-400" />
            <span>Launcher Studio (Native Android 15 Home)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure desktop grid dimensions, bottom dock count, gesture navigation triggers, and app drawer behavior.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1000);
            onSwitchToLauncherSimulation();
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Compass className="w-4 h-4" />
          <span>Launch Interactive Sandbox</span>
        </button>
      </div>

      {/* Vivo T2x 5G Default Home App Setup Guide */}
      <div className="p-5 rounded-3xl bg-blue-950/30 border border-blue-500/30 space-y-3">
        <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
          <span>How to Set CYBER THEME X as Default Home App on Vivo T2x 5G:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-slate-300 pt-1">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 1</span>
            Open <strong>Settings</strong> on your Vivo phone.
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 2</span>
            Go to <strong>Apps</strong> &gt; <strong>Default apps</strong>.
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 3</span>
            Select <strong>Home app</strong>.
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 4</span>
            Choose <strong>CYBER THEME X Launcher</strong>.
          </div>
        </div>
      </div>

      {/* Launcher Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desktop Grid & Dock */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Grid className="w-4 h-4 text-blue-400" />
            <span>Home Screen Grid & Dock Geometry</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Desktop App Grid Layout:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['4x5', '4x6', '5x6'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    playCyberHaptic(900);
                    setGridSize(g);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    gridSize === g
                      ? 'bg-blue-500 text-black border-blue-400'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {g} Grid
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Bottom Dock App Slots:</label>
            <div className="flex items-center gap-3">
              {[4, 5, 6].map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    playCyberHaptic(900);
                    setDockCount(count);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    dockCount === count
                      ? 'bg-blue-500/25 border-blue-400 text-blue-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {count} Apps Dock
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Search Bar Provider:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Cyber Quick Search', 'Google Search Bar'].map((provider) => (
                <button
                  key={provider}
                  onClick={() => {
                    playCyberHaptic(900);
                    setSearchEngine(provider);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    searchEngine === provider
                      ? 'bg-blue-500/25 border-blue-400 text-blue-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gestures Navigation Mapping */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Gesture Navigation Actions</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5">
              <div>
                <div className="font-semibold text-white">Swipe Down on Home</div>
                <div className="text-[11px] text-slate-400">Triggers custom Control Center</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-1 rounded-lg">
                {swipeDownAction}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5">
              <div>
                <div className="font-semibold text-white">Swipe Up on Home</div>
                <div className="text-[11px] text-slate-400">Opens complete App Drawer</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-1 rounded-lg">
                App Drawer
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5">
              <div>
                <div className="font-semibold text-white">Double Tap Blank Space</div>
                <div className="text-[11px] text-slate-400">Instant Screen Off / Lock</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-1 rounded-lg">
                {doubleTapAction}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/5">
              <div>
                <div className="font-semibold text-white">Pinch Inwards</div>
                <div className="text-[11px] text-slate-400">Desktop Pages Overview</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-1 rounded-lg">
                Page Manager
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
