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

export async function updateUserAdmin(userId: string, data: any) {
  const currentUser = await getCurrentUser();
  const isSuperAdmin = currentUser?.roles?.some(
    (r: any) => r.role.name === "SUPER_ADMIN" || r.role.name === "KURUCU_BASKAN"
  );
  
  if (!isSuperAdmin) {
    return { success: false, error: "Bu işlem için Süper Admin yetkisi gereklidir." };
  }

  try {
    const { status, roles } = data;
    
    // Update basic user status
    if (status) {
      await prisma.user.update({
        where: { id: userId },
        data: { status }
      });
    }

    // Update roles
    if (roles && Array.isArray(roles)) {
      // Clear existing roles
      await prisma.userRole.deleteMany({ where: { userId: userId } });
      
      // Assign new roles
      for (const roleName of roles) {
        let role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) {
          // Fallback create role if it doesn't exist
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

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Güncellenirken bir hata oluştu: " + error.message };
  }
}
