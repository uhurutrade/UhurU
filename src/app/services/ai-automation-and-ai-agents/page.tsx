import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'AI Automation & Custom Agents | UhurU',
  description: 'Elevate your operational efficiency with our AI Automation and Custom Agent services. We deploy intelligent systems to reinvent your business processes.',
};

const coreOfferings = [
  {
    title: 'Strategic End-to-End Automation',
    description: 'We optimize your key processes from marketing and billing to customer support and social media, all orchestrated by intelligent, self-adapting AI systems.',
  },
  {
    title: 'Custom-Trained AI Agents',
    description: 'We develop intelligent assistants trained on your proprietary company data, enabling them to make informed, real-time decisions and handle complex tasks autonomously.',
  },
  {
    title: '24/7 Scalable Operations',
    description: 'Minimize human intervention in repetitive tasks while maximizing productivity. Our AI solutions work tirelessly, allowing you to scale without proportional cost increases.',
  },
  {
    title: 'Seamless & Secure Integration',
    description: 'We ensure our AI solutions integrate flawlessly with your existing tools (CRM, ERP, etc.) and provide ongoing support to guarantee long-term peak performance.',
  },
];

const automationExamples = [
    {
        title: "Marketing Automation",
        description: "From personalized email campaigns and dynamic content generation to lead qualification and predictive analytics, our AI systems manage vast segments of your marketing funnel."
    },
    {
        title: "Automated Invoicing & Accounting",
        description: "Process invoices, reconcile payments, categorize expenses, and identify discrepancies, significantly reducing the time and cost associated with financial operations."
    },
    {
        title: "Customer Support Reinvented",
        description: "Deploy intelligent, self-adapting AI systems that handle routine inquiries, triage complex issues, and provide instant resolutions, freeing up your human agents for high-value interactions."
    },
    {
        title: "Social Media Management",
        description: "Automate content scheduling, audience engagement, sentiment analysis, and crisis monitoring across all your social platforms, maintaining an active and positive brand presence 24/7."
    },
    {
        title: "Streamlined Administrative Tasks",
        description: "Absorb the burden of repetitive administrative work like calendar management, form processing, and data organization, allowing your staff to focus on strategic initiatives."
    }
];


const openSourceTools = [
  {
    title: 'n8n (Open-Source Workflow Automation)',
    description: 'The core of our orchestration, n8n connects hundreds of apps and AI models, allowing us to build powerful, self-hosted workflows with total data control.',
  },
  {
    title: 'Baserow / NocoDB (Open-Source, Low-Code Databases)',
    description: 'The data backbone for our AI agents. These flexible Airtable alternatives provide the structured, clean data needed to trigger automations and train effective AI.',
  },
  {
    title: 'LangChain / LlamaIndex (Open-Source AI Frameworks)',
    description: "The 'brains' behind our sophisticated custom agents. These frameworks enable Retrieval-Augmented Generation (RAG), allowing AI to access and reason over your unique business data.",
  },
  {
    title: 'Gradio / Streamlit (Open-Source, Rapid UI for AI)',
    description: 'Essential for deploying AI effectively. These tools enable us to create simple, interactive user interfaces for your AI models, accelerating adoption and testing.',
  },
];

const whyUsPoints = [
  'Open-Source Focus: We build agile, customized, and cost-effective solutions without proprietary vendor lock-in, giving you full control over your data and infrastructure.',
  'Holistic Approach: Our service covers the entire lifecycle of AI automation, from initial workflow analysis and opportunity identification to custom development, deployment, and continuous optimization.',
  'Deep Technical Expertise: We bridge the gap between complex business processes and cutting-edge AI technologies, implementing the right open-source tools to solve your specific challenges.',
  'Measurable Impact: Our goal is to deliver a decisive competitive advantage by drastically reducing operational costs and exponentially increasing departmental productivity.',
];

export default function AiAutomationPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                AI Automation & Custom Agents.
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                In today&apos;s fast-paced business landscape, efficiency and scalability aren&apos;t just goals—they&apos;re imperatives. Our AI services are designed to catalyze a profound transformation in your organization, elevating your operational efficiency to unprecedented levels.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {coreOfferings.map((service, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
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
              <Card className="bg-secondary/50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold font-headline">Custom-Trained AI Agents: Your Intelligent, Ever-Ready Team</h2>
                  <p className="mt-4 text-muted-foreground">
                    The true power of AI lies in its adaptability. We go beyond generic solutions to develop custom AI agents—digital brains meticulously trained on your company&apos;s unique proprietary data. They don&apos;t just process information; they understand the specific context of your business, enabling them to deliver highly relevant, real-time insights and automate complex decisions.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Our chatbots, enhanced with Retrieval-Augmented Generation (RAG), can access your internal knowledge bases to provide precise, context-aware answers, resolving complex issues and dramatically improving user experience.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Redefining How You Work: Strategic Automation Examples
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We automate end-to-end processes, freeing your team to focus on innovation and growth.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {automationExamples.map((item, index) => (
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

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  Our Open-Source & Low-Code Tool-Stack Advantage
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We leverage a vibrant ecosystem of open-source tools to build robust, flexible, and cost-effective solutions, giving you freedom from proprietary licenses.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {openSourceTools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold font-headline">{tool.title}</h3>
                      <p className="mt-1 text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Choose UhurU for AI Automation?</CardTitle>
                  <d-card-description>
                    Are you ready to transform your business? If you feel the pressure to reduce costs and know you need to boost efficiency to stay competitive, you&apos;re in the right place. Let&apos;s build the future of your operations together.
                  </d-card-description>
                </CardHeader>
                <CardContent className="space-y-4">
                  {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Take the next step:</strong> Contact us today for a complimentary audit of your current workflows. Let&apos;s uncover the untapped potential for AI automation in your organization.
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
