import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  // Fetch real stats
  const points = await prisma.pointTransaction.aggregate({
    where: { userId: user.id },
    _sum: { amount: true }
  });
  
  const teamCount = await prisma.teamMember.count({
    where: { userId: user.id }
  });

  const achievementCount = await prisma.userAchievement.count({
    where: { userId: user.id }
  });

  const matchCount = await prisma.match.count({
    where: {
      OR: [
        { teamA: { members: { some: { userId: user.id } } } },
        { teamB: { members: { some: { userId: user.id } } } }
      ]
    }
  });

  // Profil doluluğu hesabı (daha kapsamlı)
  let completion = 10;
  if (user.profile?.firstName) completion += 15;
  if (user.profile?.lastName) completion += 15;
  if (user.phone) completion += 10;
  if (user.profile?.discordUsername) completion += 20;
  if (user.profile?.bio) completion += 10;
  if (user.profile?.schoolId || user.profile?.universityId) completion += 20;

  const stats = {
    score: points._sum.amount || 0,
    matches: matchCount,
    teams: teamCount,
    achievements: achievementCount,
    profileCompletion: completion
  };

  const dbTeams = await prisma.teamMember.findMany({
    where: { userId: user.id },
    include: {
      team: {
        include: { game: true }
      }
    }
  });

  const applications = await prisma.teamApplication.findMany({
    where: { userId: user.id },
    include: { team: true }
  });

  const mappedUser = {
    id: user.id,
    username: user.username,
    firstName: user.profile?.firstName,
    lastName: user.profile?.lastName
  };

  return <DashboardClient user={mappedUser} stats={stats} teams={dbTeams} applications={applications} />;
}
