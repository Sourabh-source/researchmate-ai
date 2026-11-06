import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  GeneratePaperRequest, 
  ResearchPaper, 
  WorkflowStatusEvent 
} from '@/types/research';

import { runStep1TopicAnalysis } from './step1-topic-analysis';
import { runStep2ResearchPlanning } from './step2-research-planning';
import { runStep3SourceResearch, getFallbackSources } from './step3-source-research';
import { runStep4PaperGeneration } from './step4-paper-generation';
import { runStep5QualityCheck } from './step5-quality-check';
import { generateIntelligentFallbackWorkflow } from '../fallback-generator';

const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro'
];

export async function runMultiStepResearchAgent(
  params: GeneratePaperRequest,
  onProgress?: (event: WorkflowStatusEvent) => void
): Promise<ResearchPaper> {
  const startTime = Date.now();
  const apiKey = params.apiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

  // If no API key is provided, execute full multi-step intelligent simulation pipeline
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return generateIntelligentFallbackWorkflow(params, onProgress);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = CANDIDATE_MODELS[0];

  try {
    // ==========================================
    // STEP 1: TOPIC ANALYSIS
    // ==========================================
    onProgress?.({
      stage: 1,
      stageId: 'step1_analysis',
      label: 'STEP 1: Topic Analysis',
      status: 'running',
      message: 'Deconstructing semantic scope, domain boundaries, and theoretical concepts...',
    });

    const step1Result = await runStep1TopicAnalysis(genAI, modelName, params);

    onProgress?.({
      stage: 1,
      stageId: 'step1_analysis',
      label: 'STEP 1: Topic Analysis',
      status: 'completed',
      message: `Completed analysis for domain "${step1Result.domain}". Identified ${step1Result.coreConcepts.length} core concepts.`,
      intermediateData: step1Result,
    });

    // ==========================================
    // STEP 2: RESEARCH PLANNING
    // ==========================================
    onProgress?.({
      stage: 2,
      stageId: 'step2_plan',
      label: 'STEP 2: Research Planning',
      status: 'running',
      message: 'Formulating research objectives, 5 research questions, and structured outline...',
    });

    const step2Result = await runStep2ResearchPlanning(genAI, modelName, params, step1Result);

    onProgress?.({
      stage: 2,
      stageId: 'step2_plan',
      label: 'STEP 2: Research Planning',
      status: 'completed',
      message: `Formulated 5 core research questions and ${step2Result.outline.length}-section outline.`,
      intermediateData: step2Result,
    });

    // ==========================================
    // STEP 3: SOURCE RESEARCH
    // ==========================================
    onProgress?.({
      stage: 3,
      stageId: 'step3_sources',
      label: 'STEP 3: Source Research',
      status: 'running',
      message: 'Querying reliable academic sources with Google Search grounding...',
    });

    const step3Result = await runStep3SourceResearch(
      genAI,
      modelName,
      params,
      step1Result,
      step2Result
    );

    onProgress?.({
      stage: 3,
      stageId: 'step3_sources',
      label: 'STEP 3: Source Research',
      status: 'completed',
      message: `Collected ${step3Result.sources.length} authoritative sources via ${step3Result.groundingEngine}.`,
      intermediateData: step3Result,
    });

    // ==========================================
    // STEP 4: PAPER GENERATION
    // ==========================================
    onProgress?.({
      stage: 4,
      stageId: 'step4_paper',
      label: 'STEP 4: Paper Generation',
      status: 'running',
      message: 'Synthesizing publication-grade academic paper across all 9 standard sections...',
    });

    const step4Result = await runStep4PaperGeneration(
      genAI,
      modelName,
      params,
      step1Result,
      step2Result,
      step3Result
    );

    onProgress?.({
      stage: 4,
      stageId: 'step4_paper',
      label: 'STEP 4: Paper Generation',
      status: 'completed',
      message: `Generated comprehensive manuscript: "${step4Result.title}".`,
      intermediateData: { title: step4Result.title, abstract: step4Result.abstract },
    });

    // ==========================================
    // STEP 5: QUALITY CHECK
    // ==========================================
    onProgress?.({
      stage: 5,
      stageId: 'step5_quality',
      label: 'STEP 5: Quality Check',
      status: 'running',
      message: 'Auditing paper completeness, topical relevance, reference support, and repetition...',
    });

    const step5Result = await runStep5QualityCheck(
      genAI,
      modelName,
      params.topic,
      step1Result,
      step2Result,
      step3Result,
      step4Result
    );

    onProgress?.({
      stage: 5,
      stageId: 'step5_quality',
      label: 'STEP 5: Quality Check',
      status: 'completed',
      message: `Peer review audit complete. Verdict: ${step5Result.verdict} (Score: ${step5Result.overallScore}/100).`,
      intermediateData: step5Result,
    });

    // ==========================================
    // STEP 6: FINAL OUTPUT
    // ==========================================
    onProgress?.({
      stage: 6,
      stageId: 'step6_output',
      label: 'STEP 6: Final Output',
      status: 'running',
      message: 'Assembling structured JSON payload and formatted TXT document...',
    });

    const wordCount = calculateTotalWords(step4Result);
    const readTime = Math.ceil(wordCount / 200);

    const completePaper: ResearchPaper = {
      id: `rm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      topic: params.topic,
      academicLevel: params.academicLevel || "Graduate / Master's",
      citationStyle: params.citationStyle || 'APA 7th',
      focusType: params.focusType || 'Empirical / Experimental',
      createdAt: new Date().toISOString(),
      step1_analysis: step1Result,
      step2_plan: step2Result,
      step3_sources: step3Result,
      step4_paper: step4Result,
      step5_quality: step5Result,
      analysis: {
        topicOverview: step1Result.scope,
        identifiedQuestions: step2Result.researchQuestions,
        outline: step2Result.outline,
        relevantAreas: [step1Result.domain, ...step1Result.theoreticalFrameworks],
        recommendedMethodology: `${params.focusType || 'Empirical'} methodology adhering to ${params.citationStyle || 'APA 7th'} standards.`,
        targetKeywords: step2Result.importantKeywords,
      },
      paper: step4Result,
      metadata: {
        wordCount,
        estimatedReadTimeMinutes: readTime,
        generatedWith: 'ResearchMate AI Multi-Step Agent',
        model: modelName,
        isSimulation: false,
        executionTimeMs: Date.now() - startTime,
        completedStages: 6,
      },
    };

    onProgress?.({
      stage: 6,
      stageId: 'completed',
      label: 'STEP 6: Final Output',
      status: 'completed',
      message: 'Research paper successfully generated and validated.',
      intermediateData: completePaper,
    });

    return completePaper;
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.warn('Live Gemini multi-step agent error:', errorMsg);

    // If an explicit API key was provided and failed due to invalid credentials, report the auth failure
    if (apiKey && (
      errorMsg.toLowerCase().includes('api key not valid') || 
      errorMsg.toLowerCase().includes('api_key_invalid') ||
      errorMsg.toLowerCase().includes('unauthenticated') ||
      errorMsg.toLowerCase().includes('invalid api key')
    )) {
      throw new Error(`Google Gemini API authentication failed: Invalid API key. Please check your key at https://aistudio.google.com/app/apikey`);
    }

    // If quota is exhausted
    if (errorMsg.toLowerCase().includes('quota') || errorMsg.toLowerCase().includes('resource has been exhausted')) {
      throw new Error(`Google Gemini API quota exceeded (Rate Limit 429). Please wait a moment or check your API quotas.`);
    }

    onProgress?.({
      stage: 1,
      stageId: 'error',
      label: 'Workflow Notice',
      status: 'running',
      message: `Gemini API reported: ${errorMsg}. Engaging automated fallback research engine...`,
    });
    return generateIntelligentFallbackWorkflow(params, onProgress);
  }
}

function calculateTotalWords(paper: any): number {
  const parts = [
    paper.title || '',
    paper.abstract || '',
    paper.introduction || '',
    paper.literatureReview || '',
    paper.researchMethodology || '',
    paper.findingsAndDiscussion || '',
    paper.conclusion || '',
    (paper.references || []).join(' '),
  ];
  return parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
}
