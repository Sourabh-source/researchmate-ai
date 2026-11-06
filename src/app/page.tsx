'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { TopicForm } from '@/components/TopicForm';
import { AgentProgress } from '@/components/AgentProgress';
import { PaperViewer } from '@/components/PaperViewer';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { Footer } from '@/components/Footer';
import { 
  ResearchPaper, 
  GeneratePaperRequest, 
  WorkflowStatusEvent 
} from '@/types/research';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'rm_gemini_api_key';

export default function HomePage() {
  const [apiKey, setApiKey] = useState('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  
  // App Workflow States
  const [currentRequest, setCurrentRequest] = useState<GeneratePaperRequest | null>(null);
  const [generatedPaper, setGeneratedPaper] = useState<ResearchPaper | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Multi-step Agent Workflow Progress Tracking
  const [activeStage, setActiveStage] = useState<number>(1);
  const [workflowEvents, setWorkflowEvents] = useState<WorkflowStatusEvent[]>([]);
  const [currentProgressMessage, setCurrentProgressMessage] = useState<string>('');

  // Load custom API key from localStorage on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    } catch (e) {
      console.warn('Unable to read localStorage:', e);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      if (key) {
        localStorage.setItem(LOCAL_STORAGE_KEY, key);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Unable to persist API key:', e);
    }
  };

  const handleGeneratePaper = async (params: GeneratePaperRequest) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentRequest(params);
    setActiveStage(1);
    setWorkflowEvents([]);
    setCurrentProgressMessage('Initializing autonomous multi-step research agent...');

    try {
      const payload: GeneratePaperRequest = {
        ...params,
        apiKey: apiKey.trim() || undefined,
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      };
      if (apiKey.trim()) {
        headers['x-gemini-api-key'] = apiKey.trim();
      }

      // Try Server-Sent Events stream for real-time stage tracking
      const res = await fetch('/api/generate?stream=true', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = 'Failed to generate academic paper. Please try again.';
        try {
          const errJson = await res.json();
          errText = errJson.error || errText;
        } catch (_) {
          // ignore
        }
        throw new Error(errText);
      }

      if (!res.body) {
        throw new Error('ReadableStream not supported by browser.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let completedResult: ResearchPaper | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const rawData = trimmed.slice(6);
            try {
              const event = JSON.parse(rawData);

              if (event.status === 'error') {
                throw new Error(event.message || 'Stream processing error');
              }

              if (event.finalData) {
                completedResult = event.finalData as ResearchPaper;
              }

              if (event.stage) {
                setActiveStage(event.stage);
              }
              if (event.message) {
                setCurrentProgressMessage(event.message);
              }

              setWorkflowEvents((prev) => [...prev, event]);
            } catch (parseErr: any) {
              if (parseErr.message && !parseErr.message.includes('JSON')) {
                throw parseErr;
              }
            }
          }
        }
      }

      if (completedResult) {
        setGeneratedPaper(completedResult);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback to standard request if stream finished without complete payload
        const stdRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const stdData = await stdRes.json();
        if (stdData.success && stdData.data) {
          setGeneratedPaper(stdData.data);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          throw new Error(stdData.error || 'Failed to complete paper generation.');
        }
      }
    } catch (err: unknown) {
      console.error('Generation workflow error:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during generation.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (currentRequest) {
      handleGeneratePaper(currentRequest);
    }
  };

  const handleEditTopic = () => {
    setGeneratedPaper(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToHome = () => {
    setGeneratedPaper(null);
    setErrorMessage(null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar
        hasCustomKey={Boolean(apiKey)}
        isSimulationMode={Boolean(generatedPaper?.metadata.isSimulation)}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onReset={handleResetToHome}
      />

      <main className="flex-1">
        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mx-auto max-w-4xl px-4 pt-6">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-rose-900 shadow-sm flex items-start justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Workflow Error</h4>
                  <p className="mt-0.5 text-xs text-rose-700 leading-relaxed">
                    {errorMessage}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {currentRequest && (
                      <button
                        onClick={handleRegenerate}
                        className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 active:scale-95 transition-all"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Retry Multi-Step Agent</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsKeyModalOpen(true)}
                      className="rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-50 active:scale-95 transition-all"
                    >
                      Check API Key
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-400 hover:text-rose-700 p-1"
                title="Dismiss"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic State View */}
        {isLoading ? (
          <AgentProgress 
            topic={currentRequest?.topic || 'Analyzing topic...'} 
            activeStage={activeStage}
            events={workflowEvents}
            currentMessage={currentProgressMessage}
          />
        ) : generatedPaper ? (
          <PaperViewer
            paper={generatedPaper}
            onRegenerate={handleRegenerate}
            onEditTopic={handleEditTopic}
            isRegenerating={isLoading}
          />
        ) : (
          <TopicForm
            initialValues={currentRequest || undefined}
            onSubmit={handleGeneratePaper}
            isLoading={isLoading}
          />
        )}
      </main>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <Footer />
    </div>
  );
}
