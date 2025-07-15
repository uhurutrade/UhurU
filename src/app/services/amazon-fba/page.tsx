
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Amazon FBA Business Setup and Consulting | UhurU',
  description: 'Expert Amazon FBA consulting to launch, manage, and scale your e-commerce business. We cover product research, listing optimization (SEO), PPC advertising, and logistics.',
};

const fbaServices = [
    {
        title: "Fiscal and Legal Structure",
        description: "We advise you on the best business structure for operating on Amazon, considering taxes, regulations, and financial optimization."
    },
    {
        title: "Market Selection",
        description: "We analyze and identify the most profitable Amazon markets for your business, maximizing opportunities and minimizing risks."
    },
    {
        title: "Import & Logistics",
        description: "We guide you through supplier selection, customs management, and supply chain optimization."
    },
    {
        title: "Technological Maintenance",
        description: "From listing creation and management to process automation and analytics tools, we ensure your business runs efficiently."
    }
];

const essentialServices = [
    {
        title: "Strategic Product Research & Selection",
        points: [
            {
                title: "Identifying Profitable Niches",
                description: "We leverage advanced market analysis tools and data-driven insights to uncover high-demand, low-competition products with significant profit potential. Our goal is to minimize your risk while maximizing your return on investment."
            },
            {
                title: "Feasibility & Margin Analysis",
                description: "We conduct thorough evaluations of potential profitability, factoring in FBA shipping and storage costs, supplier expenses, and competitive pricing structures to ensure a sustainable business model from the outset."
            }
        ]
    },
    {
        title: "Store Setup & Listing Optimization",
        points: [
            {
                title: "Seamless Seller Account Creation",
                description: "We guide you through the entire process of registering and configuring your seller account on Amazon Seller Central, ensuring all guidelines are met and your account is set up for success from day one."
            },
            {
                title: "High-Converting Listing Optimization",
                description: "Our team crafts compelling product descriptions, selects high-quality, conversion-focused imagery, and meticulously researches and implements strategic keywords to significantly improve product visibility, Amazon SEO ranking, and ultimately, your sales conversion rates."
            }
        ]
    },
    {
        title: "Efficient FBA Inventory Management & Logistics",
        points: [
            {
                title: "Optimized Shipping & Receiving Strategies",
                description: "We advise on best practices for preparing and sending your inventory to Amazon’s fulfillment centers, ensuring cost-effective shipping, timely delivery, and compliance with Amazon’s strict requirements."
            },
            {
                title: "Intelligent Stock Control & Replenishment",
                description: "We implement robust systems to proactively monitor inventory levels, accurately predict demand fluctuations, and automate replenishment processes. This prevents costly stockouts and overstocking, maintaining an efficient supply chain."
            }
        ]
    },
    {
        title: "Product Launch Strategies & Amazon PPC Marketing",
        points: [
            {
                title: "Impactful Product Launch Plans",
                description: "We develop comprehensive strategies for launching new products, including strategic promotional campaigns, early reviewer programs, and external traffic generation to rapidly boost initial sales and product ranking."
            },
            {
                title: "Expert Amazon PPC Campaign Management (Amazon Ads)",
                description: "We create, manage, and continuously optimize Pay-Per-Click (PPC) advertising campaigns on Amazon. Our goal is to enhance your product’s visibility, drive targeted traffic, increase sales velocity, and maximize your advertising return on investment (A-ROI)."
            }
        ]
    }
];

const methodologyPoints = [
    {
        title: "Advanced Analytics Tools",
        description: "We utilize industry-leading platforms such as Helium 10, Jungle Scout, and Keepa for in-depth product research, keyword analysis, competitor benchmarking, and market trend identification."
    },
    {
        title: "Proactive Management",
        description: "Our service includes constant performance monitoring, agile adaptation to market changes, and proactive resolution of any operational issues, keeping your business running smoothly."
    },
    {
        title: "Strict Adherence to Amazon Policies",
        description: "We ensure all your operations, from product listings to advertising, strictly comply with Amazon’s ever-evolving guidelines to prevent account suspensions and other potential issues."
    }
];

export default function AmazonFbaPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Amazon FBA Business Setup
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Do you want to start selling on Amazon FBA but don’t know where to begin? Our consulting service helps you build your business from scratch, ensuring every step is optimized for success.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {fbaServices.map((service, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className='font-headline text-xl'>{service.title}</CardTitle>
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
              <Card className="bg-secondary/50 p-8 text-center">
                  <h2 className="text-3xl font-bold font-headline">Your Path to E-commerce Success</h2>
                  <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                    Launching and scaling a successful business on Amazon FBA can be complex. We transform this complexity into a clear opportunity, guiding you through every step to establish, optimize, and grow your brand within Amazon’s vast ecosystem.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-12'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Essential Services for Your Amazon FBA Success
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Our strategic approach and deep understanding of the e-commerce landscape equip you with the tools and knowledge necessary to stand out and achieve sustainable growth.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {essentialServices.map((service, index) => (
                        <div key={index} className='flex items-start gap-4'>
                            <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                            <div className='flex-grow'>
                                <h3 className="text-xl font-semibold font-headline">{service.title}</h3>
                                {service.points.map((point, pIndex) => (
                                    <p key={pIndex} className="mt-2 text-muted-foreground">
                                        <span className="font-semibold text-foreground">{point.title}:</span> {point.description}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Our Methodology: Data-Driven Expertise</CardTitle>
                  <CardDescription>
                    We combine a profound understanding of Amazon’s complex algorithms with rigorous data analysis to ensure your business doesn’t just survive, but truly thrives.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {methodologyPoints.map((point, index) => (
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
            
          </div>
        </div>
      </main>
    </div>
  );
}
