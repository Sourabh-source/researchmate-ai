'use client';

import React from 'react';
import { BookOpen, Sparkles, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 text-slate-600 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="font-serif text-base font-bold text-slate-900">ResearchMate AI</p>
              <p className="text-xs text-slate-500">Autonomous Scholarly Paper Generator & Research Agent</p>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 font-medium">
              Next.js 14
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 font-medium">
              TypeScript
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 font-medium">
              Tailwind CSS
            </span>
            <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-700 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Google Gemini API
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ResearchMate AI. Designed for academic and scholarly inquiry.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Client-Side Secure Key Transmission
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
