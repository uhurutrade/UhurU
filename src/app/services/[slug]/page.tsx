
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { features } from '@/lib/features';
import { ChevronLeft, ShoppingCart, Bot, Bitcoin, Globe, CandlestickChart, AppWindow, Users, Cloud, Package, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubPageHeader from '@/components/uhuru/subpage-header';

// These pages have their own dedicated component.
import AmazonFbaPage from '../amazon-fba/page';
import ErpCrmPage from '../erp-and-crm/page';
import AiAutomationPage from '../ai-automation-and-ai-agents/page';
import BlockchainCryptoPage from '../blockchain-and-crypto/page';
import BusinessLocalizationPage from '../business-localization-strategies/page';
import NoCodeAppDesignPage from '../no-code-app-design/page';
import CloudManagementPage from '../cloud-saas-paas-management/page';
import AllInOnePackagePage from '../all-in-one-package/page';


const iconComponents: { [key: string]: React.ReactNode } = {
  ShoppingCart: <ShoppingCart className="h-10 w-10" />,
  Bot: <Bot className="h-10 w-10" />,
  Bitcoin: <Bitcoin className="h-10 w-10" />,
  Globe: <Globe className="h-10 w-10" />,
  CandlestickChart: <CandlestickChart className="h-10 w-10" />,
  AppWindow: <AppWindow className="h-10 w-10" />,
  Users: <Users className="h-10 w-10" />,
  Cloud: <Cloud className="h-10 w-10" />,
  Package: <Package className="h-10 w-10" />,
};

const serviceContent: { [key: string]: { paragraphs: string[] } } = {
  'vanilla-options-and-forex-investment': {
    paragraphs: [
      "Master the world's largest and most liquid financial markets with our expert training in Vanilla Options and Forex Investment. This service is designed for individuals and institutions seeking to build secure, high-liquidity investment portfolios using regulated and transparent trading instruments. We focus on low-risk, structured strategies that provide predictable payoff profiles and protect your capital.",
      "Our curriculum includes comprehensive training on CBOE/CME listed options, where you'll learn to trade derivatives with clearly defined, controlled risk. We demystify complex concepts and provide you with actionable strategies for generating consistent returns. In the Forex market, you will gain access to tailored currency strategies that allow you to capitalize on global macroeconomic trends while managing risk effectively through sophisticated hedging and position-sizing frameworks.",
      "Beyond training, we offer real-time mentorship and continuous support. As a client, you will receive timely market updates, expert analysis, and personalized strategy adjustments from our team of seasoned traders. We are committed to helping you build a resilient, risk-managed portfolio that aligns with your financial goals."
    ]
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const feature = features.find((f) => f.slug === params.slug);

  if (!feature) {
    return {
      title: "Service Not Found | UhurU",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${feature.title} | UhurU`,
    description: feature.description,
  };
}


export default function ServicePage({ params }: { params: { slug: string } }) {
  const dedicatedPages = ['amazon-fba', 'erp-and-crm', 'ai-automation-and-ai-agents', 'blockchain-and-crypto', 'business-localization-strategies', 'no-code-app-design', 'cloud-saas-paas-management', 'all-in-one-package'];
  if (dedicatedPages.includes(params.slug)) {
    // This route should not handle dedicated pages.
    // Next.js will prioritize the specific page file.
    // We can return notFound() to be safe.
    notFound();
  }

  const feature = features.find((f) => f.slug === params.slug);

  if (!feature) {
    notFound();
  }

  const icon = iconComponents[feature.icon];
  const content = serviceContent[feature.slug] || { paragraphs: [] };

  if (!icon) {
    console.error(`Icon not found for feature: ${feature.title}`);
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-12">
            <section className="text-center">
              <div className="mb-4 flex justify-center text-accent">{icon}</div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                {feature.title}
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                {feature.description}
              </p>
            </section>
            
            <section>
              <Card className="bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  {content.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {Object.keys(content.paragraphs).length === 0 && (
                     <p>Detailed information for this service is coming soon. Please check back later or contact us for more details.</p>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const dedicatedPages = ['amazon-fba', 'erp-and-crm', 'ai-automation-and-ai-agents', 'blockchain-and-crypto', 'business-localization-strategies', 'no-code-app-design', 'cloud-saas-paas-management', 'all-in-one-package'];
  // Generate params only for services that DON'T have a dedicated page.
  return features
    .filter(feature => !dedicatedPages.includes(feature.slug))
    .map((feature) => ({
      slug: feature.slug,
    }));
}
