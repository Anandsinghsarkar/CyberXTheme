import React, { useState } from 'react';
import { 
  Type, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Info, 
  Heart, 
  DownloadCloud,
  FileText
} from 'lucide-react';
import { FontConfig } from '../../types/theme';
import { FONT_PRESETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface FontStudioProps {
  currentFont: FontConfig;
  onApplyFont: (font: FontConfig) => void;
}

export const FontStudio: React.FC<FontStudioProps> = ({
  currentFont,
  onApplyFont,
}) => {
  const [activeFont, setActiveFont] = useState<FontConfig>(currentFont);
  const [sampleText, setSampleText] = useState<string>('Vivo T2x 5G Android 15 Personalization Suite');
  const [fontSize, setFontSize] = useState<number>(20);
  const [letterSpacing, setLetterSpacing] = useState<number>(1);
  const [fontWeight, setFontWeight] = useState<number>(600);

  const handleSelectFont = (font: FontConfig) => {
    playCyberHaptic(950);
    setActiveFont(font);
  };

  const handleApply = () => {
    playCyberHaptic(1100);
    onApplyFont(activeFont);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Type className="w-6 h-6 text-purple-400" />
            <span>Font Studio (10+ Font Categories)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Preview, test, and apply typography scales compatible with Vivo Funtouch OS 15 and custom launchers.
          </p>
        </div>

        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Apply Active Font</span>
        </button>
      </div>

      {/* Vivo Font Engine Guide Notice */}
      <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Vivo Funtouch OS 15 Font Compatibility Guide:</span>
          <p className="text-slate-300 leading-relaxed">
            System-wide OS fonts on Vivo are managed through <code className="text-purple-300">Settings &gt; Display &amp; Brightness &gt; Font style &gt; Theme Store</code>. 
            CYBER THEME X immediately applies selected typography across all widgets, status bars, launchers, and dialers, and exports standard OTF/TTF packages for Vivo Theme Store font installation.
          </p>
        </div>
      </div>

      {/* 10 Font Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Font Style (10 Presets):</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {FONT_PRESETS.map((font) => (
            <button
              key={font.id}
              onClick={() => handleSelectFont(font)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                activeFont.id === font.id
                  ? 'bg-purple-500/20 border-purple-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{font.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{font.category}</div>
              <div 
                className={`text-xs mt-2 text-cyan-300 truncate ${font.previewClass}`}
                style={{ fontFamily: font.fontFamily }}
              >
                Aa Bb 123
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Typography Tester Sandbox */}
      <div className="p-6 rounded-3xl cyber-glass-card border border-white/10 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Interactive Type Tester</span>
          </h2>
          <span className="text-xs text-purple-400 font-mono">{activeFont.name}</span>
        </div>

        {/* Custom Input */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Custom Test Phrase:</label>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Sliders for Size, Spacing & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Font Size</span>
              <span className="font-mono">{fontSize} px</span>
            </div>
            <input
              type="range"
              min="14"
              max="40"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Letter Spacing</span>
              <span className="font-mono">{letterSpacing} px</span>
            </div>
            <input
              type="range"
              min="-1"
              max="6"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Font Weight</span>
              <span className="font-mono">{fontWeight}</span>
            </div>
            <input
              type="range"
              min="300"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Big Preview Field */}
        <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center min-h-[120px] flex items-center justify-center overflow-x-auto">
          <div
            style={{
              fontFamily: activeFont.fontFamily,
              fontSize: `${fontSize}px`,
              letterSpacing: `${letterSpacing}px`,
              fontWeight: fontWeight,
            }}
            className="text-white break-words transition-all"
          >
            {sampleText || 'Vivo T2x 5G Android 15'}
          </div>
        </div>
      </div>
    </div>
  );
};
