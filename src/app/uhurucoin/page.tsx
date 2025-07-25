
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "UHURU Token | The Official Token of uhurutrade.com",
  description: "Learn about the UHURU Token on the Polygon network. Find details on the contract, how to buy on QuickSwap, and track its performance.",
};

const tokenDetails = [
    { label: "Name", value: "UHURU Token" },
    { label: "Symbol", value: "UHURU" },
    { label: "Network", value: "Polygon (MATIC)" },
    { label: "Contract", value: "0x1bAE132558bEAB063B82300857E8593E3734D1B0" },
    { label: "Main Pair", value: "UHURU / USDT (QuickSwap)" },
];

const explorerLinks = [
    { name: "View on PolygonScan", href: "https://polygonscan.com/token/0x1bAE132558bEAB063B82300857E8593E3734D1B0" },
    { name: "View on DexTools", href: "https://www.dextools.io/app/en/polygon/pair-explorer/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96" },
    { name: "View on GeckoTerminal", href: "https://www.geckoterminal.com/polygon_pos/pools/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96" },
];

export default function UhuruCoinPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                UHURU Token
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The official token of <Link href="https://uhurutrade.com" className="text-primary hover:underline">uhurutrade.com</Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              
              <section>
                <h2 className="text-2xl font-bold font-headline mb-3">Summary</h2>
                <p className="text-muted-foreground">
                  <strong>UHURU</strong> is the official token of the <strong>uhurutrade.com</strong> platform, built on the <strong>Polygon</strong> network as a foundation for new utilities within the ecosystem: payments, rewards, premium access, and governance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-headline mb-3">Token Details</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {tokenDetails.map(detail => (
                     <li key={detail.label}>
                        <span className="font-semibold text-foreground">{detail.label}:</span> {detail.value}
                     </li>
                  ))}
                </ul>
              </section>
              
              <section className="text-center">
                <Button asChild size="lg">
                  <Link href="https://quickswap.exchange/#/swap?inputCurrency=0x1bAE132558bEAB063B82300857E8593E3734D1B0&outputCurrency=USDT" target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy on QuickSwap
                  </Link>
                </Button>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-headline">Live Chart</h2>
                  <div className="w-full h-[480px] rounded-lg overflow-hidden border">
                    <iframe 
                      src="https://dexscreener.com/polygon/0xe92e1db1c5435d1f4eaf52f67e9a55958c253a96?embed=1&theme=dark" 
                      className="w-full h-full border-0"
                      title="DexScreener Live Chart for UHURU Token"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-headline">Explorers & Links</h2>
                  <ul className="space-y-3">
                    {explorerLinks.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                                <ExternalLink className="h-4 w-4" />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
