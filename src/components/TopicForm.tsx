'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  FileText, 
  SlidersHorizontal, 
  Lightbulb, 
  ArrowRight, 
  BookOpenCheck, 
  CheckCircle2,
  Search,
  ShieldCheck,
  Cpu,
  Layers,
  Award,
  Zap,
  Terminal,
  ChevronDown
} from 'lucide-react';
import { AcademicLevel, CitationStyle, PaperFocus, GeneratePaperRequest } from '@/types/research';

interface TopicFormProps {
  initialValues?: Partial<GeneratePaperRequest>;
  onSubmit: (params: GeneratePaperRequest) => void;
  isLoading: boolean;
}

interface AcademicLevelOption {
  value: AcademicLevel;
  label: string;
  badge: string;
  description: string;
  icon: typeof GraduationCap;
}

const ACADEMIC_LEVEL_OPTIONS: AcademicLevelOption[] = [
  {
    value: 'Beginner',
    label: 'Beginner',
    badge: 'Foundational',
    description: 'Clear introductory concepts, structured background, and accessible academic terminology.',
    icon: BookOpenCheck,
  },
  {
    value: 'Undergraduate',
    label: 'Undergraduate',
    badge: 'Analytical',
    description: 'Formal scholarly rigor, empirical methodologies, critical literature review, and standardized citations.',
    icon: GraduationCap,
  },
  {
    value: 'Postgraduate',
    label: 'Postgraduate',
    badge: 'Doctoral / Advanced',
    description: 'Publication-grade depth, advanced theoretical frameworks, exhaustive literature taxonomy, and peer-review audit.',
    icon: Award,
  },
];

const CITATION_STYLES: CitationStyle[] = [
  'APA 7th',
  'IEEE',
  'MLA 9th',
  'Chicago 17th',
  'Harvard'
];

const PAPER_FOCUS_OPTIONS: PaperFocus[] = [
  'Empirical / Experimental',
  'Theoretical & Conceptual',
  'Systematic Literature Review',
  'Case Study & Comparative'
];

const EXAMPLE_TOPICS = [
  { label: 'AI in Healthcare', topic: 'Impact of Artificial Intelligence on Clinical Diagnostics and Patient Outcomes' },
  { label: 'Post-Quantum Crypto', topic: 'Post-Quantum Cryptography: Lattice-Based Algorithms vs Quantum Supremacy' },
  { label: 'Renewable Microgrids', topic: 'Decentralized Renewable Microgrids and Grid Stability Using Reinforcement Learning' },
  { label: 'CRISPR Therapeutics', topic: 'CRISPR-Cas12 Targeted Therapeutics for Drug-Resistant Bacterial Infections' },
  { label: 'GenAI & Higher Ed', topic: 'Societal and Cognitive Impacts of Large Language Models in Higher Education' }
];

