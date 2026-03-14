"use client";

import { useEffect, useState } from 'react';

const JumperWidget = () => {
    const [mounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const config = {
            receiver: "0x04a222b802736a9957fab102e5749b93dfed5034",
            toChain: 137, // Polygon
            toToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
            theme: {
                palette: {
                    primary: { main: '#FF3C7F' }, // Uhuru Magenta
                    secondary: { main: '#00C9A7' }, // Uhuru Emerald
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
            // Use /embed to properly allow embedding and avoid CSP issues
            iframe.src = "https://jumper.exchange/embed?" + params.toString();
        }
    }, [mounted]);

    if (!mounted) return <div className="w-full h-[760px] bg-card animate-pulse rounded-2xl" />;

    return (
        <div className="w-full h-full min-h-[760px]">
            <iframe 
                id="lifi-widget" 
                title="Crypto Payment Bridge" 
                className="w-full h-full border-none rounded-2xl shadow-2xl"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; clipboard-read; clipboard-write; web-share; bluetooth; eth-ledger; eth-trezor;"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default JumperWidget;
