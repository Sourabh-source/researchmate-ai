export type AcademicLevel = 
  | 'Beginner'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Graduate / Master\'s'
  | 'Doctorate / PhD'
  | 'Postdoctoral / Professional'
  | 'General Academic';

export type CitationStyle = 'APA 7th' | 'IEEE' | 'MLA 9th' | 'Chicago 17th' | 'Harvard';

export type PaperFocus = 'Empirical / Experimental' | 'Theoretical & Conceptual' | 'Systematic Literature Review' | 'Case Study & Comparative';

export interface OutlineItem {
  id: string;
  title: string;
  description: string;
  subsections?: string[];
}

export interface ConceptItem {
  term: string;
  explanation: string;
}

// STEP 1: TOPIC ANALYSIS
export interface TopicAnalysisStep {
  topic: string;
  domain: string;
  scope: string;
  primaryObjectives: string[];
  coreConcepts: ConceptItem[];
  theoreticalFrameworks: string[];
  academicSignificance: string;
}

// STEP 2: RESEARCH PLANNING
export interface ResearchPlanningStep {
  researchObjectives: string[];
  researchQuestions: string[]; // Exactly 5 RQs
  importantKeywords: string[];
  outline: OutlineItem[];
}

// STEP 3: SOURCE RESEARCH
export interface AcademicSource {
  id: string;
  title: string;
  author: string;
  publicationYear: string | number;
  sourceUrl: string;
  mainRelevance: string;
  verificationStatus: 'verified_search' | 'indexed_academic_corpus' | 'unverified';
  isGroundingVerified: boolean;
}

export interface SourceResearchStep {
  sources: AcademicSource[];
  groundingEngine: string;
  searchQueriesUsed: string[];
  totalSourcesCount: number;
  groundingSupported: boolean;
}

// STEP 4: PAPER GENERATION
export interface ResearchPaperContent {
  title: string;
  authors: string[];
  affiliations: string[];
  abstract: string;
  keywords: string[];
  introduction: string;
  literatureReview: string;
  researchMethodology: string;
  findingsAndDiscussion: string;
  conclusion: string;
  references: string[];
}

// STEP 5: QUALITY CHECK
export interface QualityCheckStep {
  sectionsCheck: {
    allPresent: boolean;
    presentSections: string[];
    missingSections: string[];
    details: string;
  };
  relevanceCheck: {
    isRelevant: boolean;
    score: number; // 0 - 100
    analysis: string;
  };
  referenceSupportCheck: {
    claimsSupported: boolean;
    analysis: string;
    groundedSourcesCount: number;
  };
  factualClaimVerification: {
    hasConcerns: boolean;
    unsupportedClaims: string[];
    assessment: string;
  };
  repetitionCheck: {
    hasRepetitiveContent: boolean;
    score: number; // 0 - 100 (100 = minimal repetition)
    findings: string;
  };
  overallScore: number; // 0 - 100
  verdict: 'PASSED' | 'EXCELLENT' | 'CONDITIONAL_PASS';
  recommendations: string[];
}

// STEP 6: COMPLETE OUTPUT
export interface ResearchPaper {
  id: string;
  topic: string;
  academicLevel: AcademicLevel;
  citationStyle: CitationStyle;
  focusType: PaperFocus;
  createdAt: string;
  
  // Logical Agent Pipeline Stages
  step1_analysis: TopicAnalysisStep;
  step2_plan: ResearchPlanningStep;
  step3_sources: SourceResearchStep;
  step4_paper: ResearchPaperContent;
  step5_quality: QualityCheckStep;
  
  // Legacy / convenience mappings
  analysis: {
    topicOverview: string;
    identifiedQuestions: string[];
    outline: OutlineItem[];
    relevantAreas: string[];
    recommendedMethodology: string;
    targetKeywords: string[];
  };
  paper: ResearchPaperContent;

  metadata: {
    wordCount: number;
    estimatedReadTimeMinutes: number;
    generatedWith: string;
    model: string;
    isSimulation?: boolean;
    executionTimeMs?: number;
    completedStages: number;
  };
}

export type AgentStageId = 
  | 'idle'
  | 'step1_analysis'
  | 'step2_plan'
  | 'step3_sources'
  | 'step4_paper'
  | 'step5_quality'
  | 'step6_output'
  | 'completed'
  | 'error';

export interface WorkflowStatusEvent {
  stage: number; // 1 to 6
  stageId: AgentStageId;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  message: string;
  intermediateData?: any;
}

export interface GeneratePaperRequest {
  topic: string;
  academicLevel?: AcademicLevel;
  citationStyle?: CitationStyle;
  focusType?: PaperFocus;
  additionalNotes?: string;
  apiKey?: string;
}

export interface GeneratePaperResponse {
  success: boolean;
  data?: ResearchPaper;
  error?: string;
  isSimulation?: boolean;
}
