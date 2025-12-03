import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import Image from 'next/image';
import CopyButton from '@/components/uhuru/CopyButton';
import { Bitcoin, Zap, Info } from 'lucide-react';
import JumperWidget from '@/components/uhuru/JumperWidget';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
                            <p className="mt-2 text-muted-foreground">For Bitcoin, Lightning, and USDC on Polygon.</p>
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
                                    <CardContent className="flex flex-col items-center flex-grow">
                                        <div className="relative w-48 h-48 mb-4 rounded-lg overflow-hidden border-2 border-primary p-1 bg-white">
                                            <Image src={option.qrImage} alt={`QR Code for ${option.name}`} width={192} height={192} style={{ objectFit: 'contain' }} />
                                        </div>
                                        <div className="w-full text-center break-words px-4">
                                            <p className="text-xs text-muted-foreground mb-2">{option.address}</p>
                                            <CopyButton textToCopy={option.address} />
                                        </div>
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
                                Use our secure cross-chain gateway, powered by LI.FI, to pay with hundreds of different tokens from any major blockchain. Your payment will be automatically converted to USDC on the Polygon network.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>How it Works</CardTitle></CardHeader>
                                    <CardContent className="space-y-4 text-muted-foreground">
                                        <p>1. In the "From" section, select the token and network you wish to pay with.</p>
                                        <p>2. Enter the amount you want to pay. The widget calculates the equivalent in USDC.</p>
                                        <p>3. Connect your wallet (e.g., MetaMask, Phantom) and approve the transaction.</p>
                                        <p>4. The gateway handles the token swap and transfer to our wallet seamlessly.</p>
                                    </CardContent>
                                </Card>
                                 <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Note on Fees</AlertTitle>
                                    <AlertDescription>
                                      Please ensure you have enough native currency (e.g., ETH, SOL, BNB) in your wallet to cover network gas fees for the transaction.
                                    </AlertDescription>
                                </Alert>
                            </div>
                            <div className="w-full max-w-md h-[700px] mx-auto bg-card rounded-2xl shadow-lg p-2 border">
                               <JumperWidget />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
