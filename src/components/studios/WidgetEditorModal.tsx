import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Sliders, 
  Palette, 
  Type, 
  CheckCircle2, 
  Plus, 
  Layers, 
  Maximize2,
  Eye,
  Save,
  Zap
} from 'lucide-react';
import { WidgetItem, WidgetCustomConfig } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface WidgetEditorModalProps {
  isOpen: boolean;
  widget: WidgetItem | null;
  onClose: () => void;
  onSaveWidget: (customWidget: WidgetItem) => void;
  onInstallToHomeScreen: (widget: WidgetItem) => void;
}

export const WidgetEditorModal: React.FC<WidgetEditorModalProps> = ({
  isOpen,
  widget,
  onClose,
  onSaveWidget,
  onInstallToHomeScreen,
}) => {
  if (!isOpen || !widget) return null;

  const initialConfig: WidgetCustomConfig = widget.customConfig || {
    backgroundType: 'glass',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    transparency: 25,
    cornerRadius: 24,
    blurIntensity: 16,
    fontFamily: "'Outfit', sans-serif",
    fontSize: 'medium',
    textColor: '#ffffff',
    accentColor: '#00f5ff',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    showGlow: true,
  };

  const [size, setSize] = useState<WidgetItem['size']>(widget.size);
  const [title, setTitle] = useState<string>(widget.title);
  const [config, setConfig] = useState<WidgetCustomConfig>(initialConfig);

  const sizes: WidgetItem['size'][] = ['2x1', '2x2', '4x1', '4x2', '4x4'];

  const bgTypes = [
    { id: 'glass', label: 'Frosted Glass' },
    { id: 'amoled-black', label: 'True AMOLED' },
    { id: 'gradient', label: 'Neon Gradient' },
    { id: 'neon-border', label: 'Cyber Neon Border' },
    { id: 'transparent', label: 'Minimal Clear' },
  ] as const;

  const fontOptions = [
    { id: "'Outfit', sans-serif", label: 'Outfit Display' },
    { id: "'Plus Jakarta Sans', sans-serif", label: 'Plus Jakarta' },
    { id: "'JetBrains Mono', monospace", label: 'JetBrains Code' },
  ];

  const handleSave = () => {
    playCyberHaptic(1100);
    const updated: WidgetItem = {
      ...widget,
      id: `w-custom-${Date.now()}`,
      title,
      size,
      customConfig: config,
    };
    onSaveWidget(updated);
    onClose();
  };

  const handleAddToHome = () => {
    playCyberHaptic(1200);
    const updated: WidgetItem = {
      ...widget,
      title,
      size,
      customConfig: config,
      isInstalledOnHome: true,
    };
    onInstallToHomeScreen(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl cyber-glass border border-cyan-500/30 p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Visual Widget Editor</h2>
              <div className="text-xs text-slate-400">Design custom Android 15 AppWidgets</div>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberHaptic(700);
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Widget Preview Box */}
        <div className="p-6 rounded-2xl bg-black/70 border border-white/10 flex flex-col items-center justify-center min-h-[160px]">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Live Render ({size})</div>
          
          <div
            className="transition-all duration-300 p-4 shadow-xl flex flex-col justify-between"
            style={{
              width: size === '2x1' ? '180px' : size === '2x2' ? '180px' : size === '4x1' ? '340px' : size === '4x2' ? '340px' : '340px',
              height: size === '2x1' ? '70px' : size === '4x1' ? '75px' : size === '2x2' ? '170px' : size === '4x2' ? '160px' : '280px',
              backgroundColor: config.backgroundType === 'amoled-black' 
                ? '#000000' 
                : config.backgroundType === 'gradient'
                ? `linear-gradient(135deg, ${config.gradientFrom || '#06b6d4'}, ${config.gradientTo || '#3b82f6'})`
                : config.backgroundColor,
              backdropFilter: `blur(${config.blurIntensity}px)`,
              borderRadius: `${config.cornerRadius}px`,
              borderWidth: `${config.borderWidth}px`,
              borderColor: config.borderColor,
              boxShadow: config.showGlow ? `0 0 20px ${config.accentColor}40` : 'none',
              fontFamily: config.fontFamily,
              color: config.textColor,
            }}
          >
            <div className="flex items-center justify-between text-xs opacity-90">
              <span className="font-bold truncate" style={{ color: config.accentColor }}>{title}</span>
              <span className="text-[10px] opacity-75">{widget.category.toUpperCase()}</span>
            </div>

            <div className="my-auto text-center">
              {widget.category === 'clock' && (
                <div className="text-2xl font-bold tracking-tight">
                  {String(widget.data.time || '17:34')}
                </div>
              )}
              {widget.category === 'battery' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: config.accentColor }}>{String(widget.data.level ?? 84)}%</span>
                  <span className="text-[10px] opacity-80">5000 mAh</span>
                </div>
              )}
              {widget.category === 'weather' && (
                <div>
                  <div className="text-2xl font-bold">{String(widget.data.temp || '26°C')}</div>
                  <div className="text-[10px] opacity-80">{String(widget.data.condition || 'Clear Sky')}</div>
                </div>
              )}
              {widget.category === 'music' && (
                <div>
                  <div className="text-sm font-semibold truncate">{String(widget.data.track || 'Resonance')}</div>
                  <div className="text-[10px] opacity-75">{String(widget.data.artist || 'HOME')}</div>
                </div>
              )}
              {widget.category === 'calendar' && (
                <div>
                  <div className="text-lg font-bold">{String(widget.data.formatted || widget.data.month || '02 Nov')}</div>
                  <div className="text-[10px] opacity-75">Wednesday</div>
                </div>
              )}
              {widget.category === 'statistics' && (
                <div className="text-xs space-y-0.5">
                  <div className="font-mono text-base font-bold" style={{ color: config.accentColor }}>
                    {String(widget.data.total || widget.data.steps || widget.data.cpuUsage || 'Optimal')}
                  </div>
                  <div className="text-[10px] opacity-75">Vivo T2x Active Metric</div>
                </div>
              )}
              {widget.category === 'additional' && (
                <div className="text-xs font-mono opacity-90">
                  {String(widget.data.text || widget.data.placeholder || widget.data.dl || 'Quick Action')}
                </div>
              )}
            </div>

            <div className="text-[9px] opacity-60 text-right">AppWidget · Android 15</div>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Title & Size */}
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Widget Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Widget Grid Dimensions:</label>
              <div className="grid grid-cols-5 gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playCyberHaptic(900);
                      setSize(s);
                    }}
                    className={`py-1.5 rounded-xl font-bold border transition-all ${
                      size === s
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Surface Style:</label>
              <div className="grid grid-cols-2 gap-2">
                {bgTypes.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      playCyberHaptic(900);
                      setConfig({ ...config, backgroundType: bg.id });
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      config.backgroundType === bg.id
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Typography Face:</label>
              <select
                value={config.fontFamily}
                onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                {fontOptions.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sliders & Color Pickers */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Corner Curvature Radius</span>
                <span className="font-mono">{config.cornerRadius} px</span>
              </div>
              <input
                type="range"
                min="8"
                max="36"
                value={config.cornerRadius}
                onChange={(e) => setConfig({ ...config, cornerRadius: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Acrylic Blur Filter</span>
                <span className="font-mono">{config.blurIntensity} px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={config.blurIntensity}
                onChange={(e) => setConfig({ ...config, blurIntensity: Number(e.target.value) })}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-slate-300 font-medium mb-1 block">Accent Color:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-xs text-slate-300">{config.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium mb-1 block">Border Color:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.borderColor.startsWith('#') ? config.borderColor : '#06b6d4'}
                    onChange={(e) => setConfig({ ...config, borderColor: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-xs text-slate-300">Border</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Ambient Neon Aura Glow</span>
              <button
                onClick={() => setConfig({ ...config, showGlow: !config.showGlow })}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  config.showGlow ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {config.showGlow ? 'Glow ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-white/10 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save Custom Widget</span>
          </button>
          <button
            onClick={handleAddToHome}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black text-xs font-extrabold shadow-lg flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Pin Widget to Home Screen</span>
          </button>
        </div>

      </div>
    </div>
  );
};
