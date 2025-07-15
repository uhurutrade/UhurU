
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'AI Automation & Custom Agents | UhurU',
  description: 'Elevate your operational efficiency with our AI Automation and Custom Agent services. We deploy intelligent systems to reinvent your business processes.',
};

const strategicAutomation = [
    {
        title: "Marketing Automation",
        description: "From personalized email campaigns and dynamic content generation to lead qualification and predictive analytics, our AI systems can manage vast segments of your marketing funnel. They can identify optimal channels, tailor messaging based on user behavior, and even generate creative copy, ensuring your marketing efforts are always impactful and efficient."
    },
    {
        title: "Automated Invoicing & Accounting",
        description: "Say goodbye to manual data entry and reconciliation errors. Our AI agents can process invoices, reconcile payments, categorize expenses, and even identify discrepancies, significantly reducing the time and cost associated with financial operations. This ensures accuracy, accelerates cash flow, and provides real-time financial insights."
    },
    {
        title: "Customer Support Reinvented",
        description: "Deploy intelligent, self-adapting AI systems that handle routine inquiries, triage complex issues, and provide instant resolutions. This frees up your human agents to focus on high-value interactions, leading to vastly improved customer satisfaction and reduced support overhead."
    },
    {
        title: "Social Media Management",
        description: "Automate content scheduling, audience engagement, sentiment analysis, and even crisis monitoring across all your social platforms. Our AI agents can listen, learn, and respond in real-time, maintaining an active and positive brand presence 24/7."
    },
    {
        title: "Streamlined Administrative Tasks",
        description: "From managing calendars and scheduling meetings to processing forms, digitizing documents, and organizing data, our AI solutions absorb the burden of repetitive administrative work. This frees up valuable time for executive assistants and administrative staff, allowing them to contribute to more strategic initiatives."
    }
];

const customAgentsDetails = [
    {
        title: "Personalized Chatbots (Enhanced with RAG)",
        description: "Our custom-trained chatbots aren't just script-based. They are powered by Retrieval-Augmented Generation (RAG), allowing them to access and synthesize information from your vast internal knowledge bases (documents, databases, CRM records, support tickets). This means your chatbot can provide precise, accurate, and context-aware answers to customer queries, resolve complex issues, or even guide users through intricate processes, vastly improving user experience and reducing the load on human agents."
    },
    {
        title: "Internal Knowledge Agents",
        description: "Deploy AI agents that centralize your company's expertise. These agents can sift through internal documents, meeting notes, project plans, and research papers to provide immediate answers to employee questions, summarize complex reports, or assist in onboarding new staff by providing instant access to company policies and best practices."
    },
    {
        title: "Process Automation Agents",
        description: "From automating procurement workflows based on real-time inventory data to managing compliance checks and generating legal summaries, our custom agents can handle intricate, multi-step processes with unparalleled accuracy and speed."
    }
];


const openSourceTools = [
  {
    title: 'n8n (Open-Source Workflow Automation)',
    description: 'This powerful, node-based automation engine is the core of our orchestration capabilities. Its open-source nature allows for self-hosting and deep customization. We use n8n to connect hundreds of applications and services, building complex, automated workflows. Crucially, n8n orchestrates the interaction with AI model APIs (like OpenAI\'s GPT, or open-source alternatives such as LLaMA and Mistral deployed on your infrastructure), enabling dynamic content generation, sophisticated data extraction from documents, advanced text classification, and more. It acts as the central nervous system connecting your data, your tools, and your AI agents.',
  },
  {
    title: 'Baserow / NocoDB (Open-Source, Low-Code Databases)',
    description: 'These flexible, open-source alternatives to Airtable serve as the structured data backbone for our AI agents. Clean, organized data is paramount for AI effectiveness. We leverage these platforms to create dynamic databases that not only store your business-critical information but also act as triggers for automated workflows, ensuring real-time data processing and decision-making by your AI agents.',
  },
  {
    title: 'LangChain / LlamaIndex (Open-Source AI Frameworks)',
    description: 'These are the \'brains\' behind our sophisticated custom AI agents. As cutting-edge developer frameworks, they allow us to connect Large Language Models (LLMs) with your unique business data sources. This is where Retrieval-Augmented Generation (RAG) comes into play, enabling AI agents to access, synthesize, and reason over your proprietary documents, databases, and APIs. These frameworks are essential for building AI agents capable of complex chains of thought, intelligent data retrieval, and seamless interaction with your internal tools and knowledge bases.',
  },
  {
    title: 'Gradio / Streamlit (Open-Source, Rapid UI for AI)',
    description: 'Essential for deploying AI effectively and ensuring user adoption. These tools enable us to rapidly create simple, interactive user interfaces for your AI models and agents. This allows your team to easily test, validate, and intuitively use the AI solutions we build, accelerating the integration of AI into your daily operations.',
  },
];

