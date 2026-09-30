import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await req.json();
    await prisma.notification.update({
      where: { id, userId: user.id },
      data: { isRead: true }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
