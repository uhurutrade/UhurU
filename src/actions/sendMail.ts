'use server';

import { sendEmail } from '@/lib/mail';
import { getConfirmationTemplate } from '@/lib/templates/confirmation';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo electrónico no válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function submitContactForm(formData: FormData) {
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { name, email, message } = result.data;

  // 1. Enviar notificación al ADMIN (Tú mismo)
  const adminMail = await sendEmail({
    to: process.env.EMAIL_USER!, 
    subject: `🚀 NUEVO CONTACTO: ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    html: `
      <div style="font-family: sans-serif; color: #111; padding: 20px;">
        <h2 style="color: #2563eb;">Solicitud de contacto recibida</h2>
        <p><strong>Remitente:</strong> ${name} &lt;${email}&gt;</p>
        <div style="border-left: 4px solid #2563eb; padding-left: 15px; margin-top: 20px;">
          <p>${message}</p>
        </div>
      </div>
    `,
  });

  // 2. Enviar CONFIRMACIÓN al USUARIO
  const userConfirmation = await sendEmail({
    to: email, 
    subject: `¡Gracias por contactar con Uhuru Trade! ✨`,
    html: getConfirmationTemplate(name),
  });

  if (adminMail.success && userConfirmation.success) {
    return { success: true, message: "¡Mensaje enviado! Revisa tu bandeja de entrada para la confirmación." };
  } else if (!adminMail.success) {
    return { success: false, message: "Error interno al enviar la notificación. Por favor, revisa los logs." };
  } else {
    return { success: true, message: "Recibimos tu mensaje, pero hubo un pequeño retraso enviándote la confirmación." };
  }
}
