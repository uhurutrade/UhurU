export const getResetTemplate = (link: string) => {
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
        .wrapper {
            max-width: 580px;
            margin: 0 auto;
        }
        /* Logo */
        .logo-wrap {
            padding: 40px 0 32px 0;
        }
        .logo-link {
            text-decoration: none;
            display: inline-block;
        }
        .logo-box {
            display: inline-flex;
            align-items: center;
            gap: 0;
            font-family: 'Inter', -apple-system, sans-serif;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 0.12em;
            color: #ffffff !important;
        }
        .logo-uhu {
            position: relative;
            display: inline-block;
            padding-bottom: 4px;
            border-bottom: 2.5px solid #ffffff;
        }
        .logo-ru {
            position: relative;
            display: inline-block;
            padding-top: 4px;
            border-top: 2.5px solid #ffffff;
        }
        /* Content */
        .content {
            padding-bottom: 8px;
        }
        h1 {
            color: #ffffff !important;
            font-size: 26px;
            font-weight: 800;
            margin: 0 0 20px 0;
            letter-spacing: -0.02em;
            line-height: 1.2;
        }
        .body-text {
            color: #94a3b8 !important;
            font-size: 15px;
            line-height: 1.7;
            margin: 0 0 20px 0;
        }
        /* Button */
        .btn-wrap {
            margin: 32px 0;
        }
        .btn {
            display: inline-block;
            padding: 16px 36px;
            background-color: #2563eb !important;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.01em;
        }
        /* Disclaimer */
        .disclaimer {
            font-size: 11px;
            margin-top: 28px;
            color: #475569 !important;
            line-height: 1.6;
        }
        /* Divider */
        .divider {
            border: none;
            border-top: 1px solid #1e293b;
            margin: 36px 0 24px 0;
        }
        /* Footer */
        .footer {
            color: #475569 !important;
            font-size: 11px;
            line-height: 1.7;
            padding-bottom: 40px;
        }
        .footer a {
            color: #3b82f6 !important;
            text-decoration: none;
        }
    </style>
</head>
<body style="background-color:#020617; margin:0; padding:40px 20px;">
    <div class="wrapper">

        <!-- Logo -->
        <div class="logo-wrap">
            <a href="https://uhurutrade.com" class="logo-link" style="text-decoration:none;">
                <span class="logo-box" style="font-family:Arial,sans-serif; font-size:26px; font-weight:900; letter-spacing:0.12em; color:#ffffff; display:inline-flex; align-items:center;">
                    <span style="display:inline-block; padding-bottom:4px; border-bottom:2.5px solid #ffffff; color:#ffffff;">UHU</span><span style="display:inline-block; padding-top:4px; border-top:2.5px solid #ffffff; color:#ffffff;">RU</span>
                </span>
            </a>
        </div>

        <!-- Heading -->
        <div class="content">
            <h1 style="color:#ffffff; font-size:26px; font-weight:800; margin:0 0 20px 0; letter-spacing:-0.02em;">Password Reset Request</h1>

            <p class="body-text" style="color:#94a3b8; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
                We received a request to reset your password for your <strong style="color:#cbd5e1;">SkillHub for Oracle Fusion Instance of Uhuru Trade</strong> account.
            </p>

            <p class="body-text" style="color:#94a3b8; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
                Click the button below to choose a new password. This link is unique and will expire in <strong style="color:#ffffff;">1 hour</strong>.
            </p>

            <!-- CTA Button -->
            <div class="btn-wrap" style="margin:32px 0;">
                <a href="${link}" class="btn" style="display:inline-block; padding:16px 36px; background-color:#2563eb; color:#ffffff; text-decoration:none; border-radius:12px; font-weight:700; font-size:15px;">
                    Reset My Password
                </a>
            </div>

            <p class="disclaimer" style="font-size:11px; color:#475569; line-height:1.6; margin-top:28px;">
                If you did not request a password reset, you can safely ignore this email. No changes will be made to your account.
            </p>
        </div>

        <!-- Divider -->
        <hr class="divider" style="border:none; border-top:1px solid #1e293b; margin:36px 0 24px 0;">

        <!-- Footer -->
        <div class="footer" style="color:#475569; font-size:11px; line-height:1.7; padding-bottom:40px;">
            © ${year} Uhuru Trade Ltd. All rights reserved.<br>
            <a href="https://uhurutrade.com" style="color:#3b82f6; text-decoration:none;">www.uhurutrade.com</a>
        </div>

    </div>
</body>
</html>`;
};
