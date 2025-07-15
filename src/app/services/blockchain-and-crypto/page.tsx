
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Blockchain & Crypto Solutions | UhurU',
  description: 'Empowering your future with decentralized solutions. We specialize in asset tokenization, custom smart contracts, and DeFi liquidity strategies.',
};

const coreOfferings = [
  {
    title: 'Asset Tokenization & Digital Transformation',
    description: 'We implement secure blockchain frameworks to transform your projects into liquid, decentralized assets, unlocking new avenues for monetization and global investment.',
  },
  {
    title: 'Custom Token & Smart Contract Design',
    description: 'We design compliant tokens (Utility, Security, NFTs) and self-executing smart contracts precisely tailored to your business model and strategic goals.',
  },
  {
    title: 'DeFi & Liquidity Strategies',
    description: 'Leverage the power of Decentralized Finance. We build and optimize liquidity pools to foster investor confidence and maximize funding opportunities for your projects.',
  },
  {
    title: 'Regulatory Compliance & Security',
    description: 'Navigate the dynamic regulatory landscape with confidence. We build solutions on a foundation of trust, transparency, and unwavering security.',
  },
];

const serviceDetails = [
    {
        title: "Comprehensive Asset Tokenization",
        description: "Whether it's equity, real estate, intellectual property, or unique products, we help you tokenize virtually any asset for transparent and borderless monetization. This process unlocks latent value and creates new revenue streams."
    },
    {
        title: "Advanced DeFi Liquidity Strategies",
        description: "We craft robust strategies for creating and managing liquidity pools on decentralized exchanges (DEXs), enhancing visibility, ensuring market stability, and optimizing capital efficiency for your tokenized projects."
    },
    {
        title: "Strategic Funding through Crypto",
        description: "We guide companies through raising capital by leveraging crypto liquidity pools—an innovative, faster, and more globally accessible alternative to traditional fundraising methods like venture capital or bank loans."
    },
    {
        title: "Secure Blockchain Frameworks",
        description: "Security is paramount. We design and audit resilient blockchain frameworks, implementing best practices in smart contract security and multi-signature protocols to mitigate risks and ensure the integrity of your operations."
    }
];

const whyUsPoints = [
  'Deep Expertise: We transform traditional assets into liquid, tradable digital tokens, opening up new avenues for monetization and investment that were previously unimaginable.',
  'End-to-End Guidance: From initial concept and feasibility studies to custom token development, smart contract deployment, and strategic market launch, we guide you through every step.',
  'Compliance Focused: We ensure your project adheres to global compliance frameworks while leveraging the inherent transparency and trustless architecture of blockchain technology.',
  'Strategic Partnership: We are more than consultants; we are your strategic partner in the decentralized revolution, helping you build a modern, borderless financial foundation for your venture.',
];

export default function BlockchainCryptoPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Unlock New Growth with Blockchain & Crypto.
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                In today&apos;s digital landscape, blockchain and crypto are powerful tools for innovation and global reach. We help you harness this potential to build secure, transparent, and globally accessible opportunities.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {coreOfferings.map((service, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

             <section>
              <Card className="bg-secondary/50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold font-headline">Empowering Your Future with Decentralized Solutions</h2>
                  <p className="mt-4 text-muted-foreground">
                    Our expertise extends beyond speculative investment; we focus on real-world applications that deliver tangible value. We provide end-to-end support, guiding you through the complexities of the decentralized world to ensure you&apos;re well-positioned for the future of finance and digital ownership.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Our Specialized Blockchain & Crypto Services
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We focus on strategic implementation and sustainable growth, turning complex concepts into real-world value.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {serviceDetails.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold font-headline">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Choose Us? Your Partner in Decentralization</CardTitle>
                  <d-card-description>
                    Ready to explore how blockchain and crypto can transform your business and unlock unprecedented growth? Let&apos;s connect and build your decentralized future together.
                  </d-card-description>
                </CardHeader>
                <CardContent className="space-y-4">
                  {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Take the next step:</strong> Contact us to discuss how we can bring your decentralized vision to life.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
