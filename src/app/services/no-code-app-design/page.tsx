
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Bot, Database, Puzzle, Wand2, Layout } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'No-Code App Development | UhurU',
  description: 'Build custom web and mobile apps without a dev team using open-source no-code tools. Accelerate your business, automate processes, and reduce overhead.',
};

const coreServices = [
    {
        title: "Cross-Platform Development",
        description: "Launch responsive, enterprise-grade apps that work flawlessly on web, iOS, and Android, all built from a single, efficient workflow."
    },
    {
        title: "Docker-Powered Portability",
        description: "Your applications are containerized with Docker, giving you zero vendor lock-in and the freedom to deploy anywhere—cloud, on-premise, or hybrid."
    },
    {
        title: "Rapid MVP Launch",
        description: "Go from concept to a market-ready Minimum Viable Product in weeks, not months. Test ideas, gather feedback, and iterate at unparalleled speed."
    },
    {
        title: "Lifetime Maintenance & Support",
        description: "Our partnership extends beyond launch. We provide continuous updates, security patches, and feature enhancements to ensure your app evolves with your business."
    }
];

const toolCategories = [
    {
        title: "Web/App Builders",
        icon: <Layout className="h-8 w-8 text-accent" />,
        tools: "Webflow, Framer, Softr, Glide",
        description: "Create stunning, responsive, and powerful user interfaces with drag-and-drop simplicity, backed by robust logic."
    },
    {
        title: "Databases & Backend",
        icon: <Database className="h-8 w-8 text-accent" />,
        tools: "Airtable, Supabase, NocoDB, Baserow",
        description: "Build the powerful data backbones your applications need, with the flexibility of a spreadsheet and the power of a relational database."
    },
    {
        title: "Automation & Integration",
        icon: <Puzzle className="h-8 w-8 text-accent" />,
        tools: "n8n, Make, Zapier, Activepieces",
        description: "Connect all your tools and automate complex workflows to eliminate manual tasks, reduce errors, and free up your team for high-value work."
    },
    {
        title: "AI & Copilots",
        icon: <Bot className="h-8 w-8 text-accent" />,
        tools: "Notion AI, Flowise, Dust, Langflow",
        description: "Embed intelligence directly into your applications, from content generation to sophisticated, AI-driven decision-making processes."
    },
    {
        title: "UI Builders / CMS",
        icon: <Wand2 className="h-8 w-8 text-accent" />,
        tools: "Rowy, Lovable, ToolJet, Plasmic",
        description: "Construct bespoke internal tools, custom dashboards, and content management systems tailored precisely to your operational needs."
    }
];

export default function NoCodeAppDesignPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                No-Code App Development
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Build custom apps without a dev team. We help you design, build, and scale powerful web, iOS, and Android applications using cutting-edge open-source no-code tools.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {coreServices.map((service, index) => (
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
                  <h2 className="text-3xl font-bold font-headline">Transform Your Operations, Not Your Payroll</h2>
                  <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                    In today's market, agility is survival. We empower your business to automate complex processes, build necessary tools, and innovate freely—drastically reducing the reliance on large development teams and their associated costs. It's not about replacing people; it's about optimizing their impact.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-12'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Our Expert No-Code/Low-Code Tool Stack
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We leverage a curated suite of the industry's best open-source and modern tools to build, automate, and scale your business operations efficiently.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toolCategories.map((cat, index) => (
                        <Card key={index} className="flex flex-col">
                           <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                                {cat.icon}
                                <CardTitle className="font-headline text-xl">{cat.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm mb-2">{cat.description}</p>
                                <p className="text-xs font-mono text-accent">{cat.tools}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Bring Your Vision to Life. Faster.</CardTitle>
                  <CardDescription>
                    Our No-Code App Design service is more than just development—it's your strategic advantage for achieving digital transformation with maximum efficiency and minimal overhead.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    From a powerful MVP to a full-scale enterprise application, we provide the expertise to turn your ideas into reality. Let's build powerful tools that solve real problems, automate workflows, and give your business the agility to thrive in a changing world.
                  </p>
                  <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground"><span className="font-semibold text-foreground">Democratize Innovation:</span> Empower your non-technical teams to build solutions and automate their own processes, freeing up your core engineering resources for the most complex, mission-critical challenges.</p>
                  </div>
                  <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground"><span className="font-semibold text-foreground">Strategic Cost Reduction:</span> Build and maintain powerful, secure, and scalable applications at a fraction of the cost of traditional development cycles. This isn't just savings; it's reallocating capital towards growth.</p>
                  </div>
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to build smarter, not harder?</strong> Contact us today to discuss how we can transform your operational challenges into a competitive advantage with a tailored no-code solution.
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

    