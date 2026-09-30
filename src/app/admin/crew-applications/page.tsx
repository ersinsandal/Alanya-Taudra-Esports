import { prisma } from '@/lib/db';
import CrewAppsClient from './crew-apps-client';

export default async function CrewApplicationsAdminPage() {
  const applications = await prisma.crewApplication.findMany({
    include: {
      user: true,
      game: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return <CrewAppsClient initialApps={applications} />;
}
