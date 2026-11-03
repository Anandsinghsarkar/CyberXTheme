import React, { useState } from 'react';
import { 
  Grid, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  DownloadCloud, 
  UploadCloud, 
  Info,
  Phone, 
  MessageSquare, 
  Camera, 
  Settings, 
  Music, 
  Globe, 
  Video, 
  Image as GalleryIcon, 
  Terminal, 
  Palette,
  Layers,
  Edit2
} from 'lucide-react';
import { IconPackItem } from '../../types/theme';
import { ICON_PACKS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface IconStudioProps {
  currentIconPack: IconPackItem;
  onApplyIconPack: (iconPack: IconPackItem) => void;
  onPreviewInSimulator: (iconPack: IconPackItem) => void;
}

export const IconStudio: React.FC<IconStudioProps> = ({
  currentIconPack,
  onApplyIconPack,
  onPreviewInSimulator,
}) => {
  const [activePack, setActivePack] = useState<IconPackItem>(currentIconPack);
  const [iconSize, setIconSize] = useState<number>(currentIconPack.iconSize || 54);
  const [shape, setShape] = useState<IconPackItem['shape']>(currentIconPack.shape || 'squircle');
  const [hasGlow, setHasGlow] = useState<boolean>(currentIconPack.hasGlow || false);
  const [showLabels, setShowLabels] = useState<boolean>(currentIconPack.showLabels !== false);
  const [labelColor, setLabelColor] = useState<string>(currentIconPack.labelColor || '#e2e8f0');
  const [selectedApp, setSelectedApp] = useState<string>('Phone');
  const [customAppIcons, setCustomAppIcons] = useState<Record<string, string>>(currentIconPack.customAppIcons || {});

  const shapes: { id: IconPackItem['shape']; label: string }[] = [
    { id: 'squircle', label: 'Squircle' },
    { id: 'circle', label: 'Circular' },
    { id: 'rounded-rect', label: 'Rounded Square' },
    { id: 'hexagon', label: 'Cyber Hexagon' },
    { id: 'teardrop', label: 'Teardrop' },
  ];

  const appIconsList = [
    { name: 'Phone', icon: Phone },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Camera', icon: Camera },
    { name: 'Settings', icon: Settings },
    { name: 'Music', icon: Music },
    { name: 'Browser', icon: Globe },
    { name: 'Gallery', icon: GalleryIcon },
    { name: 'Video', icon: Video },
    { name: 'Terminal', icon: Terminal },
  ];

  const handleSelectPreset = (pack: IconPackItem) => {
    playCyberHaptic(950);
    setActivePack(pack);
    setIconSize(pack.iconSize);
    setShape(pack.shape);
    setHasGlow(pack.hasGlow);
    setShowLabels(pack.showLabels !== false);
    if (pack.labelColor) setLabelColor(pack.labelColor);
    onPreviewInSimulator(pack);
  };

  const handleApply = () => {
    playCyberHaptic(1100);
    const updated: IconPackItem = {
      ...activePack,
      iconSize,
      shape,
      hasGlow,
      showLabels,
      labelColor,
      customAppIcons,
    };
    onApplyIconPack(updated);
  };

  const handleCustomGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          playCyberHaptic(1000);
          setCustomAppIcons(prev => ({
            ...prev,
            [selectedApp]: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportPack = () => {
    playCyberHaptic(900);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activePack, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${activePack.name.replace(/\s+/g, '_')}.ctx-iconpack.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const getShapeClasses = (s: IconPackItem['shape']) => {
    switch (s) {
      case 'circle': return 'rounded-full';
      case 'hexagon': return 'rounded-xl rotate-3';
      case 'rounded-rect': return 'rounded-2xl';
      case 'teardrop': return 'rounded-3xl rounded-tr-none';
      default: return 'rounded-2xl';
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Grid className="w-6 h-6 text-pink-400" />
            <span>Advanced Icon Studio (10 Complete Icon Packs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize system launcher icons, shapes, sizes, shadows, labels, and app-wise gallery image overrides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPack}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Icon Pack</span>
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Icon Pack</span>
          </button>
        </div>
      </div>

      {/* 10 Preset Icon Packs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Icon Pack Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {ICON_PACKS.map((pack) => (
            <button
              key={pack.id}
              onClick={() => handleSelectPreset(pack)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                activePack.id === pack.id
                  ? 'bg-pink-500/20 border-pink-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div 
                  className={`w-7 h-7 flex items-center justify-center border ${getShapeClasses(pack.shape)}`}
                  style={{
                    backgroundColor: pack.backgroundColor,
                    borderColor: pack.borderColor,
                    color: pack.glyphColor,
                  }}
                >
                  <Phone className="w-3.5 h-3.5" />
                </div>
                {pack.hasGlow && <span className="text-[9px] font-mono text-pink-400">GLOW</span>}
              </div>
              <div className="text-xs font-bold text-white truncate">{pack.name}</div>
              <div className="text-[10px] text-slate-400 capitalize">{pack.shape}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Morphing Editor & App-Wise Customizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Morphology Controls */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-pink-400" />
            <span>Icon Geometry, Size &amp; Labels</span>
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Icon Mask Geometry:</label>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playCyberHaptic(900);
                    setShape(s.id);
                  }}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    shape === s.id
                      ? 'bg-pink-500/25 border-pink-400 text-pink-300'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Icon Scale Size</span>
              <span className="font-mono">{iconSize} px</span>
            </div>
            <input
              type="range"
              min="42"
              max="68"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-full accent-pink-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">Display App Text Labels</span>
            <button
              onClick={() => {
                playCyberHaptic(900);
                setShowLabels(!showLabels);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                showLabels ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {showLabels ? 'Labels ON' : 'Hidden'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Neon Ambient Glow Aura</span>
            <button
              onClick={() => {
                playCyberHaptic(1000);
                setHasGlow(!hasGlow);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                hasGlow ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {hasGlow ? 'Glow ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* App-Wise Icon Customization & Gallery Importer */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>App-Wise Icon Customization</span>
            </h2>
            <span className="text-[11px] text-slate-400">Select app to override</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
            {appIconsList.map((app) => (
              <button
                key={app.name}
                onClick={() => {
                  playCyberHaptic(850);
                  setSelectedApp(app.name);
                }}
                className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                  selectedApp === app.name
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <app.icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{app.name}</span>
              </button>
            ))}
          </div>

          {/* Override controls for selected app */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Override Icon for: <span className="text-cyan-400">{selectedApp}</span></span>
              {customAppIcons[selectedApp] && (
                <button
                  onClick={() => {
                    const next = { ...customAppIcons };
                    delete next[selectedApp];
                    setCustomAppIcons(next);
                  }}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Remove Override
                </button>
              )}
            </div>

            <label className="cursor-pointer w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
              <GalleryIcon className="w-4 h-4 text-pink-400" />
              <span>Upload Gallery Image for {selectedApp}</span>
              <input type="file" accept="image/*" onChange={handleCustomGalleryUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
