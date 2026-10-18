"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  const currentUser = await getCurrentUser();
  const isSuperAdmin = currentUser?.roles?.some(
    (r: any) => r.role.name === "SUPER_ADMIN" || r.role.name === "KURUCU_BASKAN"
  );
  
  if (!isSuperAdmin) {
    return { success: false, error: "Bu işlem için Süper Admin yetkisi gereklidir." };
  }
  
  if (currentUser.id === userId) {
    return { success: false, error: "Kendi hesabınızı silemezsiniz." };
  }

  try {
    // Reassign teams created by this user to the current super admin to avoid losing them
    await prisma.team.updateMany({ where: { createdById: userId }, data: { createdById: currentUser.id } });
    
    // Disconnect optional relations
    await prisma.auditLog.updateMany({ where: { actorId: userId }, data: { actorId: null } });

    // Delete required relations that don't cascade properly
    await prisma.newsPost.deleteMany({ where: { authorId: userId } });
    await prisma.report.deleteMany({ where: { reporterId: userId } });
    await prisma.teamInvite.deleteMany({ where: { OR: [{ invitedById: userId }, { invitedId: userId }] } });
    await prisma.moderationAction.deleteMany({ where: { moderatorId: userId } });
    
    // Finally delete user (which cascades gameProfiles, userProfiles, crewMemberships, etc)
    await prisma.user.delete({ where: { id: userId } });
  
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Silinirken bir hata oluştu: " + error.message };
  }
}

export async function updateUserAdmin(userId: string, data: {
  status?: string;
  roles?: string[];
  leaderGameIds?: string[];
  playerGameIds?: string[];
  captainTeamIds?: string[];
}) {
  const currentUser = await getCurrentUser();
  const isSuperAdmin = currentUser?.roles?.some(
    (r: any) => r.role.name === "SUPER_ADMIN" || r.role.name === "KURUCU_BASKAN"
  );
  
  if (!isSuperAdmin) {
    return { success: false, error: "Bu işlem için Süper Admin yetkisi gereklidir." };
  }

  try {
    const { status, roles, leaderGameIds = [], playerGameIds = [], captainTeamIds = [] } = data;
    
    // 1. Update basic user status
    if (status) {
      await prisma.user.update({
        where: { id: userId },
        data: { status: status as any }
      });
    }

    // 2. Update roles in UserRole
    if (roles && Array.isArray(roles)) {
      // Clear existing roles
      await prisma.userRole.deleteMany({ where: { userId: userId } });
      
      // Assign new roles
      for (const roleName of roles) {
        let role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) {
          role = await prisma.role.create({ data: { name: roleName, displayName: roleName.replace('_', ' ') } });
        }
        await prisma.userRole.create({
          data: {
            userId: userId,
            roleId: role.id
          }
        });
      }
    }

    const hasGameLeaderRole = roles?.includes("GAME_LEADER");
    const hasPlayerRole = roles?.includes("PLAYER");
    const hasCaptainRole = roles?.includes("CAPTAIN");

    // 3. Handle GAME_LEADER (Oyun Lideri) - Kısıtlama yok, birden fazla oyun seçilebilir
    if (hasGameLeaderRole && leaderGameIds.length > 0) {
      // Find or create crews for the selected games
      const targetCrewIds: string[] = [];
      for (const gId of leaderGameIds) {
        let crew = await prisma.crew.findFirst({ where: { gameId: gId } });
        if (!crew) {
          const game = await prisma.game.findUnique({ where: { id: gId } });
          const name = (game?.name || 'Oyun') + ' Ekibi';
          const slug = (game?.slug || 'oyun') + '-ekibi-' + Date.now();
          crew = await prisma.crew.create({
            data: {
              name,
              slug,
              gameId: gId,
              description: `${game?.name} resmi topluluk ekibi.`
            }
          });
        }
        targetCrewIds.push(crew.id);
        
        // Ensure user is in CrewLeader
        const existingLeader = await prisma.crewLeader.findUnique({
          where: { crewId_userId: { crewId: crew.id, userId } }
        });
        if (!existingLeader) {
          await prisma.crewLeader.create({
            data: { crewId: crew.id, userId }
          });
        }
      }

      // Remove leadership from crews of games that are not in leaderGameIds
      await prisma.crewLeader.deleteMany({
        where: {
          userId,
          crewId: { notIn: targetCrewIds }
        }
      });
    } else if (!hasGameLeaderRole) {
      // If GAME_LEADER role was removed, remove all crew leaderships
      await prisma.crewLeader.deleteMany({ where: { userId } });
    }

    // 4. Handle PLAYER (Oyuncu) - Kısıtlama yok, birden fazla oyun seçilebilir
    if (hasPlayerRole && playerGameIds.length > 0) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const ign = user?.username || 'Player';

      // Upsert game profiles for selected games
      for (const gId of playerGameIds) {
        await prisma.gameProfile.upsert({
          where: { userId_gameId: { userId, gameId: gId } },
          update: { verified: true },
          create: {
            userId,
            gameId: gId,
            inGameName: ign,
            verified: true,
          }
        });
      }

      // Remove game profiles for unselected games
      await prisma.gameProfile.deleteMany({
        where: {
          userId,
          gameId: { notIn: playerGameIds }
        }
      });
    } else if (!hasPlayerRole) {
      // If PLAYER role was removed, remove player game profiles
      await prisma.gameProfile.deleteMany({ where: { userId } });
    }

    // 5. Handle CAPTAIN (Takım Kaptanı) - Her takımın en fazla 1 kaptanı olabilir!
    if (hasCaptainRole && captainTeamIds.length > 0) {
      for (const tId of captainTeamIds) {
        // Demote any existing captain on this team to PLAYER
        await prisma.teamMember.updateMany({
          where: {
            teamId: tId,
            userId: { not: userId },
            role: 'CAPTAIN'
          },
          data: { role: 'PLAYER' }
        });

        // Set this user as CAPTAIN
        await prisma.teamMember.upsert({
          where: { teamId_userId: { teamId: tId, userId } },
          update: { role: 'CAPTAIN' },
          create: {
            teamId: tId,
            userId,
            role: 'CAPTAIN'
          }
        });
      }

      // Demote this user from teams not in captainTeamIds
      await prisma.teamMember.updateMany({
        where: {
          userId,
          role: 'CAPTAIN',
          teamId: { notIn: captainTeamIds }
        },
        data: { role: 'PLAYER' }
      });
    } else if (!hasCaptainRole) {
      // If CAPTAIN role was removed, demote all this user's captain roles to PLAYER
      await prisma.teamMember.updateMany({
        where: { userId, role: 'CAPTAIN' },
        data: { role: 'PLAYER' }
      });
    }

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/teams");
    revalidatePath("/admin/crews");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Güncellenirken bir hata oluştu: " + error.message };
  }
}
