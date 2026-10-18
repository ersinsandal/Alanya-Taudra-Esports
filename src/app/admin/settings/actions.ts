'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/services/audit';

export interface SystemSettingsData {
  platformName: string;
  contactEmail: string;
  discordUrl: string;
  socialLinks: string;
  maintenanceMode: boolean;
  disableRegistrations: boolean;
}

export async function saveSystemSettings(settings: SystemSettingsData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Oturum açmanız gerekmektedir.' };
    }

    const roles = user.roles?.map((r: any) => r.role?.name || r.role) || [];
    const isSuperAdmin = roles.includes('SUPER_ADMIN') || roles.includes('KURUCU_BASKAN');
    if (!isSuperAdmin) {
      return { success: false, error: 'Bu işlem için Süper Admin yetkisi gereklidir.' };
    }

    // Upsert into SiteSetting with key 'general'
    await prisma.siteSetting.upsert({
      where: { key: 'general' },
      update: {
        value: settings as any,
        updatedBy: user.id,
      },
      create: {
        key: 'general',
        value: settings as any,
        updatedBy: user.id,
      },
    });

    // Create Audit Log
    await createAuditLog({
      actorId: user.id,
      action: `Sistem ayarları güncellendi. Platform: "${settings.platformName}", Bakım Modu: ${settings.maintenanceMode ? 'Açık' : 'Kapalı'}, Kayıtlar: ${settings.disableRegistrations ? 'Kapalı' : 'Açık'}`,
      targetType: 'Sistem Ayarları',
      targetId: 'general',
      metadata: {
        platformName: settings.platformName,
        contactEmail: settings.contactEmail,
        discordUrl: settings.discordUrl,
        maintenanceMode: settings.maintenanceMode,
        disableRegistrations: settings.disableRegistrations,
      },
    });

    revalidatePath('/admin/settings');
    revalidatePath('/admin/audit-logs');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('saveSystemSettings error:', error);
    return { success: false, error: error?.message || 'Ayarlar kaydedilirken hata oluştu.' };
  }
}
