import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Volume2, 
  Eye, 
  Sliders, 
  ShieldCheck,
  Send,
  Zap
} from 'lucide-react';
import { playCyberHaptic, playNotificationChime } from '../../utils/audioSynthesizer';

interface NotificationStudioProps {
  onTriggerTestNotification?: (title: string, message: string) => void;
}

export const NotificationStudio: React.FC<NotificationStudioProps> = ({
  onTriggerTestNotification,
}) => {
  const [activePreset, setActivePreset] = useState<string>('card-glass');
  const [notificationPreview, setNotificationPreview] = useState<{ title: string; body: string; app: string } | null>({
    title: 'Vivo T2x 5G Security Audit',
    body: 'Funtouch OS 15 background service running with optimal 5000 mAh efficiency.',
    app: 'CYBER THEME X Suite',
  });

  const notificationPresets = [
    { id: 'card-glass', name: 'Glass Card', desc: 'Frosted acrylic with specular border' },
    { id: 'card-neon', name: 'Cyber Neon Border', desc: 'Phosphor green reactive border glow' },
    { id: 'card-ios', name: 'iOS Banners', desc: 'Rounded squircle top island drop' },
    { id: 'card-nothing', name: 'Nothing Monochrome', desc: 'Monochrome dot-matrix glyph tag' },
    { id: 'card-amoled', name: 'AMOLED Stealth', desc: 'Pitch black with electric cyan badge' },
    { id: 'card-compact', name: 'Compact Chip', desc: 'Slim pill for minimal screen obstruction' },
    { id: 'card-gaming', name: 'Gaming Hex', desc: 'Angular mechanical gaming token' },
    { id: 'card-minimal', name: 'Minimal Slate', desc: 'Understated matte dark slate card' },
    { id: 'card-gradient', name: 'Gradient Flush', desc: 'Ultraviolet to magenta sunset bleed' },
    { id: 'card-edge', name: 'Edge Glow Card', desc: 'Triggers simultaneous RGB edge flash' },
  ];

  const handleTestTrigger = () => {
    playCyberHaptic(1200);
    playNotificationChime();
    setNotificationPreview({
      title: 'Incoming Encrypted Ping',
      body: 'Vivo T2x 5G 120Hz frame rate stabilized at 119.8 FPS.',
      app: 'Dimensity Telemetry',
    });
    onTriggerTestNotification?.('Incoming Encrypted Ping', 'Vivo T2x 5G 120Hz frame rate stabilized.');
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-rose-400" />
            <span>Notification Studio (10+ Designs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Design heads-up banner notifications, acrylic blur cards, and edge-lighting flash responses.
          </p>
        </div>

        <button
          onClick={handleTestTrigger}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>Trigger Live Test Notification</span>
        </button>
      </div>

      {/* Android NotificationListenerService Policy Notice */}
      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Privacy & Notification Access Rule:</span>
          <p className="text-slate-300 leading-relaxed">
            CYBER THEME X uses Android's <code className="text-rose-300">NotificationListenerService</code> strictly to render custom notification styles on your home screen and edge lighting. The app operates 100% offline and never uploads or logs personal message contents.
          </p>
        </div>
      </div>

      {/* 10 Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Select Notification Card Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {notificationPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                playCyberHaptic(900);
                setActivePreset(preset.id);
              }}
              className={`p-3 rounded-2xl text-left border transition-all ${
                activePreset === preset.id
                  ? 'bg-rose-500/20 border-rose-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{preset.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Notification Card Sandbox */}
      <div className="p-6 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Interactive Banner Preview</span>
          </h2>
          <span className="text-[11px] text-slate-400">Heads-up Dropdown</span>
        </div>

        {notificationPreview && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-cyan-400">
                <Bell className="w-3.5 h-3.5" /> {notificationPreview.app}
              </span>
              <span>Just now</span>
            </div>
            <div className="text-sm font-bold text-white">{notificationPreview.title}</div>
            <div className="text-xs text-slate-300 leading-relaxed">{notificationPreview.body}</div>
          </div>
        )}
      </div>
    </div>
  );
};
