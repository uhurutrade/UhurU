"use client";

import { useEffect } from 'react';

const JumperWidget = () => {
    useEffect(() => {
        const config = {
            receiver: "0x04a222b802736a9957fab102e5749b93dfed5034",
            toChain: 137, // Polygon
            toToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
            theme: {
                palette: {
                    primary: { main: '#FF3C7F' },
                    secondary: { main: '#00C9A7' },
                    accent: { main: '#00C9A7' },
                    background: {
                        default: '#1A1A1A',
                        paper: '#262626'
                    },
                    text: {
                        primary: '#FFFFFF',
                        secondary: '#A1A1AA'
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
            toChain: config.toChain.toString(),
            toToken: config.toToken,
            toAddress: config.receiver,
            lockToChain: "true",
            lockToToken: "true",
            theme: JSON.stringify(config.theme),
            fromChain: '1', // Default from Ethereum
            fromToken: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT on Ethereum
        });
        
        const iframe = document.getElementById('lifi-widget') as HTMLIFrameElement | null;
        if (iframe) {
            // Use /embed to avoid CSP framing issues
            iframe.src = "https://jumper.exchange/embed?" + params.toString();
        }
    }, []);

    return (
        <div className="w-full h-full">
            <iframe 
                id="lifi-widget" 
                title="Crypto Payment Bridge" 
                className="w-full h-full border-none"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; clipboard-read; clipboard-write; web-share;"
            ></iframe>
        </div>
    );
};

export default JumperWidget;
