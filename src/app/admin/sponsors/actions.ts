"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSponsors() {
  return await prisma.sponsor.findMany({
    orderBy: { sortOrder: "asc" }
  });
}

export async function createSponsor(data: { name: string; logoUrl?: string; tier?: string; website?: string; isActive?: boolean }) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  
  await prisma.sponsor.create({
    data: {
      name: data.name,
      slug,
      logoUrl: data.logoUrl,
      tier: (data.tier as any) || "COMMUNITY_PARTNER",
      website: data.website,
      isActive: data.isActive ?? true,
    }
  });

  revalidatePath("/admin/sponsors");
}

export async function updateSponsor(id: string, data: { name: string; logoUrl?: string; tier?: string; website?: string; isActive?: boolean }) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  await prisma.sponsor.update({
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

  revalidatePath("/admin/sponsors");
}

export async function deleteSponsor(id: string) {
  await prisma.sponsor.delete({
    where: { id }
  });

  revalidatePath("/admin/sponsors");
}
