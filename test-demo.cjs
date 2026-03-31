const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendDemo() {
  console.log('--- Iniciando prueba DEMO ---');
  console.log('Desde:', process.env.EMAIL_USER);
  console.log('Hacia: raul.irus@gmail.com');

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'raul.irus@gmail.com',
      subject: 'demo',
      text: 'Texto de prueba demo para comprobar el envío.',
    });
    console.log('✅ Éxito al enviar:', info.messageId);
  } catch (error) {
    console.error('❌ Fallo en el envío:', error.message);
    if (error.message.includes('Access Restricted')) {
      console.log('\nAYUDA: Zoho sigue bloqueando el acceso. Entra en tu panel de Zoho y activa el acceso SMTP para este usuario.');
    }
  }
}

sendDemo();
