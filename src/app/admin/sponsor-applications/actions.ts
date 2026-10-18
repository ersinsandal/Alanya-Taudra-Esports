"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPartnershipRequests() {
  return await prisma.partnershipRequest.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function updatePartnershipRequestStatus(id: string, status: string) {
  await prisma.partnershipRequest.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/sponsor-applications");
}
