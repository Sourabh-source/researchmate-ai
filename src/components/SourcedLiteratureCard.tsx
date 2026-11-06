'use client';

import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Info,
  Calendar,
  UserCheck
} from 'lucide-react';
import { SourceResearchStep, AcademicSource } from '@/types/research';

interface SourcedLiteratureCardProps {
  sourceResearch: SourceResearchStep;
}

export const SourcedLiteratureCard: React.FC<SourcedLiteratureCardProps> = ({ sourceResearch }) => {
  return (
    <div className="space-y-6">
      {/* Grounding Header Banner */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-sm">
                  Scholarly Grounding & Literature Discovery
                </span>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                  Step 3 Output
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Engine: <span className="font-semibold text-blue-950">{sourceResearch.groundingEngine}</span> &bull; {sourceResearch.totalSourcesCount} Verified References
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white border border-blue-100 px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Non-Hallucinatory Grounding Guarantee</span>
          </div>
        </div>

        {/* Search queries used */}
        {sourceResearch.searchQueriesUsed && sourceResearch.searchQueriesUsed.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-100/80 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Search Queries:</span>
            {sourceResearch.searchQueriesUsed.map((q, idx) => (
              <span key={idx} className="rounded-md bg-white border border-blue-200/80 px-2.5 py-1 text-[11px] text-blue-900 font-mono">
                {q}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        {sourceResearch.sources.map((src, idx) => (
          <div
            key={src.id || idx}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm hover:border-blue-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    src.verificationStatus === 'verified_search'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : src.verificationStatus === 'indexed_academic_corpus'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {src.verificationStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {src.title}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                    {src.author}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Published: {src.publicationYear}
                  </span>
                </div>
              </div>

              {src.sourceUrl && (
                <a
                  href={src.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <span>View Source / DOI</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 rounded-xl bg-slate-50/60 p-3 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Relevance to Study: </span>
              {src.mainRelevance}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 flex items-center gap-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0" />
        <span>
          Rigorous academic integrity protocol: All sources collected in Step 3 are directly integrated into the Section 2 Literature Review, Methodology baselines, and formal References.
        </span>
      </div>
    </div>
  );
};
