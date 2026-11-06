import { NextRequest, NextResponse } from 'next/server';
import { formatPaperAsExportJson, formatPaperAsText } from '@/lib/export-utils';
import { ResearchPaper } from '@/types/research';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paper = body.paper as ResearchPaper;
    const format = (body.format || 'json').toLowerCase();

    if (!paper || !paper.paper) {
      return NextResponse.json({ error: 'Valid paper object required' }, { status: 400 });
    }

    if (format === 'txt') {
      const text = formatPaperAsText(paper);
      return new Response(text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': 'attachment; filename="research_paper.txt"',
        },
      });
    }

    // Default: JSON
    const exportData = formatPaperAsExportJson(paper);
    const jsonString = JSON.stringify(exportData, null, 2);

    return new Response(jsonString, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="research_paper.json"',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Export error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const format = (url.searchParams.get('format') || 'json').toLowerCase();
  const sampleFolder = path.join(process.cwd(), 'sample_output');

  try {
    if (format === 'txt') {
      const filePath = path.join(sampleFolder, 'research_paper.txt');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'Sample TXT file not found' }, { status: 404 });
      }
      const fileData = fs.readFileSync(filePath, 'utf8');
      return new Response(fileData, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': 'attachment; filename="research_paper.txt"',
        },
      });
    }

    const filePath = path.join(sampleFolder, 'research_paper.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Sample JSON file not found' }, { status: 404 });
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    return new Response(fileData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="research_paper.json"',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
