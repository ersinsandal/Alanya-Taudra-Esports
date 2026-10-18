'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function updateSchool(id: string, data: any) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  await prisma.school.update({
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

  revalidatePath('/admin/schools');
  revalidatePath(`/admin/schools/${id}`);
  return { success: true };
}
