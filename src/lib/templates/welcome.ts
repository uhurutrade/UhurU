export const getWelcomeTemplate = (firstName: string, dashboardUrl: string) => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #020617 !important;
            color: #ffffff !important;
            margin: 0;
            padding: 40px 20px;
            -webkit-font-smoothing: antialiased;
        }
    </style>
</head>
<body style="background-color:#020617; margin:0; padding:40px 20px;">
    <div style="max-width:580px; margin:0 auto;">

        <!-- Logo -->
        <div style="padding:40px 0 32px 0;">
            <a href="https://uhurutrade.com" style="text-decoration:none;">
                <span style="font-family:Arial,sans-serif; font-size:26px; font-weight:900; letter-spacing:0.12em; color:#ffffff; display:inline-flex; align-items:center;">
                    <span style="display:inline-block; padding-bottom:4px; border-bottom:2.5px solid #ffffff; color:#ffffff;">UHU</span><span style="display:inline-block; padding-top:4px; border-top:2.5px solid #ffffff; color:#ffffff;">RU</span>
                </span>
            </a>
        </div>

        <!-- Heading -->
        <div>
            <h1 style="color:#ffffff; font-size:26px; font-weight:800; margin:0 0 20px 0; letter-spacing:-0.02em;">Welcome to SkillHub, ${firstName}!</h1>

            <p style="color:#94a3b8; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
                Your account has been successfully created on <strong style="color:#cbd5e1;">SkillHub for Oracle Fusion</strong>, powered by Uhuru Trade. We're glad to have you on board.
            </p>

            <p style="color:#94a3b8; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
                You now have access to your personal dashboard where you can view your subscription status, manage your profile, and access your Oracle Fusion credentials once your plan is activated.
            </p>

            <!-- What's next box -->
            <div style="border:1px solid #1e293b; border-radius:12px; padding:24px; margin:28px 0; background-color:#0f172a;">
                <p style="color:#64748b; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 16px 0;">What's next</p>
                <ul style="margin:0; padding:0 0 0 20px; color:#94a3b8; font-size:14px; line-height:2;">
                    <li>Log into your <strong style="color:#cbd5e1;">SkillHub Dashboard</strong></li>
                    <li>Choose an <strong style="color:#cbd5e1;">Oracle Fusion subscription plan</strong></li>
                    <li>Complete your payment — credentials will be sent within <strong style="color:#ffffff;">24 hours</strong></li>
                    <li>Start learning Oracle Fusion Cloud</li>
                </ul>
            </div>

            <!-- CTA Button -->
            <div style="margin:32px 0;">
                <a href="${dashboardUrl}" style="display:inline-block; padding:16px 36px; background-color:#2563eb; color:#ffffff; text-decoration:none; border-radius:12px; font-weight:700; font-size:15px;">
                    Go to My Dashboard
                </a>
            </div>

            <p style="font-size:11px; color:#475569; line-height:1.6; margin-top:28px;">
                If you did not create this account, please contact us immediately at <a href="mailto:hello@uhurutrade.com" style="color:#3b82f6; text-decoration:none;">hello@uhurutrade.com</a>.
            </p>
        </div>

        <!-- Divider -->
        <hr style="border:none; border-top:1px solid #1e293b; margin:36px 0 24px 0;">

        <!-- Footer -->
        <div style="color:#475569; font-size:11px; line-height:1.7; padding-bottom:40px;">
            © ${year} Uhuru Trade Ltd. All rights reserved.<br>
            <a href="https://uhurutrade.com" style="color:#3b82f6; text-decoration:none;">www.uhurutrade.com</a>
        </div>

    </div>
</body>
</html>`;
};
