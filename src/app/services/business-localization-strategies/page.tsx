
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Offshore & Localization Strategies | UhurU',
  description: 'Establish tax-optimized global business structures that safeguard your assets and minimize fiscal liabilities.',
};

const whyConsiderPoints = [
  {
    title: "Protect Your Assets",
    description: "Create a formidable legal firewall between your personal wealth and business liabilities, shielding you from unforeseen risks through the principle of the 'corporate veil'."
  },
  {
    title: "Optimize Your Taxes",
    description: "Substantially reduce your effective tax rate through compliant international structuring, leveraging Double Taxation Agreements (DTAs) and favorable fiscal regimes."
  },
  {
    title: "Expand Globally",
    description: "Establish a robust international footprint, enabling you to navigate the complexities of cross-border commerce and global markets with confidence and agility."
  },
  {
    title: "Enhance Financial Privacy",
    description: "Secure your financial affairs within respected legal frameworks that prioritize confidentiality, while maintaining full compliance with international reporting standards."
  }
];

const jurisdictionAnalysisPoints = [
  "Favorable tax treaties and specific corporate incentives.",
  "Long-term political and economic stability.",
  "Robust yet flexible regulatory frameworks and ease of doing business.",
  "International reputation and adherence to compliance standards (e.g., OECD guidelines).",
  "Sophisticated banking infrastructure and strong financial privacy laws."
];

const endToEndServices = [
  "Company Formation: Full incorporation of your legal entity (e.g., LLC, IBC) in the chosen strategic jurisdiction.",
  "Offshore Banking Introductions: Facilitating the opening of corporate and personal bank accounts with reputable international institutions.",
  "Regulatory Filings & Maintenance: Managing all necessary legal and regulatory documentation to ensure seamless and continuous compliance.",
  "Ongoing Strategic Counsel: Providing proactive guidance and support to help you adapt to evolving international regulations and maintain your structure's integrity."
];

const cryptoServices = [
  "Jurisdiction Analysis for Digital Assets: Identifying crypto-friendly jurisdictions that offer clear regulatory frameworks and tax advantages for digital asset companies and individual holders.",
  "Tax-Optimized Crypto Structuring: Designing compliant corporate and trust structures to minimize tax liabilities on crypto gains, staking rewards, trading, and DeFi activities.",
  "Legal & Regulatory Navigation: Expertly navigating the complex and rapidly shifting legal landscape surrounding digital assets to ensure your operations are fully compliant and future-proof.",
  "Integration with Traditional Structures: Seamlessly incorporating your digital asset holdings into your broader asset protection and wealth management strategy for holistic security."
];


export default function BusinessLocalizationPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                Offshore & Localization Strategies
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Establish tax-optimized global business structures that safeguard your assets and minimize fiscal liabilities. At UhurU, we provide comprehensive international localization strategies designed to give you peace of mind and a competitive edge.
              </p>
            </section>

            <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Why Consider Offshore & Localization Strategies?
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                        In today's interconnected global economy, strategic international planning is no longer just for large corporations. Entrepreneurs, established businesses, and high-net-worth individuals can all benefit from intelligently structuring their operations and assets across borders.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {whyConsiderPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold font-headline">{point.title}</h3>
                          <p className="mt-1 text-muted-foreground">{point.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </section>

            <section className="space-y-8">
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Our Tailored Approach
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We understand that every client's situation is unique. Our process begins with a deep dive into your specific needs, business goals, and risk tolerance. We then craft a bespoke strategy that aligns with your objectives and adheres to all relevant international regulations.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                    <Card className="bg-card flex flex-col">
                      <CardHeader><CardTitle className="font-headline text-xl">Jurisdiction Analysis</CardTitle></CardHeader>
                      <CardContent className="flex-grow"><p className="text-muted-foreground">We meticulously research and identify tax-friendly regions that offer optimal legal and financial environments for your business or personal assets.</p></CardContent>
                    </Card>
                    <Card className="bg-card flex flex-col">
                      <CardHeader><CardTitle className="font-headline text-xl">Asset Protection</CardTitle></CardHeader>
                      <CardContent className="flex-grow"><p className="text-muted-foreground">We implement robust legal structures, such as Trusts or LLCs, to legally shield your assets from potential corporate risks, lawsuits, and unforeseen liabilities.</p></CardContent>
                    </Card>
                    <Card className="bg-card flex flex-col">
                      <CardHeader><CardTitle className="font-headline text-xl">Tax Minimization</CardTitle></CardHeader>
                      <CardContent className="flex-grow"><p className="text-muted-foreground">We architect structures that minimize your tax liabilities through compliant strategies, like establishing IP holding companies in low-tax jurisdictions.</p></CardContent>
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
                    We manage the entire process for you, from initial consultation to full implementation and ongoing support, ensuring a seamless and stress-free experience. Our comprehensive end-to-end setup service includes:
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
                  The digital asset landscape presents both exciting opportunities and unique challenges. We are at the forefront of this evolving space, offering specialized guidance for incorporating cryptocurrencies into your offshore and localization strategies.
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
              <p className="text-lg text-foreground font-semibold">
                Ready to explore how offshore and localization strategies can benefit you or your business, including your digital assets? Contact us today for a confidential consultation.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

    