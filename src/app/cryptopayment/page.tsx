
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Payments | UhurU</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;600&display=swap');

        :root { 
            --background: hsl(222, 47%, 6%); 
            --foreground: hsl(0, 0%, 98%); 
            --card-background: hsl(217, 33%, 17%);
            --border-color: hsl(217, 33%, 27%);
            --primary-color: hsl(221, 83%, 53%);
            --muted-color: hsl(215, 20%, 65%);
        }
        body {
            margin: 0;
            padding: 20px;
            background-color: var(--background);
            color: var(--foreground);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 1100px;
            padding-top: 40px;
        }
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
        }
        .logo-container {
            font-family: 'Poppins', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: var(--foreground);
            margin-bottom: 15px;
            user-select: none;
        }
        .logo-part { position: relative; }
        .logo-part .line {
            position: absolute; left: 0; right: 0; height: 3px;
            background-color: var(--foreground);
        }
        .logo-part .line-top { top: -6px; }
        .logo-part .line-bottom { bottom: -6px; }

        .subtitle { color: var(--muted-color); font-size: 1rem; margin: 0; }
        
        .content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
            width: 100%;
            margin-bottom: 40px;
        }

        @media (min-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr 1fr;
                align-items: start;
            }
        }

        .instructions-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            height: 100%;
        }

        .instructions {
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            background-color: var(--card-background);
        }
        .instructions h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            color: var(--primary-color);
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
        }
        .instructions ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .instructions li {
            display: flex;
            gap: 15px;
            align-items: flex-start;
        }
        .instructions .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--foreground);
            font-weight: bold;
            flex-shrink: 0;
        }
        .instructions p {
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.5;
            color: var(--muted-color);
        }
        .instructions strong {
            color: var(--foreground);
            font-weight: 600;
        }
        .instructions .wallet-connect-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: #3B99FC;
            border-radius: 4px;
            vertical-align: middle;
            margin-right: 4px;
        }
        .instructions .wallet-connect-icon svg {
            fill: white;
            transform: scale(0.6);
        }

        .widget-wrapper {
            width: 100%; max-width: 500px; height: 800px;
            background: var(--card-background); border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            border: 1px solid var(--border-color);
            overflow: hidden;
            margin: 0 auto;
        }
        iframe { width: 100%; height: 100%; border: none; }

        .footer {
            width: 100%;
            max-width: 1100px;
            padding: 20px 0;
            border-top: 1px solid var(--border-color);
            margin-top: auto;
        }
        .footer-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
        @media (min-width: 768px) {
            .footer-content {
                flex-direction: row;
                justify-content: space-between;
            }
        }
        .footer-logo {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            display: flex; align-items: center; gap: 0.2rem;
            color: var(--foreground); user-select: none;
        }
        .footer-logo .line {
            position: absolute; left: 0; right: 0; height: 2px;
            background-color: var(--foreground);
        }
        .footer-socials { display: flex; gap: 20px; }
        .footer-socials svg {
            width: 20px; height: 20px;
            color: var(--muted-color);
            transition: color 0.2s;
        }
        .footer-socials a:hover svg { color: var(--primary-color); }
        .footer-legal {
            width: 100%;
            border-top: 1px solid var(--border-color);
            padding-top: 15px;
            margin-top: 15px;
            text-align: center;
            font-size: 0.75rem;
            color: var(--muted-color);
        }
        .footer-legal a {
            color: var(--muted-color);
            text-decoration: underline;
            transition: color 0.2s;
        }
        .footer-legal a:hover { color: var(--primary-color); }

    </style>
