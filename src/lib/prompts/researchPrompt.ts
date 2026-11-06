import { GeneratePaperRequest, TopicAnalysisStep, ResearchPlanningStep, SourceResearchStep } from '@/types/research';

/**
 * FEW-SHOT EXAMPLES FOR RESEARCHMATE AI
 * 
 * Note: These examples serve as demonstrations of the expected schema,
 * structural depth, academic rigor, and formatting standards.
 * They are NOT factual evidence or content to be copied.
 */

export interface FewShotResearchExample {
  input: {
    topic: string;
    academicLevel?: string;
    focusType?: string;
    citationStyle?: string;
  };
  expectedPlanningOutput: {
    researchObjectives: string[];
    researchQuestions: string[];
    importantKeywords: string[];
    outline: {
      id: string;
      title: string;
      description: string;
      subsections: string[];
    }[];
  };
}

export const FEW_SHOT_RESEARCH_EXAMPLES: FewShotResearchExample[] = [
  // =========================================================================
  // EXAMPLE 1: Artificial Intelligence in Healthcare
  // =========================================================================
  {
    input: {
      topic: 'Artificial Intelligence in Healthcare',
      academicLevel: "Graduate / Master's",
      focusType: 'Empirical / Experimental',
      citationStyle: 'APA 7th',
    },
    expectedPlanningOutput: {
      researchObjectives: [
        'Analyze the impact of AI on healthcare delivery and diagnostic accuracy.',
        'Evaluate clinical integration hurdles, data privacy parameters, and computational limitations.',
        'Synthesize systemic pathways to augment medical practitioner decision-making and patient outcomes.'
      ],
      researchQuestions: [
        'RQ1: How does AI improve clinical diagnosis and diagnostic accuracy across acute hospital settings?',
        'RQ2: What are the primary technical, data quality, and algorithmic limitations hindering clinical AI adoption?',
        'RQ3: What data privacy, algorithmic bias, and ethical dilemmas arise when deploying autonomous diagnostic models?',
        'RQ4: How do clinical practitioners evaluate and validate predictive uncertainty in AI-assisted triage pipelines?',
        'RQ5: What regulatory and institutional frameworks best ensure long-term patient safety in AI-mediated healthcare?'
      ],
      importantKeywords: [
        'Artificial Intelligence',
        'Healthcare',
        'Diagnosis',
        'Clinical Decision Support',
        'Deep Learning',
        'Medical Informatics',
        'Algorithmic Governance'
      ],
      outline: [
        {
          id: '1',
          title: 'I. Introduction & Theoretical Foundations',
          description: 'Contextual background on AI integration in healthcare, problem statement, and articulation of research questions.',
          subsections: ['Clinical Diagnostics Context', 'The Diagnostic Accuracy Gap', 'Core Research Questions (RQ1-RQ5)']
        },
        {
          id: '2',
          title: 'II. Comprehensive Literature Review',
          description: 'Historical progression from rule-based medical expert systems to contemporary deep convolutional and transformer models.',
          subsections: ['Evolution of Medical AI', 'Empirical Diagnostic Accuracy Benchmarks', 'Open Gaps in Clinical Literature']
        },
        {
          id: '3',
          title: 'III. Research Methodology & Clinical Design',
          description: 'Multi-institutional comparative evaluation design, dataset hygiene, and calibration validation metrics.',
          subsections: ['Experimental Paradigm', 'Clinical Data Normalization', 'Evaluation Metrics (AUC-ROC, Sensitivity, F1)']
        },
        {
          id: '4',
          title: 'IV. Findings, Discussion & Critical Evaluation',
          description: 'Comparative diagnostic performance outcomes, practitioner workload metrics, limitations, and ethical trade-offs.',
          subsections: ['Diagnostic Performance Synthesis', 'Practitioner Trust & Uncertainty Calibration', 'Ethical & Bias Threats to Validity']
        },
        {
          id: '5',
          title: 'V. Conclusion & Strategic Roadmap',
          description: 'Summary of contributions, guidelines for clinical translation, and future research trajectories.',
          subsections: ['Summary of Clinical Insights', 'Recommendations for Hospital Systems', 'Future Inquiry Horizons']
        }
      ]
    }
  },

  // =========================================================================
  // EXAMPLE 2: Renewable Energy and Climate Change
  // =========================================================================
  {
    input: {
      topic: 'Renewable Energy and Climate Change',
      academicLevel: 'Doctorate / PhD',
      focusType: 'Empirical / Experimental',
      citationStyle: 'IEEE',
    },
    expectedPlanningOutput: {
      researchObjectives: [
        'Examine how renewable energy contributes to reducing climate change and greenhouse gas emissions.',
        'Quantify grid intermittency challenges and modern battery storage integration trade-offs.',
        'Synthesize macroeconomic and infrastructural policy levers accelerating clean energy decarbonization.'
      ],
      researchQuestions: [
        'RQ1: What are the primary quantifiable benefits of high-penetration renewable integration on regional carbon emission trajectories?',
        'RQ2: What are the implementation challenges and grid stability bottlenecks confronting intermittent solar and wind systems?',
        'RQ3: How do battery energy storage systems (BESS) modulate peak generation volatility in decentralized renewable architectures?',
        'RQ4: What economic, regulatory, and infrastructural hurdles impede utility-scale clean energy transition across developing economies?',
        'RQ5: What strategic policy paradigms best harmonize private capital investment with public carbon mitigation mandates?'
      ],
      importantKeywords: [
        'Renewable Energy',
        'Climate Change',
        'Sustainability',
        'Decarbonization',
        'Grid Stability',
        'Battery Energy Storage Systems',
        'Energy Policy'
      ],
      outline: [
        {
          id: '1',
          title: 'I. Introduction & Global Decarbonization Mandate',
          description: 'Global climate commitments, decarbonization targets, systemic intermittency challenges, and research questions.',
          subsections: ['Global Climate Commitments', 'Infrastructural Decarbonization Dilemma', 'Research Inquiries (RQ1-RQ5)']
        },
        {
          id: '2',
          title: 'II. Literature Review & Clean Energy Evolution',
          description: 'Taxonomy of renewable generation technologies, historical emissions offset data, and grid integration barriers.',
          subsections: ['Renewable Technology Matrix', 'Grid Intermittency Modeling', 'Gaps in Macroeconomic Energy Models']
        },
        {
          id: '3',
          title: 'III. Research Methodology & Grid Simulation Design',
          description: 'Empirical dispatch modeling, carbon accounting protocols, and grid reliability simulations under variable load.',
          subsections: ['Simulation Architecture', 'Emissions Reduction Accounting', 'Loss of Load Probability (LOLP) Metrics']
        },
        {
          id: '4',
          title: 'IV. Empirical Findings, Grid Discussion & Trade-Offs',
          description: 'Emissions reduction curves, storage buffer economics, comparative curtailment metrics, and policy sensitivities.',
          subsections: ['Decarbonization Impact Metrics', 'Storage Economics & Grid Resilience', 'Systemic Bottlenecks & Limitations']
        },
        {
          id: '5',
          title: 'V. Conclusion & Policy Roadmaps',
          description: 'Consolidated findings, actionable utility recommendations, and future research trajectories.',
          subsections: ['Core Analytical Contributions', 'Actionable Utility Directives', 'Future Research Horizons']
        }
      ]
    }
  }
];

