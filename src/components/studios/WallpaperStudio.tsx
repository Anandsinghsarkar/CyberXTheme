import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  DownloadCloud, 
  UploadCloud, 
  Heart, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Sliders, 
  Play, 
  RotateCcw,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { WallpaperItem } from '../../types/theme';
import { WALLPAPER_CATEGORIES } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface WallpaperStudioProps {
  currentWallpaper: WallpaperItem;
  onApplyWallpaper: (wallpaper: WallpaperItem) => void;
  onPreviewInSimulator: (wallpaper: WallpaperItem) => void;
  onToggleFavorite: (wallpaperId: string) => void;
}

export const WallpaperStudio: React.FC<WallpaperStudioProps> = ({
  currentWallpaper,
  onApplyWallpaper,
  onPreviewInSimulator,
  onToggleFavorite,
}) => {
  const [wallpapers, setWallpapers] = useState<WallpaperItem[]>(WALLPAPER_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [blurLevel, setBlurLevel] = useState<number>(currentWallpaper.blurLevel || 0);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(currentWallpaper.isLive || false);
  const [customGradient, setCustomGradient] = useState<string>('linear-gradient(135deg, #020617, #064e3b, #022c22)');

  const categories = [
    'All',
    'AMOLED',
    'Cyberpunk',
    'Hacker',
    'Nature',
    'Abstract',
    'Gaming',
    'Anime',
    'Space',
    'Minimal',
    '3D'
  ];

  const filteredWallpapers = wallpapers.filter((wp) => {
    return selectedCategory === 'All' || wp.category === selectedCategory;
  });

  const handleApply = (wp: WallpaperItem) => {
    playCyberHaptic(1000);
    const updatedWp: WallpaperItem = {
      ...wp,
      blurLevel,
      isLive: isLiveActive,
    };
    onApplyWallpaper(updatedWp);
  };

  const handleDownloadWallpaper = (wp: WallpaperItem) => {
    playCyberHaptic(850);
    // Generate a downloadable canvas image
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 2408; // Vivo T2x 5G FHD+ resolution
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 2408);
      grad.addColorStop(0, '#030712');
      grad.addColorStop(0.5, wp.accentColor);
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 2408);

      // Watermark
      ctx.font = '32px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText(`CYBER THEME X // ${wp.name}`, 80, 2300);

      const a = document.createElement('a');
      a.download = `Vivo_T2x_Wallpaper_${wp.name.replace(/\s+/g, '_')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newWp: WallpaperItem = {
            id: `wp-user-${Date.now()}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            category: 'Abstract',
            gradient: `url(${event.target.result}) center/cover no-repeat`,
            accentColor: '#38bdf8',
            isLive: false,
            isFavorite: true,
          };
          setWallpapers([newWp, ...wallpapers]);
          onApplyWallpaper(newWp);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Palette className="w-6 h-6 text-purple-400" />
            <span>Wallpaper Studio (10+ Categories in 4K & Live)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineered specifically for Vivo T2x 5G 1080x2408 FHD+ display. Supports true AMOLED black, live animated shaders, and canvas blur.
          </p>
        </div>

        {/* Upload Custom Image */}
        <label className="cursor-pointer px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-2 transition-all">
          <UploadCloud className="w-4 h-4" />
          <span>Import Custom Photo</span>
          <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
        </label>
      </div>

      {/* Categories Horizontal Scroller (10 categories) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playCyberHaptic(900);
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-500/25 text-purple-300 border border-purple-400/50 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Adjustments Bar: Blur & Live Wallpaper Engine */}
      <div className="p-4 rounded-2xl cyber-glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Blur slider */}
        <div className="flex items-center gap-3 flex-1 max-w-sm">
          <Sliders className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Dynamic Depth Blur</span>
              <span className="font-mono">{blurLevel} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={blurLevel}
              onChange={(e) => {
                setBlurLevel(Number(e.target.value));
                if (currentWallpaper) {
                  onApplyWallpaper({ ...currentWallpaper, blurLevel: Number(e.target.value) });
                }
              }}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Live Wallpaper Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playCyberHaptic(1000);
              const nextState = !isLiveActive;
              setIsLiveActive(nextState);
              if (currentWallpaper) {
                onApplyWallpaper({ ...currentWallpaper, isLive: nextState });
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isLiveActive
                ? 'bg-purple-500 text-white border-purple-400 shadow-md'
                : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isLiveActive ? 'text-amber-300 fill-current' : ''}`} />
            <span>{isLiveActive ? 'Live Animated Shader Active' : 'Enable Live Wallpaper'}</span>
          </button>
        </div>
      </div>

      {/* Wallpapers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredWallpapers.map((wp) => {
          const isSelected = currentWallpaper.id === wp.id;
          return (
            <div
              key={wp.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                isSelected
                  ? 'border-purple-400 shadow-xl shadow-purple-500/20'
                  : 'border-white/10 hover:border-slate-700'
              }`}
            >
              {/* Wallpaper Canvas Block */}
              <div
                className="w-full aspect-[9/16] relative transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: wp.gradient,
                  filter: `blur(${isSelected ? blurLevel : 0}px)`,
                }}
              >
                {/* Overlay scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                {/* Top badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  <span className="text-[9px] font-semibold text-white px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                    {wp.category}
                  </span>
                  {wp.isLive && (
                    <span className="text-[9px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40">
                      LIVE
                    </span>
                  )}
                </div>

                {/* Hover Action overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 z-20">
                  <button
                    onClick={() => handleApply(wp)}
                    className="w-full py-1.5 px-2 bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </button>
                  <button
                    onClick={() => onPreviewInSimulator(wp)}
                    className="w-full py-1.5 px-2 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleDownloadWallpaper(wp)}
                    className="w-full py-1.5 px-2 bg-slate-900/90 text-slate-300 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span>Save 4K</span>
                  </button>
                </div>
              </div>

              {/* Bottom Card Title */}
              <div className="p-2.5 bg-slate-950/90 border-t border-white/5 flex items-center justify-between">
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{wp.name}</div>
                  <div className="text-[10px] text-slate-400">1080 x 2408 px</div>
                </div>
                <button
                  onClick={() => onToggleFavorite(wp.id)}
                  className="text-slate-400 hover:text-red-400 p-1"
                >
                  <Heart className={`w-3.5 h-3.5 ${wp.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
