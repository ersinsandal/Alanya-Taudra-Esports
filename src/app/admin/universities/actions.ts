'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/services/audit';

export async function updateUniversity(id: string, data: any) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const uni = await prisma.university.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: data.type,
      city: data.city,
      isActive: data.isActive
    }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Üniversite bilgileri güncellendi: "${uni.name}" (${uni.isActive ? 'Aktif' : 'Pasif'})`,
    targetType: 'Üniversiteler',
    targetId: id,
    metadata: { name: uni.name, isActive: uni.isActive }
  });

  revalidatePath('/admin/universities');
  revalidatePath(`/admin/universities/${id}`);
  revalidatePath('/campus');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}
