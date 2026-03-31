export const getResetTemplate = (link: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Inter', -apple-system, sans-serif; background-color: #020617; color: #ffffff; margin: 0; padding: 40px 20px; }
        .wrapper { max-width: 600px; margin: auto; background-color: #0f172a; border-radius: 24px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .header { padding: 40px 40px 20px 40px; }
        .logo { font-size: 24px; font-weight: 800; color: #3b82f6; letter-spacing: -0.025em; margin-bottom: 24px; display: block; text-decoration: none; }
        .content { padding: 0 40px 40px 40px; color: #cbd5e1; line-height: 1.6; }
        h1 { color: #ffffff; font-size: 28px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.025em; }
        p { margin-bottom: 24px; font-size: 16px; color: #94a3b8; }
        .btn-container { margin: 32px 0; }
        .btn { display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; transition: background-color 0.2s; }
        .footer { padding: 32px 40px; background-color: #1e293b50; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px; }
        .footer a { color: #3b82f6; text-decoration: none; }
        .disclaimer { font-size: 11px; margin-top: 24px; color: #475569; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <a href="https://uhurutrade.com" class="logo">UHURU TRADE</a>
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>We received a request to reset your password for your Uhuru Trade account.</p>
            <p>Click the button below to choose a new password. This link is unique and will expire in <strong>1 hour</strong>.</p>
            
            <div class="btn-container">
                <a href="${link}" class="btn">Reset My Password</a>
            </div>

            <div class="disclaimer">
                If you did not request a password reset, you can safely ignore this email. No changes will be made to your account.
            </div>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Uhuru Trade Ltd. All rights reserved.<br>
            Professional Oracle Fusion & Learning Platform Services.<br>
            <a href="https://uhurutrade.com">www.uhurutrade.com</a>
        </div>
    </div>
</body>
</html>
`;
