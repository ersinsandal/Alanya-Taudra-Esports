'use server';

import { z } from 'zod';
import prisma from '@/lib/db';

const ContactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
  };
} | null;

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const validatedData = ContactSchema.parse(rawData);

    await prisma.contactRequest.create({
      data: validatedData,
    });

    return {
      success: true,
      message: 'Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors as any,
      };
    }
    
    return {
      success: false,
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
    };
  }
}
