import { NextRequest, NextResponse } from 'next/server';
import { generateAcademicPaper } from '@/lib/gemini';
import { GeneratePaperRequest, GeneratePaperResponse, WorkflowStatusEvent } from '@/types/research';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GeneratePaperRequest;

    if (!body.topic || typeof body.topic !== 'string' || body.topic.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid research topic (minimum 3 characters).',
        },
        { status: 400 }
      );
    }

    // Header API key override if present
    const headerApiKey = request.headers.get('x-gemini-api-key') || undefined;
    const effectiveApiKey = headerApiKey || body.apiKey;

    const wantsStream = 
      request.headers.get('accept') === 'text/event-stream' ||
      new URL(request.url).searchParams.get('stream') === 'true';

    // If streaming is requested via Server-Sent Events (SSE)
    if (wantsStream) {
      const responseStream = new TransformStream();
      const writer = responseStream.writable.getWriter();
      const encoder = new TextEncoder();

      // Launch background agent execution and pipe status events to SSE stream
      (async () => {
        try {
          const result = await generateAcademicPaper(
            {
              ...body,
              apiKey: effectiveApiKey,
            },
            async (event: WorkflowStatusEvent) => {
              const payload = `data: ${JSON.stringify(event)}\n\n`;
              await writer.write(encoder.encode(payload));
            }
          );

          // Final event with complete data
          const donePayload = `data: ${JSON.stringify({
            stage: 6,
            stageId: 'completed',
            label: 'Complete',
            status: 'completed',
            message: 'Generation completed successfully',
            finalData: result.paper,
            isSimulation: result.isSimulation,
          })}\n\n`;
          await writer.write(encoder.encode(donePayload));
        } catch (streamError: any) {
          const errorPayload = `data: ${JSON.stringify({
            stage: 0,
            stageId: 'error',
            label: 'Error',
            status: 'error',
            message: streamError.message || 'Stream processing error',
          })}\n\n`;
          await writer.write(encoder.encode(errorPayload));
        } finally {
          await writer.close();
        }
      })();

      return new Response(responseStream.readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    // Standard JSON Response mode
    const result = await generateAcademicPaper({
      ...body,
      apiKey: effectiveApiKey,
    });

    return NextResponse.json<GeneratePaperResponse>({
      success: true,
      data: result.paper,
      isSimulation: result.isSimulation,
    });
  } catch (error: unknown) {
    console.error('Paper generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during paper generation.';

    let statusCode = 500;
    if (errorMessage.toLowerCase().includes('api key') || errorMessage.toLowerCase().includes('unauthorized') || errorMessage.toLowerCase().includes('quota')) {
      statusCode = 401;
    } else if (errorMessage.toLowerCase().includes('rate limit') || errorMessage.toLowerCase().includes('resource has been exhausted')) {
      statusCode = 429;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
