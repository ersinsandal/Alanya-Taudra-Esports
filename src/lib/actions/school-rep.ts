import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  schoolId: z.string().min(1),
  grade: z.string().min(1),
  motivation: z.string().min(10),
  experience: z.string().optional(),
});

export async function submitSchoolRepApplication(prevState: any, formData: FormData) {
  const userId = "MOCK_USER_ID"; // TODO: Implement real auth

  const validatedFields = schema.safeParse({
    schoolId: formData.get('schoolId'),
    grade: formData.get('grade'),
    motivation: formData.get('motivation'),
    experience: formData.get('experience'),
  });

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    // await prisma.schoolRepresentative.create({ ... })
    return { success: true, message: 'Başvurunuz başarıyla alındı.' };
  } catch (error) {
    return { success: false, message: 'Bir hata oluştu.' };
  }
}
