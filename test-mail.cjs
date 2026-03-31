const nodemailer = require('nodemailer');
require('dotenv').config();

async function testMail() {
  console.log('--- Configuración cargada ---');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER);
  console.log('Pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true, // Enable debug
    logger: true, // Enable logger
  });

  try {
    console.log('--- Intentando envío ---');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test desde Script de Depuración',
      text: 'Si ves este mensaje, la configuración es correcta.',
    });
    console.log('✅ Éxito:', info.messageId);
  } catch (error) {
    console.error('❌ Error capturado:', error.message);
    if (error.code) console.error('Código del error:', error.code);
    if (error.command) console.error('Comando SMTP:', error.command);
    if (error.response) console.error('Respuesta SMTP:', error.response);
  }
}

testMail();
