import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  gameId: z.string().min(1),
  currentRank: z.string().min(1),
  peakRank: z.string().min(1),
  mainRole: z.string().min(1),
  secondaryRole: z.string().min(1),
  competitiveExperience: z.string().optional(),
  previousTeams: z.string().optional(),
  tournamentExperience: z.string().optional(),
  motivation: z.string().min(10),
  goals: z.string().min(10),
  trackerLink: z.string().url().optional().or(z.literal('')),
});

export async function submitAcademyApplication(prevState: any, formData: FormData) {
  // Mocking auth check for brevity. Should get real userId
  const userId = "MOCK_USER_ID"; // TODO: Implement real auth session check

  const validatedFields = schema.safeParse({
    gameId: formData.get('gameId'),
    currentRank: formData.get('currentRank'),
    peakRank: formData.get('peakRank'),
    mainRole: formData.get('mainRole'),
    secondaryRole: formData.get('secondaryRole'),
    competitiveExperience: formData.get('competitiveExperience'),
    previousTeams: formData.get('previousTeams'),
    tournamentExperience: formData.get('tournamentExperience'),
    motivation: formData.get('motivation'),
    goals: formData.get('goals'),
    trackerLink: formData.get('trackerLink'),
  });

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    // We would use a real user id here, for now this is structural.
    // In actual implementation, requires valid User.
    // await prisma.academyApplication.create({
    //   data: {
    //     userId,
    //     ...validatedFields.data,
    //     weeklyAvailability: {},
    //     clipLinks: []
    //   }
    // });
    return { success: true, message: 'Başvurunuz başarıyla alındı.' };
  } catch (error) {
    return { success: false, message: 'Bir hata oluştu.' };
  }
}