export const TopicForm: React.FC<TopicFormProps> = ({
  initialValues,
  onSubmit,
  isLoading
}) => {
  const [topic, setTopic] = useState(initialValues?.topic || '');
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(
    initialValues?.academicLevel || 'Undergraduate'
  );
  const [citationStyle, setCitationStyle] = useState<CitationStyle>(
    initialValues?.citationStyle || 'APA 7th'
  );
  const [focusType, setFocusType] = useState<PaperFocus>(
    initialValues?.focusType || 'Empirical / Experimental'
  );
  const [additionalNotes, setAdditionalNotes] = useState(initialValues?.additionalNotes || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setValidationError('Please enter a research topic or scholarly problem statement.');
      return;
    }
    if (topic.trim().length < 5) {
      setValidationError('Please provide a slightly more descriptive topic (at least 5 characters).');
      return;
    }
    setValidationError('');
    onSubmit({
      topic: topic.trim(),
      academicLevel,
      citationStyle,
      focusType,
      additionalNotes: additionalNotes.trim() || undefined
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSelectExample = (exTopic: string) => {
    setTopic(exTopic);
    setValidationError('');
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      {/* Platform Hero Banner */}
      <div className="text-center space-y-5 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>Autonomous Scholarly AI Platform • Gemini 2.5 / 1.5</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          ResearchMate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-academic-600 to-indigo-600">AI</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Your intelligent research paper assistant. Autonomous multi-step agent for topic analysis, planning, grounded sourcing, paper generation, and quality verification.
        </p>

        {/* Feature Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium shadow-xs">
            <Cpu className="h-3.5 w-3.5 text-blue-600" />
            5-Stage Agent Pipeline
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium shadow-xs">
            <Search className="h-3.5 w-3.5 text-emerald-600" />
            Google Search Grounding
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
            Automated Quality Audit
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium shadow-xs">
            <FileText className="h-3.5 w-3.5 text-amber-600" />
            TXT & JSON Export
          </span>
        </div>
      </div>

      {/* Main Research Input Card */}
      <form onSubmit={handleSubmit} className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-paper hover:shadow-paper-lg transition-all duration-300">
        <div className="space-y-8">
          {/* Research Topic Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label 
                htmlFor="research-topic" 
                className="flex items-center gap-2 text-sm font-bold text-slate-800"
              >
                <BookOpenCheck className="h-4 w-4 text-blue-600" />
                <span>Enter Research Topic or Problem Statement</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {topic.length} chars &bull; <kbd className="hidden sm:inline bg-slate-100 px-1 py-0.5 rounded text-[10px] text-slate-500 font-sans">Ctrl + Enter to run</kbd>
              </span>
            </div>

            <div className="relative">
              <textarea
                id="research-topic"
                rows={4}
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (validationError) setValidationError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Assessing the performance and robustness of lattice-based post-quantum cryptography algorithms against quantum decoherence attacks in distributed ledger networks..."
                className={`w-full rounded-2xl border p-4 sm:p-5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all leading-relaxed ${
                  validationError 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 bg-rose-50/20' 
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-50 bg-white'
                }`}
                disabled={isLoading}
              />
              {topic && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md px-2 py-1 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {validationError && (
              <p className="mt-2 text-xs font-semibold text-rose-600 flex items-center gap-1.5 animate-in fade-in">
                <span>{validationError}</span>
              </p>
            )}

            {/* Quick Inspiration Pills */}
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                <span>Quick Research Prompts:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_TOPICS.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectExample(ex.topic)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                  >
                    <span className="text-blue-500 font-bold">&bull;</span>
                    <span>{ex.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Level Selector (Beginner, Undergraduate, Postgraduate) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <GraduationCap className="h-4 w-4 text-blue-600" />
                <span>Academic Level Selector</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                Calibrates vocabulary, methodology depth & literature complexity
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ACADEMIC_LEVEL_OPTIONS.map((opt) => {
                const isSelected = academicLevel === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAcademicLevel(opt.value)}
                    disabled={isLoading}
                    className={`relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-blue-950' : 'text-slate-900'}`}>
                          {opt.label}
                        </span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isSelected ? 'bg-blue-200/80 text-blue-900 font-bold' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Research Parameters Accordion */}
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Citation Style & Methodological Parameters</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4 rounded-2xl bg-slate-50/80 p-5 border border-slate-200/70 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Citation Style */}
                  <div>
                    <label 
                      htmlFor="citation-style" 
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Citation Standard
                    </label>
                    <select
                      id="citation-style"
                      value={citationStyle}
                      onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    >
                      {CITATION_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Research Focus */}
                  <div>
                    <label 
                      htmlFor="focus-type" 
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Methodological Framework
                    </label>
                    <select
                      id="focus-type"
                      value={focusType}
                      onChange={(e) => setFocusType(e.target.value as PaperFocus)}
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    >
                      {PAPER_FOCUS_OPTIONS.map((foc) => (
                        <option key={foc} value={foc}>
                          {foc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Optional Research Notes or Contextual Constraints
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Focus on peer-reviewed post-2022 benchmarks, incorporate double-blind clinical trials..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate Research Paper Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-academic-600 to-indigo-600 p-4 font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              <div className="flex items-center justify-center gap-3 text-base sm:text-lg">
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Agent Executing 5-Stage Research Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    <span>Generate Research Paper</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>

      {/* 5-Stage Agent Workflow Visualization on Landing Page */}
      <div className="mt-14 sm:mt-16 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Autonomous Workflow</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            How The AI Research Agent Works
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Every submission triggers an autonomous multi-stage scholarly pipeline with verification checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800 text-xs font-bold">1</span>
              <span className="text-[10px] font-mono text-slate-400">STAGE 1</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Topic Analysis</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Deconstructs boundaries, scope, academic significance, and defines core concepts.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800 text-xs font-bold">2</span>
              <span className="text-[10px] font-mono text-slate-400">STAGE 2</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Research Planning</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Formulates 5 core research questions (RQ1-RQ5), keywords, and 5-part outline.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">3</span>
              <span className="text-[10px] font-mono text-slate-400">STAGE 3</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Source Research</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Queries reliable sources via Google Search grounding; collects real DOIs & titles.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold">4</span>
              <span className="text-[10px] font-mono text-slate-400">STAGE 4</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Paper Generation</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Synthesizes full manuscript with Abstract, Intro, Lit Review, Methodology & Findings.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xs hover:border-blue-300 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100 text-purple-800 text-xs font-bold">5</span>
              <span className="text-[10px] font-mono text-slate-400">STAGE 5</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Quality Verification</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Autonomous peer review auditing 9 sections, relevance, factual claims & repetition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
