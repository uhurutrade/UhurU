
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { features } from '@/lib/features';
import { ChevronLeft, ShoppingCart, Bot, Bitcoin, Globe, CandlestickChart, AppWindow, Users, Cloud, Package, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AmazonFbaPage from '../amazon-fba/page';
import ErpCrmPage from '../erp-and-crm/page';
import SubPageHeader from '@/components/uhuru/subpage-header';

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
  'ai-automation-and-ai-agents': {
    paragraphs: [
      "Unlock significant cost savings and operational efficiency with our AI Automation and Custom AI Agent services. We specialize in deploying intelligent systems that streamline your core business processes, from marketing and customer support to billing and social media management. Our solutions are designed to minimize human intervention, allowing your team to focus on strategic growth while our AI agents handle repetitive tasks 24/7.",
      "We develop custom AI agents trained on your company's proprietary data, creating intelligent assistants that provide real-time insights and automate complex decision-making. Whether it's a customer-facing chatbot to improve user engagement or an internal tool to optimize workflows, our AI solutions are tailored to your specific needs, ensuring seamless integration with your existing software stack and providing a clear path to scalable, data-driven operations.",
      "Our end-to-end service includes a thorough analysis of your current workflows, identification of automation opportunities, custom development, and ongoing maintenance. By leveraging the power of AI, we help you reduce operational overhead, increase productivity, and gain a competitive edge in your industry."
    ]
  },
  'blockchain-and-crypto': {
    paragraphs: [
      "Step into the future of finance with our Blockchain and Crypto services. We empower businesses to tokenize assets, launch innovative projects, and attract global investors through secure, decentralized capital strategies. Our expertise lies in transforming traditional assets like equity, real estate, or products into liquid, tradable digital tokens on the blockchain, opening up new avenues for monetization and investment.",
      "We offer end-to-end support, including the design of custom tokens and self-executing smart contracts that are tailored to your business model and compliant with regulatory standards. Our team also specializes in creating and optimizing DeFi (Decentralized Finance) liquidity strategies, building robust liquidity pools that enhance visibility, foster investor confidence, and maximize funding opportunities for your project.",
      "From initial concept to public launch, we guide you through every step of the tokenization process. We ensure your project adheres to global compliance frameworks while leveraging the inherent transparency and trustless architecture of blockchain technology to build a modern, borderless financial foundation for your venture."
    ]
  },
  'business-localization-strategies': {
    paragraphs: [
      "Navigate the complexities of global expansion with our Business Localization and Offshore Strategies. We specialize in designing compliant international corporate frameworks that protect your assets, optimize your tax liabilities, and position your business for sustainable growth. Our service is ideal for entrepreneurs and established companies looking to legally separate personal wealth from business risks while enhancing fiscal efficiency.",
      "Our process begins with a thorough jurisdiction analysis, where we identify the most advantageous, tax-friendly regions that align with your long-term business objectives. We then guide you through the process of legally shielding your personal assets from corporate liabilities, ensuring your wealth is secure. Our primary goal is to minimize your tax burden through compliant international structuring, leveraging legal frameworks to your advantage.",
      "We provide an end-to-end setup service that covers every aspect of establishing your international presence. This includes company formation in strategic jurisdictions, establishing offshore banking relationships, and managing all necessary regulatory filings to ensure you remain fully compliant. Let us handle the complexity of global finance so you can focus on running your business."
    ]
  },
  'vanilla-options-and-forex-investment': {
    paragraphs: [
      "Master the world's largest and most liquid financial markets with our expert training in Vanilla Options and Forex Investment. This service is designed for individuals and institutions seeking to build secure, high-liquidity investment portfolios using regulated and transparent trading instruments. We focus on low-risk, structured strategies that provide predictable payoff profiles and protect your capital.",
      "Our curriculum includes comprehensive training on CBOE/CME listed options, where you'll learn to trade derivatives with clearly defined, controlled risk. We demystify complex concepts and provide you with actionable strategies for generating consistent returns. In the Forex market, you will gain access to tailored currency strategies that allow you to capitalize on global macroeconomic trends while managing risk effectively through sophisticated hedging and position-sizing frameworks.",
      "Beyond training, we offer real-time mentorship and continuous support. As a client, you will receive timely market updates, expert analysis, and personalized strategy adjustments from our team of seasoned traders. We are committed to helping you build a resilient, risk-managed portfolio that aligns with your financial goals."
    ]
  },
  'no-code-app-design': {
    paragraphs: [
      "Bring your app ideas to life without a traditional development team. Our No-Code App Design service empowers you to build, launch, and scale powerful web, iOS, and Android applications using cutting-edge, open-source no-code platforms. This approach dramatically reduces development time and costs, allowing you to go to market in a matter of weeks.",
      "We specialize in cross-platform development, creating responsive and intuitive applications with feature-rich, drag-and-drop interfaces. A key advantage of our methodology is portability; all applications are Docker-containerized, meaning you can deploy them seamlessly across any environment—cloud, on-premise, or hybrid—without vendor lock-in. This gives you ultimate control and flexibility over your infrastructure.",
      "Our service extends beyond the initial launch. We provide lifetime maintenance, including regular updates, security patches, and feature enhancements to ensure your application remains modern, secure, and aligned with your evolving business needs. From a rapid MVP (Minimum Viable Product) to a full-scale enterprise application, we provide the tools and expertise to build your vision."
    ]
  },
  'cloud-saas-paas-management': {
    paragraphs: [
      "Optimize your cloud infrastructure for peak performance, security, and cost-efficiency with our Cloud SaaS & PaaS Management services. We help businesses navigate the complexities of modern cloud environments, eliminating wasteful spending and unlocking the full potential of platforms like AWS, Azure, and Google Cloud. Our goal is to give you a secure, scalable, and affordable infrastructure foundation.",
      "We provide multi-cloud governance from a unified dashboard, simplifying the management of your resources. Our process includes comprehensive cost-reduction audits where we identify and eliminate inefficiencies by rightsizing services and automating scaling protocols. Furthermore, we specialize in migrating businesses from expensive, proprietary SaaS tools to powerful, customizable, and license-free open-source alternatives, delivering significant long-term savings.",
      "Security is at the core of our management philosophy. We implement enterprise-grade security protocols, including end-to-end encryption, zero-trust access controls, and continuous compliance monitoring. Let us handle the technical overhead of cloud management so you can focus on innovation and growth."
    ]
  },
  'all-in-one-package': {
    paragraphs: [
      "Experience ultimate flexibility with our All-in-One Package, a comprehensive solution designed for modern businesses that demand agility and transparent pricing. This package bundles our expertise across technology and finance, offering a suite of scalable services with zero long-term commitments. Whether you need development, consulting, or management services, our PAYG (Pay-As-You-Go) model ensures you only pay for what you use.",
      "We understand the dynamic nature of today's market, which is why we proudly accept payments in both traditional currencies and cryptocurrencies, giving you greater financial flexibility. This package is built on a foundation of trust and adaptability, allowing you to scale services up or down as your business needs evolve without being locked into restrictive contracts.",
      "Our All-in-One solution is perfect for startups testing new ideas, established companies managing fluctuating workloads, or any business seeking a reliable, on-demand technology partner. Access our full range of services—from AI automation to cloud management—and enjoy the freedom to innovate without barriers."
    ]
  }
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
  if (params.slug === 'amazon-fba') {
    return <AmazonFbaPage />;
  }
  if (params.slug === 'erp-and-crm') {
    return <ErpCrmPage />;
  }

  const feature = features.find((f) => f.slug === params.slug);

  if (!feature) {
    notFound();
  }

  const icon = iconComponents[feature.icon];
  const content = serviceContent[feature.slug] || { paragraphs: [] };

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="text-accent">{icon}</div>
                <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  {feature.title}
                </CardTitle>
              </div>
              <CardDescription className="pt-2 text-lg">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return features.map((feature) => ({
    slug: feature.slug,
  }));
}
