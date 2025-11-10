import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

const analyticsFile = path.join(process.cwd(), 'data', 'analytics.json');

async function readAnalytics() {
  try {
    const data = await fs.readFile(analyticsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      events: [],
      pageViews: 0,
      buttonClicks: 0,
      conversions: 0,
    };
  }
}

async function writeAnalytics(data: any) {
  await fs.mkdir(path.dirname(analyticsFile), { recursive: true });
  await fs.writeFile(analyticsFile, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();

    const analytics = await readAnalytics();
    
    analytics.events.push({
      ...event,
      timestamp: new Date().toISOString(),
    });

    // Atualizar contadores
    if (event.type === 'page_view') {
      analytics.pageViews += 1;
    } else if (event.type === 'button_click') {
      analytics.buttonClicks += 1;
    } else if (event.type === 'conversion') {
      analytics.conversions += 1;
    }

    await writeAnalytics(analytics);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const analytics = await readAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read analytics' },
      { status: 500 }
    );
  }
}
