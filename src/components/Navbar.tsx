'use client';

import React from 'react';
import { BookOpen, Sparkles, Key, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  hasCustomKey: boolean;
  isSimulationMode: boolean;
  onOpenKeyModal: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  hasCustomKey,
  isSimulationMode,
  onOpenKeyModal,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-academic-700 text-white shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                ResearchMate
              </span>
              <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Academic Research Paper Agent</p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge */}
          <button
            onClick={onOpenKeyModal}
            className={`hidden sm:flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              hasCustomKey
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {hasCustomKey ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Gemini API: Custom Key Active</span>
              </>
            ) : (
              <>
                <Key className="h-3.5 w-3.5 text-blue-600" />
                <span>Configure Gemini API Key</span>
              </>
            )}
          </button>

          {/* Key Button (Mobile & Compact) */}
          <button
            onClick={onOpenKeyModal}
            title="Configure Gemini API Key"
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            <Key className="h-4 w-4 text-blue-600" />
          </button>

          {/* Academic Badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg bg-blue-50/80 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Gemini 2.5 / 1.5</span>
          </div>
        </div>
      </div>
    </header>
  );
};