/**
 * Constructs the Few-Shot Prompt for Step 2: Research Planning
 */
export function buildFewShotPlanningPrompt(
  params: GeneratePaperRequest,
  topicAnalysis: TopicAnalysisStep
): string {
  const fewShotDemosText = FEW_SHOT_RESEARCH_EXAMPLES.map((ex, idx) => {
    return `### DEMONSTRATION EXAMPLE ${idx + 1}:
INPUT:
- Topic: "${ex.input.topic}"
- Academic Level: "${ex.input.academicLevel}"
- Focus Type: "${ex.input.focusType}"

DEMONSTRATED EXPECTED OUTPUT STRUCTURE:
${JSON.stringify(ex.expectedPlanningOutput, null, 2)}`;
  }).join('\n\n');

  return `You are a Principal Academic Research Agent.
Your task is to perform STEP 2: RESEARCH PLANNING for the user's submitted topic.

To ensure superior scholarly consistency, structure, and academic depth, study the following TWO FEW-SHOT EXAMPLES demonstrating the expected output structure, level of detail, and JSON schema.

=============================================================================
FEW-SHOT DEMONSTRATIONS (FOR FORMAT AND STRUCTURE ONLY - DO NOT COPY CONTENT):
=============================================================================
${fewShotDemosText}

=============================================================================
CRITICAL INSTRUCTIONS FOR NEW TOPIC GENERATION:
=============================================================================
1. Use the above examples PURELY as structural demonstrations of formatting, schema compliance, and scholarly depth.
2. DO NOT copy, adapt, or cite the example topics, healthcare details, or energy content.
3. Understand the new research topic below and generate 100% ORIGINAL, substantive research content calibrated specifically for it.
4. Generate:
   - Clear, scholarly researchObjectives (3-4 items)
   - EXACTLY 5 relevant, rigorous research questions (RQ1 to RQ5) exploring causal mechanisms, limitations, trade-offs, and empirical metrics.
   - Authoritative importantKeywords (6-8 items)
   - A complete 5-section academic paper outline with titles, descriptions, and planned subsections.
5. Return ONLY a valid JSON object matching the demonstrated schema. No markdown fences or private chain-of-thought.

=============================================================================
NEW USER SUBMISSION TO PROCESS:
=============================================================================
- Topic: "${params.topic}"
- Domain: "${topicAnalysis.domain}"
- Scope: "${topicAnalysis.scope}"
- Academic Level: "${params.academicLevel || "Graduate / Master's"}"
- Methodology Focus: "${params.focusType || "Empirical / Experimental"}"

Output ONLY valid JSON for the submitted topic:`;
}

