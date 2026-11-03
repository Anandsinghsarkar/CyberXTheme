import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  CheckCircle2, 
  Code2, 
  Info, 
  ArrowRight, 
  Layers, 
  Plus, 
  Copy,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { WidgetItem } from '../../types/theme';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

interface WidgetInstallerModalProps {
  isOpen: boolean;
  widget: WidgetItem | null;
  onClose: () => void;
  onConfirmPinToHome: (widget: WidgetItem) => void;
}

export const WidgetInstallerModal: React.FC<WidgetInstallerModalProps> = ({
  isOpen,
  widget,
  onClose,
  onConfirmPinToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'install' | 'code'>('install');
  const [isPinning, setIsPinning] = useState<boolean>(false);
  const [pinnedSuccess, setPinnedSuccess] = useState<boolean>(false);

  if (!isOpen || !widget) return null;

  const handlePin = () => {
    playCyberHaptic(1000);
    setIsPinning(true);
    setTimeout(() => {
      setIsPinning(false);
      setPinnedSuccess(true);
      playCyberHaptic(1200);
      onConfirmPinToHome(widget);
      setTimeout(() => {
        setPinnedSuccess(false);
        onClose();
      }, 1500);
    }, 700);
  };

  const kotlinProviderSnippet = `// Android 15 & Vivo Funtouch OS 15 AppWidgetProvider Implementation
package com.cyberthemex.suite.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import com.cyberthemex.suite.R

class CyberAppWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.widget_${widget.category})
            views.setTextViewText(R.id.widget_title, "${widget.title}")
            // Hardware-accelerated RemoteViews rendering on Vivo T2x 5G 120Hz display
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl cyber-glass border border-cyan-500/30 p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Real Home Screen Widget Installation</h2>
              <div className="text-xs text-slate-400">Android 15 AppWidgetManager &amp; Vivo Funtouch OS 15</div>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberHaptic(700);
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Install Guide vs Native Code */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'install' ? 'bg-cyan-500 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vivo Home Installation
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'code' ? 'bg-cyan-500 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Native Android Code
          </button>
        </div>

        {/* Selected Widget Preview Card */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-mono text-cyan-400 uppercase">{widget.category} Widget ({widget.size})</div>
            <div className="text-sm font-bold text-white">{widget.title}</div>
            <div className="text-[11px] text-slate-400">{widget.name}</div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            AppWidgetProvider Ready
          </span>
        </div>

        {activeTab === 'install' && (
          <div className="space-y-4">
            <div className="space-y-2 text-xs">
              <span className="font-bold text-white block">Step-by-step Vivo Funtouch OS Installation:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="font-mono text-cyan-400 font-bold block mb-1">STEP 1</span>
                  Long press blank wallpaper space on your Vivo home screen.
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="font-mono text-cyan-400 font-bold block mb-1">STEP 2</span>
                  Tap <strong>Widgets</strong> &gt; scroll to <strong>CYBER THEME X</strong>.
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="font-mono text-cyan-400 font-bold block mb-1">STEP 3</span>
                  Drag widget to desktop &amp; long press to resize ({widget.size}).
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handlePin}
                disabled={isPinning || pinnedSuccess}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              >
                {pinnedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Widget Successfully Pinned to Home Screen!</span>
                  </>
                ) : isPinning ? (
                  <span>Calling AppWidgetManager.requestPinAppWidget()...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Pin Widget to Vivo Home Screen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-300">
              Generated Android SDK 35 AppWidgetProvider code for this widget:
            </div>
            <pre className="p-3 rounded-2xl bg-black border border-white/10 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-[220px] custom-scrollbar">
              <code>{kotlinProviderSnippet}</code>
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
