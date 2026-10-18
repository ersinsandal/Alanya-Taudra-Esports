import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import EditUserClient from "./edit-user-client";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: {
        include: {
          school: true,
          university: true,
        }
      },
      roles: { include: { role: true } },
      gameProfiles: { include: { game: true } },
      crewLeaderships: { include: { crew: { include: { game: true } } } },
      teamMemberships: { include: { team: { include: { game: true } } } }
    }
  });

  if (!user) notFound();

  const allGames = await prisma.game.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, icon: true, category: true }
  });

  const allTeams = await prisma.team.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    include: {
      game: { select: { id: true, name: true } },
      members: {
        where: { role: 'CAPTAIN' },
        include: { user: { select: { id: true, username: true } } }
      }
    }
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users"
          className="p-2 bg-secondary border border-border/50 rounded-lg text-secondary-text hover:text-primary-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold font-heading text-white">Kullanıcı Düzenle: {user.username}</h1>
      </div>

      <EditUserClient 
        user={user} 
        allGames={allGames} 
        allTeams={allTeams} 
      />
    </div>
  );
}
