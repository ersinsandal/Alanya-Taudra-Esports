import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.roles.some((r: any) => ['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(r.role.name))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await req.json();

    const report = await prisma.report.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}
