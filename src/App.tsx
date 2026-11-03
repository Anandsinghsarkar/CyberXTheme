import React, { useState } from 'react';
import { 
  AppTab, 
  ThemePreset, 
  ControlCenterConfig, 
  StatusBarConfig, 
  WallpaperItem, 
  IconPackItem, 
  LockScreenConfig, 
  DialerConfig, 
  EdgeLightingConfig, 
  FontConfig, 
  SoundPack,
  DeviceSpecs,
  WidgetItem,
  HomeScreenTheme 
} from './types/theme';
import { 
  THEME_PRESETS, 
  HOME_SCREEN_THEMES,
  ADVANCED_WIDGETS,
  CONTROL_CENTER_PRESETS, 
  STATUS_BAR_PRESETS, 
  WALLPAPER_CATEGORIES, 
  ICON_PACKS, 
  LOCK_SCREEN_PRESETS, 
  DIALER_PRESETS, 
  FONT_PRESETS, 
  EDGE_LIGHTING_PRESETS, 
  SOUND_PACKS,
  INITIAL_DEVICE_SPECS 
} from './data/mockData';
import { Navigation } from './components/Navigation';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Dashboard } from './components/dashboard/Dashboard';
import { ThemeStudio } from './components/studios/ThemeStudio';
import { HomeScreenStudio } from './components/studios/HomeScreenStudio';
import { ControlCenterStudio } from './components/studios/ControlCenterStudio';
import { StatusBarStudio } from './components/studios/StatusBarStudio';
import { WallpaperStudio } from './components/studios/WallpaperStudio';
import { IconStudio } from './components/studios/IconStudio';
import { LauncherStudio } from './components/studios/LauncherStudio';
import { LockScreenStudio } from './components/studios/LockScreenStudio';
import { DialerStudio } from './components/studios/DialerStudio';
import { NotificationStudio } from './components/studios/NotificationStudio';
import { FontStudio } from './components/studios/FontStudio';
import { EdgeLightingStudio } from './components/studios/EdgeLightingStudio';
import { WidgetStudio } from './components/studios/WidgetStudio';
import { SoundStudio } from './components/studios/SoundStudio';
import { AnimationStudio } from './components/studios/AnimationStudio';
import { ThemeCreator } from './components/studios/ThemeCreator';
import { DeviceCompatibilityCenter } from './components/studios/DeviceCompatibilityCenter';
import { AndroidProjectViewer } from './components/studios/AndroidProjectViewer';
import { OneClickApplyModal } from './components/studios/OneClickApplyModal';
import { AppSettings } from './components/studios/AppSettings';
import { StorageManager } from './utils/storageManager';
import { Smartphone, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { playCyberHaptic } from './utils/audioSynthesizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [themes, setThemes] = useState<ThemePreset[]>(THEME_PRESETS);
  const [appliedTheme, setAppliedTheme] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [editingTheme, setEditingTheme] = useState<ThemePreset | undefined>(undefined);
  
  // Active Subsystems
  const [controlCenter, setControlCenter] = useState<ControlCenterConfig>(CONTROL_CENTER_PRESETS[0]);
  const [statusBar, setStatusBar] = useState<StatusBarConfig>(STATUS_BAR_PRESETS[4]); // Cyberpunk HUD
  const [wallpaper, setWallpaper] = useState<WallpaperItem>(WALLPAPER_CATEGORIES[4]); // Cipher Digital Cascade
  const [iconPack, setIconPack] = useState<IconPackItem>(ICON_PACKS[9]); // Cyber Hacker
  const [lockScreen, setLockScreen] = useState<LockScreenConfig>(LOCK_SCREEN_PRESETS[8]); // Matrix Code Lock
  const [dialer, setDialer] = useState<DialerConfig>(DIALER_PRESETS[0]); // Cyber Dark
  const [edgeLighting, setEdgeLighting] = useState<EdgeLightingConfig>(EDGE_LIGHTING_PRESETS[0]);
  const [font, setFont] = useState<FontConfig>(FONT_PRESETS[1]); // Cyber JetBrains
  const [soundPack, setSoundPack] = useState<SoundPack>(SOUND_PACKS[0]);
  const [deviceSpecs, setDeviceSpecs] = useState<DeviceSpecs>(INITIAL_DEVICE_SPECS);

  // Simulator Screen Controller
  const [phoneScreenMode, setPhoneScreenMode] = useState<'launcher' | 'control-center' | 'lockscreen' | 'dialer'>('launcher');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [showSimulatorOnMobile, setShowSimulatorOnMobile] = useState<boolean>(false);

  const [activeHomeScreen, setActiveHomeScreen] = useState<HomeScreenTheme>(() => {
    const savedId = StorageManager.getAppliedThemeId(THEME_PRESETS[0].id);
    const matching = HOME_SCREEN_THEMES.find(h => h.id === savedId || h.name.toLowerCase() === savedId.toLowerCase());
    return matching || HOME_SCREEN_THEMES[0];
  });
  const [installedWidgetIds, setInstalledWidgetIds] = useState<string[]>(() => StorageManager.getInstalledWidgetIds());

  // Apply Theme Function
  const handleApplyTheme = (theme: ThemePreset) => {
    setAppliedTheme(theme);
    StorageManager.setAppliedThemeId(theme.id);
    setDeviceSpecs((prev) => ({ ...prev, appliedTheme: theme.name }));

    // Sync matching home screen preset if present
    const matchedHs = HOME_SCREEN_THEMES.find(h => h.id === theme.id || h.name.toLowerCase().includes(theme.name.toLowerCase()));
    if (matchedHs) setActiveHomeScreen(matchedHs);

    // Sync child presets
    const foundWp = WALLPAPER_CATEGORIES.find((w) => w.id === theme.wallpaperId);
    if (foundWp) setWallpaper(foundWp);

    const foundCc = CONTROL_CENTER_PRESETS.find((c) => c.presetId === theme.controlCenterPresetId);
    if (foundCc) setControlCenter(foundCc);

    const foundSb = STATUS_BAR_PRESETS.find((s) => s.presetId === theme.statusBarPresetId);
    if (foundSb) setStatusBar(foundSb);

    const foundIp = ICON_PACKS.find((i) => i.id === theme.iconPackId);
    if (foundIp) setIconPack(foundIp);

    const foundLs = LOCK_SCREEN_PRESETS.find((l) => l.id === theme.lockScreenPresetId);
    if (foundLs) setLockScreen(foundLs);

    const foundDialer = DIALER_PRESETS.find((d) => d.id === theme.dialerPresetId);
    if (foundDialer) setDialer(foundDialer);

    const foundEdge = EDGE_LIGHTING_PRESETS.find((e) => e.id === theme.edgeLightingPresetId);
    if (foundEdge) setEdgeLighting(foundEdge);

    const foundFont = FONT_PRESETS.find((f) => f.id === theme.fontId);
    if (foundFont) setFont(foundFont);
  };

  const handleApplyHomeScreen = (theme: HomeScreenTheme) => {
    setActiveHomeScreen(theme);
    StorageManager.setAppliedThemeId(theme.id);
    const foundWp = WALLPAPER_CATEGORIES.find((w) => w.id === theme.wallpaperId);
    if (foundWp) setWallpaper(foundWp);
    const foundIp = ICON_PACKS.find((i) => i.id === theme.iconPackId);
    if (foundIp) setIconPack(foundIp);
    setPhoneScreenMode('launcher');
  };

  const handlePreviewTheme = (theme: ThemePreset) => {
    handleApplyTheme(theme);
    setPhoneScreenMode('launcher');
  };

  const handleDuplicateTheme = (theme: ThemePreset) => {
    playCyberHaptic(900);
    const duplicated: ThemePreset = {
      ...theme,
      id: `${theme.id}-copy-${Date.now()}`,
      name: `${theme.name} (Copy)`,
      downloads: 0,
      isDownloaded: true,
    };
    setThemes([duplicated, ...themes]);
  };

  const handleExportTheme = (theme: ThemePreset) => {
    playCyberHaptic(950);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(theme, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${theme.name.replace(/\s+/g, '_')}.ctx-theme.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportTheme = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string) as ThemePreset;
        if (imported && imported.name) {
          playCyberHaptic(1200);
          setThemes([imported, ...themes]);
          handleApplyTheme(imported);
        }
      } catch (err) {
        console.error('Import failed', err);
      }
    };
    reader.readAsText(file);
  };

  const handleToggleFavorite = (themeId: string) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === themeId ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  };

  const handleResetTheme = (themeId: string) => {
    const original = THEME_PRESETS.find((t) => t.id === themeId);
    if (original) {
      setThemes((prev) => prev.map((t) => (t.id === themeId ? original : t)));
      if (appliedTheme.id === themeId) {
        handleApplyTheme(original);
      }
    }
  };

  const handleResetAll = () => {
    setThemes(THEME_PRESETS);
    handleApplyTheme(THEME_PRESETS[0]);
    setControlCenter(CONTROL_CENTER_PRESETS[0]);
    setStatusBar(STATUS_BAR_PRESETS[4]);
    setWallpaper(WALLPAPER_CATEGORIES[4]);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans pb-20 md:pb-8 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Bar (One-line Brand, Nav Links, Primary CTA) */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'control-center') setPhoneScreenMode('control-center');
          if (tab === 'lockscreen') setPhoneScreenMode('lockscreen');
          if (tab === 'dialer') setPhoneScreenMode('dialer');
          if (tab === 'launcher') setPhoneScreenMode('launcher');
        }}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
        appliedThemeName={appliedTheme.name}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Active Studio Canvas (8 Cols on Desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {activeTab === 'home' && (
              <Dashboard
                currentTheme={appliedTheme}
                themes={themes}
                deviceSpecs={deviceSpecs}
                onSelectTheme={handlePreviewTheme}
                onApplyTheme={(theme) => {
                  handleApplyTheme(theme);
                  setIsApplyModalOpen(true);
                }}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  if (tab === 'control-center') setPhoneScreenMode('control-center');
                  if (tab === 'lockscreen') setPhoneScreenMode('lockscreen');
                  if (tab === 'dialer') setPhoneScreenMode('dialer');
                  if (tab === 'launcher') setPhoneScreenMode('launcher');
                }}
                onOpenApplyModal={() => setIsApplyModalOpen(true)}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'themes' && (
              <ThemeStudio
                themes={themes}
                appliedTheme={appliedTheme}
                onApplyTheme={(theme) => {
                  handleApplyTheme(theme);
                  setIsApplyModalOpen(true);
                }}
                onPreviewTheme={handlePreviewTheme}
                onEditTheme={(theme) => {
                  setEditingTheme(theme);
                  setActiveTab('theme-creator');
                }}
                onDuplicateTheme={handleDuplicateTheme}
                onExportTheme={handleExportTheme}
                onImportTheme={handleImportTheme}
                onToggleFavorite={handleToggleFavorite}
                onResetTheme={handleResetTheme}
              />
            )}

            {activeTab === 'home-screens' && (
              <HomeScreenStudio
                currentHomeScreen={activeHomeScreen}
                onApplyHomeScreen={handleApplyHomeScreen}
                onPreviewInSimulator={(theme) => {
                  handleApplyHomeScreen(theme);
                  setPhoneScreenMode('launcher');
                }}
                onCustomizeTheme={() => {
                  setActiveTab('launcher');
                }}
                onToggleFavorite={(id) => {
                  StorageManager.toggleFavorite(id);
                }}
              />
            )}

            {activeTab === 'control-center' && (
              <ControlCenterStudio
                currentConfig={controlCenter}
                onUpdateConfig={setControlCenter}
                onApplyConfig={() => {
                  setPhoneScreenMode('control-center');
                  setIsApplyModalOpen(true);
                }}
              />
            )}

            {activeTab === 'status-bar' && (
              <StatusBarStudio
                currentConfig={statusBar}
                onUpdateConfig={setStatusBar}
                onApplyConfig={() => setIsApplyModalOpen(true)}
              />
            )}

            {activeTab === 'wallpapers' && (
              <WallpaperStudio
                currentWallpaper={wallpaper}
                onApplyWallpaper={(wp) => {
                  setWallpaper(wp);
                  setAppliedTheme((prev) => ({ ...prev, wallpaperId: wp.id, previewUrl: wp.gradient }));
                }}
                onPreviewInSimulator={(wp) => {
                  setWallpaper(wp);
                  setPhoneScreenMode('launcher');
                }}
                onToggleFavorite={() => {}}
              />
            )}

            {activeTab === 'icons' && (
              <IconStudio
                currentIconPack={iconPack}
                onApplyIconPack={(pack) => {
                  setIconPack(pack);
                  setPhoneScreenMode('launcher');
                }}
                onPreviewInSimulator={(pack) => {
                  setIconPack(pack);
                  setPhoneScreenMode('launcher');
                }}
              />
            )}

            {activeTab === 'launcher' && (
              <LauncherStudio
                onSwitchToLauncherSimulation={() => setPhoneScreenMode('launcher')}
              />
            )}

            {activeTab === 'lockscreen' && (
              <LockScreenStudio
                currentConfig={lockScreen}
                onUpdateConfig={setLockScreen}
                onPreviewInSimulator={(cfg) => {
                  setLockScreen(cfg);
                  setPhoneScreenMode('lockscreen');
                }}
              />
            )}

            {activeTab === 'dialer' && (
              <DialerStudio
                currentConfig={dialer}
                onUpdateConfig={setDialer}
                onPreviewInSimulator={(cfg) => {
                  setDialer(cfg);
                  setPhoneScreenMode('dialer');
                }}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationStudio
                onTriggerTestNotification={() => {
                  setPhoneScreenMode('launcher');
                }}
              />
            )}

            {activeTab === 'fonts' && (
              <FontStudio
                currentFont={font}
                onApplyFont={setFont}
              />
            )}

            {activeTab === 'edge-lighting' && (
              <EdgeLightingStudio
                currentConfig={edgeLighting}
                onUpdateConfig={setEdgeLighting}
                onApplyConfig={() => setIsApplyModalOpen(true)}
              />
            )}

            {activeTab === 'widgets' && (
              <WidgetStudio
                onAddWidgetToLauncher={(widget) => {
                  const updated = Array.from(new Set([...installedWidgetIds, widget.id]));
                  setInstalledWidgetIds(updated);
                  StorageManager.setInstalledWidgetIds(updated);
                  setPhoneScreenMode('launcher');
                }}
              />
            )}

            {activeTab === 'sounds' && (
              <SoundStudio
                currentSoundPack={soundPack}
                onApplySoundPack={setSoundPack}
              />
            )}

            {activeTab === 'animations' && (
              <AnimationStudio />
            )}

            {activeTab === 'theme-creator' && (
              <ThemeCreator
                initialTheme={editingTheme}
                onSaveCustomTheme={(newTheme) => {
                  setThemes([newTheme, ...themes]);
                  handleApplyTheme(newTheme);
                  setActiveTab('themes');
                }}
                onPreviewTheme={handlePreviewTheme}
              />
            )}

            {activeTab === 'device-compatibility' && (
              <DeviceCompatibilityCenter deviceSpecs={deviceSpecs} />
            )}

            {activeTab === 'android-project' && (
              <AndroidProjectViewer />
            )}

            {activeTab === 'settings' && (
              <AppSettings
                onResetAll={handleResetAll}
                onClearCache={() => {}}
              />
            )}
          </div>

          {/* Right: Live Docked Vivo T2x 5G Simulator (4-5 Cols on Desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20 hidden lg:flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Live Vivo T2x 5G Preview</span>
              </span>
              <span className="text-[10px] text-slate-400">120 Hz AMOLED</span>
            </div>

            <PhoneSimulator
              theme={appliedTheme}
              homeScreenTheme={activeHomeScreen}
              controlCenter={controlCenter}
              statusBar={statusBar}
              wallpaper={wallpaper}
              iconPack={iconPack}
              lockScreen={lockScreen}
              dialer={dialer}
              edgeLighting={edgeLighting}
              deviceSpecs={deviceSpecs}
              installedWidgets={ADVANCED_WIDGETS.filter(w => installedWidgetIds.includes(w.id))}
              activeScreenMode={phoneScreenMode}
              onScreenModeChange={setPhoneScreenMode}
              onApplyTheme={handleApplyTheme}
            />
          </div>

        </div>
      </main>

      {/* Floating Toggle for Mobile Viewport to Open Vivo Simulator */}
      <div className="lg:hidden fixed bottom-18 right-4 z-40">
        <button
          onClick={() => {
            playCyberHaptic(900);
            setShowSimulatorOnMobile(!showSimulatorOnMobile);
          }}
          className="p-3.5 rounded-full bg-cyan-400 text-black shadow-2xl flex items-center gap-2 font-bold text-xs active:scale-95 border border-white/20"
        >
          <Smartphone className="w-4 h-4" />
          <span>{showSimulatorOnMobile ? 'Hide Phone' : 'Vivo T2x Screen'}</span>
        </button>
      </div>

      {/* Mobile Modal for Phone Simulator */}
      {showSimulatorOnMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-full max-w-sm flex justify-end mb-2">
            <button
              onClick={() => setShowSimulatorOnMobile(false)}
              className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-semibold"
            >
              Close Simulator
            </button>
          </div>
          <PhoneSimulator
            theme={appliedTheme}
            homeScreenTheme={activeHomeScreen}
            controlCenter={controlCenter}
            statusBar={statusBar}
            wallpaper={wallpaper}
            iconPack={iconPack}
            lockScreen={lockScreen}
            dialer={dialer}
            edgeLighting={edgeLighting}
            deviceSpecs={deviceSpecs}
            installedWidgets={ADVANCED_WIDGETS.filter(w => installedWidgetIds.includes(w.id))}
            activeScreenMode={phoneScreenMode}
            onScreenModeChange={setPhoneScreenMode}
            isCompact={true}
          />
        </div>
      )}

      {/* One-Click Apply Modal */}
      <OneClickApplyModal
        isOpen={isApplyModalOpen}
        theme={appliedTheme}
        onClose={() => setIsApplyModalOpen(false)}
        onConfirmApply={handleApplyTheme}
      />

    </div>
  );
}
