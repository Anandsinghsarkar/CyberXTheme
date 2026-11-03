export type AppTab = 
  | 'home' 
  | 'themes' 
  | 'home-screens'
  | 'control-center' 
  | 'status-bar' 
  | 'wallpapers' 
  | 'icons' 
  | 'launcher' 
  | 'lockscreen' 
  | 'dialer' 
  | 'notifications' 
  | 'fonts' 
  | 'edge-lighting' 
  | 'widgets' 
  | 'widget-editor'
  | 'sounds' 
  | 'animations' 
  | 'theme-creator' 
  | 'device-compatibility' 
  | 'android-project' 
  | 'settings';

export interface ThemePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  accentColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  wallpaperId: string;
  iconPackId: string;
  fontId: string;
  controlCenterPresetId: string;
  statusBarPresetId: string;
  lockScreenPresetId: string;
  dialerPresetId: string;
  edgeLightingPresetId: string;
  previewUrl: string;
  downloads: number;
  rating: number;
  isFavorite?: boolean;
  isDownloaded?: boolean;
  homeScreenThemeId?: string;
}

export interface HomeScreenTheme {
  id: string;
  name: string;
  description: string;
  wallpaperId: string;
  wallpaperGradient: string;
  iconPackId: string;
  clockWidgetId: string;
  secondaryWidgetId: string;
  musicWidgetId?: string;
  gridColumns: 4 | 5;
  gridRows: 5 | 6;
  dockAppCount: number;
  dockBackground: string;
  folders: {
    id: string;
    name: string;
    color: string;
    apps: string[];
  }[];
  accentColor: string;
  textColor: string;
  typography: string;
  spacing: 'compact' | 'normal' | 'relaxed';
  previewBadge: string;
  isFavorite?: boolean;
}

export interface ControlCenterConfig {
  presetId: string;
  presetName: string;
  tileShape: 'squircle' | 'round' | 'octagon' | 'pill' | 'hexagon' | 'sharp';
  gridColumns: 2 | 3 | 4;
  tileSpacing: number; // px
  blurIntensity: number; // px
  transparency: number; // 0 - 100%
  accentColor: string;
  backgroundColor: string;
  tileActiveColor: string;
  tileInactiveColor: string;
  brightness: number; // 0 - 100%
  volume: number; // 0 - 100%
  showMusicPlayer: boolean;
  showBatteryCard: boolean;
  showNetworkInfo: boolean;
  showSliders: boolean;
  activeTiles: string[];
  tileOrder?: string[];
  borderStyle?: 'none' | 'subtle' | 'neon' | 'glass';
  shadowEffect?: 'none' | 'soft' | 'glow' | 'deep';
}

export interface StatusBarConfig {
  presetId: string;
  presetName: string;
  clockFormat: '12h' | '24h' | '12h-sec' | '24h-sec';
  clockPosition: 'left' | 'center' | 'right';
  batteryStyle: 'horizontal-pill' | 'circle-ring' | 'vertical-bar' | 'numeric' | 'lightning-pill';
  batteryPercentage: 'inside' | 'outside' | 'hidden';
  networkStyle: '5g-standard' | 'cyber-bars' | 'dot-matrix' | 'numeric-speed';
  wifiStyle: 'curved-waves' | 'cyber-arcs' | 'dots' | 'minimal-bars';
  iconSpacing: number; // 1 - 5
  backgroundColor: string;
  textColor: string;
  showSpeed: boolean;
}

export interface WallpaperItem {
  id: string;
  name: string;
  category: 'AMOLED' | 'Cyberpunk' | 'Hacker' | 'Nature' | 'Abstract' | 'Gaming' | 'Anime' | 'Space' | 'Minimal' | '3D';
  gradient: string;
  canvasPattern?: string;
  accentColor: string;
  isLive?: boolean;
  isFavorite?: boolean;
  blurLevel?: number;
}

export interface IconPackItem {
  id: string;
  name: string;
  description: string;
  shape: 'squircle' | 'circle' | 'rounded-rect' | 'hexagon' | 'teardrop';
  iconSize: number; // 40 - 72
  borderColor: string;
  backgroundColor: string;
  glyphColor: string;
  hasGlow: boolean;
  cornerRadius?: number;
  shadow?: string;
  showLabels?: boolean;
  labelColor?: string;
  customAppIcons?: Record<string, string>;
}

export interface LockScreenConfig {
  id: string;
  name: string;
  clockStyle: 
    | 'cyber-hud' 
    | 'material-huge' 
    | 'nothing-dot' 
    | 'ios-depth' 
    | 'minimal-line' 
    | 'dual-world' 
    | 'analog-classic' 
    | 'analog-neon' 
    | 'analog-minimal' 
    | 'split-vertical';
  clockColor: string;
  dateFormat: string;
  batteryStyle: 'gauge' | 'text' | 'bar';
  showMusicWidget: boolean;
  showWeatherWidget: boolean;
  leftShortcut: 'flashlight' | 'dialer' | 'camera' | 'calculator' | 'terminal';
  rightShortcut: 'camera' | 'search' | 'terminal' | 'settings' | 'calculator';
  wallpaperGradient: string;
}

export interface DialerConfig {
  id: string;
  name: string;
  keypadStyle: 'cyber-glass' | 'ios-circular' | 'matrix-green' | 'amoled-dark' | 'rgb-neon' | 'nothing-dots';
  buttonBg: string;
  buttonText: string;
  callButtonBg: string;
  accentGlow: string;
}

export interface EdgeLightingConfig {
  id: string;
  name: string;
  colors: string[];
  animationType: 'continuous-glow' | 'snake-chase' | 'breathe-pulse' | 'rgb-rainbow' | 'dual-collision';
  speed: number; // 1 - 5
  thickness: number; // 2 - 12 px
  cornerRadius: number;
}

export interface FontConfig {
  id: string;
  name: string;
  category: string;
  fontFamily: string;
  sampleText: string;
  previewClass: string;
}

export interface WidgetCustomConfig {
  backgroundType: 'glass' | 'amoled-black' | 'gradient' | 'neon-border' | 'transparent';
  backgroundColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  transparency: number; // 0 - 100%
  cornerRadius: number; // 8 - 36 px
  blurIntensity: number; // 0 - 30 px
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  textColor: string;
  accentColor: string;
  borderColor: string;
  borderWidth: number; // 0 - 3 px
  showGlow: boolean;
}

export interface WidgetItem {
  id: string;
  name: string;
  category: 'clock' | 'calendar' | 'battery' | 'music' | 'weather' | 'statistics' | 'additional';
  size: '2x1' | '2x2' | '4x1' | '4x2' | '4x4';
  title: string;
  subType?: string;
  data: Record<string, any>;
  customConfig?: WidgetCustomConfig;
  isFavorite?: boolean;
  isInstalledOnHome?: boolean;
}

export interface SoundPack {
  id: string;
  name: string;
  category: string;
  ringtoneName: string;
  notificationName: string;
  keyClickFreq: number;
  ringtoneNotes: number[];
  notificationNotes: number[];
}

export interface DeviceSpecs {
  model: string;
  brand: string;
  osVersion: string;
  funtouchVersion: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  display: string;
  refreshRate: string;
  network: string;
  camera: string;
  appliedTheme: string;
  batteryLevel: number;
  batteryCharging: boolean;
  batteryTemperature: string;
  batteryHealth: string;
}
