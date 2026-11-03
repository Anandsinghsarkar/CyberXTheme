import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Palette, 
  Lock, 
  PhoneCall, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { ThemePreset } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface OneClickApplyModalProps {
  isOpen: boolean;
  theme: ThemePreset;
  onClose: () => void;
  onConfirmApply: (theme: ThemePreset) => void;
}

export const OneClickApplyModal: React.FC<OneClickApplyModalProps> = ({
  isOpen,
  theme,
  onClose,
  onConfirmApply,
}) => {
  const [step, setStep] = useState<'review' | 'permissions' | 'applying' | 'success'>('review');
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([
    'wallpaper',
    'overlay',
    'launcher',
  ]);

  if (!isOpen) return null;

  const componentsToApply = [
    { name: '4K AMOLED Wallpaper', id: 'wallpaper', status: 'Supported by WallpaperManager', icon: Palette, supported: true },
    { name: 'Custom Hexagon / Squircle Icon Pack', id: 'icons', status: 'Supported by Launcher', icon: Layers, supported: true },
    { name: 'Control Center Quick Settings Overlay', id: 'control_center', status: 'Supported via Accessibility Service', icon: Sliders, supported: true },
    { name: 'Telecom DTMF Dial Pad Theme', id: 'dialer', status: 'Supported via Telecom Intent', icon: PhoneCall, supported: true },
    { name: 'Lock Screen Always-On Display Face', id: 'lockscreen', status: 'Supported AOD Companion', icon: Lock, supported: true },
    { name: 'Android 15 PIN / Biometric Hardware', id: 'pin', status: 'Restricted by Android Keystore (Protected)', icon: ShieldCheck, supported: false },
  ];

  const handleStartApply = () => {
    playCyberHaptic(950);
    setStep('applying');
    setTimeout(() => {
      playCyberHaptic(1200);
      setStep('success');
      onConfirmApply(theme);
    }, 1200);
  };

  const handleClose = () => {
    playCyberHaptic(700);
    setStep('review');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl cyber-glass border border-cyan-500/30 p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">One-Click Apply System</h2>
              <div className="text-xs text-slate-400">Target Device: Vivo T2x 5G · Android 15</div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: REVIEW COMPONENTS */}
        {step === 'review' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl shrink-0" 
                style={{ background: theme.previewUrl }} 
              />
              <div className="truncate">
                <div className="text-sm font-bold text-white truncate">{theme.name}</div>
                <div className="text-xs text-slate-300">{theme.category} Preset</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Components to be Applied:</label>
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                {componentsToApply.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={comp.id}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${comp.supported ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="font-medium text-white truncate">{comp.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-medium ${comp.supported ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {comp.supported ? 'Supported' : 'Sandbox Guarded'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep('permissions')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Continue to Permissions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PERMISSIONS CHECKLIST */}
        {step === 'permissions' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-300">
              CYBER THEME X requests only the minimum required Android 15 permissions.
            </div>

            <div className="space-y-2 text-xs">
              {[
                { id: 'wallpaper', label: 'Set System Wallpaper (SET_WALLPAPER)', required: true },
                { id: 'overlay', label: 'Draw Control Center Overlay (SYSTEM_ALERT_WINDOW)', required: true },
                { id: 'launcher', label: 'Home Screen Icon Replacement (ACTION_HOME)', required: true },
                { id: 'notification', label: 'Edge Lighting Glow on Ping (NOTIFICATION_LISTENER)', required: false },
              ].map((perm) => (
                <div
                  key={perm.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
                >
                  <div className="truncate">
                    <div className="font-semibold text-white">{perm.label}</div>
                    <div className="text-[10px] text-slate-400">{perm.required ? 'Required for full UI' : 'Optional'}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    GRANTED
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartApply}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Theme Configuration Now</span>
            </button>
          </div>
        )}

        {/* STEP 3: APPLYING PROGRESS */}
        {step === 'applying' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
            <div className="text-sm font-bold text-white">Applying Theme to Vivo T2x 5G...</div>
            <div className="text-xs text-slate-400">Updating Room Database and DataStore preferences</div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="py-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Theme Applied Successfully!</div>
              <div className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                {theme.name} is now active on your Vivo T2x 5G. The phone simulator immediately reflects your complete personalization.
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-all"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
