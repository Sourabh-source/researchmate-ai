import { GeneratePaperRequest, ResearchPaper, WorkflowStatusEvent } from '@/types/research';
import { runMultiStepResearchAgent } from './agent/agent-orchestrator';

export async function generateAcademicPaper(
  params: GeneratePaperRequest,
  onProgress?: (event: WorkflowStatusEvent) => void
): Promise<{ paper: ResearchPaper; isSimulation: boolean }> {
  const paper = await runMultiStepResearchAgent(params, onProgress);
  return {
    paper,
    isSimulation: Boolean(paper.metadata.isSimulation),
  };
}
