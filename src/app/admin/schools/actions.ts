'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/services/audit';

export async function updateSchool(id: string, data: any) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const school = await prisma.school.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      code: data.code,
      type: data.type,
      district: data.district,
      city: data.city,
      isActive: data.isActive
    }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Okul bilgileri güncellendi: "${school.name}" (${school.isActive ? 'Aktif' : 'Pasif'})`,
    targetType: 'Okullar',
    targetId: id,
    metadata: { name: school.name, isActive: school.isActive, code: school.code }
  });

  revalidatePath('/admin/schools');
  revalidatePath(`/admin/schools/${id}`);
  revalidatePath('/schools');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}
