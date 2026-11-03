import React, { useState } from 'react';
import { 
  Code2, 
  DownloadCloud, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  Smartphone, 
  Info,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { getAndroidProjectFiles, downloadAndroidProjectZip, AndroidFile } from '../../utils/projectExporter';
import { playCyberHaptic } from '../../utils/audioSynthesizer';

export const AndroidProjectViewer: React.FC = () => {
  const files = getAndroidProjectFiles();
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(files[1]); // Default to app/build.gradle.kts
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleCopyCode = () => {
    playCyberHaptic(900);
    navigator.clipboard.writeText(selectedFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = async () => {
    playCyberHaptic(1100);
    setIsDownloading(true);
    await downloadAndroidProjectZip();
    setIsDownloading(false);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <span>Native Android Studio Project Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete production-grade Kotlin, Jetpack Compose, Room Database, and Gradle project ready to compile in Android Studio.
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <DownloadCloud className="w-4 h-4" />
          <span>{isDownloading ? 'Packaging Zip...' : 'Download Android Studio Project (.ZIP)'}</span>
        </button>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Tree Browser (4 Cols) */}
        <div className="lg:col-span-4 p-4 rounded-3xl cyber-glass-card border border-white/10 space-y-2">
          <div className="text-xs font-bold text-slate-300 px-2 py-1 flex items-center gap-1.5 uppercase font-mono tracking-wider">
            <Folder className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project Explorer ({files.length} Files)</span>
          </div>

          <div className="space-y-1 max-h-[540px] overflow-y-auto pr-1 custom-scrollbar">
            {files.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => {
                    playCyberHaptic(850);
                    setSelectedFile(file);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate font-mono text-[11px]">{file.path}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Display (8 Cols) */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-950 border border-white/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">{selectedFile.path}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                {selectedFile.category}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy Source'}</span>
            </button>
          </div>

          <pre className="flex-1 p-4 rounded-2xl bg-black/80 border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto overflow-y-auto max-h-[480px] custom-scrollbar leading-relaxed">
            <code>{selectedFile.content}</code>
          </pre>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target SDK: Android 15 (API 35) · Language: Kotlin 2.1 · Compose BOM 2025</span>
            <span className="text-cyan-400 font-mono">Ready to compile with Gradle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
