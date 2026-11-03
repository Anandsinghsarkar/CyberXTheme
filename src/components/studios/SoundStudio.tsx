import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Music, 
  Bell, 
  Smartphone, 
  UploadCloud, 
  Heart,
  Sliders
} from 'lucide-react';
import { SoundPack } from '../../types/theme';
import { SOUND_PACKS } from '../../data/mockData';
import { playRingtoneMelody, playNotificationChime, playCyberHaptic } from '../../utils/audioSynthesizer';

interface SoundStudioProps {
  currentSoundPack?: SoundPack;
  onApplySoundPack?: (pack: SoundPack) => void;
}

export const SoundStudio: React.FC<SoundStudioProps> = ({
  currentSoundPack = SOUND_PACKS[0],
  onApplySoundPack,
}) => {
  const [activePack, setActivePack] = useState<SoundPack>(currentSoundPack);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePreviewRingtone = (pack: SoundPack) => {
    setPlayingId(pack.id + '-ring');
    playRingtoneMelody(pack.ringtoneNotes);
    setTimeout(() => setPlayingId(null), 1800);
  };

  const handlePreviewNotification = (pack: SoundPack) => {
    setPlayingId(pack.id + '-notif');
    playNotificationChime(pack.notificationNotes);
    setTimeout(() => setPlayingId(null), 800);
  };

  const handlePreviewKeyClick = (pack: SoundPack) => {
    playCyberHaptic(pack.keyClickFreq, 'sine', 0.05);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Volume2 className="w-6 h-6 text-teal-400" />
            <span>Sound Studio (10+ Audio Synthesizer Packs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized ringtones, notification chirps, and haptic mechanical key clicks rendered with Web Audio API.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1100);
            onApplySoundPack?.(activePack);
          }}
          className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Apply Active Sound Pack</span>
        </button>
      </div>

      {/* Sound Packs Grid (10 sound packs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SOUND_PACKS.map((pack) => {
          const isSelected = activePack.id === pack.id;
          return (
            <div
              key={pack.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'cyber-glass-active border-teal-400 shadow-xl shadow-teal-500/10'
                  : 'cyber-glass-card hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {pack.category}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-teal-400">ACTIVE</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-1">{pack.name}</h3>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="truncate flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {pack.ringtoneName}
                    </span>
                    <button
                      onClick={() => handlePreviewRingtone(pack)}
                      className="px-2 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-[10px] font-bold hover:bg-teal-500/30 flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{playingId === pack.id + '-ring' ? 'Playing' : 'Ring'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="truncate flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {pack.notificationName}
                    </span>
                    <button
                      onClick={() => handlePreviewNotification(pack)}
                      className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30 flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{playingId === pack.id + '-notif' ? 'Playing' : 'Chime'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 text-[11px]">Key Click ({pack.keyClickFreq} Hz)</span>
                    <button
                      onClick={() => handlePreviewKeyClick(pack)}
                      className="px-2 py-1 rounded-lg bg-white/10 text-slate-200 text-[10px] font-medium hover:bg-white/20"
                    >
                      Test Click
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  playCyberHaptic(950);
                  setActivePack(pack);
                  onApplySoundPack?.(pack);
                }}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-black shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {isSelected ? 'Applied Sound Profile' : 'Select Sound Pack'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
