import React from 'react';
import { 
  Sparkles, 
  Sliders, 
  Battery, 
  BatteryCharging, 
  Cpu, 
  Radio, 
  Smartphone, 
  Layers, 
  Palette, 
  ShieldCheck, 
  ArrowRight, 
  DownloadCloud, 
  Heart, 
  CheckCircle2, 
  Bell, 
  Type, 
  PhoneCall, 
  Lock, 
  Grid, 
  Volume2, 
  Activity, 
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';
import { ThemePreset, DeviceSpecs, AppTab } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface DashboardProps {
  currentTheme: ThemePreset;
  themes: ThemePreset[];
  deviceSpecs: DeviceSpecs;
  onSelectTheme: (theme: ThemePreset) => void;
  onApplyTheme: (theme: ThemePreset) => void;
  onNavigateTab: (tab: AppTab) => void;
  onOpenApplyModal: () => void;
  onToggleFavorite: (themeId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentTheme,
  themes,
  deviceSpecs,
  onSelectTheme,
  onApplyTheme,
  onNavigateTab,
  onOpenApplyModal,
  onToggleFavorite,
}) => {
  // Studio shortcuts
  const studioShortcuts: { id: AppTab; name: string; desc: string; icon: React.ElementType; color: string }[] = [
    { id: 'home-screens', name: 'Home Themes', desc: '10 Complete Home Screen Layouts', icon: Layers, color: '#38bdf8' },
    { id: 'widgets', name: 'Widget Studio', desc: '70+ Widgets across 7 Categories', icon: Grid, color: '#eab308' },
    { id: 'control-center', name: 'Control Center', desc: '10+ Quick Settings Layouts', icon: Sliders, color: '#06b6d4' },
    { id: 'status-bar', name: 'Status Bar', desc: '10+ Clock & Battery Styles', icon: Activity, color: '#10b981' },
    { id: 'wallpapers', name: 'Wallpapers', desc: '10+ Categories in 4K & Live', icon: Palette, color: '#8b5cf6' },
    { id: 'icons', name: 'Icon Studio', desc: '10+ Packs & Custom Morph', icon: Grid, color: '#ec4899' },
    { id: 'launcher', name: 'Launcher', desc: 'Android 15 Native Home', icon: Layers, color: '#3b82f6' },
    { id: 'lockscreen', name: 'Lock Screen', desc: '10+ Depth & Glyph Clocks', icon: Lock, color: '#f59e0b' },
    { id: 'dialer', name: 'Dialer Studio', desc: '10+ Themes with DTMF Audio', icon: PhoneCall, color: '#22c55e' },
    { id: 'notifications', name: 'Notifications', desc: '10+ Glass & Neon Cards', icon: Bell, color: '#f43f5e' },
    { id: 'fonts', name: 'Font Studio', desc: '10+ Vivo Supported Fonts', icon: Type, color: '#a855f7' },
    { id: 'edge-lighting', name: 'Edge Lighting', desc: '10+ Animated RGB Borders', icon: Zap, color: '#00f5ff' },
    { id: 'sounds', name: 'Sound Studio', desc: '10+ Audio Synthesizer Packs', icon: Volume2, color: '#14b8a6' },
    { id: 'animations', name: 'Animations', desc: '10+ Charging & App Speeds', icon: Play, color: '#fb7185' },
    { id: 'theme-creator', name: 'Theme Creator', desc: 'Build Custom Complete Theme', icon: Sparkles, color: '#e11d48' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Banner: Applied Theme Status & Device Snapshot */}
      <div className="relative overflow-hidden rounded-3xl cyber-glass p-6 sm:p-8 border border-cyan-500/20 shadow-2xl">
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: currentTheme.accentColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>ACTIVE SYSTEM PROFILE</span>
              <span className="text-slate-500">/</span>
              <span>VIVO T2X 5G</span>
              <span className="text-slate-500">/</span>
              <span>FUNTOUCH OS 15</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentTheme.name}
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentTheme.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentTheme.accentColor }} />
                <span>{currentTheme.category}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10">
                <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono tabular-nums">{currentTheme.downloads.toLocaleString()}</span> installs
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{currentTheme.rating}</span> / 5.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playCyberHaptic(1000);
                onOpenApplyModal();
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply to Device</span>
            </button>
            <button
              onClick={() => {
                playCyberHaptic(800);
                onNavigateTab('themes');
              }}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm flex items-center gap-2 border border-white/10 transition-all"
            >
              <span>Explore All Themes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Telemetry Cards: Hardware Info, Battery, and Display Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hardware Specs Card */}
        <div className="p-5 rounded-2xl cyber-glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Cpu className="w-4 h-4" /> PROCESSOR & RAM
            </span>
            <span>ARMv8-A</span>
          </div>

          <div>
            <div className="text-base font-bold text-white">MediaTek Dimensity 6020 5G</div>
            <div className="text-xs text-slate-300 mt-0.5">8 GB LPDDR4X + 8 GB Extended RAM</div>
          </div>

          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Storage:</span>
              <div className="font-mono font-medium text-slate-200">128 GB UFS 2.2</div>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">Display:</span>
              <div className="font-mono font-medium text-slate-200">120 Hz FHD+ IPS</div>
            </div>
          </div>
        </div>

        {/* Battery Telemetry Card */}
        <div className="p-5 rounded-2xl cyber-glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Battery className="w-4 h-4" /> 5000 mAh BATTERY
            </span>
            <span className="text-emerald-400 font-bold">{deviceSpecs.batteryLevel}%</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${deviceSpecs.batteryLevel}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{deviceSpecs.batteryCharging ? 'Fast Charging (18W)' : 'Discharging'}</span>
              <span>Temp: {deviceSpecs.batteryTemperature}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
            <span>Health Status:</span>
            <span className="font-medium text-emerald-400">{deviceSpecs.batteryHealth}</span>
          </div>
        </div>

        {/* System OS & Security Card */}
        <div className="p-5 rounded-2xl cyber-glass-card border border-white/10 space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> SYSTEM PERMISSIONS
            </span>
            <span className="text-cyan-400 font-mono">API 35</span>
          </div>

          <div>
            <div className="text-base font-bold text-white">Android 15 · Funtouch OS 15</div>
            <div className="text-xs text-slate-300 mt-0.5">Vivo T2x 5G Model V2225 Verified</div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Background Autostart:</span>
            <span className="text-emerald-400 font-medium">Permitted (iManager)</span>
          </div>
        </div>
      </div>

      {/* Customization Studios Quick Navigation Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Customization Studios (14 Dedicated Studios)</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">10+ Presets Per Studio</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {studioShortcuts.map((studio) => {
            const Icon = studio.icon;
            return (
              <button
                key={studio.id}
                onClick={() => {
                  playCyberHaptic(850);
                  onNavigateTab(studio.id);
                }}
                className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-cyan-500/40 text-left transition-all group active:scale-95 flex flex-col justify-between"
              >
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${studio.color}20`, color: studio.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {studio.name}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {studio.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Themes Carousel / Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Featured 10+ Complete Themes
            </h2>
            <p className="text-xs text-slate-400">
              Each preset bundles wallpapers, custom icons, control center, status bar, and dialer
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('themes')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>View All ({themes.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.slice(0, 6).map((theme) => {
            const isApplied = currentTheme.id === theme.id;
            return (
              <div
                key={theme.id}
                className={`relative rounded-2xl p-4 transition-all duration-200 border flex flex-col justify-between ${
                  isApplied
                    ? 'bg-slate-900/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-white/10 hover:border-slate-700'
                }`}
              >
                {/* Visual Header Gradient */}
                <div 
                  className="w-full h-24 rounded-xl mb-3 flex items-end p-2.5 relative overflow-hidden"
                  style={{ background: theme.previewUrl }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[11px] font-semibold text-white drop-shadow-md">
                      {theme.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playCyberHaptic(700);
                        onToggleFavorite(theme.id);
                      }}
                      className="p-1 rounded-full bg-black/40 text-slate-300 hover:text-red-400"
                    >
                      <Heart className={`w-3.5 h-3.5 ${theme.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{theme.name}</h3>
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> {theme.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      playCyberHaptic(900);
                      onSelectTheme(theme);
                    }}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors text-center"
                  >
                    Preview in Simulator
                  </button>
                  <button
                    onClick={() => {
                      playCyberHaptic(1100);
                      onApplyTheme(theme);
                    }}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      isApplied 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-cyan-500 text-black hover:bg-cyan-400'
                    }`}
                  >
                    {isApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
