import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import SettingsClient from './settings-client';

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      profile: {
        include: {
          school: true,
          university: true
        }
      },
      gameProfiles: {
        include: {
          game: true
        }
      }
    }
  });

  if (!fullUser) redirect('/login');

  const games = await prisma.game.findMany({
    orderBy: { name: 'asc' }
  });

  return <SettingsClient user={fullUser} />;
}
