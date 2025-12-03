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
                    primary: { main: '#3d6eff' },
                    secondary: { main: '#3d6eff' },
                    accent: { main: '#3d6eff' },
                    background: {
                        default: '#1a1b26',
                        paper: '#0d0d12'
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
            iframe.src = "https://jumper.exchange/?" + params.toString();
        }
    }, []);

    return (
        <div className="w-full h-full">
            <iframe id="lifi-widget" title="Crypto Payment Bridge" className="w-full h-full border-none"></iframe>
        </div>
    );
};

export default JumperWidget;
