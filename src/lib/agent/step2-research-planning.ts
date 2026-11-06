import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratePaperRequest, TopicAnalysisStep, ResearchPlanningStep } from '@/types/research';
import { buildFewShotPlanningPrompt } from '@/lib/prompts/researchPrompt';

export async function runStep2ResearchPlanning(
  genAI: GoogleGenerativeAI,
  modelName: string,
  params: GeneratePaperRequest,
  topicAnalysis: TopicAnalysisStep
): Promise<ResearchPlanningStep> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.35,
      responseMimeType: 'application/json',
    },
  });

  const prompt = buildFewShotPlanningPrompt(params, topicAnalysis);

  const res = await model.generateContent(prompt);
  let text = res.response.text().trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
  }

  const parsed = JSON.parse(text) as ResearchPlanningStep;

  // Enforce exactly 5 RQs if model returned slightly different number
  if (!Array.isArray(parsed.researchQuestions) || parsed.researchQuestions.length < 5) {
    const existing = parsed.researchQuestions || [];
    while (existing.length < 5) {
      existing.push(`RQ${existing.length + 1}: What systemic implications emerge regarding ${params.topic} under empirical testing?`);
    }
    parsed.researchQuestions = existing.slice(0, 5);
  } else if (parsed.researchQuestions.length > 5) {
    parsed.researchQuestions = parsed.researchQuestions.slice(0, 5);
  }

  return parsed;
}
