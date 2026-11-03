import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Folder, 
  Eye, 
  Copy, 
  RotateCcw, 
  Save, 
  Clock, 
  Grid, 
  Heart,
  Palette
} from 'lucide-react';
import { HomeScreenTheme } from '../../types/theme';
import { HOME_SCREEN_THEMES } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface HomeScreenStudioProps {
  currentHomeScreen: HomeScreenTheme;
  onApplyHomeScreen: (theme: HomeScreenTheme) => void;
  onPreviewInSimulator: (theme: HomeScreenTheme) => void;
  onCustomizeTheme: (theme: HomeScreenTheme) => void;
  onToggleFavorite: (id: string) => void;
}

export const HomeScreenStudio: React.FC<HomeScreenStudioProps> = ({
  currentHomeScreen,
  onApplyHomeScreen,
  onPreviewInSimulator,
  onCustomizeTheme,
  onToggleFavorite,
}) => {
  const [themes, setThemes] = useState<HomeScreenTheme[]>(HOME_SCREEN_THEMES);
  const [activeTheme, setActiveTheme] = useState<HomeScreenTheme>(currentHomeScreen);

  const handleApply = (theme: HomeScreenTheme) => {
    playCyberHaptic(1100);
    setActiveTheme(theme);
    onApplyHomeScreen(theme);
  };

  const handlePreview = (theme: HomeScreenTheme) => {
    playCyberHaptic(900);
    onPreviewInSimulator(theme);
  };

  const handleResetTheme = (id: string) => {
    playCyberHaptic(700);
    const original = HOME_SCREEN_THEMES.find(t => t.id === id);
    if (original) {
      setThemes(prev => prev.map(t => t.id === id ? original : t));
      if (activeTheme.id === id) {
        setActiveTheme(original);
        onApplyHomeScreen(original);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>Complete Home Screen Theme System (10+ Designs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete launcher compositions pairing custom wallpapers, app icon masks, dock trays, categorized app folders, and widgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-xl">
            Active: {activeTheme.name}
          </span>
        </div>
      </div>

      {/* 10 Complete Home Screen Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {themes.map((theme) => {
          const isSelected = activeTheme.id === theme.id;
          return (
            <div
              key={theme.id}
              className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'cyber-glass-active border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'cyber-glass-card hover:border-slate-700'
              }`}
            >
              <div>
                {/* Visual Preview Header */}
                <div
                  className="w-full h-36 rounded-2xl mb-4 relative overflow-hidden flex flex-col justify-between p-3.5"
                  style={{ background: theme.wallpaperGradient }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      {theme.previewBadge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playCyberHaptic(700);
                        onToggleFavorite(theme.id);
                      }}
                      className="p-1.5 rounded-full bg-black/50 text-slate-300 hover:text-red-400"
                    >
                      <Heart className={`w-4 h-4 ${theme.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Preview Subsystem Details */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <Grid className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{theme.gridColumns}x{theme.gridRows} Grid</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{theme.folders.length} Folders</span>
                    </span>
                  </div>
                </div>

                {/* Theme Title & Meta */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white tracking-tight">{theme.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded">
                        APPLIED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Subsystem Specifications List */}
                <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dock Slots:</span>
                    <span className="font-mono text-cyan-300">{theme.dockAppCount} Apps Pinned</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Custom Folders:</span>
                    <span className="truncate max-w-[150px] text-right font-medium">
                      {theme.folders.map(f => f.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Typography:</span>
                    <span className="font-mono text-emerald-300">{theme.typography.split(',')[0].replace(/'/g, '')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApply(theme)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-md shadow-cyan-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isSelected ? 'Applied to Launcher' : 'Apply Home Theme'}</span>
                  </button>

                  <button
                    onClick={() => handlePreview(theme)}
                    title="Live Preview on Vivo Simulator"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
                  <button
                    onClick={() => onCustomizeTheme(theme)}
                    className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    <Sliders className="w-3 h-3" /> Customize
                  </button>
                  <button
                    onClick={() => handleResetTheme(theme.id)}
                    className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
