"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitPartnershipRequest(formData: FormData) {
  try {
    const company = formData.get("company") as string;
    const contactPerson = formData.get("contactPerson") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const industry = formData.get("industry") as string;
    const message = formData.get("message") as string;

    if (!company || !contactPerson || !email || !message) {
      return { success: false, error: "Gerekli alanları doldurunuz." };
    }

    await db.partnershipRequest.create({
      data: {
        company,
        contactPerson,
        email,
        phone,
        industry,
        message,
        status: "PENDING"
      }
    });

    revalidatePath("/partners");
    return { success: true };
  } catch (error) {
    console.error("Partnership request failed:", error);
    return { success: false, error: "Başvuru gönderilirken bir hata oluştu." };
  }
}
