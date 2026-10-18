"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/session";
import { createAuditLog } from "@/lib/services/audit";

export async function getSponsors() {
  return await prisma.sponsor.findMany({
    orderBy: { sortOrder: "asc" }
  });
}

export async function createSponsor(data: { name: string; logoUrl?: string; tier?: string; website?: string; isActive?: boolean }) {
  const user = await getCurrentUser();
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  
  const sponsor = await prisma.sponsor.create({
    data: {
      name: data.name,
      slug,
      logoUrl: data.logoUrl,
      tier: (data.tier as any) || "COMMUNITY_PARTNER",
      website: data.website,
      isActive: data.isActive ?? true,
    }
  });

  await createAuditLog({
    actorId: user?.id,
    action: `Yeni sponsor eklendi: "${data.name}"`,
    targetType: 'Sponsorlar',
    targetId: sponsor.id,
    metadata: { name: data.name, tier: data.tier }
  });

  revalidatePath("/admin/sponsors");
  revalidatePath("/partners");
  revalidatePath("/admin/audit-logs");
}

export async function updateSponsor(id: string, data: { name: string; logoUrl?: string; tier?: string; website?: string; isActive?: boolean }) {
  const user = await getCurrentUser();
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  const sponsor = await prisma.sponsor.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      logoUrl: data.logoUrl,
      tier: data.tier as any,
      website: data.website,
      isActive: data.isActive,
    }
  });

  await createAuditLog({
    actorId: user?.id,
    action: `Sponsor güncellendi: "${data.name}"`,
    targetType: 'Sponsorlar',
    targetId: id,
    metadata: { name: data.name, tier: data.tier }
  });

  revalidatePath("/admin/sponsors");
  revalidatePath("/partners");
  revalidatePath("/admin/audit-logs");
}

export async function deleteSponsor(id: string) {
  const user = await getCurrentUser();
  const target = await prisma.sponsor.findUnique({ where: { id }, select: { name: true } });

  await prisma.sponsor.delete({
    where: { id }
  });

  await createAuditLog({
    actorId: user?.id,
    action: `Sponsor silindi: "${target?.name || id}"`,
    targetType: 'Sponsorlar',
    targetId: id,
    metadata: { name: target?.name }
  });

  revalidatePath("/admin/sponsors");
  revalidatePath("/partners");
  revalidatePath("/admin/audit-logs");
}
