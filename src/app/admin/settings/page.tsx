import SettingsClient from "./settings-client";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { SystemSettingsData } from "./actions";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const roles = user?.roles?.map((r: any) => r.role?.name || r.role) || [];
  if (!roles.includes('SUPER_ADMIN') && !roles.includes('KURUCU_BASKAN')) {
    redirect('/admin');
  }

  const existingSetting = await prisma.siteSetting.findUnique({
    where: { key: 'general' }
  });

  const raw = existingSetting?.value as any;

  const defaultSocial = JSON.stringify({
    twitter: "https://twitter.com/atearena",
    instagram: "https://instagram.com/atearena"
  }, null, 2);

  const initialSettings: SystemSettingsData = {
    platformName: raw?.platformName || "ATE Digital Arena",
    contactEmail: raw?.contactEmail || "contact@atedigitalarena.com",
    discordUrl: raw?.discordUrl || "https://discord.gg/atedigitalarena",
    socialLinks: typeof raw?.socialLinks === 'string' 
      ? raw.socialLinks 
      : (raw?.socialLinks ? JSON.stringify(raw.socialLinks, null, 2) : defaultSocial),
    maintenanceMode: Boolean(raw?.maintenanceMode),
    disableRegistrations: Boolean(raw?.disableRegistrations),
  };

  return <SettingsClient initialSettings={initialSettings} />;
}
