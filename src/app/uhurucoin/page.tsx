
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "UhuruCoin | The Future of Decentralized Finance",
  description: "Learn about UhuruCoin, a revolutionary digital currency designed to empower decentralized solutions and global transactions.",
};

export default function UhuruCoinPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                Welcome to UhuruCoin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg text-muted-foreground">
              <p>
                This is a placeholder page for UhuruCoin. Here, you will find information about our vision for a decentralized financial future.
              </p>
              <p>
                UhuruCoin is designed to be a secure, transparent, and globally accessible digital asset. It will power a new ecosystem of applications and services, from asset tokenization to decentralized finance (DeFi) platforms.
              </p>
              <p>
                Our mission is to leverage blockchain technology to create a more equitable and efficient financial system for everyone. Stay tuned for more updates on our whitepaper, roadmap, and upcoming token launch.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
