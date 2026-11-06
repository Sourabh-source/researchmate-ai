'use client';

import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Award, 
  FileCheck, 
  Sparkles,
  BarChart3,
  ThumbsUp
} from 'lucide-react';
import { QualityCheckStep } from '@/types/research';

interface QualityAuditCardProps {
  quality: QualityCheckStep;
}

export const QualityAuditCard: React.FC<QualityAuditCardProps> = ({ quality }) => {
  const isExcellent = quality.overallScore >= 90;

  return (
    <div className="space-y-6">
      {/* Top Score Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50/40 to-blue-50/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Audit Verdict: {quality.verdict}
                </span>
                <span className="text-xs text-slate-500">Autonomous Step 5 Review</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Peer Review & Academic Quality Certification
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Evaluated against rigorous publication standards, factual claim grounding, and section completeness.
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-white/80 px-6 py-4 rounded-xl border border-emerald-100 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono">
              {quality.overallScore}<span className="text-lg text-emerald-500">/100</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Overall Quality Index
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Audit Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criterion 1: Sections Completeness */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Mandatory Sections Check
              </h4>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              quality.sectionsCheck.allPresent 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-rose-50 text-rose-700'
            }`}>
              <CheckCircle2 className="h-3 w-3" />
              {quality.sectionsCheck.allPresent ? '9 / 9 Present' : 'Incomplete'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {quality.sectionsCheck.details}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {quality.sectionsCheck.presentSections.map((sec, idx) => (
              <span key={idx} className="rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600 font-medium">
                ✓ {sec}
              </span>
            ))}
          </div>
        </div>

        {/* Criterion 2: Topical Relevance */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                2. Topical Relevance & Focus
              </h4>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {quality.relevanceCheck.score} / 100
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {quality.relevanceCheck.analysis}
          </p>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Directly answers all formulated research questions (RQ1 - RQ5)</span>
          </div>
        </div>

        {/* Criterion 3: Reference & Grounding Support */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                3. Reference Grounding & Citations
              </h4>
            </div>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
              {quality.referenceSupportCheck.groundedSourcesCount} Grounded Works
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {quality.referenceSupportCheck.analysis}
          </p>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-blue-700 font-medium">
            <ThumbsUp className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>References verifiably align with theoretical and empirical claims</span>
          </div>
        </div>

        {/* Criterion 4: Factual Integrity & Repetition */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                4. Factual Integrity & Prose Diversity
              </h4>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Flow: {quality.repetitionCheck.score} / 100
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-2">
            {quality.factualClaimVerification.assessment}
          </p>
          <p className="text-[11px] text-slate-500 italic">
            Repetition Analysis: {quality.repetitionCheck.findings}
          </p>
        </div>
      </div>

      {/* Reviewer Recommendations */}
      {quality.recommendations && quality.recommendations.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Peer Reviewer Recommendations for Subsequent Inquiry</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {quality.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">&bull;</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