const whyUsPoints = [
  'Open-Source Focus: We build agile, customized, and cost-effective solutions without proprietary vendor lock-in. This gives you full control over your data and infrastructure, ensuring long-term flexibility and security.',
  'Holistic Approach: Our service covers the entire lifecycle of AI automation. From initial workflow analysis and the identification of high-impact opportunities to custom development, meticulous deployment, and continuous optimization, we are your partner every step of the way.',
  'Deep Technical Expertise: We bridge the gap between complex business processes and cutting-edge AI technologies. Our team possesses the expertise to select and implement the right tools from the vast open-source ecosystem, solving your specific challenges with precision and innovation.',
  'Measurable Impact: Our ultimate goal is to deliver a decisive competitive advantage for your business. We achieve this by drastically reducing your operational costs, exponentially increasing departmental productivity, and empowering your teams to focus on strategic growth rather than routine tasks.',
];

export default function AiAutomationPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            <section className="text-center">
              <p className='text-accent font-semibold'>AI Automation & Custom Agents: Your Definitive Competitive Advantage</p>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                AI Automation & Custom Agents
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                In today&apos;s fast-paced business landscape, efficiency and scalability aren&apos;t just goals—they&apos;re imperatives. To thrive, you need to do more with less, adapt faster, and focus your human capital on strategic growth. Our AI Automation and Custom Agent services are precisely designed to catalyze a profound transformation in your organization. We don&apos;t just help you unlock significant cost savings; we elevate your operational efficiency to unprecedented levels, allowing your business to perform at its peak.
              </p>
            </section>

             <section>
              <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">Strategic End-to-End Automation: Redefining How You Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="mt-4 text-muted-foreground">
                    We go beyond simple task automation to strategically optimize your key processes from end-to-end. Imagine a future where mundane, repetitive tasks across your enterprise are handled autonomously, allowing your teams to dedicate their energy to innovation and complex problem-solving.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {strategicAutomation.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold font-headline">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
                 <p className="text-center text-muted-foreground">
                    All these processes are orchestrated by intelligent, self-adapting AI systems that continuously learn and improve, ensuring your operations are always optimized and ready for the future.
                </p>
            </section>

            <section>
              <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">Custom-Trained AI Agents: Your Intelligent, Ever-Ready Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="mt-4 text-muted-foreground">
                    The true power of AI lies in its adaptability and specificity. We go far beyond generic solutions to develop custom AI agents—digital brains meticulously trained on your company&apos;s unique proprietary data and knowledge. This means they don&apos;t just process information; they understand the specific context of your business, your customers, and your internal operations. This deep contextual understanding enables them to deliver highly relevant, real-time insights and automate complex decision-making that previously required constant human oversight.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section className="space-y-8">
                <div className="grid gap-6 md:grid-cols-1">
                    {customAgentsDetails.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                        <div>
                        <h3 className="text-lg font-semibold font-headline">{item.title}</h3>
                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                 <p className="text-center text-muted-foreground">
                    Each AI solution we create is meticulously tailored to your specific needs, ensuring a seamless and secure integration with your existing software stack and providing a clear path to scalable, data-driven operations.
                </p>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl font-headline'>24/7 Scalable Operations</CardTitle>
                        <CardDescription>Unleashing Limitless Productivity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground'>Imagine a business that never sleeps, constantly optimizing and delivering results without the proportional increase in overhead. Our AI solutions work tirelessly, around the clock, allowing you to scale operations to meet peak demands, enter new markets, or manage sudden growth surges without proportional cost increases related to staffing or infrastructure. This translates directly into sustained competitive advantage and accelerated business growth.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl font-headline'>Seamless & Secure Integration</CardTitle>
                        <CardDescription>Harmony in Your Tech Stack</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground'>We understand that adopting new technology shouldn&apos;t mean overhauling your existing infrastructure. We prioritize seamless and secure integration of our AI solutions with your current tools (CRM, ERP, etc.). Our end-to-end service includes a thorough analysis of your current workflows, identification of automation opportunities, custom development, and ongoing maintenance and optimization to guarantee long-term peak performance and adaptability.</p>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                  The Automation Revolution: Our Open-Source & Low-Code Tool-Stack Advantage
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our commitment to building robust, flexible, and cost-effective AI automation solutions is underpinned by leveraging a vibrant ecosystem of open-source tools and low-code/no-code platforms. This strategic choice gives you unparalleled freedom from proprietary vendor lock-in, reduces licensing costs, and grants you full control over your data and infrastructure.
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
                  <CardDescription>
                    Are you ready to truly transform your business? If you feel the pressure to reduce operational costs and know you need to boost efficiency significantly to stay competitive in today&apos;s market, you&apos;re in the right place. It&apos;s not just about optimizing; it&apos;s about redefining how your business operates. Let&apos;s build the future of your operations together, freeing the unexplored potential of your human talent and catapulting your productivity to new heights.
                  </CardDescription>
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
                      <strong>Take the next step:</strong> Contact us today for a complimentary audit of your current workflows. Let&apos;s uncover the untapped potential for AI automation in your organization and chart a clear path to a more efficient, agile, and competitive future.
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
