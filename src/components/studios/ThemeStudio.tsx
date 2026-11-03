import React, { useState } from 'react';
import { 
  Sparkles, 
  DownloadCloud, 
  UploadCloud, 
  Copy, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Search, 
  Eye, 
  Edit3, 
  Share2, 
  Palette,
  Sliders,
  Layers,
  PhoneCall,
  Lock,
  Download,
  FolderHeart
} from 'lucide-react';
import { ThemePreset } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface ThemeStudioProps {
  themes: ThemePreset[];
  appliedTheme: ThemePreset;
  onApplyTheme: (theme: ThemePreset) => void;
  onPreviewTheme: (theme: ThemePreset) => void;
  onEditTheme: (theme: ThemePreset) => void;
  onDuplicateTheme: (theme: ThemePreset) => void;
  onExportTheme: (theme: ThemePreset) => void;
  onImportTheme: (file: File) => void;
  onToggleFavorite: (themeId: string) => void;
  onResetTheme: (themeId: string) => void;
  onDownloadThemeOffline?: (theme: ThemePreset) => void;
}

export const ThemeStudio: React.FC<ThemeStudioProps> = ({
  themes,
  appliedTheme,
  onApplyTheme,
  onPreviewTheme,
  onEditTheme,
  onDuplicateTheme,
  onExportTheme,
  onImportTheme,
  onToggleFavorite,
  onResetTheme,
  onDownloadThemeOffline,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedSet, setDownloadedSet] = useState<Set<string>>(
    new Set(themes.filter(t => t.isDownloaded).map(t => t.id))
  );

  const categories = [
    'All',
    'Hacker',
    'Gaming',
    'AMOLED',
    'Glass',
    'Minimal',
    'iOS Inspired',
    'Nothing OS',
    'Neon',
    'Premium',
    'User Created'
  ];

  const filteredThemes = themes.filter((theme) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') matchesCategory = true;
    else if (selectedCategory === 'Hacker') matchesCategory = theme.category.toLowerCase().includes('cyber') || theme.name.toLowerCase().includes('hacker');
    else if (selectedCategory === 'Gaming') matchesCategory = theme.category.toLowerCase().includes('gaming');
    else if (selectedCategory === 'AMOLED') matchesCategory = theme.category.toLowerCase().includes('battery') || theme.name.toLowerCase().includes('amoled');
    else if (selectedCategory === 'Glass') matchesCategory = theme.category.toLowerCase().includes('modern') || theme.name.toLowerCase().includes('glass');
    else if (selectedCategory === 'Minimal') matchesCategory = theme.category.toLowerCase().includes('minimal');
    else if (selectedCategory === 'iOS Inspired') matchesCategory = theme.name.toLowerCase().includes('ios');
    else if (selectedCategory === 'Nothing OS') matchesCategory = theme.name.toLowerCase().includes('nothing');
    else if (selectedCategory === 'Neon') matchesCategory = theme.name.toLowerCase().includes('neon');
    else if (selectedCategory === 'Premium') matchesCategory = theme.category.toLowerCase().includes('luxury') || theme.name.toLowerCase().includes('royal') || theme.name.toLowerCase().includes('pro');
    else if (selectedCategory === 'User Created') matchesCategory = theme.id.startsWith('custom-');
    else matchesCategory = theme.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportTheme(e.target.files[0]);
    }
  };

  const handleDownloadOffline = (theme: ThemePreset) => {
    playCyberHaptic(1000);
    setDownloadedSet(prev => new Set(prev).add(theme.id));
    onDownloadThemeOffline?.(theme);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>Theme Store (12 Complete Themes &amp; Categories)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, preview, download, and apply complete Android 15 themes for Vivo T2x 5G AMOLED &amp; Funtouch OS 15.
          </p>
        </div>

        {/* Action Buttons: Import / Export */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 flex items-center gap-1.5 transition-all">
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import .CTX Theme</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={() => onExportTheme(appliedTheme)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 flex items-center gap-1.5 transition-all"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Active</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberHaptic(900);
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search theme store..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredThemes.map((theme) => {
          const isApplied = appliedTheme.id === theme.id;
          const isDownloaded = downloadedSet.has(theme.id);
          return (
            <div
              key={theme.id}
              className={`relative rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isApplied
                  ? 'cyber-glass-active border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'cyber-glass-card hover:border-slate-700'
              }`}
            >
              <div>
                {/* Visual Preview Header */}
                <div 
                  className="w-full h-36 rounded-2xl mb-4 relative overflow-hidden flex flex-col justify-between p-3.5"
                  style={{ background: theme.previewUrl }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      {theme.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playCyberHaptic(700);
                        onToggleFavorite(theme.id);
                      }}
                      className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${theme.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Preview Subsystem Swatches */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: theme.accentColor }} title="Accent Color" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: theme.secondaryColor }} title="Secondary Color" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: theme.surfaceColor }} title="Surface Color" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 font-medium">
                      {(theme.downloads / 1000).toFixed(1)}k Installs
                    </span>
                  </div>
                </div>

                {/* Theme Title & Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white tracking-tight">{theme.name}</h3>
                    {isApplied && (
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {theme.description}
                  </p>
                </div>

                {/* Subsystem Component Badges */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sliders className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">CC: {theme.controlCenterPresetId.replace('cc-', '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Layers className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">Icons: {theme.iconPackId.replace('icon-', '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">Lock: {theme.lockScreenPresetId.replace('ls-', '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <PhoneCall className="w-3 h-3 text-purple-400 shrink-0" />
                    <span className="truncate">Dialer: {theme.dialerPresetId.replace('dialer-', '')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Suite */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playCyberHaptic(1000);
                      onApplyTheme(theme);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-md shadow-cyan-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isApplied ? 'Currently Applied' : 'Apply Theme'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playCyberHaptic(850);
                      onPreviewTheme(theme);
                    }}
                    title="Preview on Vivo T2x 5G Screen"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownloadOffline(theme)}
                    title={isDownloaded ? 'Saved Offline' : 'Download Offline'}
                    className={`p-2 rounded-xl border transition-all ${
                      isDownloaded 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                  <button
                    onClick={() => onDuplicateTheme(theme)}
                    className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" /> Duplicate
                  </button>
                  <button
                    onClick={() => onExportTheme(theme)}
                    className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    <DownloadCloud className="w-3 h-3" /> Export
                  </button>
                  <button
                    onClick={() => onEditTheme(theme)}
                    className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" /> Customize
                  </button>
                  <button
                    onClick={() => onResetTheme(theme.id)}
                    className="hover:text-red-400 flex items-center gap-1 transition-colors"
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
