import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Type, 
  DownloadCloud, 
  Eye, 
  Save, 
  Copy 
} from 'lucide-react';
import { ThemePreset } from '../../types/theme';
import { 
  CONTROL_CENTER_PRESETS, 
  STATUS_BAR_PRESETS, 
  WALLPAPER_CATEGORIES, 
  ICON_PACKS, 
  FONT_PRESETS,
  LOCK_SCREEN_PRESETS,
  DIALER_PRESETS
} from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface ThemeCreatorProps {
  onSaveCustomTheme: (theme: ThemePreset) => void;
  onPreviewTheme: (theme: ThemePreset) => void;
  initialTheme?: ThemePreset;
}

export const ThemeCreator: React.FC<ThemeCreatorProps> = ({
  onSaveCustomTheme,
  onPreviewTheme,
  initialTheme,
}) => {
  const [themeName, setThemeName] = useState<string>(initialTheme?.name ? `${initialTheme.name} (Custom)` : 'My Cyberpunk Theme');
  const [category, setCategory] = useState<string>(initialTheme?.category || 'Cyberpunk');
  const [accentColor, setAccentColor] = useState<string>(initialTheme?.accentColor || '#06b6d4');
  const [secondaryColor, setSecondaryColor] = useState<string>(initialTheme?.secondaryColor || '#10b981');
  const [wallpaperId, setWallpaperId] = useState<string>(initialTheme?.wallpaperId || WALLPAPER_CATEGORIES[0].id);
  const [iconPackId, setIconPackId] = useState<string>(initialTheme?.iconPackId || ICON_PACKS[0].id);
  const [fontId, setFontId] = useState<string>(initialTheme?.fontId || FONT_PRESETS[0].id);
  const [controlCenterId, setControlCenterId] = useState<string>(initialTheme?.controlCenterPresetId || CONTROL_CENTER_PRESETS[0].presetId);
  const [statusBarId, setStatusBarId] = useState<string>(initialTheme?.statusBarPresetId || STATUS_BAR_PRESETS[0].presetId);
  const [lockScreenId, setLockScreenId] = useState<string>(initialTheme?.lockScreenPresetId || LOCK_SCREEN_PRESETS[0].id);
  const [dialerId, setDialerId] = useState<string>(initialTheme?.dialerPresetId || DIALER_PRESETS[0].id);

  const assembleCurrentTheme = (): ThemePreset => ({
    id: `custom-${Date.now()}`,
    name: themeName || 'Custom Cyber Theme',
    category,
    description: `User-crafted theme with ${accentColor} neon palette tailored for Vivo T2x 5G.`,
    accentColor,
    secondaryColor,
    backgroundColor: '#030712',
    surfaceColor: '#0f172a',
    wallpaperId,
    iconPackId,
    fontId,
    controlCenterPresetId: controlCenterId,
    statusBarPresetId: statusBarId,
    lockScreenPresetId: lockScreenId,
    dialerPresetId: dialerId,
    edgeLightingPresetId: 'edge-cyan',
    previewUrl: `linear-gradient(135deg, #030712 0%, ${accentColor}60 50%, #000000 100%)`,
    downloads: 1,
    rating: 5.0,
    isDownloaded: true,
  });

  const handleSave = () => {
    playCyberHaptic(1100);
    const assembled = assembleCurrentTheme();
    onSaveCustomTheme(assembled);
  };

  const handleExport = () => {
    playCyberHaptic(900);
    const assembled = assembleCurrentTheme();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assembled, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${assembled.name.replace(/\s+/g, '_')}.ctx-theme.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>Theme Creator (Full System Suite)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build your custom theme by composing wallpapers, icon packs, control center styles, and color swatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playCyberHaptic(900);
              onPreviewTheme(assembleCurrentTheme());
            }}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preview in Simulator</span>
          </button>
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Theme</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Identity & Color Palette */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Theme Name & Color Palette</span>
          </h2>

          <div>
            <label className="text-xs text-slate-300 font-medium mb-1 block">Theme Name:</label>
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium mb-1 block">Primary Accent:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-300 uppercase">{accentColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium mb-1 block">Secondary Accent:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-300 uppercase">{secondaryColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium mb-1 block">Theme Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {['Cyberpunk', 'Modern', 'Minimal', 'Gaming', 'Battery Saver', 'Luxury', 'Abstract'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subsystem Preset Assembly */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Component Bundle Selector</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium mb-1 block">Control Center Preset:</label>
              <select
                value={controlCenterId}
                onChange={(e) => setControlCenterId(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {CONTROL_CENTER_PRESETS.map((cc) => (
                  <option key={cc.presetId} value={cc.presetId}>{cc.presetName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium mb-1 block">Icon Pack Style:</label>
              <select
                value={iconPackId}
                onChange={(e) => setIconPackId(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {ICON_PACKS.map((ip) => (
                  <option key={ip.id} value={ip.id}>{ip.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium mb-1 block">Status Bar Style:</label>
              <select
                value={statusBarId}
                onChange={(e) => setStatusBarId(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {STATUS_BAR_PRESETS.map((sb) => (
                  <option key={sb.presetId} value={sb.presetId}>{sb.presetName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium mb-1 block">Lock Screen Face:</label>
              <select
                value={lockScreenId}
                onChange={(e) => setLockScreenId(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {LOCK_SCREEN_PRESETS.map((ls) => (
                  <option key={ls.id} value={ls.id}>{ls.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
