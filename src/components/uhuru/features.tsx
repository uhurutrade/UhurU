"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Bot, Bitcoin, Globe, CandlestickChart, AppWindow, Users, Cloud, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

type Feature = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  imageIcon?: string;
};

export default function Features() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="features" className="w-full pt-0 pb-6 md:pb-12 lg:pb-16 relative overflow-visible">
      <div className="container mx-auto max-w-[1400px] space-y-12 px-4 md:px-10 relative overflow-visible">
        <div className="flex flex-col items-center justify-center space-y-4 text-center relative overflow-visible">
          
          {/* Dedicated Promo Area - Matches Hero Button Spacing */}
          <div className="flex flex-col sm:flex-row justify-center items-center relative z-30 min-h-[60px] md:min-h-[80px] w-full">
            {mounted && (
              <Link href="/services/skillhub" className="group flex shrink-0 transform hover:scale-110 transition-all duration-300">
                <div className="transform -rotate-12 flex flex-col items-center opacity-95 group-hover:opacity-100 group-hover:-rotate-6 transition-all duration-300">
                  <span className="text-blue-500 font-black text-4xl md:text-5xl lg:text-3xl xl:text-4xl tracking-tighter drop-shadow-2xl">
                    £18
                  </span>
                  <span className="text-white font-black text-[8px] md:text-[10px] tracking-normal -mt-2 drop-shadow-md">
                    1 Week Access
                  </span>
                  <span className="text-blue-400 font-black text-[8px] md:text-[10px] tracking-normal mt-0.5 drop-shadow-lg">
                    Oracle Fusion
                  </span>
                </div>
              </Link>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Our Capabilities</h2>
            <p className="max-w-[900px] text-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of expert services designed to elevate your business
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {featureData.map((feature: any, index: number) => (
            <Link key={index} href={`/services/${feature.slug}`} className="block h-full">
              <Card className="bg-card h-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:border-primary">
                <CardHeader className="flex flex-col items-center text-center pb-4 text-primary">
                  {iconComponents[feature.icon as string]}
                  <CardTitle className="mt-4 text-xl text-foreground font-headline break-words flex justify-center">
                    {feature.titleImage ? (
                       <Image 
                          src={feature.titleImage} 
                          alt={feature.title} 
                          width={250} 
                          height={60}
                          className="h-auto w-auto max-w-[200px] dark:invert-0 invert"
                          priority={index < 2}
                        />
                    ) : (
                      feature.title
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-foreground text-sm line-clamp-4">
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
