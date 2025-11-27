import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import CopyButton from '@/components/uhuru/CopyButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Crypto Payment Methods | UHURU",
    description: "Pay for our services using cryptocurrency. We accept Bitcoin (BTC), Lightning Network, and stablecoins like USDC, USDT, and BUSD on the Polygon network.",
};

const BTC_ADDRESS = "bc1qu7t53d9k6eu5lm7t2pvywxneyn3zx8acqezgxc";
const POLYGON_ADDRESS = "0x04a222b802736a9957fab102e5749b93dfed5034";
const LIGHTNING_URL = "https://crypto.uhurutrade.com";


export default function CryptoPaymentPage() {
  const btcQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${BTC_ADDRESS}`;
  const polygonQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${POLYGON_ADDRESS}`;
  const lightningQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${LIGHTNING_URL}`;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                Crypto Payment Methods
              </CardTitle>
              <CardDescription className="text-muted-foreground pt-2">
                Use the following methods to pay for our services with cryptocurrency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 pt-6">

              {/* BTC On-chain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold font-headline">🔵 BTC (On-chain)</h3>
                  <p className="text-sm text-muted-foreground break-all">{BTC_ADDRESS}</p>
                  <CopyButton textToCopy={BTC_ADDRESS} buttonText="Copy Address" />
                </div>
                <div className="flex justify-center md:justify-end">
                  <Image src={btcQrUrl} alt="BTC Address QR Code" width={200} height={200} className="rounded-lg border p-2" />
                </div>
              </div>

              <div className="border-t"></div>

              {/* Stablecoins */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold font-headline">🟣 USDC / USDT / BUSD</h3>
                  <p className="text-sm font-semibold text-muted-foreground">Network: Polygon (ERC20)</p>
                  <p className="text-sm text-muted-foreground break-all">{POLYGON_ADDRESS}</p>
                   <CopyButton textToCopy={POLYGON_ADDRESS} buttonText="Copy Address" />
                   <Alert className="mt-4">
                     <Info className="h-4 w-4" />
                     <AlertTitle>Network Information</AlertTitle>
                     <AlertDescription>
                       You can send any stablecoin. If it's not on the Polygon network, it will be automatically converted via a bridge.
                     </AlertDescription>
                   </Alert>
                </div>
                 <div className="flex justify-center md:justify-end">
                  <Image src={polygonQrUrl} alt="Polygon Address QR Code" width={200} height={200} className="rounded-lg border p-2" />
                </div>
              </div>

              <div className="border-t"></div>

              {/* Lightning Network */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold font-headline">⚡ Lightning Network (LNDHub)</h3>
                  <p className="text-sm text-muted-foreground">For instant, low-fee BTC payments.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={LIGHTNING_URL} target="_blank" rel="noopener noreferrer">{LIGHTNING_URL}</Link>
                  </Button>
                </div>
                 <div className="flex justify-center md:justify-end">
                   <Image src={lightningQrUrl} alt="Lightning URL QR Code" width={200} height={200} className="rounded-lg border p-2" />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
