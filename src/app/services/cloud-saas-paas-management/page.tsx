
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Server, Layers, CloudCog } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Cloud SaaS & PaaS Management | UhurU',
  description: 'Full lifecycle management of your SaaS/PaaS deployments. We focus on cost-efficient, open-source solutions to eliminate IT overhead and reduce licensing costs.',
};

const corePrinciples = [
    {
        title: "No IT Overhead, Total Focus",
        description: "We eliminate the need for in-house IT staff, hardware, or complex software installations. We handle all technical aspects, letting you focus on your core business."
    },
    {
        title: "100% Open-Source, Zero Licenses",
        description: "Our solutions are built on powerful open-source technologies, meaning you never pay for software licenses. This results in significant and sustainable long-term cost savings."
    },
    {
        title: "High Availability & Scalability",
        description: "Your applications and services are designed for maximum uptime and can effortlessly scale to meet growing demands, ensuring consistent performance as your business grows."
    },
    {
        title: "Enterprise-Grade Security",
        description: "We implement robust security protocols across all layers, including end-to-end encryption, zero-trust access, and continuous compliance monitoring to protect your data."
    }
];

const serviceTiers = [
    {
        icon: <Server className="h-8 w-8 text-accent" />,
        title: "Infrastructure as a Service (IaaS) & Managed Hosting",
        description: "The foundational computing resources your business needs, fully managed by our experts. This is the base layer for all your applications and data.",
        points: [
            "Server Provisioning & Management",
            "Networking & VPC Configuration",
            "Scalable & Secure Storage Solutions",
            "Managed Database Hosting (DBaaS)",
            "Load Balancing & Auto-Scaling"
        ]
    },
    {
        icon: <Layers className="h-8 w-8 text-accent" />,
        title: "Platform as a Service (PaaS) for Development & Operations",
        description: "A ready-to-use environment for developing, deploying, and managing your applications without worrying about the underlying infrastructure.",
        points: [
            "Managed Application Runtime Environments",
            "Container Orchestration (e.g., Kubernetes)",
            "Serverless Computing Functions",
            "Message Queues & Caching Layers (Redis)",
            "Automated CI/CD Pipelines"
        ]
    },
    {
        icon: <CloudCog className="h-8 w-8 text-accent" />,
        title: "Software as a Service (SaaS) - Open-Source Focus",
        description: "Ready-to-use business applications delivered over the internet, leveraging powerful open-source alternatives to eliminate licensing fees.",
        points: [
            "Office Productivity & Collaboration Suites",
            "Secure Communication (Email, Chat, Video)",
            "Open-Source CRM & ERP Systems",
            "Managed Website & E-commerce Hosting"
        ]
    }
];

const whyUsPoints = [
    "Cost Optimization: Through intelligent resource management, automated scaling, and ongoing audits, we ensure you pay only for what you use, optimizing your cloud spending.",
    "Multi-Cloud Agnostic Approach: While focused on open source, our expertise spans leading cloud providers, offering flexibility and helping you avoid vendor lock-in.",
    "Dedicated Expert Support: Our team of cloud engineers and open-source specialists provides 24/7 proactive monitoring and rapid response to any issues, acting as your dedicated IT support."
];


export default function CloudManagementPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Comprehensive Cloud Management
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Are you looking to transition to a flexible, cost-effective, and license-free environment? We provide complete cloud hosting and management services, built on powerful open-source technologies to eliminate complexity and high costs.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {corePrinciples.map((service, index) => (
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
                  <h2 className="text-3xl font-bold font-headline">Your Complete IT Department in the Cloud</h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    We offer full lifecycle management of your IT operations, leveraging Infrastructure (IaaS), Platform (PaaS), and Software (SaaS) models. Our services are powered by robust, secure, and scalable open-source technologies, allowing you to focus purely on growing your business without the IT burden.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-12'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Our All-Inclusive Cloud Services
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                       From foundational infrastructure to ready-to-use applications, we manage every layer of your technology stack with expertise and care.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {serviceTiers.map((tier, index) => (
                        <Card key={index} className="flex flex-col">
                           <CardHeader className="items-center text-center">
                                {tier.icon}
                                <CardTitle className="font-headline text-xl mt-4">{tier.title}</CardTitle>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2">
                                    {tier.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">The UhurU Advantage: More Than Just Hosting</CardTitle>
                  <CardDescription>
                    By choosing our services, your business gains a complete IT partner in the cloud, built on principles that prioritize your success.
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
                      <strong>Ready to innovate without the complexities of traditional infrastructure?</strong> Let us be your trusted partner in managing your entire IT landscape, allowing you to innovate and grow with confidence.
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
