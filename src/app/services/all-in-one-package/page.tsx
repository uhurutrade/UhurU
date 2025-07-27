
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package, Zap, BarChart, Bitcoin, Building, Rocket } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Flexible All-in-One Tech Package | UhurU',
  description: 'Scalable tech solutions with flexible Pay-As-You-Go (PAYG) pricing and crypto payment options. No long-term commitments required.',
};

const valuePropositionPoints = [
    {
        title: "Total Flexibility, Zero Commitment",
        description: "In a dynamic market, agility is key. Our model frees you from long-term contracts, allowing you to adapt and scale services as your needs evolve. You only pay for what you use."
    },
    {
        title: "Transparent Pay-As-You-Go (PAYG) Pricing",
        description: "We believe in clear and honest pricing. Our PAYG model ensures your costs are perfectly synchronized with your actual consumption, eliminating waste and providing full financial clarity."
    },
    {
        title: "Future-Ready Payment Options",
        description: "Embrace the future of finance. We offer the flexibility of payments in both traditional currencies and cryptocurrencies, facilitating instant, secure, and cost-effective transactions, especially for global partners."
    }
];

const howItWorks = [
    {
        title: "Serverless Architecture for Ultimate Scalability",
        description: "We leverage serverless computing to build solutions that scale automatically with demand. This means you get instant performance without managing or paying for idle infrastructure, while we handle all the technical complexities."
    },
    {
        title: "Optimized Pricing and Cost Management",
        description: "Our PAYG model is designed to prevent budget surprises. We provide real-time cost tracking dashboards, consumption alerts, and spending limits to give you full control over your invoices."
    },
    {
        title: "Seamless Crypto Integration",
        description: "We make B2B crypto payments simple. By promoting the use of stablecoins like USDC, we mitigate volatility and ensure predictable, secure transactions. We guide you through the entire process, from wallet setup to transaction."
    }
];

const targetAudience = [
    {
        icon: <Rocket className="h-8 w-8 text-accent" />,
        title: "For Startups",
        description: "Validate your ideas and build your MVP without the burden of large upfront investments. Our PAYG model is perfect for lean budgets and agile development cycles."
    },
    {
        icon: <Building className="h-8 w-8 text-accent" />,
        title: "For Established Companies",
        description: "Efficiently manage fluctuating workloads and optimize operational costs. Leverage our expertise in digital transformation, cloud migration, and process automation to gain a competitive edge."
    }
];


export default function AllInOnePackagePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <div className="mb-4 flex justify-center text-accent"><Package className="h-12 w-12" /></div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Flexible All-in-One Tech Package
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Your agile and reliable technology partner. Get scalable, on-demand services with transparent Pay-As-You-Go pricing and zero long-term commitments.
              </p>
            </section>

             <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Our Core Value Proposition
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                       We are built for modern businesses that demand agility, transparency, and results. Our entire model is designed to align with your success.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {valuePropositionPoints.map((point, index) => (
                      <div key={index} className="flex flex-col items-center text-center gap-4">
                        <CheckCircle2 className="h-10 w-10 text-accent flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold font-headline">{point.title}</h3>
                          <p className="mt-1 text-muted-foreground">{point.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </section>

            <section>
              <Card className="bg-secondary/50 p-8 text-center">
                  <h2 className="text-3xl font-bold font-headline">How It Works: Technology That Adapts to You</h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    Our "All-in-One" package is more than a bundle of services; it's a strategic framework for delivering technology efficiently and cost-effectively.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-1">
                    {howItWorks.map((service, index) => (
                        <div key={index} className='flex items-start gap-4'>
                            <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold font-headline">{service.title}</h3>
                                <p className="mt-2 text-muted-foreground">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                       Built for Every Stage of Growth
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                      Whether you're testing a new idea or scaling an established enterprise, our flexible model is designed to support your journey.
                    </p>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {targetAudience.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="items-center text-center">
                        {item.icon}
                        <CardTitle className="font-headline text-2xl mt-4">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Ready to Build with True Flexibility?</CardTitle>
                  <CardDescription>
                    Stop paying for idle resources and break free from restrictive contracts. Partner with UhurU to build, innovate, and scale with a model that puts you in control.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Contact us today for a free, no-commitment consultation. Let's discuss how our All-in-One Tech Package can become your strategic advantage.</p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
