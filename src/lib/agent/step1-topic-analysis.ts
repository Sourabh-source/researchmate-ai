import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratePaperRequest, TopicAnalysisStep } from '@/types/research';
import { buildFewShotTopicAnalysisPrompt } from '@/lib/prompts/researchPrompt';

export async function runStep1TopicAnalysis(
  genAI: GoogleGenerativeAI,
  modelName: string,
  params: GeneratePaperRequest
): Promise<TopicAnalysisStep> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.3,
      responseMimeType: 'application/json',
    },
  });

  const prompt = buildFewShotTopicAnalysisPrompt(params);

  const res = await model.generateContent(prompt);
  let text = res.response.text().trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
  }

  const parsed = JSON.parse(text) as TopicAnalysisStep;
  return parsed;
}
