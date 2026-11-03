import React, { useState } from 'react';
import { 
  Sliders, 
  Wifi, 
  Bluetooth, 
  Radio, 
  Flashlight, 
  Plane, 
  Moon, 
  Sun, 
  Battery, 
  RotateCw, 
  Compass, 
  ShieldCheck, 
  Flame, 
  Cast, 
  Volume2, 
  Music, 
  Info,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  ArrowUp,
  ArrowDown,
  GripVertical
} from 'lucide-react';
import { ControlCenterConfig } from '../../types/theme';
import { CONTROL_CENTER_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface ControlCenterStudioProps {
  currentConfig: ControlCenterConfig;
  onUpdateConfig: (config: ControlCenterConfig) => void;
  onApplyConfig: () => void;
}

export const ControlCenterStudio: React.FC<ControlCenterStudioProps> = ({
  currentConfig,
  onUpdateConfig,
  onApplyConfig,
}) => {
  const [config, setConfig] = useState<ControlCenterConfig>(currentConfig);
  const [tileList, setTileList] = useState<string[]>(
    config.tileOrder || [
      'wifi', 'mobile_data', 'bluetooth', 'flashlight', 'airplane', 
      'darkmode', 'autorotate', 'location', 'battery_saver', 'hotspot', 'dnd', 'screen_record'
    ]
  );

  const tileShapes: { id: ControlCenterConfig['tileShape']; label: string }[] = [
    { id: 'squircle', label: 'Squircle (iOS/Glass)' },
    { id: 'round', label: 'Circle (Nothing/Android)' },
    { id: 'hexagon', label: 'Hexagon (Cyber)' },
    { id: 'octagon', label: 'Octagon (Tactical)' },
    { id: 'pill', label: 'Pill Shape' },
    { id: 'sharp', label: 'Sharp Rectangle' },
  ];

  const tileMeta: Record<string, { label: string; icon: React.ElementType }> = {
    wifi: { label: 'Wi-Fi 6', icon: Wifi },
    mobile_data: { label: 'Mobile 5G', icon: Radio },
    bluetooth: { label: 'Bluetooth 5.3', icon: Bluetooth },
    flashlight: { label: 'Flashlight', icon: Flashlight },
    airplane: { label: 'Airplane Mode', icon: Plane },
    darkmode: { label: 'AMOLED Black', icon: Moon },
    battery_saver: { label: 'Ultra Battery Saver', icon: Battery },
    location: { label: 'GPS Location', icon: Compass },
    autorotate: { label: 'Auto Rotate', icon: RotateCw },
    dnd: { label: 'Do Not Disturb', icon: ShieldCheck },
    screen_record: { label: 'Screen Recorder', icon: Flame },
    hotspot: { label: 'Personal Hotspot', icon: Cast },
  };

  const handleSelectPreset = (preset: ControlCenterConfig) => {
    playCyberHaptic(950);
    setConfig(preset);
    if (preset.tileOrder) setTileList(preset.tileOrder);
    onUpdateConfig(preset);
  };

  const handleToggleTile = (tileId: string) => {
    playCyberHaptic(1000);
    const updated = config.activeTiles.includes(tileId)
      ? config.activeTiles.filter((t) => t !== tileId)
      : [...config.activeTiles, tileId];
    
    const newConfig = { ...config, activeTiles: updated, tileOrder: tileList };
    setConfig(newConfig);
    onUpdateConfig(newConfig);
  };

  const moveTile = (index: number, direction: 'up' | 'down') => {
    playCyberHaptic(850);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tileList.length) return;
    const reordered = [...tileList];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);
    setTileList(reordered);
    const newConfig = { ...config, tileOrder: reordered };
    setConfig(newConfig);
    onUpdateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <span>Complete Control Center Designer (10 Designs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build custom swipe-down quick toggle layouts with live acrylic blur, tile geometry, and position reordering.
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
          <span>Save &amp; Apply Control Center</span>
        </button>
      </div>

      {/* Android 15 & Vivo Funtouch OS Architecture Notice */}
      <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Supported Android 15 Implementation:</span>
          <p className="text-slate-300 leading-relaxed">
            CYBER THEME X provides an accessible full-overlay Control Center with real volume, brightness, torch, and radio intents, backed by native Android <code className="text-cyan-300">AccessibilityService</code> and <code className="text-cyan-300">TileService</code> shortcuts.
          </p>
        </div>
      </div>

      {/* Preset Selector Bar (10 presets) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Control Center Design (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {CONTROL_CENTER_PRESETS.map((preset) => (
            <button
              key={preset.presetId}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                config.presetId === preset.presetId
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                <span className="text-[10px] font-mono text-slate-400">{preset.gridColumns} cols</span>
              </div>
              <div className="text-xs font-bold text-white truncate">{preset.presetName}</div>
              <div className="text-[10px] text-slate-400 capitalize mt-0.5">{preset.tileShape} tiles</div>
            </button>
          ))}
        </div>
      </div>

      {/* Customization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Visual Geometry & Sliders */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Surface Geometry &amp; Acrylic Blur</span>
          </h2>

          {/* Tile Shape Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Tile Shape:</label>
            <div className="grid grid-cols-3 gap-2">
              {tileShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => {
                    playCyberHaptic(900);
                    const newConfig = { ...config, tileShape: shape.id };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    config.tileShape === shape.id
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Columns */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Grid Columns:</label>
            <div className="flex items-center gap-3">
              {[2, 3, 4].map((cols) => (
                <button
                  key={cols}
                  onClick={() => {
                    playCyberHaptic(900);
                    const newConfig = { ...config, gridColumns: cols as 2 | 3 | 4 };
                    setConfig(newConfig);
                    onUpdateConfig(newConfig);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    config.gridColumns === cols
                      ? 'bg-cyan-500 text-black border-cyan-400'
                      : 'bg-slate-900/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cols} Columns
                </button>
              ))}
            </div>
          </div>

          {/* Blur & Spacing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Acrylic Blur</span>
                <span className="font-mono">{config.blurIntensity}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={config.blurIntensity}
                onChange={(e) => {
                  const newConfig = { ...config, blurIntensity: Number(e.target.value) };
                  setConfig(newConfig);
                  onUpdateConfig(newConfig);
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tile Spacing</span>
                <span className="font-mono">{config.tileSpacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={config.tileSpacing}
                onChange={(e) => {
                  const newConfig = { ...config, tileSpacing: Number(e.target.value) };
                  setConfig(newConfig);
                  onUpdateConfig(newConfig);
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Header Modules */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <label className="text-xs text-slate-300 font-medium">Header Modules:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  const newConfig = { ...config, showMusicPlayer: !config.showMusicPlayer };
                  setConfig(newConfig);
                  onUpdateConfig(newConfig);
                }}
                className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  config.showMusicPlayer ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-white/5 text-slate-400'
                }`}
              >
                Music Card
              </button>
              <button
                onClick={() => {
                  const newConfig = { ...config, showBatteryCard: !config.showBatteryCard };
                  setConfig(newConfig);
                  onUpdateConfig(newConfig);
                }}
                className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  config.showBatteryCard ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-white/5 text-slate-400'
                }`}
              >
                Battery Card
              </button>
              <button
                onClick={() => {
                  const newConfig = { ...config, showSliders: !config.showSliders };
                  setConfig(newConfig);
                  onUpdateConfig(newConfig);
                }}
                className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  config.showSliders ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-white/5 text-slate-400'
                }`}
              >
                Dual Sliders
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tile Layout & Position Reordering */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Tile Position Reordering &amp; Toggles</span>
            </h2>
            <span className="text-[11px] text-slate-400">Order reflects on phone</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
            {tileList.map((tileId, idx) => {
              const meta = tileMeta[tileId] || { label: tileId, icon: Sparkles };
              const Icon = meta.icon;
              const isEnabled = config.activeTiles.includes(tileId);
              return (
                <div
                  key={tileId}
                  className={`p-2.5 rounded-2xl flex items-center justify-between border transition-all ${
                    isEnabled
                      ? 'bg-slate-900/90 border-cyan-500/40 text-white'
                      : 'bg-slate-950/60 border-white/5 text-slate-500'
                  }`}
                >
                  <div 
                    onClick={() => handleToggleTile(tileId)}
                    className="flex items-center gap-3 cursor-pointer flex-1 truncate"
                  >
                    <div className={`p-1.5 rounded-xl ${isEnabled ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{meta.label}</div>
                      <div className="text-[10px] text-slate-400">{isEnabled ? 'Visible in Control Center' : 'Disabled'}</div>
                    </div>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveTile(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveTile(idx, 'down')}
                      disabled={idx === tileList.length - 1}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
