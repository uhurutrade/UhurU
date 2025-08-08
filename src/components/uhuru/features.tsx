import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Bot, Bitcoin, Globe, CandlestickChart, AppWindow, Users, Cloud, Package } from 'lucide-react';
import Link from 'next/link';
import { features as featureData } from '@/lib/features';

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

export default function Features() {
  const features = featureData.map(feature => ({
    ...feature,
    icon: iconComponents[feature.icon]
  }));

  return (
    <section id="features" className="w-full pt-6 md:pt-12 lg:pt-16 pb-6 md:pb-12 lg:pb-16">
      <div className="container mx-auto max-w-7xl space-y-12 px-4 md:px-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Our Capabilities</h2>
            <p className="max-w-[900px] text-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of expert services designed to elevate your business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={index} href={`/services/${feature.slug}`} className="block">
              <Card className="bg-card h-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:border-primary">
                <CardHeader className="flex flex-col items-center text-center pb-4 text-primary">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
