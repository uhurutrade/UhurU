
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Offshore & Localization Strategies | UhurU',
  description: 'Establish tax-optimized global business structures that safeguard your assets and minimize fiscal liabilities.',
};

const whyConsiderPoints = [
  "Protect Your Assets: Create a legal firewall between personal wealth and business liabilities.",
  "Optimize Your Taxes: Reduce your tax burden through compliant international structuring.",
  "Expand Globally: Navigate the complexities of international markets with confidence.",
  "Enhance Financial Privacy: Secure your financial affairs within robust legal frameworks."
];

const jurisdictionAnalysisPoints = [
  "Tax treaties and incentives",
  "Regulatory stability and ease of doing business",
  "Reputation and compliance standards",
  "Access to international banking and financial services"
];

const endToEndServices = [
  "Company Formation: Establishing your legal entity in the chosen strategic jurisdiction.",
  "Offshore Banking: Facilitating the opening of international bank accounts.",
  "Regulatory Filings: Managing all necessary legal and regulatory documentation to ensure seamless compliance.",
  "Ongoing Compliance: Providing guidance and support to help you maintain adherence to international regulations."
];

const cryptoServices = [
  "Jurisdiction Analysis for Digital Assets: Identifying crypto-friendly jurisdictions with clear regulatory frameworks for digital asset companies and individual holders.",
  "Tax-Optimized Crypto Structuring: Designing compliant structures to minimize tax liabilities on crypto gains, trading, and decentralized finance (DeFi) activities.",
  "Legal & Regulatory Compliance: Navigating the complex and often shifting legal landscape surrounding digital assets to ensure your operations are fully compliant.",
  "Integration with Traditional Structures: Seamlessly incorporating your digital asset holdings into your broader asset protection and wealth management strategies."
];


export default function BusinessLocalizationPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Offshore & Localization Strategies
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Establish tax-optimized global business structures that safeguard your assets and minimize fiscal liabilities. At UhurU, we provide comprehensive international localization strategies designed to give you peace of mind and a competitive edge.
              </p>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Consider Offshore & Localization Strategies?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    In today's interconnected global economy, strategic international planning is no longer just for large corporations. Entrepreneurs, established businesses, and high-net-worth individuals can all benefit from intelligently structuring their operations and assets across borders. Our services are ideal if you're looking to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {whyConsiderPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{point}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Our Tailored Approach
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  We understand that every client's situation is unique. Our process begins with a deep dive into your specific needs, business goals, and risk tolerance. We then craft a bespoke strategy that aligns with your objectives and adheres to all relevant international regulations.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-card">
                  <CardHeader><CardTitle className="font-headline text-xl">Jurisdiction Analysis</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">We meticulously research and identify tax-friendly regions that offer optimal legal and financial environments for your business.</p></CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader><CardTitle className="font-headline text-xl">Asset Protection</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">We implement robust legal structures that legally shield your assets from potential corporate risks, lawsuits, and unforeseen liabilities.</p></CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader><CardTitle className="font-headline text-xl">Tax Minimization</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">Our goal is to minimize your tax liabilities through compliant and strategic international structuring, leveraging legal frameworks to your advantage.</p></CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">End-to-End Setup & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We handle the entire process for you, from initial consultation to full implementation and ongoing support. Our comprehensive end-to-end setup service includes:
                  </p>
                  {endToEndServices.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

             <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Integrating Digital Assets & Crypto
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  We are at the forefront of the evolving digital asset space, offering specialized guidance for incorporating cryptocurrencies and blockchain-based assets into your offshore and localization strategies.
                </p>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-xl font-headline">Crypto-Specific Services Include:</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {cryptoServices.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="text-center">
              <p className="text-lg text-foreground">
                Let UhurU handle the complexities of global finance and digital asset strategies, so you can focus on driving your business forward.
              </p>
               <p className="mt-4 text-muted-foreground">
                Ready to explore how offshore and localization strategies can benefit you or your business, including your digital assets? Contact Us Today.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
