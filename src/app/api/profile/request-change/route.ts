import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, message } = await req.json();

    const report = await prisma.report.create({
      data: {
        reporterId: user.id,
        targetType: 'SYSTEM',
        targetId: user.id,
        reason: 'PROFILE_CHANGE_REQUEST',
        details: `Type: ${type}. Message: ${message}`
      }
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}
