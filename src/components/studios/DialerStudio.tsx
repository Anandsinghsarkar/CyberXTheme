import React, { useState } from 'react';
import { 
  PhoneCall, 
  Sparkles, 
  Phone, 
  Search, 
  User, 
  CheckCircle2, 
  Info, 
  Volume2, 
  Eye, 
  Clock, 
  Star,
  Sliders
} from 'lucide-react';
import { DialerConfig } from '../../types/theme';
import { DIALER_PRESETS } from '../../data/mockData';
import { playDtmfTone, playCyberHaptic } from '../../utils/audioSynthesizer';

interface DialerStudioProps {
  currentConfig: DialerConfig;
  onUpdateConfig: (config: DialerConfig) => void;
  onPreviewInSimulator: (config: DialerConfig) => void;
}

export const DialerStudio: React.FC<DialerStudioProps> = ({
  currentConfig,
  onUpdateConfig,
  onPreviewInSimulator,
}) => {
  const [config, setConfig] = useState<DialerConfig>(currentConfig);
  const [dialText, setDialText] = useState<string>('');
  const [searchContact, setSearchContact] = useState<string>('');

  const sampleContacts = [
    { name: 'Aarav Sharma', number: '+91 98765 43210', type: 'Mobile · Vivo 5G', favorite: true },
    { name: 'Cyber Support Desk', number: '1800 555 9876', type: 'Toll Free · 24/7', favorite: true },
    { name: 'Neha Verma', number: '+91 91234 56789', type: 'Mobile', favorite: false },
    { name: 'Rohan Gupta', number: '+91 94567 12345', type: 'Work · Tech Lead', favorite: false },
    { name: 'Vikram Singh', number: '+91 99887 66554', type: 'Home', favorite: false },
  ];

  const handleSelectPreset = (preset: DialerConfig) => {
    playCyberHaptic(950);
    setConfig(preset);
    onUpdateConfig(preset);
    onPreviewInSimulator(preset);
  };

  const handlePressKey = (key: string) => {
    playDtmfTone(key);
    setDialText((prev) => (prev.length < 14 ? prev + key : prev));
  };

  const filteredContacts = sampleContacts.filter(
    (c) => c.name.toLowerCase().includes(searchContact.toLowerCase()) || c.number.includes(searchContact)
  );

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <PhoneCall className="w-6 h-6 text-emerald-400" />
            <span>Dialer Studio (10+ Themes with DTMF Audio)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineered with Web Audio dual-tone multi-frequency (DTMF) synthesis and Android Telecom API integration.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(1100);
            onPreviewInSimulator(config);
          }}
          className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          <span>Test in Vivo T2x 5G Screen</span>
        </button>
      </div>

      {/* Android Telecom API Explanation */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Android Telecom Subsystem Compliance:</span>
          <p className="text-slate-300 leading-relaxed">
            Actual phone calls on Android 15 & Vivo Funtouch OS are handled strictly via standard Telecom framework intents (<code className="text-emerald-400">Intent.ACTION_CALL</code> or <code className="text-emerald-400">Intent.ACTION_DIAL</code>) or by registering CYBER THEME X as the system Default Phone App.
          </p>
        </div>
      </div>

      {/* 10 Dialer Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Dialer Preset (10 Options):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {DIALER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                config.id === preset.id
                  ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-400 capitalize mt-1">
                {preset.keypadStyle.replace('-', ' ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Dialer Sandbox & Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive Keypad with Real DTMF Audio */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Interactive DTMF Synthesizer Pad</span>
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono">Web Audio Active</span>
          </div>

          {/* Number Display */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 text-center">
            <div className="text-2xl font-mono font-bold tracking-wider text-white h-8 flex items-center justify-center">
              {dialText || <span className="text-slate-600 font-sans text-xs">Tap keys below for audio...</span>}
            </div>
            {dialText && (
              <button
                onClick={() => setDialText('')}
                className="text-[10px] text-cyan-400 hover:underline mt-1"
              >
                Clear Number
              </button>
            )}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 py-1">
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
            ].map((b) => (
              <button
                key={b.key}
                onClick={() => handlePressKey(b.key)}
                className="h-14 rounded-2xl border transition-all active:scale-95 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: config.buttonBg,
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: config.buttonText,
                  boxShadow: config.accentGlow !== 'none' ? config.accentGlow : 'none',
                }}
              >
                <span className="text-lg font-bold leading-none">{b.key}</span>
                {b.sub && <span className="text-[9px] opacity-60 leading-tight">{b.sub}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts Book & Call History Preview */}
        <div className="p-5 rounded-3xl cyber-glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Vivo Address Book & Call History</span>
            </h2>
            <span className="text-[11px] text-slate-400">Mock Telecom DB</span>
          </div>

          {/* Search Contacts */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              placeholder="Search contacts by name or phone..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Contacts List */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredContacts.map((contact, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playDtmfTone('5');
                  setDialText(contact.number.replace(/\D/g, ''));
                }}
                className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>{contact.name}</span>
                      {contact.favorite && <Star className="w-3 h-3 text-amber-400 fill-current" />}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{contact.number}</div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                  <Phone className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
