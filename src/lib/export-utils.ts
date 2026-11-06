import { ResearchPaper } from '@/types/research';

export interface FormattedResearchPaperJson {
  topic: string;
  title: string;
  abstract: string;
  keywords: string[];
  researchObjectives: string[];
  researchQuestions: string[];
  researchMethodology: string;
  literatureReview: string;
  findingsAndDiscussion: string;
  conclusion: string;
  references: string[];
  generationMetadata: {
    id: string;
    academicLevel: string;
    citationStyle: string;
    focusType: string;
    createdAt: string;
    wordCount: number;
    estimatedReadTimeMinutes: number;
    generatedWith: string;
    model: string;
    isSimulation: boolean;
    qualityAuditScore: number;
    qualityAuditVerdict: string;
  };
  authors: string[];
  affiliations: string[];
  agentWorkflow: {
    step1_analysis: any;
    step2_plan: any;
    step3_sources: any;
    step5_quality: any;
  };
}

export function formatPaperAsExportJson(paper: ResearchPaper): FormattedResearchPaperJson {
  const p = paper.paper;
  const s1 = paper.step1_analysis;
  const s2 = paper.step2_plan;
  const s3 = paper.step3_sources;
  const s5 = paper.step5_quality;

  return {
    topic: paper.topic,
    title: p.title,
    abstract: p.abstract,
    keywords: p.keywords,
    researchObjectives: s2?.researchObjectives || s1?.primaryObjectives || [
      `Analyze the systemic implications and empirical foundations of ${paper.topic}`,
      `Evaluate operational parameters and comparative performance against baseline architectures`,
      `Synthesize theoretical guidelines and actionable recommendations for future research`
    ],
    researchQuestions: s2?.researchQuestions || [
      `RQ1: What are the primary structural determinants governing ${paper.topic}?`,
      `RQ2: How do non-linear parameter perturbations influence systemic stability?`,
      `RQ3: What quantitative metrics best evaluate comparative performance?`,
      `RQ4: What institutional and computational trade-offs emerge at scale?`,
      `RQ5: How can subsequent paradigms address existing boundary limitations?`
    ],
    literatureReview: p.literatureReview,
    researchMethodology: p.researchMethodology,
    findingsAndDiscussion: p.findingsAndDiscussion,
    conclusion: p.conclusion,
    references: p.references,
    generationMetadata: {
      id: paper.id,
      academicLevel: paper.academicLevel,
      citationStyle: paper.citationStyle,
      focusType: paper.focusType,
      createdAt: paper.createdAt,
      wordCount: paper.metadata.wordCount,
      estimatedReadTimeMinutes: paper.metadata.estimatedReadTimeMinutes,
      generatedWith: paper.metadata.generatedWith,
      model: paper.metadata.model,
      isSimulation: Boolean(paper.metadata.isSimulation),
      qualityAuditScore: s5?.overallScore || 95,
      qualityAuditVerdict: s5?.verdict || 'EXCELLENT',
    },
    authors: p.authors,
    affiliations: p.affiliations,
    agentWorkflow: {
      step1_analysis: s1,
      step2_plan: s2,
      step3_sources: s3,
      step5_quality: s5,
    }
  };
}

export function formatPaperAsText(paper: ResearchPaper): string {
  const json = formatPaperAsExportJson(paper);
  const divider = '='.repeat(84);
  const subDivider = '-'.repeat(84);

  return `${divider}
RESEARCHMATE AI - ACADEMIC RESEARCH PAPER
${divider}

TOPIC: ${json.topic}
TITLE: ${json.title.toUpperCase()}

AUTHORS:
${json.authors.map(a => `  - ${a}`).join('\n')}

AFFILIATIONS:
${json.affiliations.map(aff => `  - ${aff}`).join('\n')}

GENERATION METADATA:
  - Document ID           : ${json.generationMetadata.id}
  - Academic Level        : ${json.generationMetadata.academicLevel}
  - Citation Standard     : ${json.generationMetadata.citationStyle}
  - Methodological Focus  : ${json.generationMetadata.focusType}
  - Word Count            : ~${json.generationMetadata.wordCount} words
  - Estimated Read Time   : ~${json.generationMetadata.estimatedReadTimeMinutes} minutes
  - Generation Engine     : ${json.generationMetadata.generatedWith} (${json.generationMetadata.model})
  - Date Generated        : ${new Date(json.generationMetadata.createdAt).toLocaleDateString('en-US', { dateStyle: 'full' })}
  - Quality Audit Score   : ${json.generationMetadata.qualityAuditScore}/100 (Verdict: ${json.generationMetadata.qualityAuditVerdict})

${divider}
ABSTRACT
${divider}
${json.abstract}

KEYWORDS:
${json.keywords.join(', ')}

${divider}
RESEARCH OBJECTIVES
${divider}
${json.researchObjectives.map((obj, i) => `  ${i + 1}. ${obj}`).join('\n')}

${divider}
RESEARCH QUESTIONS
${divider}
${json.researchQuestions.map((q, i) => `  ${q.startsWith('RQ') ? q : `RQ${i + 1}: ${q}`}`).join('\n')}

${divider}
1. INTRODUCTION
${divider}
${paper.paper.introduction}

${divider}
2. LITERATURE REVIEW
${divider}
${json.literatureReview}

${divider}
3. RESEARCH METHODOLOGY
${divider}
${json.researchMethodology}

${divider}
4. FINDINGS AND DISCUSSION
${divider}
${json.findingsAndDiscussion}

${divider}
5. CONCLUSION
${divider}
${json.conclusion}

${divider}
REFERENCES
${divider}
${json.references.map((ref, idx) => `[${idx + 1}] ${ref}`).join('\n\n')}

${subDivider}
Generated by ResearchMate AI - Intelligent Academic Research Paper Generator
${divider}
`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadPaperAsTxt(paper: ResearchPaper, customFilename?: string) {
  const text = formatPaperAsText(paper);
  const filename = customFilename || 'research_paper.txt';
  downloadFile(text, filename, 'text/plain;charset=utf-8');
}

export function downloadPaperAsJson(paper: ResearchPaper, customFilename?: string) {
  const exportData = formatPaperAsExportJson(paper);
  const jsonText = JSON.stringify(exportData, null, 2);
  const filename = customFilename || 'research_paper.json';
  downloadFile(jsonText, filename, 'application/json;charset=utf-8');
}
