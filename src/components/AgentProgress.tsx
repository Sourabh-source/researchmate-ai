'use client';

import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  GitBranch, 
  BookOpen, 
  CheckCircle2, 
  FileCheck, 
  Loader2, 
  ShieldCheck, 
  Award, 
  Clock,
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react';
import { WorkflowStatusEvent } from '@/types/research';

interface AgentProgressProps {
  topic: string;
  activeStage: number; // 1 to 5 (or 6 for final wrap-up)
  events: WorkflowStatusEvent[];
  currentMessage?: string;
}

interface WorkflowStageInfo {
  stage: number;
  name: string;
  description: string;
  icon: typeof Search;
  tag: string;
}

const AGENT_WORKFLOW_STAGES: WorkflowStageInfo[] = [
  {
    stage: 1,
    name: 'Topic Analysis',
    description: 'Deconstruct scope, domain boundaries, primary objectives, and core concepts.',
    icon: Search,
    tag: 'Stage 1',
  },
  {
    stage: 2,
    name: 'Research Planning',
    description: 'Formulate 5 core research questions (RQ1-RQ5), keywords, and 5-part outline.',
    icon: HelpCircle,
    tag: 'Stage 2',
  },
  {
    stage: 3,
    name: 'Source Research',
    description: 'Find & verify authoritative academic sources via Google Search grounding.',
    icon: ShieldCheck,
    tag: 'Stage 3',
  },
  {
    stage: 4,
    name: 'Paper Generation',
    description: 'Synthesize full academic manuscript across all 9 standardized scholarly sections.',
    icon: BookOpen,
    tag: 'Stage 4',
  },
  {
    stage: 5,
    name: 'Quality Verification',
    description: 'Independent peer review auditing section presence, relevance, claims & repetition.',
    icon: Award,
    tag: 'Stage 5',
  },
];

export const AgentProgress: React.FC<AgentProgressProps> = ({
  topic,
  activeStage,
  events,
  currentMessage,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const progressPercentage = Math.min(100, Math.max(10, Math.round(((Math.min(5, activeStage) - 1) / 5) * 100) + 15));

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStageEvent = (s: number) => {
    return events.filter(e => e.stage === s).pop();
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-paper space-y-8">
        {/* Top Progress Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100 shadow-xs">
            <Activity className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>AI Research Agent Pipeline Active</span>
            <span className="text-slate-300">&bull;</span>
            <span className="font-mono flex items-center gap-1 text-slate-600">
              <Clock className="h-3 w-3" />
              {formatTimer(seconds)}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Synthesizing Scholarly Research Paper
          </h3>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-600 line-clamp-2 italic">
            &ldquo;{topic}&rdquo;
          </p>

          {/* High-level Progress Bar (Requirement 4) */}
          <div className="max-w-md mx-auto pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500">
              <span>Stage {Math.min(5, Math.max(1, activeStage))} of 5</span>
              <span className="font-bold text-blue-700">{progressPercentage}% Complete</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {currentMessage && (
            <div className="pt-1">
              <span className="inline-block rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 text-xs font-mono text-slate-700">
                &bull; {currentMessage}
              </span>
            </div>
          )}
        </div>

        {/* 5-Stage Agent Workflow Visualizer (Requirement 5) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
            <span>Agent Workflow Stages</span>
            <span>Status</span>
          </div>

          <div className="space-y-3">
            {AGENT_WORKFLOW_STAGES.map((s) => {
              const isCompleted = activeStage > s.stage;
              const isRunning = activeStage === s.stage;
              const isPending = activeStage < s.stage;
              const event = getStageEvent(s.stage);
              const Icon = s.icon;

              return (
                <div
                  key={s.stage}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                    isRunning
                      ? 'border-blue-500 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/10'
                      : isCompleted
                      ? 'border-slate-200/80 bg-slate-50/60'
                      : 'border-slate-100 bg-white/60 opacity-45'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : isRunning
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 animate-pulse'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isRunning ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <span className="font-mono text-xs font-bold">{s.stage}</span>
                      )}
                    </div>

                    {/* Stage Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${
                            isRunning ? 'text-blue-950 font-extrabold' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {s.name}
                          </h4>
                          <span className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                            {s.tag}
                          </span>
                        </div>

                        {/* Status Chip */}
                        {isRunning && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 uppercase tracking-wider animate-pulse">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
                            Running
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            Completed
                          </span>
                        )}
                        {isPending && (
                          <span className="text-[11px] font-mono text-slate-400">
                            Queued
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        {s.description}
                      </p>

                      {/* Live Intermediate Outputs for Completed Stages */}
                      {isCompleted && event && event.intermediateData && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-xs">
                          {/* Stage 1 Output Preview */}
                          {s.stage === 1 && event.intermediateData.domain && (
                            <div className="flex flex-wrap items-center gap-2 text-slate-700">
                              <span className="font-bold text-slate-900">Analyzed Domain:</span>
                              <span className="rounded-md bg-white px-2 py-0.5 border border-slate-200 font-mono text-[11px] text-blue-900">
                                {event.intermediateData.domain}
                              </span>
                              <span className="text-slate-400">&bull;</span>
                              <span>{(event.intermediateData.coreConcepts || []).length} Core Concepts Defined</span>
                            </div>
                          )}

                          {/* Stage 2 Output Preview */}
                          {s.stage === 2 && event.intermediateData.researchQuestions && (
                            <div className="space-y-1 text-slate-700">
                              <span className="font-bold text-slate-900">5 Formulated Research Questions:</span>
                              <div className="grid grid-cols-1 gap-1 pt-0.5">
                                {(event.intermediateData.researchQuestions as string[]).slice(0, 3).map((q, qIdx) => (
                                  <p key={qIdx} className="text-[11px] text-slate-700 truncate">
                                    &bull; {q}
                                  </p>
                                ))}
                                {(event.intermediateData.researchQuestions as string[]).length > 3 && (
                                  <p className="text-[10px] text-blue-600 font-semibold">
                                    + 2 additional research inquiries ready for empirical evaluation
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Stage 3 Output Preview */}
                          {s.stage === 3 && event.intermediateData.sources && (
                            <div className="flex flex-wrap items-center gap-2 text-slate-700">
                              <span className="font-bold text-slate-900">Collected Sources:</span>
                              <span className="rounded-md bg-emerald-50 text-emerald-800 px-2 py-0.5 border border-emerald-200 font-mono text-[11px]">
                                {(event.intermediateData.sources as any[]).length} Verified Academic Citations
                              </span>
                            </div>
                          )}

                          {/* Stage 4 Output Preview */}
                          {s.stage === 4 && event.intermediateData.title && (
                            <div className="text-slate-700">
                              <span className="font-bold text-slate-900">Synthesized Paper: </span>
                              <span className="italic font-serif font-medium">{event.intermediateData.title}</span>
                            </div>
                          )}

                          {/* Stage 5 Output Preview */}
                          {s.stage === 5 && event.intermediateData.overallScore && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <span className="font-bold text-slate-900">Quality Review Audit:</span>
                              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono text-xs">
                                Score: {event.intermediateData.overallScore}/100 &bull; Verdict: {event.intermediateData.verdict}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Non-hallucinatory research pipeline adhering to peer-reviewed scholarly standards</span>
          <span className="font-mono text-slate-400">Google Gemini &bull; Few-Shot Prompting</span>
        </div>
      </div>
    </div>
  );
};
