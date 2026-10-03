import SettingsClient from "./settings-client";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const roles = user?.roles?.map((r: any) => r.role.name) || [];
  if (!roles.includes('SUPER_ADMIN')) {
    redirect('/admin');
  }

  return <SettingsClient />;
}
