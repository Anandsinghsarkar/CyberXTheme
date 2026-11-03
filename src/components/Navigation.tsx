import React from 'react';
import { 
  Home, 
  Sparkles, 
  Sliders, 
  Image, 
  Layers, 
  Settings, 
  Smartphone, 
  Code2, 
  CheckCircle2, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { AppTab } from '../types/theme';
import { playCyberHaptic } from '../utils/audioSynthesizer';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenApplyModal: () => void;
  appliedThemeName: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  onOpenApplyModal,
  appliedThemeName,
}) => {
  const handleTabClick = (tab: AppTab) => {
    playCyberHaptic(900, 'sine', 0.03);
    onTabChange(tab);
  };

  return (
    <>
      {/* Top Bar - Conforming to Top Bar Contract: 
          Zone 1: Single text element wordmark 
          Zone 2: 4-5 single-line clean nav links 
          Zone 3: 1 primary action */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <div 
            onClick={() => handleTabClick('home')}
            className="cursor-pointer text-xl font-black tracking-wider text-white whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-black font-black text-xs shadow-md">
              X
            </div>
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              CYBER THEME X
            </span>
          </div>

          {/* Zone 2: clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleTabClick('home')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'home' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleTabClick('themes')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'themes' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Theme Store
            </button>
            <button
              onClick={() => handleTabClick('home-screens')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'home-screens' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Home Themes
            </button>
            <button
              onClick={() => handleTabClick('widgets')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'widgets' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Widget Studio
            </button>
            <button
              onClick={() => handleTabClick('control-center')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                ['control-center', 'status-bar', 'icons', 'launcher', 'dialer', 'lockscreen', 'edge-lighting', 'fonts', 'sounds', 'animations'].includes(activeTab) ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Customization
            </button>
            <button
              onClick={() => handleTabClick('wallpapers')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'wallpapers' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Wallpapers
            </button>
            <button
              onClick={() => handleTabClick('device-compatibility')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'device-compatibility' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Vivo T2x 5G
            </button>
            <button
              onClick={() => handleTabClick('android-project')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'android-project' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Android Code
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playCyberHaptic(1100, 'sine', 0.06);
                onOpenApplyModal();
              }}
              className="px-4 py-2 text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md hover:shadow-cyan-500/25 whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Theme</span>
            </button>
          </div>
        </div>
      </header>

      {/* Ergonomic Mobile Bottom Navigation Bar (Natural Thumb Zone) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-2xl">
        <div className="grid grid-cols-5 items-center">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Home</span>
          </button>

          <button
            onClick={() => handleTabClick('themes')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'themes' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Themes</span>
          </button>

          <button
            onClick={() => handleTabClick('wallpapers')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'wallpapers' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Image className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Wallpapers</span>
          </button>

          <button
            onClick={() => handleTabClick('control-center')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              ['control-center', 'status-bar', 'icons', 'launcher', 'dialer', 'lockscreen'].includes(activeTab)
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Studio</span>
          </button>

          <button
            onClick={() => handleTabClick('settings')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'settings' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};
