import { NextResponse } from 'next/server';
import { automationRequestSchema } from '../../../lib/schema';
import { generateAutomationPlan } from '../../../lib/agent';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = automationRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid automation payload',
          details: parsed.error.flatten()
        },
        { status: 422 }
      );
    }

    const plan = generateAutomationPlan(parsed.data);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('[agent/POST] failed', error);
    return NextResponse.json(
      {
        error: 'Agent orchestration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
