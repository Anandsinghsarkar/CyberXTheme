import React, { useState } from 'react';
import { 
  Grid, 
  Sparkles, 
  Clock, 
  Battery, 
  Sun, 
  Music, 
  Cpu, 
  Calendar, 
  Radio, 
  Activity, 
  CheckCircle2, 
  Plus,
  Sliders,
  Search,
  ExternalLink,
  Smartphone,
  Eye,
  FileText
} from 'lucide-react';
import { WidgetItem } from '../../types/theme';
import { ADVANCED_WIDGETS } from '../../data/mockData';
import { playCyberHaptic } from '../../utils/audioSynthesizer';
import { WidgetEditorModal } from './WidgetEditorModal';
import { WidgetInstallerModal } from './WidgetInstallerModal';

interface WidgetStudioProps {
  onAddWidgetToLauncher?: (widget: WidgetItem) => void;
}

export const WidgetStudio: React.FC<WidgetStudioProps> = ({
  onAddWidgetToLauncher,
}) => {
  const [widgets, setWidgets] = useState<WidgetItem[]>(ADVANCED_WIDGETS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [editingWidget, setEditingWidget] = useState<WidgetItem | null>(null);
  const [installingWidget, setInstallingWidget] = useState<WidgetItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Widgets (70+)' },
    { id: 'clock', label: 'A. Clock (10)' },
    { id: 'calendar', label: 'B. Calendar (10)' },
    { id: 'battery', label: 'C. Battery (10)' },
    { id: 'music', label: 'D. Music Player (10)' },
    { id: 'weather', label: 'E. Weather (10)' },
    { id: 'statistics', label: 'F. Statistics (10)' },
    { id: 'additional', label: 'G. Additional (10)' },
  ];

  const filtered = widgets.filter((w) => {
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (w.subType && w.subType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSaveEditedWidget = (customWidget: WidgetItem) => {
    setWidgets(prev => [customWidget, ...prev]);
    onAddWidgetToLauncher?.(customWidget);
  };

  const handleConfirmPin = (widget: WidgetItem) => {
    onAddWidgetToLauncher?.(widget);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Grid className="w-6 h-6 text-amber-400" />
            <span>Advanced Widget Studio (70+ Designs in 7 Categories)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineered for real Android 15 AppWidgetProvider and Vivo Funtouch OS 15 home screen integration.
          </p>
        </div>

        <button
          onClick={() => {
            playCyberHaptic(950);
            setEditingWidget(widgets[0]);
          }}
          className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 active:scale-95"
        >
          <Sliders className="w-4 h-4" />
          <span>Open Visual Widget Editor</span>
        </button>
      </div>

      {/* Real Android AppWidget Installation Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
        <Smartphone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Genuine Android 15 Home Screen Widget Support:</span>
          <p className="text-slate-300 leading-relaxed">
            Every widget in CYBER THEME X maps to a real <code className="text-amber-400">AppWidgetProvider</code>. When exported to Android Studio or running on your Vivo T2x 5G, these widgets populate the system widget selector and can be added, moved, resized (2x1, 2x2, 4x1, 4x2, 4x4), and configured.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playCyberHaptic(900);
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 70+ widgets..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((widget) => (
          <div
            key={widget.id}
            className="p-5 rounded-3xl cyber-glass-card border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-semibold">
                  {widget.size} Grid
                </span>
                <span className="text-[11px] text-slate-400 capitalize">
                  {widget.subType || widget.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{widget.title}</h3>

              {/* Simulated Visual Widget Render */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 min-h-[90px] flex items-center justify-center">
                
                {/* CLOCK */}
                {widget.category === 'clock' && (
                  <div className="text-center w-full">
                    {widget.subType?.includes('Analog') ? (
                      <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 relative mx-auto flex items-center justify-center bg-black/40 shadow-inner">
                        <div className="w-1 h-5 bg-amber-400 absolute bottom-8 origin-bottom rotate-45 rounded-full" />
                        <div className="w-0.5 h-6 bg-cyan-400 absolute bottom-8 origin-bottom -rotate-60 rounded-full" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white z-10" />
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold font-mono text-cyan-400">
                          {String(widget.data.time || '17:34')}
                          {widget.data.seconds && <span className="text-xs text-slate-400 ml-1">:{String(widget.data.seconds)}</span>}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">{String(widget.data.date || widget.data.city || 'Vivo T2x 5G')}</div>
                      </>
                    )}
                  </div>
                )}

                {/* CALENDAR */}
                {widget.category === 'calendar' && (
                  <div className="text-center w-full">
                    <div className="text-lg font-bold text-amber-300">
                      {String(widget.data.dayNumber || widget.data.activeDay || widget.data.month || '02 Nov')}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {String(widget.data.weekday || widget.data.formatted || widget.data.title || 'Wednesday Event')}
                    </div>
                  </div>
                )}

                {/* BATTERY */}
                {widget.category === 'battery' && (
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-xl font-bold text-emerald-400">{String(widget.data.level ?? 84)}%</div>
                      <div className="text-[10px] text-slate-400">{String(widget.data.health || widget.data.voltage || '5000 mAh')}</div>
                    </div>
                    <div className="text-right text-[11px] text-slate-300">
                      <div className="text-amber-400">{String(widget.data.wattage || widget.data.speed || '18W Fast')}</div>
                      <div className="text-[10px] text-slate-400">Temp: {String(widget.data.temp || '31.4°C')}</div>
                    </div>
                  </div>
                )}

                {/* WEATHER */}
                {widget.category === 'weather' && (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Sun className="w-6 h-6 text-amber-400" />
                      <div>
                        <div className="text-lg font-bold text-white">{String(widget.data.temp || '26°C')}</div>
                        <div className="text-[10px] text-slate-400">{String(widget.data.condition || widget.data.status || 'Sunny')}</div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400">
                      <div>AQI: {String(widget.data.aqi || '42')}</div>
                      <div>Humidity: {String(widget.data.humidity || '48%')}</div>
                    </div>
                  </div>
                )}

                {/* MUSIC */}
                {widget.category === 'music' && (
                  <div className="flex items-center gap-2.5 w-full">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Music className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white truncate">{String(widget.data.track || 'Resonance')}</div>
                      <div className="text-[10px] text-slate-400 truncate">{String(widget.data.artist || 'HOME')}</div>
                    </div>
                  </div>
                )}

                {/* STATISTICS */}
                {widget.category === 'statistics' && (
                  <div className="w-full space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>{widget.title}:</span>
                      <span className="text-cyan-400 font-mono font-bold">
                        {String(widget.data.total || widget.data.steps || widget.data.cpuUsage || widget.data.used || 'Optimal')}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {String(widget.data.topApp || widget.data.diff || widget.data.distance || widget.data.sim || 'Vivo Dimensity 6020')}
                    </div>
                  </div>
                )}

                {/* ADDITIONAL */}
                {widget.category === 'additional' && (
                  <div className="text-xs text-slate-300 text-center font-mono py-1 w-full truncate">
                    {String(widget.data.text || widget.data.placeholder || widget.data.dl || widget.data.actions || widget.data.caption || 'Native AppWidget')}
                  </div>
                )}

              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  playCyberHaptic(900);
                  setEditingWidget(widget);
                }}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Customize</span>
              </button>

              <button
                onClick={() => {
                  playCyberHaptic(1000);
                  setInstallingWidget(widget);
                }}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-black text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Home</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Widget Editor Modal */}
      <WidgetEditorModal
        isOpen={!!editingWidget}
        widget={editingWidget}
        onClose={() => setEditingWidget(null)}
        onSaveWidget={handleSaveEditedWidget}
        onInstallToHomeScreen={handleConfirmPin}
      />

      {/* Real Home Screen Widget Installation Modal */}
      <WidgetInstallerModal
        isOpen={!!installingWidget}
        widget={installingWidget}
        onClose={() => setInstallingWidget(null)}
        onConfirmPinToHome={handleConfirmPin}
      />
    </div>
  );
};
