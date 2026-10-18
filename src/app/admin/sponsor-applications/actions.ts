"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/session";
import { createAuditLog } from "@/lib/services/audit";

export async function getPartnershipRequests() {
  return await prisma.partnershipRequest.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function updatePartnershipRequestStatus(id: string, status: string) {
  const user = await getCurrentUser();
  const req = await prisma.partnershipRequest.update({
    where: { id },
    data: { status }
  });

  await createAuditLog({
    actorId: user?.id,
    action: `Sponsorluk başvurusu durumu güncellendi: "${req.companyName}" -> ${status}`,
    targetType: 'Sponsor Başvuruları',
    targetId: id,
    metadata: { companyName: req.companyName, status }
  });

  revalidatePath("/admin/sponsor-applications");
  revalidatePath("/admin/audit-logs");
}
