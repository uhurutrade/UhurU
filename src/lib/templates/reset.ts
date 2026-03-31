export const getResetTemplate = (link: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <style>
        body { font-family: sans-serif; background-color: #020617; color: #e2e8f0; padding: 20px; }
        .container { max-width: 500px; margin: auto; background-color: #0f172a; padding: 30px; border-radius: 12px; border: 1px solid #1e293b; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        h2 { color: white; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Recuperar Contraseña</h2>
        <p>Hemos recibido una solicitud para cambiar tu contraseña en Uhuru Trade.</p>
        <p>Haz clic en el botón de abajo para elegir una nueva contraseña. Este enlace caducará en 1 hora.</p>
        <a href="${link}" class="btn">Restablecer Contraseña</a>
        <p style="margin-top: 30px; font-size: 11px; color: #475569;">Si no has solicitado este cambio, puedes ignorar este mensaje de forma segura.</p>
    </div>
</body>
</html>
`;