/**
 * Constructs the Few-Shot Prompt for Step 1: Topic Analysis
 */
export function buildFewShotTopicAnalysisPrompt(params: GeneratePaperRequest): string {
  return `You are a Principal Academic Research Agent.
Perform STEP 1: TOPIC ANALYSIS for the user's research topic.

STUDY THIS DEMONSTRATION OF THE EXPECTED STRUCTURAL FORMAT:
{
  "topic": "Artificial Intelligence in Healthcare",
  "domain": "Biomedical Informatics & Artificial Intelligence",
  "scope": "Investigates algorithmic diagnostics, clinical decision-support systems, operational healthcare delivery, and patient privacy boundaries.",
  "primaryObjectives": [
    "Delineate the diagnostic efficacy of deep learning across hospital care pathways.",
    "Identify computational, data governance, and clinician trust constraints.",
    "Formulate guidelines for safe translation into clinical practice."
  ],
  "coreConcepts": [
    {
      "term": "Clinical Decision Support System (CDSS)",
      "explanation": "Health information technology designed to assist clinicians in decision-making tasks."
    },
    {
      "term": "Diagnostic Sensitivity",
      "explanation": "The probability of a diagnostic test correctly identifying true positive clinical conditions."
    }
  ],
  "theoreticalFrameworks": [
    "Technology Acceptance Model in Healthcare",
    "Evidence-Based Medicine Diagnostic Paradigm"
  ],
  "academicSignificance": "Bridges algorithmic innovation with clinical safety, providing empirical heuristics for patient outcomes."
}

CRITICAL RULES:
- Use this demonstration ONLY to understand the expected JSON structure and rigor.
- Do NOT copy the example content.
- Analyze the user's topic below with high scholarly caliber.
- Return ONLY valid JSON matching this schema.

USER TOPIC:
Topic: "${params.topic}"
Academic Level: ${params.academicLevel || "Graduate / Master's"}
${params.additionalNotes ? `Additional Context: ${params.additionalNotes}` : ''}`;
}

/**
 * Constructs the Few-Shot Prompt for Step 4: Full Paper Generation
 */
export function buildFewShotPaperGenerationPrompt(
  params: GeneratePaperRequest,
  topicAnalysis: TopicAnalysisStep,
  researchPlan: ResearchPlanningStep,
  sourceResearch: SourceResearchStep
): string {
  const sourcesSummary = sourceResearch.sources.map((s, idx) => 
    `[Source ${idx + 1}] Title: "${s.title}" | Author(s): ${s.author} (${s.publicationYear}) | URL/DOI: ${s.sourceUrl} | Relevance: ${s.mainRelevance}`
  ).join('\n');

  const questionsSummary = researchPlan.researchQuestions.map((q, i) => `  ${i + 1}. ${q}`).join('\n');

  return `You are a World-Class Academic Professor, Principal Investigator, and Scholarly Writer.
Perform STEP 4: PAPER GENERATION.

Generate a comprehensive, peer-reviewed caliber academic paper based strictly on the prior agent workflow outputs:
- Topic: "${params.topic}"
- Academic Level: "${params.academicLevel || "Graduate / Master's"}"
- Citation Style: "${params.citationStyle || 'APA 7th'}"
- Methodological Focus: "${params.focusType || 'Empirical / Experimental'}"
- Scope & Objectives: ${topicAnalysis.scope}

FORMULATED RESEARCH QUESTIONS TO METHODICALLY ADDRESS:
${questionsSummary}

COLLECTED AND GROUNDED SCHOLARLY SOURCES TO CITE AND REFERENCE:
${sourcesSummary}

FEW-SHOT SCHEMA DEMONSTRATION:
The output must be a valid JSON object matching this exact structure:
{
  "title": "A Scholarly, Precise Title Directly Relevant to Submitted Topic",
  "authors": ["Dr. S. Vance, Ph.D.", "ResearchMate AI Collaborative"],
  "affiliations": ["Department of Advanced Studies, Global Institute of Technology & Sciences"],
  "abstract": "A 200-280 word abstract covering background, problem, RQ1-RQ5 objectives, methodology, key findings, and implications...",
  "keywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5"],
  "introduction": "Comprehensive introduction with in-text citations...",
  "literatureReview": "Critical literature review integrating collected sources...",
  "researchMethodology": "Detailed methodology design, instrumentation, and validation checks...",
  "findingsAndDiscussion": "Analytical findings answering the research questions, benchmarks, limitations...",
  "conclusion": "Synthesis of contributions and future trajectories...",
  "references": [
    "Formatted Reference 1 in ${params.citationStyle || 'APA 7th'}",
    "Formatted Reference 2 in ${params.citationStyle || 'APA 7th'}"
  ]
}

CRITICAL RULES:
1. Generate original text tailored specifically to "${params.topic}".
2. All 9 sections must be fully written out.
3. Incorporate the collected sources into the literature review and formal references.
4. Output ONLY valid JSON.`;
}
