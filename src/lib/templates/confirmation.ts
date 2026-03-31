export const getConfirmationTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Contacto - Uhuru Trade</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #e2e8f0;
            background-color: #020617;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #0f172a;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #1e293b;
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .content {
            padding: 40px 30px;
            background-color: #0f172a;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.025em;
        }
        h2 {
            color: #ffffff;
            font-size: 20px;
            margin-top: 0;
        }
        p {
            margin-bottom: 24px;
            color: #94a3b8;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: background-color 0.2s;
        }
        .footer {
            padding: 30px;
            text-align: center;
            font-size: 13px;
            color: #475569;
            border-top: 1px solid #1e293b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Uhuru Trade</h1>
        </div>
        <div class="content">
            <h2>¡Hola, ${name}!</h2>
            <p>Hemos recibido correctamente tu mensaje a través de nuestra web. Nuestro equipo ya se ha puesto manos a la obra para revisar tu consulta.</p>
            <p>Normalmente respondemos en menos de 24 horas laborables. Si tu consulta es urgente, puedes contactarnos directamente por nuestros canales oficiales.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://uhurutrade.com" class="button">Visitar nuestra web</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 Uhuru Trade. Todos los derechos reservados.</p>
            <p>Has recibido este correo electrónico porque te pusiste en contacto con nosotros.</p>
        </div>
    </div>
</body>
</html>
`;
