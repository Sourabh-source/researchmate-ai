import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  GeneratePaperRequest, 
  TopicAnalysisStep, 
  ResearchPlanningStep, 
  SourceResearchStep, 
  ResearchPaperContent 
} from '@/types/research';
import { buildFewShotPaperGenerationPrompt } from '@/lib/prompts/researchPrompt';

export async function runStep4PaperGeneration(
  genAI: GoogleGenerativeAI,
  modelName: string,
  params: GeneratePaperRequest,
  topicAnalysis: TopicAnalysisStep,
  researchPlan: ResearchPlanningStep,
  sourceResearch: SourceResearchStep
): Promise<ResearchPaperContent> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  const prompt = buildFewShotPaperGenerationPrompt(
    params,
    topicAnalysis,
    researchPlan,
    sourceResearch
  );

  const res = await model.generateContent(prompt);
  let text = res.response.text().trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
  }

  const parsed = JSON.parse(text) as ResearchPaperContent;

  // Validate critical sections
  if (!parsed.title || !parsed.abstract || !parsed.introduction || !parsed.conclusion) {
    throw new Error('Generated paper is missing mandatory sections.');
  }

  // Ensure references array exists and includes grounded sources
  if (!Array.isArray(parsed.references) || parsed.references.length === 0) {
    parsed.references = sourceResearch.sources.map(s => 
      `${s.author} (${s.publicationYear}). ${s.title}. Retrieved from ${s.sourceUrl}`
    );
  }

  return parsed;
}