</head>
<body>
    <div class="main-container">
        <div class="header">
            <div class="logo-container" aria-label="UhurU Logo">
                <div class="logo-part"><span>UHU</span><div class="line line-bottom"></div></div>
                <div class="logo-part"><span>RU</span><div class="line line-top"></div></div>
            </div>
            <p class="subtitle">Cross-Chain Payment Gateway to Polygon</p>
        </div>

        <div class="content-grid">
            <div class="instructions-container">
                <div class="instructions">
                    <h3>How to Pay</h3>
                    <ul>
                        <li>
                            <span class="step-number">1</span>
                            <p>In the <strong>From</strong> section, select the token and network you wish to pay with (e.g., USDT on Solana).</p>
                        </li>
                        <li>
                            <span class="step-number">2</span>
                            <p>The <strong>To</strong> section is locked to our corporate wallet. You will be sending <strong>USDC on the Polygon network</strong>.</p>
                        </li>
                        <li>
                            <span class="step-number">3</span>
                            <p>In the <strong>Send</strong> field, enter the amount you wish to pay. The widget will automatically calculate the amount we receive.</p>
                        </li>
                         <li>
                            <span class="step-number">4</span>
                            <p>Click the wallet icon in the top right to connect. For mobile wallets, the best option is <span class="wallet-connect-icon"><svg viewBox="0 0 24 24"><path d="M5.1,3.46c0.32-0.34,0.73-0.57,1.2-0.7C7.62,2.3,9.08,2.7,10,3.69c1.6,1.75,4.09,1.75,5.69-0.01c0.86-0.95,2.33-1.3,3.58-0.81c0.51,0.2,0.95,0.5,1.29,0.9c0.82,0.95,0.82,2.4,0,3.35c-1.12,1.29-1.12,3.31,0,4.6c0.82,0.95,0.82,2.4,0,3.35c-0.34,0.4-0.78,0.7-1.29,0.9c-1.25,0.49-2.73,0.14-3.58-0.81c-1.6-1.76-4.09-1.76-5.69,0c-0.86,0.95-2.33,1.3-3.58,0.81c-0.47-0.19-0.88-0.5-1.2-0.79c-0.93-1.07-0.93-2.68,0-3.75c1.28-1.48,1.28-3.87,0-5.35C4.25,6.14,4.25,4.53,5.1,3.46z"/></svg></span><strong>WalletConnect</strong>. This will show a QR code to securely authorize the connection from any wallet on your phone.</p>
                        </li>
                        <li>
                            <span class="step-number">5</span>
                            <p>Click <strong>Exchange</strong> to review the transaction details. You may need to approve the token first and then confirm the exchange.</p>
                        </li>
                    </ul>
                </div>

                <div class="instructions">
                    <h3>Important Notes</h3>
                    <ul>
                        <li>
                            <span class="step-number">!</span>
                            <p><strong>Fixed Destination:</strong> All payments are automatically converted and sent as <strong>USDC</strong> to our wallet on the <strong>Polygon</strong> network. This is pre-configured and cannot be changed.</p>
                        </li>
                        <li>
                            <span class="step-number">!</span>
                            <p><strong>Gas Fees:</strong> Ensure you have enough native currency (e.g., SOL, ETH, BNB) in your wallet to cover the transaction gas fees. Fees can fluctuate.</p>
                        </li>
                        <li>
                            <span class="step-number">!</span>
                            <p><strong>Slippage:</strong> The final amount received may vary slightly due to market price changes (slippage). The widget will show you the minimum expected amount.</p>
                        </li>
                         <li>
                            <span class="step-number">!</span>
                            <p><strong>Transaction Time:</strong> Cross-chain transactions can take a few minutes. Please be patient and do not close the window until you see a success confirmation.</p>
                        </li>
                        <li>
                            <span class="step-number">!</span>
                            <p><strong>Stuck Transactions:</strong> If a transaction takes too long, check the relevant block explorer. Do not send another payment until you confirm the status of the first one.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="widget-wrapper">
                <iframe id="lifi-widget" title="Crypto Payment Bridge"></iframe>
            </div>

        </div>
    </div>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <div class="logo-part"><span>UHU</span><div class="line line-bottom"></div></div>
                <div class="logo-part"><span>RU</span><div class="line line-top"></div></div>
            </div>
            <div class="footer-socials">
                <a href="https://www.linkedin.com/company/uhurutrade" target="_blank" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.instagram.com/uhurutrade/" target="_blank" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="https://x.com/UhurUtradeUk" target="_blank" aria-label="X/Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </a>
                <a href="https://t.me/uhurutradeuk" target="_blank" aria-label="Telegram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                </a>
            </div>
        </div>
        <div class="footer-legal">
            © 2025 All rights reserved. Uhuru Trade Ltd. Company no. 15883242 - Unit 13 Freeland Park Wareham Road. Lytchett Matravers - BH16 6FA Poole - UK • <a href="https://uhurutrade.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> • <a href="https://uhurutrade.com/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
        </div>
    </footer>


    <script>
        const config = {
            receiver: "0x04a222b802736a9957fab102e5749b93dfed5034",
            toChain: 137, // Polygon
            toToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
            
            // Jumper widget theme configuration
            theme: {
                palette: {
                    primary: { main: '#3d6eff' },
                    secondary: { main: '#3d6eff' },
                    accent: { main: '#3d6eff' },
                    background: {
                        default: '#0d0d12',
                        paper: '#1a1b26'
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#e0e0e0'
                    }
                },
                shape: {
                    borderRadius: 16,
                    borderRadiusSecondary: 8
                },
                typography: {
                    fontFamily: "'Inter', sans-serif",
                }
            }
        };
        
        const params = new URLSearchParams({
            toChain: config.toChain,
            toToken: config.toToken,
            toAddress: config.receiver,
            lockToChain: "true",
            lockToToken: "true",
            // Pass theme as a stringified JSON object
            theme: JSON.stringify(config.theme),
            // Suggested default values (source)
            fromChain: 101, // Solana
            fromToken: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT on Solana
        });

        document.getElementById('lifi-widget').src = "https://jumper.exchange/?" + params.toString();
    </script>
</body>
</html>

  