
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Forex & Vanilla Options Investment | UhurU',
  description: 'Specialized financial strategies in Forex and Options for long-term growth and capital preservation. Empowering your financial future.',
};

const forexStrategies = [
    {
        title: "Tailored Currency Strategies",
        description: "We equip you with custom-built strategies that align with your financial goals and risk tolerance, allowing you to participate confidently in the vast currency market."
    },
    {
        title: "Deep Market Insights",
        description: "Gain access to real-time market updates, expert analysis, and actionable insights to make informed decisions and adapt to evolving market conditions."
    },
    {
        title: "Risk-Managed Position Sizing",
        description: "Learn sophisticated hedging and position-sizing frameworks to protect your capital and ensure controlled exposure in this dynamic market. Our emphasis is always on long-term capital appreciation, not speculative day trading."
    }
];

const optionsStrategies = [
    {
        title: "CBOE/CME Options Training",
        description: "Master the intricacies of CBOE/CME listed options, learning to trade derivatives with clearly defined, controlled risk profiles."
    },
    {
        title: "Income Generation Strategies",
        description: "Explore proven techniques such as selling Put Spreads and Covered Calls to generate consistent income, reduce portfolio volatility, and enhance returns."
    },
    {
        title: "Capital Preservation Focus",
        description: "Our strategies prioritize the protection of your principal, offering predictable payoff profiles that are fundamental to building a robust, long-term investment portfolio."
    }
];

const wealthStrategies = [
    {
        title: "Portfolio Management with Forex",
        description: "We use the currency market not just for speculation, but as a strategic tool for diversification and hedging against inflationary and geopolitical risks, creating a solid and liquid foundation for your wealth."
    },
    {
        title: "Cash Flow Generation with Options",
        description: "We implement advanced strategies like selling Put Spreads and Covered Calls to generate recurring income and reduce the cost basis of your assets, transforming market volatility into a source of predictable returns."
    },
    {
        title: "Hedging and Exposure with Futures",
        description: "We integrate the use of futures contracts to provide precise hedging for stock or commodity portfolios, as well as to gain diversified exposure to new markets with efficient use of capital."
    },
    {
        title: "Planning and Synergy",
        description: "The true power lies in the synergistic combination of these instruments. We design a long-term wealth plan where Forex provides stability, options generate cash flow, and futures protect and expand your portfolio in a controlled manner."
    }
];


const whyUsPoints = [
  'Expert Mentorship: Receive personalized guidance and continuous support from our team of seasoned professionals.',
  'Actionable Insights: Benefit from timely market updates, expert analysis, and personalized strategy adjustments.',
  'Client-Centric Approach: We tailor our services to your unique needs, ensuring that our solutions align perfectly with your financial goals and business objectives.',
];

export default function VanillaOptionsAndForexPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Building Long-Term Wealth with Forex & Options
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Navigate the complexities of global financial markets with UhurU's expert guidance. We specialize in robust, low-risk strategies across the most liquid and regulated asset classes, focusing on predictable outcomes and capital protection.
              </p>
            </section>

            <section>
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Forex Market Mastery: Unlocking Global Opportunities</CardTitle>
                   <CardDescription>
                    The Forex market, the world's largest financial arena, offers unparalleled opportunities. Our approach focuses on strategic, risk-managed investments designed to capitalize on global macroeconomic trends.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {forexStrategies.map((point, index) => (
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
                        Options Trading for Structured Returns
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                      Options offer powerful tools for generating consistent income and enhancing portfolio stability. Our comprehensive training demystifies these derivatives, focusing on low-risk, structured strategies.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-1">
                    {optionsStrategies.map((item, index) => (
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

             <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Building Your Long-Term Wealth Foundation
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  A truly resilient portfolio is built by intelligently combining strategies. We focus on creating a synergistic plan where each financial instrument plays a specific role in your long-term wealth growth and preservation.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {wealthStrategies.map((item, index) => (
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
                  <CardTitle className="text-3xl font-bold font-headline">Your Partner in Progress: The UhurU Advantage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Choosing UhurU means choosing a partner committed to your success.</p>
                  {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to achieve financial freedom and unlock your full potential?</strong> Contact UhurU today for a consultation and discover how our expertise can empower your journey.
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
