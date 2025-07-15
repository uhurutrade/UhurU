
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'AI Automation and Custom AI Agents | UhurU',
  description: 'Unlock efficiency with our AI automation and custom AI agent services. We leverage open-source tools to streamline workflows, reduce costs, and drive business growth.',
};

const coreOfferings = [
    {
        title: "Strategic End-to-End Automation",
        description: "We optimize your key processes from marketing and billing to customer support and social media, all orchestrated by intelligent, self-adapting AI systems."
    },
    {
        title: "Custom-Trained AI Agents",
        description: "We develop intelligent assistants trained on your proprietary company data, enabling them to make informed, real-time decisions and handle complex tasks autonomously."
    },
    {
        title: "24/7 Scalable Operations",
        description: "Minimize human intervention in repetitive tasks while maximizing productivity. Our AI solutions work tirelessly, allowing you to scale without proportional cost increases."
    },
    {
        title: "Seamless & Secure Integration",
        description: "We ensure our AI solutions integrate flawlessly with your existing tools (CRM, ERP, etc.) and provide ongoing support to guarantee long-term peak performance."
    }
];

const openSourceTools = [
    {
        title: "n8n (Workflow Automation)",
        description: "The core of our automation engine. This open-source, node-based tool connects hundreds of apps, allowing us to build powerful, self-hosted workflows that orchestrate tasks and integrate AI model APIs (like GPT, LLaMA, or Mistral) for content generation, data extraction, and more."
    },
    {
        title: "Baserow / NocoDB (Low-Code Databases)",
        description: "The data backbone for our AI agents. These open-source Airtable alternatives provide the structured, clean data that AI needs to function effectively. We use them to trigger automated workflows whenever your data changes."
    },
    {
        title: "LangChain / LlamaIndex (AI Frameworks)",
        description: "The 'brains' behind our sophisticated AI agents. These developer frameworks allow us to connect Large Language Models (LLMs) to your unique business data, enabling complex reasoning, Retrieval-Augmented Generation (RAG), and interaction with your internal tools."
    },
    {
        title: "Gradio / Streamlit (Rapid UI for AI)",
        description: "Essential for deploying AI effectively. These tools enable us to create simple, interactive user interfaces for your AI models in minutes, allowing your team to easily test, validate, and use the AI agents we build."
    },
];

const whyUsPoints = [
    "Open-Source Focus: We build agile, cost-effective solutions without proprietary vendor lock-in, giving you full control over your data and infrastructure.",
    "Holistic Approach: Our service covers the full lifecycle, from workflow analysis and opportunity identification to custom development, deployment, and continuous optimization.",
    "Deep Technical Expertise: We bridge the gap between business processes and cutting-edge AI, using the right tools to solve your specific challenges.",
    "Measurable Impact: Our goal is to deliver a decisive competitive advantage by drastically reducing operational costs and exponentially increasing departmental productivity."
];

export default function AiAutomationPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-12">
            
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                AI Automation & Custom Agents
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                In today's fast-paced business landscape, efficiency and scalability aren't just goals—they're imperatives. Our AI Automation and Custom Agent services are designed to catalyze a profound transformation in your organization.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {coreOfferings.map((service, index) => (
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
              <Card className="bg-secondary/50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold font-headline">Custom AI Agents: Your Intelligent, Ever-Ready Team</h2>
                  <p className="mt-4 text-muted-foreground">
                    The true power of AI lies in its adaptability. We go beyond generic solutions to develop custom AI agents—digital brains trained on your company's unique proprietary data and knowledge. This means they don't just process information; they understand the specific context of your business, enabling them to deliver highly relevant real-time insights and automate complex decision-making that previously required constant human oversight.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    From a customer-facing chatbot that dramatically improves user satisfaction to an internal tool that optimizes resource allocation, each AI solution we create is meticulously tailored to your needs.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        The Automation Revolution: Our Open-Source Tool-Stack
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                       We leverage a vibrant ecosystem of open-source and low-code tools to build robust, flexible, and cost-effective solutions, giving you freedom from proprietary licenses.
                    </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {openSourceTools.map((tool, index) => (
                        <div key={index} className='flex items-start gap-4'>
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
                  <CardDescription>
                    Are you ready to transform your business? If you feel the pressure to reduce costs and know you need to boost efficiency to stay competitive, you're in the right place. Let's build the future of your operations together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
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
