import { prisma } from '@/lib/db';
import TeamAppsClient from './team-apps-client';

export default async function TeamApplicationsAdminPage() {
  const applications = await prisma.teamApplication.findMany({
    where: {
      team: { isOfficial: true }
    },
    include: {
      user: true,
      team: { include: { game: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return <TeamAppsClient initialApps={applications} />;
}
