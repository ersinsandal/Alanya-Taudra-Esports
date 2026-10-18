'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function updateUniversity(id: string, data: any) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  await prisma.university.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: data.type,
      city: data.city,
      isActive: data.isActive
    }
  });

  revalidatePath('/admin/universities');
  revalidatePath(`/admin/universities/${id}`);
  return { success: true };
}
