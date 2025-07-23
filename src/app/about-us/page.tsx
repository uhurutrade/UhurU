
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { features } from '@/lib/features';
import SubPageHeader from '@/components/uhuru/subpage-header';

const servicesContent: { [key: string]: React.ReactNode } = {
  'amazon-fba': (
    <div className="space-y-4">
      <p>
        Do you want to start selling on Amazon FBA but don’t know where to begin? Our consulting service helps you build your business from scratch, ensuring every step is optimized for success.
      </p>
      <ul className="space-y-2">
        <li className="flex items-start">
          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
          <span><strong>Fiscal and Legal Structure:</strong> We advise you on the best business structure for operating on Amazon, considering taxes, regulations, and financial optimization.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
          <span><strong>Market Selection:</strong> We analyze and identify the most profitable Amazon markets for your business, maximizing opportunities and minimizing risks.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
          <span><strong>Import & Logistics:</strong> We guide you through supplier selection, customs management, and supply chain optimization.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
          <span><strong>Technological Maintenance:</strong> From listing creation and management to process automation and analytics tools, we ensure your business runs efficiently.</span>
        </li>
      </ul>
    </div>
  ),
  'blockchain-and-crypto': (
    <div className="space-y-2">
      <p>Want to tokenize assets and attract global crypto investors? We implement secure blockchain frameworks to transform your projects into liquid, decentralized assets.</p>
      <p>✔ Custom Token & Smart Contract Design: Create compliant tokens and self-executing contracts tailored to your business model.</p>
      <p>✔ DeFi Liquidity Strategies: Build and optimize liquidity pools to maximize visibility and funding opportunities.</p>
      <p>✔ Asset Tokenization: Tokenize equity, products, or initiatives for transparent, borderless monetization.</p>
      <p>✔ Regulatory Compliance: Ensure adherence to global standards while leveraging blockchain’s trustless architecture.</p>
    </div>
  ),
  'ai-automation-and-ai-agents': (
    <div className="space-y-2">
      <p>Need to slash costs and boost efficiency? We deploy AI systems that automate workflows and centralize your company’s expertise.</p>
      <p>✔ End-to-End Automation: Streamline marketing, billing, customer support, and social media with AI-driven tools.</p>
      <p>✔ Custom AI Agents: Develop intelligent assistants trained on your proprietary data for real-time decision-making.</p>
      <p>✔ 24/7 Scalable Operations: Minimize human intervention while maximizing productivity across departments.</p>
      <p>✔ Seamless Integration: Ensure compatibility with existing tools and provide ongoing system maintenance.</p>
    </div>
  ),
  'business-localization-strategies': (
    <div className="space-y-2">
        <p>Looking to protect assets and optimize taxes? We design offshore frameworks that separate personal wealth from business liabilities.</p>
        <p>✔ Jurisdiction Analysis: Identify tax-friendly regions aligned with your business goals.</p>
        <p>✔ Asset Protection: Legally shield personal wealth from corporate risks.</p>
        <p>✔ Tax Minimization: Reduce liabilities through compliant international structuring.</p>
        <p>✔ End-to-End Setup: Handle company formation, banking, and regulatory filings.</p>
    </div>
  ),
  'vanilla-options-and-forex-investment': (
    <div className="space-y-2">
      <p>Seeking secure, high-liquidity investments? Master low-risk strategies in regulated options and forex markets.</p>
      <p>✔ CBOE/CME Options Training: Trade derivatives with controlled risk and structured payoff profiles.</p>
      <p>✔ Forex Market Mastery: Access the world’s largest financial market with tailored currency strategies.</p>
      <p>✔ Risk-Managed Portfolios: Balance investments using hedging and position-sizing frameworks.</p>
      <p>✔ Real-Time Mentorship: Receive market updates and strategy adjustments from experts.</p>
    </div>
  ),
  'no-code-app-design': (
    <div className="space-y-2">
      <p>Need custom apps without a dev team? Build and scale web, iOS, and Android apps using open-source no-code tools.</p>
      <p>✔ Cross-Platform Development: Launch responsive apps on all devices with drag-and-drop interfaces.</p>
      <p>✔ Docker-Powered Portability: Deploy apps seamlessly across environments via containerization.</p>
      <p>✔ Rapid MVP Launch: Go to market in weeks using agile no-code frameworks.</p>
      <p>✔ Lifetime Maintenance: Provide updates, security patches, and feature enhancements post-launch.</p>
    </div>
  ),
  'erp-and-crm': (
    <div className="space-y-2">
      <p>Struggling with fragmented business systems? We implement tailored ERP/CRM platforms for unified operations.</p>
      <p>✔ Oracle Financials Specialization: Configure advanced modules for finance, compliance, and reporting.</p>
      <p>✔ Workflow Automation: Sync sales, inventory, and accounting processes across departments.</p>
      <p>✔ Third-Party Integrations: Connect ERP/CRM systems to existing tools via APIs.</p>
      <p>✔ User Training & Support: Offer onboarding sessions and 24/7 troubleshooting.</p>
    </div>
  ),
  'cloud-saas-paas-management': (
    <div className="space-y-2">
      <p>Overwhelmed by cloud costs and complexity? We optimize your infrastructure for security, performance, and savings.</p>
      <p>✔ Multi-Cloud Governance: Manage AWS, Azure, or Google Cloud setups with unified dashboards.</p>
      <p>✔ Cost-Reduction Audits: Eliminate waste by rightsizing resources and automating scaling.</p>
      <p>✔ Open-Source Migration: Replace costly SaaS tools with customizable, license-free alternatives.</p>
      <p>✔ Enterprise-Grade Security: Implement encryption, zero-trust access, and compliance protocols.</p>
    </div>
  ),
   'all-in-one-package': <p>{features.find(f => f.slug === 'all-in-one-package')?.description}</p>
};


export default function AboutUsPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-10">
          <Card className="bg-card shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                What we bring?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg text-muted-foreground">
              <p>
                Firstly, let us show you who we are. UhurU is a young and innovative company with extensive experience in technology and finance.
              </p>
              <p>
                Our mission is to help businesses optimize their operations, reduce costs, and strategically plan their tax structures. We specialize in helping companies based in jurisdictions like the United Kingdom, Estonia, the United States, and Cyprus to improve fiscal efficiency and operational costs. We offer a wide range of services designed to help businesses thrive in the modern digital world.
              </p>
              <p>
                From AI automation and AI agents to full-stack no-code/low-code app development, we provide cutting-edge solutions that enhance business processes, automate tasks, and enable rapid innovation. With our no-code platforms, businesses can build powerful tools quickly without extensive coding expertise, saving time and resources.
              </p>
              <p>
                Our team also has deep experience in Oracle Financials, offering ERP and CRM solutions that streamline financial management and customer relations. Additionally, we automate social media management, email campaigns, invoicing, and community engagement to ensure businesses run efficiently across all platforms.
              </p>
              <p>
                At UhurU, we combine technology and finance to deliver strategic solutions tailored to your business needs. Whether you want to optimize your tax structure, automate processes, or develop custom applications, we have the expertise to help your business grow while keeping costs low and productivity high.
              </p>

              <div className="pt-8">
                <p className="text-center text-foreground font-semibold mb-4">(click arrows for details)</p>
                <Accordion type="single" collapsible className="w-full">
                  {features.map((service, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-xl font-headline text-foreground text-left">{service.title}</AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground space-y-4">
                        <div>{servicesContent[service.slug]}</div>
                        <Link href={`/services/${service.slug}`} className="text-sm text-primary hover:underline">
                          ...see more
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
