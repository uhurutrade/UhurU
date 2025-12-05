
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import Image from 'next/image';
import CopyButton from '@/components/uhuru/CopyButton';
import { Bitcoin, Zap, Info, ExternalLink, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const paymentOptions = [
    {
        name: 'Bitcoin (BTC)',
        network: 'Bitcoin Network',
        address: 'bc1q0uhurutrade8g5400uvxl2ur3f3t2p45fawedsx4',
        qrImage: '/images/qr-btc.png',
        icon: <Bitcoin className="h-8 w-8" />,
    },
    {
        name: 'Lightning',
        network: 'Bitcoin Lightning',
        address: 'uhurutrade@zbd.gg',
        qrImage: '/images/qr-lightning.png',
        icon: <Zap className="h-8 w-8" />,
    },
    {
        name: 'USDC',
        network: 'Polygon Network',
        address: '0x04a222b802736a9957fab102e5749b93dfed5034',
        qrImage: '/images/qr-polygon.png',
        icon: <span className="text-2xl font-bold">P</span>
    }
];

export default function CryptocurrencyPage() {
    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <SubPageHeader backHref="/" backText="Back to Home" />

            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-10">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                            Pay with Cryptocurrency
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                            We offer flexible payment options to suit your needs. Choose between direct transfers or use our cross-chain gateway for other assets.
                        </p>
                    </div>

                    {/* Direct Payments Section */}
                    <section className="mb-20">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold font-headline">Direct Payment</h2>
                            <p className="mt-2 text-muted-foreground">For Bitcoin, and USDC on Polygon.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paymentOptions.map((option) => (
                                <Card key={option.name} className="flex flex-col items-center text-center bg-card shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:border-primary">
                                    <CardHeader className="items-center">
                                        <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                                           {option.icon}
                                        </div>
                                        <CardTitle className="text-2xl font-headline">{option.name}</CardTitle>
                                        <CardDescription>{option.network}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center flex-grow">
                                        {option.name === 'Lightning' ? (
                                            <div className="flex flex-col items-center justify-center text-center h-full space-y-3 p-4">
                                                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                                                <p className="text-muted-foreground font-semibold">Coming Soon</p>
                                                <p className="text-xs text-muted-foreground">We are working to support Lightning payments in the near future.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="relative w-48 h-48 mb-4 rounded-lg overflow-hidden border-2 border-primary p-1 bg-white">
                                                    <Image src={option.qrImage} alt={`QR Code for ${option.name}`} width={192} height={192} style={{ objectFit: 'contain' }} />
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3 px-4">
                                                  Scan the QR code with your wallet or copy the address below.
                                                </p>
                                                <div className="w-full text-center break-words px-4">
                                                    <p className="text-xs text-muted-foreground mb-2">{option.address}</p>
                                                    <CopyButton textToCopy={option.address} />
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                         <Alert className="mt-12 max-w-4xl mx-auto">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Important: After Paying Directly</AlertTitle>
                            <AlertDescription>
                                If you make a direct payment using one of the methods above, please send an email to <a href="mailto:hello@uhurutrade.com" className="font-semibold underline hover:text-primary">hello@uhurutrade.com</a> with the transaction details so we can confirm and process your payment.
                            </AlertDescription>
                        </Alert>
                    </section>

                    {/* Cross-Chain Gateway Section */}
                    <section>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold font-headline">Pay with Any Other Crypto</h2>
                            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                                To provide maximum flexibility, we have partnered with Jumper by LI.FI, a leader in multi-chain bridge and DEX aggregation. This allows you to pay from any major blockchain using hundreds of different tokens.
                            </p>
                        </div>
                        <Card className="max-w-4xl mx-auto">
                            <CardHeader>
                                <CardTitle>Secure Cross-Chain Payment Gateway</CardTitle>
                                <CardDescription>
                                    You will be redirected to our secure payment portal, powered by the most reliable bridge technology in the ecosystem.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    This advanced system acts as a "bridge," allowing you to seamlessly convert your favorite token from its native network (like Solana, Arbitrum, or BNB Chain) into USDC on the Polygon network, which is then sent directly to our corporate wallet. Jumper automatically finds the safest, fastest, and most cost-effective route for your transaction.
                                </p>
                                <p className="text-muted-foreground">
                                    This method is ideal for those who hold assets on different chains and want a simple, unified way to pay without first having to manually send funds to a centralized exchange. It's decentralized, secure, and gives you full control over your assets until the moment you approve the transaction.
                                </p>
                                <div className="pt-4 flex justify-center">
                                    <Button asChild size="lg">
                                        <Link href="https://crypto.uhurutrade.com/" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            Launch Secure Payment Gateway
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    );
}
