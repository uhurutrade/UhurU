
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { ExternalLink, ShoppingCart, Copy, Check, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";


// Metadata is not used in a client component, but keeping it for reference.
// export const metadata: Metadata = {
//   title: "Uhuru Coin | The Official Crypto of uhurutrade.com",
//   description: "Discover Uhuru Coin (UHURU) on Polygon. Learn how our loyalty rewards program allows you to share in our success. Find details on the contract, how to buy on QuickSwap, and track its performance.",
// };

const tokenDetails = [
    { label: "Name", value: "Uhuru Coin" },
    { label: "Symbol", value: "UHURU" },
    { label: "Network", value: "Polygon (MATIC)" },
    { label: "Pair", value: "UHURU / USDT" },
];

const contractAddress = "0x1bAE132558bEAB063B82300857E8593E3734D1B0";

const explorerLinks = [
    { name: "View on PolygonScan", href: `https://polygonscan.com/token/${contractAddress}` },
    { name: "View on DexTools", href: "https://www.dextools.io/app/en/polygon/pair-explorer/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96" },
    { name: "View on GeckoTerminal", href: "https://www.geckoterminal.com/polygon_pos/pools/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96" },
    { name: "View on DexScreener", href: "https://dexscreener.com/polygon/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96" }
];

const ContractCopyButton = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(contractAddress);
            setIsCopied(true);
            toast({ title: "Contract address copied!" });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy address to clipboard." });
        }
    };

    return (
        <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-foreground">Contract:</span>
            <span className="text-muted-foreground break-all">{contractAddress}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
            >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    );
};


export default function UhuruCoinPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                Uhuru Coin.Your Trust.Your Token.
              </CardTitle>
              <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
                The official cryptocurrency of uhurutrade.com, designed to reward our community and share our success with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12 pt-6">
              
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-headline text-center">A Coin that Rewards Loyalty</h2>
                <div className="text-muted-foreground space-y-3">
                    <p>
                        <strong>Uhuru Coin (UHURU)</strong> is more than just a cryptocurrency; it's our commitment to you. We believe that our clients are our partners, and as UhurU grows, our community should share in that success. Uhuru Coin is our way of making that happen.
                    </p>
                    <p>
                        We reward our clients' loyalty by giving back 5% of the value of every contracted service in Uhuru Coins. For example, if you hire one of our services for £1,000, you will automatically receive £50 worth of UHURU in your wallet. It's that simple.
                    </p>
                    <p>
                        You have complete freedom with your coins. Use them to pay for future UhurU services, hold them as a believer in our long-term vision, or swap them for USDT on the Polygon network at any time. This program is designed to be a tangible benefit, turning your investment in our services into a share in our collective future.
                    </p>
                     <p>
                        By holding Uhuru Coin, you're not just a client; you're a stakeholder in our project. As our company thrives and its valuation increases, so does the potential of your Uhuru Coins.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-headline mb-4 text-center">Token Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center max-w-md mx-auto">
                    {tokenDetails.map(detail => (
                        <div key={detail.label} className="bg-muted/50 p-3 rounded-lg border border-border">
                            <div className="text-sm font-semibold text-foreground">{detail.label}</div>
                            <div className="text-base text-muted-foreground">{detail.value}</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <ContractCopyButton />
                </div>
              </section>
              
              <section className="text-center">
                <Button asChild size="lg">
                  <Link href="https://dapp.quickswap.exchange/swap/best/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/0x1bAE132558bEAB063B82300857E8593E3734D1B0" target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy on QuickSwap
                  </Link>
                </Button>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-headline text-center">Live Chart</h2>
                  <div className="w-full h-[480px] rounded-lg overflow-hidden border">
                    <iframe 
                      src="https://dexscreener.com/polygon/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96?embed=1&theme=dark" 
                      className="w-full h-full border-0"
                      title="DexScreener Live Chart for UHURU Token"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-headline text-center">Explorers & Links</h2>
                  <ul className="space-y-3 text-center md:text-left">
                    {explorerLinks.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                                <ExternalLink className="h-4 w-4" />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                  </ul>
                  <div className="text-sm text-muted-foreground space-y-2 pt-2 text-center md:text-left">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Info className="h-4 w-4 flex-shrink-0" />
                          <h4 className="font-semibold text-foreground">Why Polygon Network?</h4>
                      </div>
                      <p>
                          Uhuru Coin is built on Polygon, a premier Layer-2 solution for Ethereum, deliberately chosen to provide a superior user experience. By processing transactions on a separate, high-speed chain, we reduce network congestion and bring costs down to mere cents, making it ideal for everyday use and micro-transactions. As an EVM-compatible chain, Polygon integrates with the Ethereum ecosystem, including wallets like MetaMask, while inheriting its robust security. This means your assets are protected by a globally trusted infrastructure, giving you peace of mind. Furthermore, Polygon's Proof-of-Stake mechanism is significantly more energy-efficient, aligning with our commitment to sustainable technology. Its reputation as a reliable, scalable network provides the perfect foundation for our token, enabling fast, eco-friendly, cost-effective trading.
                      </p>
                  </div>
                </div>
              </div>

              <section className="text-center border-t pt-12">
                 <h2 className="text-2xl font-bold font-headline">Join an Innovative Future</h2>
                 <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                    Uhuru Coin is more than a digital asset; it's an invitation to be part of a transparent, forward-thinking project. We are committed to building a strong community and sharing our growth with those who believe in our mission. By participating, you are joining a movement that values innovation, transparency, and shared success. This is the future, and we want to build it with you.
                 </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
