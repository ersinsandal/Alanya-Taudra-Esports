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

    const application = await prisma.crewApplication.update({
      where: { id },
      data: { status },
      include: {
        game: true,
        user: true
      }
    });

    // We can't automatically assign them to a Crew because they applied for a Game, 
    // and multiple crews might exist for a game, or we might need to find the specific crew.
    // Let's assume there is a Crew for this Game.
    if (status === 'APPROVED') {
      const crew = await prisma.crew.findFirst({ where: { gameId: application.gameId } });
      if (crew) {
        const existing = await prisma.crewLeader.findFirst({
          where: { crewId: crew.id, userId: application.userId }
        });
        if (!existing) {
          await prisma.crewLeader.create({
            data: { crewId: crew.id, userId: application.userId }
          });
        }
      }
    }

    // Create Notification
    const title = status === 'APPROVED' ? 'Başvuru Onaylandı' : 'Başvuru Reddedildi';
    const message = status === 'APPROVED' 
      ? `${application.game.name} Ekibi oyun lideri başvurunuz onaylandı.`
      : `${application.game.name} Ekibi oyun lideri başvurunuz maalesef reddedildi.`;
    
    await prisma.notification.create({
      data: {
        userId: application.user.id,
        type: 'SYSTEM',
        title,
        message,
        link: '/crews'
      }
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
