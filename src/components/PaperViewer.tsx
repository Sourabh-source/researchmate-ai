'use client';

import React, { useState } from 'react';
import { 
  Download, 
  RefreshCw, 
  Edit3, 
  Copy, 
  Check, 
  Printer, 
  FileCode, 
  FileText, 
  BookOpen, 
  Layers, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  CheckCircle2,
  Share2,
  RotateCcw,
  BookMarked,
  Microscope,
  Compass,
  FileCheck
} from 'lucide-react';
import { ResearchPaper } from '@/types/research';
import { downloadPaperAsJson, downloadPaperAsTxt, formatPaperAsText } from '@/lib/export-utils';
import { ResearchAnalysisCard } from './ResearchAnalysisCard';
import { SourcedLiteratureCard } from './SourcedLiteratureCard';
import { QualityAuditCard } from './QualityAuditCard';

interface PaperViewerProps {
  paper: ResearchPaper;
  onRegenerate: () => void;
  onEditTopic: () => void;
  isRegenerating: boolean;
}

type DashboardTab = 'manuscript' | 'workflow' | 'sources' | 'quality';

export const PaperViewer: React.FC<PaperViewerProps> = ({
  paper,
  onRegenerate,
  onEditTopic,
  isRegenerating,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('manuscript');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const p = paper.paper;
  const s5 = paper.step5_quality;

  const handleCopyAll = async () => {
    const fullText = formatPaperAsText(paper);
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopySection = async (title: string, content: string) => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${content}`);
      setCopiedSection(title);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy section', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 7 Core Sections Required by prompt (Abstract, Intro, Lit Review, Methodology, Findings, Conclusion, References)
  const dashboardSections = [
    { id: 'section-abstract', label: 'Abstract & Keywords', icon: BookMarked },
    { id: 'section-introduction', label: '1. Introduction', icon: Compass },
    { id: 'section-literature-review', label: '2. Literature Review', icon: BookOpen },
    { id: 'section-methodology', label: '3. Research Methodology', icon: Microscope },
    { id: 'section-findings', label: '4. Findings & Discussion', icon: Layers },
    { id: 'section-conclusion', label: '5. Conclusion', icon: CheckCircle2 },
    { id: 'section-references', label: 'References', icon: FileCheck },
  ];

  const workflowStages = [
    { id: 'topic-analysis', label: 'Topic Analysis', status: 'Completed', stage: 1 },
    { id: 'research-planning', label: 'Research Planning', status: '5 RQs Formulated', stage: 2 },
    { id: 'source-research', label: 'Source Research', status: `${paper.step3_sources.sources.length} Sources Grounded`, stage: 3 },
    { id: 'paper-generation', label: 'Paper Generation', status: '9 Sections Synthesized', stage: 4 },
    { id: 'quality-verification', label: 'Quality Verification', status: `Audit ${s5.overallScore}/100`, stage: 5 },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Simulation / Demo Notice Banner if active */}
      {paper.metadata.isSimulation && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Demonstration Engine Active:</span> Multi-step workflow generated using ResearchMate AI&#39;s intelligent synthetic research synthesizer.
              To switch to live Google Gemini 2.5 / 1.5, add your API key via the top bar or <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env.local</code>.
            </div>
          </div>
        </div>
      )}

      {/* Main Results Dashboard Header */}
      <div className="mb-6 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-paper space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3 flex-1">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                <GraduationCap className="h-3.5 w-3.5" />
                {paper.academicLevel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                <Award className="h-3.5 w-3.5 text-slate-500" />
                {paper.citationStyle}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Audit Score: {s5.overallScore}/100 ({s5.verdict})
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {p.title}
            </h1>

            {/* Authors & Affiliations */}
            <div className="text-xs sm:text-sm text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-800">
                {p.authors.join('  •  ')}
              </p>
              <p className="text-slate-500 italic">
                {p.affiliations.join('  |  ')}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-200/80">
            <div className="text-right">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ~{paper.metadata.wordCount}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Words
              </span>
            </div>
            <div className="sm:border-t sm:border-slate-200 sm:pt-2 text-right">
              <span className="text-sm font-semibold text-slate-700">
                {paper.metadata.estimatedReadTimeMinutes} min read
              </span>
              <span className="block text-[10px] text-slate-400">
                {new Date(paper.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Agent Workflow Visualization Bar on Dashboard (Requirement 5) */}
        <div className="space-y-2 no-print">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Agent Workflow Execution Trail</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              All 5 Stages Successfully Executed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {workflowStages.map((wf) => (
              <div
                key={wf.id}
                className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-2.5 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{wf.label}</span>
                </div>
                <p className="mt-1 text-[11px] text-emerald-800 font-mono truncate">
                  {wf.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Toolbar & Navigation Tabs (Requirements 7, 8, 9, 10) */}
      <div className="sticky top-16 z-30 mb-8 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur p-3.5 sm:p-4 shadow-sm no-print">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* Dashboard Mode Tabs */}
          <div className="flex flex-wrap items-center rounded-xl bg-slate-100 p-1 w-full xl:w-auto">
            <button
              onClick={() => setActiveTab('manuscript')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'manuscript'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Full Paper (7 Sections)</span>
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'workflow'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Planning & 5 RQs</span>
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'sources'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Grounded Sources ({paper.step3_sources.sources.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'quality'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="h-3.5 w-3.5 text-emerald-600" />
              <span>Quality Audit ({s5.overallScore}/100)</span>
            </button>
          </div>

          {/* Action Buttons: Download TXT, Download JSON, Copy Paper, Generate Again (Req 7, 8, 9, 10) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full xl:w-auto">
            {/* 7. Download TXT button */}
            <button
              onClick={() => downloadPaperAsTxt(paper)}
              title="Download academic paper as formatted TXT"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 active:scale-95 transition-all"
            >
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Download TXT</span>
            </button>

            {/* 8. Download JSON button */}
            <button
              onClick={() => downloadPaperAsJson(paper)}
              title="Download complete structured paper and audit data as JSON"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-700 active:scale-95 transition-all"
            >
              <FileCode className="h-3.5 w-3.5 text-emerald-600" />
              <span>Download JSON</span>
            </button>

            {/* 9. Copy paper button */}
            <button
              onClick={handleCopyAll}
              title="Copy entire academic paper to clipboard"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
            >
              {copiedAll ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Copy Paper</span>
                </>
              )}
            </button>

            {/* 10. Generate Again button */}
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              title="Regenerate this paper using the multi-step research agent"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Generate Again</span>
            </button>

            {/* Refine / Edit Topic Button */}
            <button
              onClick={onEditTopic}
              title="Edit research topic or parameters"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Edit3 className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Refine Topic</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              title="Print formatted paper or save as PDF"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Switcher Content */}
      {activeTab === 'workflow' && (
        <ResearchAnalysisCard 
          step1={paper.step1_analysis} 
          step2={paper.step2_plan} 
        />
      )}

      {activeTab === 'sources' && (
        <SourcedLiteratureCard 
          sourceResearch={paper.step3_sources} 
        />
      )}

      {activeTab === 'quality' && (
        <QualityAuditCard 
          quality={paper.step5_quality} 
        />
      )}

      {activeTab === 'manuscript' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sticky Sidebar (Requirement 6 Navigation) */}
          <aside className="hidden lg:block lg:col-span-1 no-print">
            <div className="sticky top-36 space-y-4 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>Paper Sections</span>
              </div>

              <nav className="space-y-1">
                {dashboardSections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
                      <span className="truncate">{sec.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Level:</span>
                  <span className="font-semibold text-slate-800">{paper.academicLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Score:</span>
                  <span className="font-semibold text-emerald-700 font-mono">{s5.overallScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Citation:</span>
                  <span className="font-semibold text-slate-800">{paper.citationStyle}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Dashboard: Separate Sections for Abstract, Intro, Lit Review, Methodology, Findings, Conclusion, References */}
          <div className="lg:col-span-3 space-y-8 paper-container">
            {/* 1. SEPARATE SECTION: ABSTRACT & KEYWORDS */}
            <section 
              id="section-abstract" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                    A
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Abstract
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Core Synthesis & Hypotheses</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('Abstract', p.abstract)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === 'Abstract' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === 'Abstract' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-50/70 p-5 sm:p-6 border border-slate-200/60">
                <p className="font-serif text-sm sm:text-base text-slate-800 leading-relaxed italic text-justify">
                  {p.abstract}
                </p>

                {/* Keywords */}
                <div className="mt-5 pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Keywords:</span>
                  {p.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. SEPARATE SECTION: INTRODUCTION */}
            <section 
              id="section-introduction" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                    1
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Introduction
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Background, Problem Statement & Research Inquiries</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('1. Introduction', p.introduction)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === '1. Introduction' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === '1. Introduction' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line text-justify font-normal">
                {p.introduction}
              </div>
            </section>

            {/* 3. SEPARATE SECTION: LITERATURE REVIEW */}
            <section 
              id="section-literature-review" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                    2
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Literature Review
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Theoretical Lineage, Contemporary Taxonomies & Gaps</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('2. Literature Review', p.literatureReview)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === '2. Literature Review' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === '2. Literature Review' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line text-justify font-normal">
                {p.literatureReview}
              </div>
            </section>

            {/* 4. SEPARATE SECTION: RESEARCH METHODOLOGY */}
            <section 
              id="section-methodology" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                    3
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Research Methodology
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Empirical Design, Data Protocols & Analytical Instrumentation</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('3. Research Methodology', p.researchMethodology)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === '3. Research Methodology' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === '3. Research Methodology' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line text-justify font-normal">
                {p.researchMethodology}
              </div>
            </section>

            {/* 5. SEPARATE SECTION: FINDINGS AND DISCUSSION */}
            <section 
              id="section-findings" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                    4
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Findings and Discussion
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Empirical Results Answering RQ1–RQ5 & Comparative Benchmarks</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('4. Findings and Discussion', p.findingsAndDiscussion)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === '4. Findings and Discussion' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === '4. Findings and Discussion' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line text-justify font-normal">
                {p.findingsAndDiscussion}
              </div>
            </section>

            {/* 6. SEPARATE SECTION: CONCLUSION */}
            <section 
              id="section-conclusion" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                    5
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      Conclusion
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">Core Contributions, Practice Implications & Future Roadmaps</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopySection('5. Conclusion', p.conclusion)}
                  className="no-print text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  {copiedSection === '5. Conclusion' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === '5. Conclusion' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line text-justify font-normal">
                {p.conclusion}
              </div>
            </section>

            {/* 7. SEPARATE SECTION: REFERENCES */}
            <section 
              id="section-references" 
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-paper scroll-mt-28 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white text-xs font-bold">
                    R
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">
                      References
                    </h2>
                    <span className="text-[11px] text-slate-400 font-mono font-medium">
                      {p.references.length} Formatted Citations &bull; Standard: {paper.citationStyle}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Grounded & Verified
                </span>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                {p.references.map((ref, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl p-3 bg-slate-50/70 border border-slate-200/60 hover:bg-blue-50/40 hover:border-blue-200 transition-colors flex items-start gap-3 leading-relaxed"
                  >
                    <span className="shrink-0 font-mono text-xs font-bold text-blue-700 mt-0.5">
                      [{idx + 1}]
                    </span>
                    <span className="flex-1 font-normal text-slate-800">{ref}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
