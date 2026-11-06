'use client';

import React from 'react';
import { 
  HelpCircle, 
  Layers, 
  GitBranch, 
  Tag, 
  Compass, 
  Sparkles,
  BookOpen,
  CheckCircle2,
  BookmarkCheck,
  Target
} from 'lucide-react';
import { TopicAnalysisStep, ResearchPlanningStep } from '@/types/research';

interface ResearchAnalysisCardProps {
  step1: TopicAnalysisStep;
  step2: ResearchPlanningStep;
}

export const ResearchAnalysisCard: React.FC<ResearchAnalysisCardProps> = ({ step1, step2 }) => {
  return (
    <div className="space-y-8">
      {/* STEP 1: TOPIC ANALYSIS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Step 1: Topic Analysis & Theoretical Scoping
            </h3>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
            {step1.domain}
          </span>
        </div>

        {/* Scope Banner */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-blue-800">
            <Compass className="h-4 w-4" />
            <span>Scope, Boundary Conditions & Significance</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-normal">
            {step1.scope}
          </p>
          {step1.academicSignificance && (
            <div className="mt-3 pt-3 border-t border-blue-100 text-xs text-blue-900 font-medium">
              <span className="font-bold">Significance: </span>{step1.academicSignificance}
            </div>
          )}
        </div>

        {/* Primary Objectives */}
        {step1.primaryObjectives && step1.primaryObjectives.length > 0 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Target className="h-4 w-4 text-blue-600" />
              <span>Primary Research Objectives</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {step1.primaryObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Concepts Grid */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-800">
            <BookmarkCheck className="h-4 w-4 text-blue-600" />
            <span>Core Theoretical Concepts & Definitions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step1.coreConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-blue-200 transition-colors"
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {concept.term}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {concept.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 2: RESEARCH PLANNING */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              2
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Step 2: Research Planning & The 5 Core Inquiries
            </h3>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
            5 Research Questions Formulated
          </span>
        </div>

        {/* 5 Research Questions */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>5 Core Research Questions (RQ1 - RQ5)</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {step2.researchQuestions.map((q, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 hover:border-blue-200 transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm mt-0.5">
                  RQ{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {q.replace(/^RQ\d+:\s*/i, '')}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Systemic investigation of causal determinants and empirical validity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">
            <Tag className="h-4 w-4 text-blue-600" />
            <span>Scholarly Indexing Keywords</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {step2.importantKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Outline */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-800">
            <GitBranch className="h-4 w-4 text-blue-600" />
            <span>Structured Manuscript Outline</span>
          </div>
          <div className="space-y-3">
            {step2.outline.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Stage {idx + 1}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  {item.description}
                </p>
                {item.subsections && item.subsections.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">
                    {item.subsections.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded bg-white px-2 py-0.5 text-[11px] text-slate-600 border border-slate-200 font-mono"
                      >
                        &bull; {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
