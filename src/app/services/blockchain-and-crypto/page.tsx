
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Blockchain & Crypto Solutions | UhurU',
  description: 'Empowering your future with decentralized solutions. We specialize in asset tokenization, custom smart contracts, and DeFi liquidity strategies.',
};

const serviceDetails = [
  {
    title: "Asset Tokenization & Digital Transformation",
    description: "Ready to tokenize assets and attract a global pool of investors? We implement secure blockchain frameworks to transform your projects into liquid, decentralized assets. This isn't just about creating a digital representation; it's about unlocking new avenues for monetization, fractionalizing ownership, increasing liquidity, and reaching a wider investor base without geographical limitations. Imagine turning illiquid assets into tradable digital instruments, accessible to a global audience.",
  },
  {
    title: "Custom Token & Smart Contract Design",
    description: "Every business is unique, and so should your digital assets be. We design compliant tokens and self-executing smart contracts precisely tailored to your business model and objectives. This includes a full spectrum of digital assets, from utility tokens that grant access to services, to security tokens (STOs) representing fractional ownership in real-world assets, and Non-Fungible Tokens (NFTs) for unique digital collectibles or verifiable ownership of physical items. We ensure these designs align perfectly with your strategic vision and long-term goals.",
  },
  {
    title: "Comprehensive Asset Tokenization",
    description: "Whether it's equity in a startup, fractional ownership of real estate, intellectual property rights, valuable art, or unique products, we help you tokenize virtually any asset for transparent and borderless monetization. This process unlocks latent value, creates new revenue streams, and provides unprecedented liquidity for previously illiquid assets. We guide you through the technical and strategic considerations to ensure a successful transition to the blockchain.",
  }
];

const defiStrategies = [
    {
        title: "Advanced DeFi Liquidity Strategies",
        description: "Crafting a successful DeFi strategy requires deep understanding. We develop robust strategies for creating and managing liquidity pools, which are crucial for attracting investors and facilitating seamless trading of your digital assets on decentralized exchanges (DEXs). Our focus is on enhancing visibility, ensuring market stability, and optimizing the capital efficiency for your tokenized projects. We also explore innovative DeFi primitives like yield farming and staking mechanisms to incentivize participation and reward your community."
    },
    {
        title: "Strategic Funding through Crypto Liquidity Pools",
        description: "We guide companies through the process of raising capital by leveraging crypto liquidity pools, offering an innovative, often faster, and more globally accessible alternative to traditional fundraising methods like venture capital or bank loans. This includes setting up and managing Initial Liquidity Offerings (ILOs) or integrating with established DeFi protocols to maximize your fundraising potential and reach."
    }
];

const securityCompliancePoints = [
    {
        title: "Robust Regulatory Compliance",
        description: "The blockchain space is evolving rapidly, and so are its regulations. We ensure adherence to global standards and emerging regulatory frameworks while leveraging blockchain’s inherent transparency and trustless architecture. This includes understanding and implementing Anti-Money Laundering (AML) and Know Your Customer (KYC) protocols where necessary, ensuring your project operates within all relevant legal frameworks, from securities laws to data privacy regulations."
    },
    {
        title: "Secure Blockchain Frameworks",
        description: "Security is paramount in the digital realm. We design, implement, and audit robust, resilient blockchain frameworks designed to protect your assets, your investors, and your project's reputation. This includes implementing best practices in smart contract auditing, multi-signature security, and decentralized identity solutions to mitigate risks and ensure the integrity of your operations."
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
                Unlock New Growth with Blockchain & Crypto
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Empowering Your Future with Decentralized Solutions. We help businesses and individuals harness this transformative potential, moving beyond traditional structures to build secure, transparent, and globally accessible opportunities.
              </p>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Our Specialized Blockchain & Crypto Services
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We focus on real-world applications that deliver tangible value. We provide end-to-end support, guiding you through the complexities of the decentralized world.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
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
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">DeFi & Liquidity Strategies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {defiStrategies.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">{point.title}</h4>
                        <p className="text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
            
            <section className="space-y-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Regulatory Compliance & Security
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Navigating the dynamic regulatory landscape of blockchain and crypto is critical for long-term success. The integrity and security of your digital assets are our top priority.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {securityCompliancePoints.map((item, index) => (
                        <Card key={index} className="bg-card">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-6 w-6 text-accent" />
                                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Choose Us? Your Partner in Decentralization</CardTitle>
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
                      <strong>Take the next step:</strong> Ready to explore how blockchain and crypto can transform your business and unlock unprecedented growth? Let's connect and build your decentralized future together.
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
