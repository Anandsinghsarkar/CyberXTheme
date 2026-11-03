import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  BatteryCharging, 
  Signal, 
  Bluetooth, 
  Moon, 
  Sun, 
  Flashlight, 
  Plane, 
  RotateCw, 
  Radio, 
  Camera, 
  Phone, 
  MessageSquare, 
  Settings, 
  Compass, 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  Cast, 
  ShieldCheck, 
  Flame, 
  X, 
  ChevronDown,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  Sliders,
  Folder,
  Activity,
  Terminal,
  Grid
} from 'lucide-react';
import { 
  ThemePreset, 
  HomeScreenTheme,
  ControlCenterConfig, 
  StatusBarConfig, 
  WallpaperItem, 
  IconPackItem, 
  LockScreenConfig, 
  DialerConfig, 
  EdgeLightingConfig, 
  DeviceSpecs,
  WidgetItem 
} from '../types/theme';
import { playCyberHaptic, playDtmfTone } from '../utils/audioSynthesizer';

interface PhoneSimulatorProps {
  theme: ThemePreset;
  homeScreenTheme?: HomeScreenTheme;
  controlCenter: ControlCenterConfig;
  statusBar: StatusBarConfig;
  wallpaper: WallpaperItem;
  iconPack: IconPackItem;
  lockScreen: LockScreenConfig;
  dialer: DialerConfig;
  edgeLighting: EdgeLightingConfig;
  deviceSpecs: DeviceSpecs;
  installedWidgets?: WidgetItem[];
  onApplyTheme?: (theme: ThemePreset) => void;
  activeScreenMode?: 'launcher' | 'control-center' | 'lockscreen' | 'dialer';
  onScreenModeChange?: (mode: 'launcher' | 'control-center' | 'lockscreen' | 'dialer') => void;
  isCompact?: boolean;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  theme,
  homeScreenTheme,
  controlCenter,
  statusBar,
  wallpaper,
  iconPack,
  lockScreen,
  dialer,
  edgeLighting,
  deviceSpecs,
  installedWidgets = [],
  onApplyTheme,
  activeScreenMode = 'launcher',
  onScreenModeChange,
  isCompact = false,
}) => {
  const [screenMode, setScreenMode] = useState<'launcher' | 'control-center' | 'lockscreen' | 'dialer'>(activeScreenMode);
  const [currentTime, setCurrentTime] = useState<string>('17:34');
  const [currentSeconds, setCurrentSeconds] = useState<string>('00');
  const [currentDateStr, setCurrentDateStr] = useState<string>('Wed, Nov 2');
  const [hoursVal, setHoursVal] = useState<number>(17);
  const [minsVal, setMinsVal] = useState<number>(34);
  const [secsVal, setSecsVal] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(activeScreenMode === 'lockscreen');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(true);
  const [musicProgress, setMusicProgress] = useState<number>(45);
  const [brightness, setBrightness] = useState<number>(controlCenter.brightness);
  const [volume, setVolume] = useState<number>(controlCenter.volume);
  const [activeTiles, setActiveTiles] = useState<string[]>(controlCenter.activeTiles);
  const [dialNumber, setDialNumber] = useState<string>('');
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [edgeLightActive, setEdgeLightActive] = useState<boolean>(true);
  const [openedFolder, setOpenedFolder] = useState<{ name: string; apps: string[] } | null>(null);

  // Sync internal mode with external prop
  useEffect(() => {
    setScreenMode(activeScreenMode);
    if (activeScreenMode === 'lockscreen') setIsLocked(true);
    else setIsLocked(false);
  }, [activeScreenMode]);

  // Live Clock updater with analog hand calculations
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();

      setHoursVal(hours);
      setMinsVal(mins);
      setSecsVal(secs);

      if (statusBar.clockFormat === '12h' || statusBar.clockFormat === '12h-sec') {
        hours = hours % 12 || 12;
      }
      const hourStr = String(hours).padStart(2, '0');
      const minStr = String(mins).padStart(2, '0');
      const secStr = String(secs).padStart(2, '0');
      setCurrentTime(`${hourStr}:${minStr}`);
      setCurrentSeconds(secStr);
      setCurrentDateStr(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [statusBar.clockFormat]);

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCalling) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const toggleTile = (tileId: string) => {
    playCyberHaptic(1000, 'sine', 0.04);
    setActiveTiles((prev) =>
      prev.includes(tileId) ? prev.filter((id) => id !== tileId) : [...prev, tileId]
    );
  };

  const handleDialPress = (key: string) => {
    playDtmfTone(key);
    setDialNumber((prev) => (prev.length < 15 ? prev + key : prev));
  };

  const handleStartCall = () => {
    if (!dialNumber) return;
    playCyberHaptic(1200, 'sine', 0.08);
    setIsCalling(true);
  };

  const handleEndCall = () => {
    playCyberHaptic(400, 'triangle', 0.12);
    setIsCalling(false);
  };

  const formatCallTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Quick Launcher Apps
  const launcherApps = [
    { name: 'Phone', icon: Phone, color: '#10b981', action: () => { setScreenMode('dialer'); onScreenModeChange?.('dialer'); } },
    { name: 'Messages', icon: MessageSquare, color: '#38bdf8' },
    { name: 'Camera', icon: Camera, color: '#ec4899' },
    { name: 'Settings', icon: Settings, color: '#94a3b8' },
    { name: 'Music', icon: Music, color: '#f59e0b' },
    { name: 'Vivo 5G', icon: Radio, color: '#8b5cf6' },
    { name: 'Shield', icon: ShieldCheck, color: '#06b6d4' },
    { name: 'Terminal', icon: Terminal, color: '#10b981' },
  ];

  // Icon Shape helper
  const getIconShapeClass = () => {
    switch (iconPack.shape) {
      case 'circle': return 'rounded-full';
      case 'hexagon': return 'rounded-lg rotate-3';
      case 'rounded-rect': return 'rounded-xl';
      case 'teardrop': return 'rounded-2xl rounded-tr-none';
      default: return 'rounded-2xl';
    }
  };

  const tileMeta: Record<string, { label: string; icon: React.ElementType }> = {
    wifi: { label: 'Wi-Fi', icon: Wifi },
    mobile_data: { label: 'Mobile 5G', icon: Radio },
    bluetooth: { label: 'Bluetooth', icon: Bluetooth },
    flashlight: { label: 'Torch', icon: Flashlight },
    airplane: { label: 'Flight', icon: Plane },
    darkmode: { label: 'AMOLED', icon: Moon },
    battery_saver: { label: 'Eco Saver', icon: Battery },
    location: { label: 'Location', icon: Compass },
    autorotate: { label: 'Rotate', icon: RotateCw },
    dnd: { label: 'DND', icon: ShieldCheck },
    screen_record: { label: 'Record', icon: Flame },
    hotspot: { label: 'Hotspot', icon: Cast },
  };

  const orderedTiles = controlCenter.tileOrder || [
    'wifi', 'mobile_data', 'bluetooth', 'flashlight', 'airplane', 
    'darkmode', 'autorotate', 'location', 'battery_saver', 'hotspot', 'dnd', 'screen_record'
  ];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Simulation Screen Mode Switcher */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-3 shadow-lg">
        <button
          onClick={() => {
            playCyberHaptic(750);
            setScreenMode('launcher');
            setIsLocked(false);
            onScreenModeChange?.('launcher');
          }}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
            screenMode === 'launcher' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Home Screen
        </button>
        <button
          onClick={() => {
            playCyberHaptic(850);
            setScreenMode('control-center');
            setIsLocked(false);
            onScreenModeChange?.('control-center');
          }}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
            screenMode === 'control-center' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Control Center
        </button>
        <button
          onClick={() => {
            playCyberHaptic(650);
            setScreenMode('lockscreen');
            setIsLocked(true);
            onScreenModeChange?.('lockscreen');
          }}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
            screenMode === 'lockscreen' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Lock Screen
        </button>
        <button
          onClick={() => {
            playCyberHaptic(950);
            setScreenMode('dialer');
            setIsLocked(false);
            onScreenModeChange?.('dialer');
          }}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
            screenMode === 'dialer' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Dialer
        </button>
      </div>

      {/* Vivo T2x 5G Hardware Chassis */}
      <div 
        className="relative rounded-[46px] p-[10px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border border-slate-600/40 transition-all duration-300"
        style={{
          boxShadow: edgeLightActive 
            ? `0 0 35px -5px ${edgeLighting.colors[0]}60, 0 25px 50px -12px rgba(0, 0, 0, 0.8)` 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          width: isCompact ? '310px' : '360px',
          height: isCompact ? '640px' : '720px',
        }}
      >
        {/* Physical Button Accents */}
        <div className="absolute -right-[13px] top-[140px] w-[3px] h-[48px] bg-slate-600 rounded-r-sm" title="Volume Up/Down" />
        <div className="absolute -right-[13px] top-[204px] w-[3px] h-[36px] bg-slate-600 rounded-r-sm" title="Power / Fingerprint Key" />
        <div className="absolute -left-[13px] top-[150px] w-[3px] h-[32px] bg-slate-600 rounded-l-sm" />

        {/* Outer Bezel */}
        <div className="relative w-full h-full rounded-[38px] bg-black overflow-hidden border-[2px] border-slate-900 flex flex-col justify-between">
          
          {/* Edge Lighting Animated Border Layer */}
          {edgeLightActive && (
            <div 
              className="absolute inset-0 pointer-events-none z-30 rounded-[36px] border-[3px] transition-all duration-700 animate-pulse"
              style={{
                borderColor: edgeLighting.colors[0],
                boxShadow: `inset 0 0 14px ${edgeLighting.colors[0]}80, 0 0 12px ${edgeLighting.colors[1] || edgeLighting.colors[0]}`,
              }}
            />
          )}

          {/* Active Screen Background Wallpaper */}
          <div 
            className="absolute inset-0 -z-10 transition-all duration-500 bg-cover bg-center"
            style={{
              background: homeScreenTheme?.wallpaperGradient || wallpaper.gradient,
              filter: `blur(${wallpaper.blurLevel || 0}px)`,
            }}
          />

          {/* Top Status Bar Container */}
          <div 
            className="relative z-20 w-full pt-2 pb-1 px-4 flex items-center justify-between text-xs tracking-tight transition-all"
            style={{
              backgroundColor: statusBar.backgroundColor,
              color: statusBar.textColor,
            }}
          >
            {/* Left: Clock */}
            <div className="font-semibold text-[13px] tabular-nums tracking-wide">
              {currentTime}
              {(statusBar.clockFormat === '12h-sec' || statusBar.clockFormat === '24h-sec') && (
                <span className="text-[10px] opacity-75 ml-0.5">:{currentSeconds}</span>
              )}
            </div>

            {/* Center: Punch Hole Camera & Dynamic Pill */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
              <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/60" />
              </div>
              <span className="text-[9px] font-mono opacity-80 uppercase tracking-tighter">Vivo T2x</span>
            </div>

            {/* Right: Network & Battery Indicators */}
            <div className="flex items-center gap-1.5">
              {statusBar.showSpeed && (
                <span className="text-[9px] font-mono text-cyan-400 hidden sm:inline">148 KB/s</span>
              )}
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center text-[10px] font-mono font-bold text-emerald-400">
                5G
              </div>
              <div className="flex items-center gap-0.5">
                {statusBar.batteryPercentage !== 'hidden' && (
                  <span className="text-[10px] tabular-nums font-semibold">{deviceSpecs.batteryLevel}%</span>
                )}
                {deviceSpecs.batteryCharging ? (
                  <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Battery className="w-3.5 h-3.5 text-slate-100" />
                )}
              </div>
            </div>
          </div>

          {/* Interactive Screen Body */}
          <div className="relative flex-1 overflow-hidden z-10 flex flex-col justify-between">
            
            {/* --- SCREEN 1: LAUNCHER & HOME SCREEN MODE --- */}
            {screenMode === 'launcher' && (
              <div className="flex-1 flex flex-col justify-between p-3 animate-fadeIn overflow-y-auto custom-scrollbar">
                
                {/* Top Widgets Section */}
                <div className="space-y-2 mt-1">
                  {/* Primary Large Widget (Clock / Weather / Analog) */}
                  <div className="p-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl font-extrabold tracking-tight text-white tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                          {currentTime}
                        </div>
                        <div className="text-[11px] text-slate-300 font-medium">{currentDateStr} · New Delhi</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-300 flex items-center justify-end gap-1">
                          <Sun className="w-3.5 h-3.5 text-amber-400" /> 26°C
                        </div>
                        <div className="text-[10px] text-slate-400">AQI 42 · Good</div>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                      <div className="flex items-center gap-1">
                        <Radio className="w-3 h-3 text-emerald-400" />
                        <span>Funtouch OS 15 · 120Hz</span>
                      </div>
                      <span className="text-cyan-400 font-mono font-medium">Dimensity 6020</span>
                    </div>
                  </div>

                  {/* Secondary Widget Card (Screen Time / Battery Gauge) */}
                  <div className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white">8GB + 8GB RAM</div>
                        <div className="text-[9px] text-slate-400">4.8 GB In Use (Optimal)</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => playCyberHaptic(1100)} 
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-[10px] font-medium border border-cyan-500/40"
                    >
                      Boost
                    </button>
                  </div>
                </div>

                {/* App Grid & Custom Folders */}
                <div className="my-auto py-2">
                  <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 text-center">
                    
                    {/* Render Apps */}
                    {launcherApps.map((app, idx) => {
                      const IconComp = app.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            playCyberHaptic(800 + idx * 50);
                            if (app.action) app.action();
                          }}
                          className="flex flex-col items-center group transition-transform active:scale-95"
                        >
                          <div
                            className={`flex items-center justify-center shadow-md transition-all ${getIconShapeClass()}`}
                            style={{
                              width: `${Math.min(iconPack.iconSize, 52)}px`,
                              height: `${Math.min(iconPack.iconSize, 52)}px`,
                              backgroundColor: iconPack.backgroundColor,
                              borderColor: iconPack.borderColor,
                              borderWidth: '1.5px',
                              boxShadow: iconPack.hasGlow ? `0 0 12px ${theme.accentColor}60` : 'none',
                            }}
                          >
                            <IconComp className="w-5 h-5" style={{ color: iconPack.glyphColor }} />
                          </div>
                          {iconPack.showLabels !== false && (
                            <span 
                              className="text-[10px] font-medium mt-1 truncate max-w-[56px]"
                              style={{ color: iconPack.labelColor || '#e2e8f0' }}
                            >
                              {app.name}
                            </span>
                          )}
                        </button>
                      );
                    })}

                    {/* Render Custom Folders if defined in HomeScreenTheme */}
                    {homeScreenTheme?.folders?.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => {
                          playCyberHaptic(900);
                          setOpenedFolder(folder);
                        }}
                        className="flex flex-col items-center group transition-transform active:scale-95"
                      >
                        <div
                          className="w-[48px] h-[48px] rounded-2xl p-1 bg-black/50 border border-white/15 grid grid-cols-2 gap-1 items-center justify-center shadow-md"
                        >
                          <div className="w-4 h-4 rounded-md bg-white/20" />
                          <div className="w-4 h-4 rounded-md bg-cyan-400/40" />
                          <div className="w-4 h-4 rounded-md bg-emerald-400/40" />
                          <div className="w-4 h-4 rounded-md bg-purple-400/40" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-300 mt-1 truncate max-w-[56px]">
                          {folder.name}
                        </span>
                      </button>
                    ))}

                  </div>
                </div>

                {/* Bottom Dock & Search Bar */}
                <div className="space-y-2 mb-1">
                  {/* Cyber Google Search Pill */}
                  <div className="w-full h-8 px-3 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs text-slate-400 shadow-lg">
                    <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" /> Search apps &amp; web...
                    </span>
                    <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">
                      CYBER
                    </span>
                  </div>

                  {/* Dock 4 pinned apps */}
                  <div 
                    className="h-14 px-3 rounded-2xl backdrop-blur-lg border border-white/10 flex items-center justify-around shadow-xl"
                    style={{ background: homeScreenTheme?.dockBackground || 'rgba(0,0,0,0.5)' }}
                  >
                    <button onClick={() => { setScreenMode('dialer'); playCyberHaptic(800); }} className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button onClick={() => playCyberHaptic(900)} className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button onClick={() => playCyberHaptic(1000)} className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                      <Camera className="w-5 h-5" />
                    </button>
                    <button onClick={() => { setScreenMode('control-center'); playCyberHaptic(1100); }} className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Sliders className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Folder Popup Modal inside Phone Frame */}
                {openedFolder && (
                  <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-lg p-5 flex flex-col items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-[240px] p-4 rounded-3xl bg-slate-900/90 border border-white/15 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Folder className="w-3.5 h-3.5 text-cyan-400" /> {openedFolder.name}
                        </span>
                        <button onClick={() => setOpenedFolder(null)} className="text-slate-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        {openedFolder.apps.map((app, i) => (
                          <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-white/5">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-1">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] text-slate-200 truncate">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --- SCREEN 2: CONTROL CENTER OVERLAY --- */}
            {screenMode === 'control-center' && (
              <div 
                className="flex-1 flex flex-col p-3 overflow-y-auto animate-slideDown custom-scrollbar"
                style={{
                  backgroundColor: controlCenter.backgroundColor,
                  backdropFilter: `blur(${controlCenter.blurIntensity}px)`,
                }}
              >
                {/* Control Center Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white">
                  <div>
                    <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" style={{ color: controlCenter.accentColor }} />
                      <span>{controlCenter.presetName || 'Control Center'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Vivo T2x 5G Quick Actions</div>
                  </div>
                  <button 
                    onClick={() => { playCyberHaptic(600); setScreenMode('launcher'); }}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2 Big Top Cards: Media Player & Connectivity */}
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  {/* Media Deck */}
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Music className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] font-semibold text-white truncate">Resonance</div>
                        <div className="text-[9px] text-slate-400 truncate">Cyber Theme X</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                      <button 
                        onClick={() => { playCyberHaptic(); setIsPlayingMusic(!isPlayingMusic); }}
                        className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-sm"
                      >
                        {isPlayingMusic ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      </button>
                      <button onClick={() => playCyberHaptic(1200)} className="text-slate-300 hover:text-white">
                        <SkipForward className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Battery & Health Card */}
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">5000 mAh</span>
                      <span className="text-[11px] font-bold text-emerald-400">{deviceSpecs.batteryLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden my-1">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${deviceSpecs.batteryLevel}%` }} />
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">Temp: {deviceSpecs.batteryTemperature}</div>
                  </div>
                </div>

                {/* Brightness & Volume Dual Sliders */}
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
                      <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> Brightness</span>
                      <span className="font-mono">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brightness}
                      onChange={(e) => {
                        setBrightness(Number(e.target.value));
                        playCyberHaptic(400 + Number(e.target.value) * 5, 'sine', 0.02);
                      }}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
                      <span className="flex items-center gap-1"><Volume2 className="w-3 h-3 text-cyan-400" /> Volume</span>
                      <span className="font-mono">{volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        playCyberHaptic(300 + Number(e.target.value) * 6, 'sine', 0.02);
                      }}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Quick Toggle Tiles Grid rendered in custom order */}
                <div className="mt-3">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Quick Tiles ({activeTiles.length} Active)
                  </div>
                  <div 
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${controlCenter.gridColumns || 4}, minmax(0, 1fr))` }}
                  >
                    {orderedTiles.map((tileId) => {
                      const meta = tileMeta[tileId] || { label: tileId, icon: Sparkles };
                      const Icon = meta.icon;
                      const isActive = activeTiles.includes(tileId);
                      return (
                        <button
                          key={tileId}
                          onClick={() => toggleTile(tileId)}
                          className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                            isActive
                              ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 shadow-sm'
                              : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <span className="text-[9px] font-medium mt-1 truncate max-w-full">
                            {meta.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* --- SCREEN 3: LOCK SCREEN MODE --- */}
            {screenMode === 'lockscreen' && (
              <div className="flex-1 flex flex-col justify-between p-4 animate-fadeIn">
                {/* Top Clock Section */}
                <div className="text-center mt-6">
                  {lockScreen.clockStyle === 'analog-classic' || lockScreen.clockStyle === 'analog-neon' ? (
                    <div className="inline-block p-4 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-md">
                      <div className="w-24 h-24 rounded-full border-2 border-amber-400 relative mx-auto flex items-center justify-center shadow-lg">
                        <div 
                          className="w-1 h-7 bg-amber-400 absolute bottom-12 origin-bottom rounded-full" 
                          style={{ transform: `rotate(${(hoursVal % 12) * 30 + minsVal * 0.5}deg)` }}
                        />
                        <div 
                          className="w-0.5 h-9 bg-cyan-400 absolute bottom-12 origin-bottom rounded-full"
                          style={{ transform: `rotate(${minsVal * 6}deg)` }}
                        />
                        <div 
                          className="w-0.5 h-10 bg-red-400 absolute bottom-12 origin-bottom rounded-full"
                          style={{ transform: `rotate(${secsVal * 6}deg)` }}
                        />
                        <div className="w-2 h-2 rounded-full bg-white z-10" />
                      </div>
                      <div className="text-xs text-amber-300 font-bold mt-2">{lockScreen.dateFormat}</div>
                    </div>
                  ) : lockScreen.clockStyle === 'cyber-hud' ? (
                    <div className="inline-block p-3 rounded-2xl bg-black/40 border border-emerald-500/30 backdrop-blur-md">
                      <div className="text-4xl font-extrabold tracking-tight tabular-nums" style={{ color: lockScreen.clockColor }}>
                        {currentTime}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400/80 mt-1">
                        {lockScreen.dateFormat}
                      </div>
                    </div>
                  ) : lockScreen.clockStyle === 'nothing-dot' ? (
                    <div className="space-y-0">
                      <div className="text-5xl font-mono font-bold tracking-tight text-white tabular-nums">
                        {currentTime}
                      </div>
                      <div className="text-[11px] font-mono text-red-500 mt-1">
                        {lockScreen.dateFormat}
                      </div>
                    </div>
                  ) : lockScreen.clockStyle === 'material-huge' ? (
                    <div className="space-y-0 leading-none">
                      <div className="text-6xl font-black text-cyan-400 tracking-tighter">
                        {currentTime.split(':')[0]}
                      </div>
                      <div className="text-6xl font-black text-slate-100 tracking-tighter">
                        {currentTime.split(':')[1]}
                      </div>
                      <div className="text-xs text-slate-300 mt-2 font-medium">
                        {lockScreen.dateFormat}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-5xl font-bold tracking-tight text-white">
                        {currentTime}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        {lockScreen.dateFormat}
                      </div>
                    </div>
                  )}

                  {/* Weather & Battery Info Pill */}
                  <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>26°C Clear</span>
                    <span>·</span>
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{deviceSpecs.batteryLevel}%</span>
                  </div>
                </div>

                {/* Lockscreen Notifications Sample Card */}
                <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-left mx-2 shadow-lg">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1 font-semibold text-cyan-400">
                      <MessageSquare className="w-3 h-3" /> Cyber Assistant
                    </span>
                    <span>Just now</span>
                  </div>
                  <div className="text-xs font-semibold text-white">CYBER THEME X Applied</div>
                  <div className="text-[10px] text-slate-300 line-clamp-1">
                    Vivo T2x 5G running Android 15 customized with {theme.name} theme.
                  </div>
                </div>

                {/* Bottom Unlock Swipe & Shortcuts */}
                <div className="space-y-3 pb-1">
                  <button
                    onClick={() => {
                      playCyberHaptic(1000);
                      setIsLocked(false);
                      setScreenMode('launcher');
                    }}
                    className="w-full py-2 flex flex-col items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 animate-bounce rotate-180" />
                    <span className="text-[10px] font-medium tracking-wide">Swipe or Tap to Unlock</span>
                  </button>

                  <div className="flex items-center justify-between px-3">
                    <button 
                      onClick={() => playCyberHaptic(700)}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
                    >
                      <Flashlight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => playCyberHaptic(900)}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- SCREEN 4: DIALER MODE --- */}
            {screenMode === 'dialer' && (
              <div className="flex-1 flex flex-col justify-between p-3 animate-fadeIn bg-slate-950/80 backdrop-blur-lg">
                {isCalling ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-3 animate-pulse">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div className="text-lg font-bold text-white">{dialNumber}</div>
                    <div className="text-xs text-emerald-400 font-mono mt-1">Call Connected · {formatCallTime(callDuration)}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Vivo T2x 5G VoNR HD Voice</div>

                    <div className="grid grid-cols-3 gap-3 my-6 w-full max-w-[240px]">
                      {['Mute', 'Keypad', 'Speaker'].map((action, i) => (
                        <button key={i} onClick={() => playCyberHaptic(800)} className="p-2.5 rounded-xl bg-white/10 text-[10px] text-slate-300">
                          {action}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleEndCall}
                      className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                    >
                      <Phone className="w-6 h-6 rotate-[135deg]" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="pt-2 text-center">
                      <div className="text-2xl font-bold font-mono tracking-wider text-white h-9 flex items-center justify-center">
                        {dialNumber || <span className="text-slate-600 font-sans text-sm">Enter phone number...</span>}
                      </div>
                      {dialNumber && (
                        <button 
                          onClick={() => { playCyberHaptic(500); setDialNumber((prev) => prev.slice(0, -1)); }} 
                          className="text-[10px] text-cyan-400 hover:underline mt-0.5"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 px-3 my-auto">
                      {[
                        { key: '1', sub: '' },
                        { key: '2', sub: 'ABC' },
                        { key: '3', sub: 'DEF' },
                        { key: '4', sub: 'GHI' },
                        { key: '5', sub: 'JKL' },
                        { key: '6', sub: 'MNO' },
                        { key: '7', sub: 'PQRS' },
                        { key: '8', sub: 'TUV' },
                        { key: '9', sub: 'WXYZ' },
                        { key: '*', sub: '' },
                        { key: '0', sub: '+' },
                        { key: '#', sub: '' },
                      ].map((btn) => (
                        <button
                          key={btn.key}
                          onClick={() => handleDialPress(btn.key)}
                          className="h-12 rounded-2xl border transition-all active:scale-95 flex flex-col items-center justify-center"
                          style={{
                            backgroundColor: dialer.buttonBg,
                            borderColor: 'rgba(255,255,255,0.08)',
                            color: dialer.buttonText,
                            boxShadow: dialer.accentGlow !== 'none' ? dialer.accentGlow : 'none',
                          }}
                        >
                          <span className="text-base font-bold leading-none">{btn.key}</span>
                          {btn.sub && <span className="text-[8px] opacity-60 leading-tight">{btn.sub}</span>}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-around pb-2">
                      <button 
                        onClick={() => { playCyberHaptic(700); setScreenMode('launcher'); }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleStartCall}
                        disabled={!dialNumber}
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                          dialNumber ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Phone className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => {
                          playDtmfTone('5');
                          setDialNumber('1800555987');
                        }}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Demo Call
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Android 15 Gesture Navigation Bar Handle */}
          <div className="relative z-20 w-full py-2 flex items-center justify-center bg-black/40">
            <div 
              onClick={() => {
                playCyberHaptic(500);
                setScreenMode('launcher');
              }}
              className="w-28 h-1 rounded-full bg-white/40 hover:bg-white/70 cursor-pointer transition-colors"
              title="Home Gesture Bar (Tap to return Home)"
            />
          </div>

        </div>
      </div>
    </div>
  );
};
