'use server';

import { sendEmail } from '@/lib/mail';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  subject: z.string().min(2, "El asunto es muy corto"),
  message: z.string().min(5, "El mensaje debe tener al menos 5 caracteres"),
});

export async function submitContactForm(formData: FormData) {
  const result = schema.safeParse({
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { email, subject, message } = result.data;

  // Enviar el email directamente al destinatario especificado en el formulario
  const mailResult = await sendEmail({
    to: email, 
    subject: subject,
    text: message,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${subject}</h2>
        <div style="margin-top: 20px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
          ${message}
        </div>
        <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 12px; color: #94a3b8;">
          Enviado desde el sistema de Uhuru Trade.
        </div>
      </div>
    `,
  });

  if (mailResult.success) {
    return { success: true, message: `Email enviado con éxito a ${email}` };
  } else {
    return { success: false, message: "Hubo un error al intentar enviar el email a través del servidor." };
  }
}
