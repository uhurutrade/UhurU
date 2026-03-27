import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Oracle Fusion Redwood & Cookbook Services | UhurU',
  description: 'Specialized services for Oracle Fusion Redwood UI/UX and Cookbook-driven implementations. We specialize in modernizing Oracle Fusion Cloud for enhanced user productivity.',
};


const oracleServices = [
    {
        title: "Oracle Fusion Redwood UI Design",
        description: "We implement modern, user-centric interfaces using the Oracle Redwood design system, ensuring a consistent and premium experience across your Fusion applications."
    },
    {
        title: "Redwood Component Development",
        description: "We design and build custom VBCS and OIC components that follow Oracle's latest standards for visual consistency and performance."
    },
    {
        title: "Oracle Fusion Cookbook Standards",
        description: "Our development team strictly follows the official Oracle Fusion Cookbook to ensure your extensions are scalable, upgrade-safe, and easily maintainable."
    },
    {
        title: "Business Logic Automation",
        description: "We leverage Oracle Integration (OIC) to create robust back-end logic that powers your Redwood-based front-end applications seamlessly."
    }
];

const coreOracleServices = [
    "Redwood Implementation & UI/UX Refresh: Modernize your Oracle Fusion Cloud experience with the Redwood design system to provide a fresh, intuitive interface for your users.",
    "Custom Component Development using VBCS: Design and build custom applications and extensions using Visual Builder Studio, fully integrated within the Oracle Fusion ecosystem.",
    "Cookbook-Driven Development: We follow the Oracle Fusion Development Cookbook to guarantee that every customization is built using best practices and certified patterns.",
    "Advanced Integration with OIC: Connect your Fusion Cloud environment with external systems using Oracle Integration (OIC) while maintaining a unified Redwood user experience.",
    "Performance & UX Optimization: We analyze your current Oracle environment and optimize Redwood components to ensure high performance and maximum user adoption.",
    "Strategic Redwood Adoption Roadmap: We help you plan and execute the transition from classic UI to Redwood, minimizing disruption and maximizing business value."
];

const functionalRedwoodList = [
    "Redwood UX Design Principles & Patterns",
    "Oracle Visual Builder Studio (VBCS) Application Design",
    "Oracle Integration (OIC) for Business Processes",
    "Fusion Cloud Functional Setup Manager (FSM)",
    "Oracle Redwood Design System Guidelines",
    "Cookbook Implementation Patterns & Standards"
];

const technicalRedwoodList = [
    "Javascript (Oracle JET) Development",
    "VBCS / Visual Builder Studio Advanced Features",
    "Oracle Cloud Infrastructure (OCI) Services",
    "REST & SOAP API Architecture",
    "Advanced CSS for Redwood UI Extensions",
    "Visual Builder Add-in for Excel Integration"
];

export default function OracleServicesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <h1 className="flex justify-center mb-8">
                <Image 
                  src="/images/redwood-oracle-final.png" 
                  alt="Oracle Fusion Redwood & Cookbook" 
                  width={800} 
                  height={200}
                  className="h-auto w-auto max-w-[600px] md:max-w-[700px] mix-blend-screen"
                />
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Modernize your enterprise with the next generation of Oracle user experience. We specialize in Redwood implementation and development following official Cookbook standards.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {oracleServices.map((service, index) => (
                  <Card key={index} className="bg-card flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className='font-headline text-xl'>{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <Card className="bg-secondary/50 p-8 text-center">
                  <h2 className="text-3xl font-bold font-headline">The Future of Oracle Development</h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    Oracle Fusion Cloud is evolving, and the Redwood design system is at its core. By adopting Redwood and following the Oracle Development Cookbook, your organization can benefit from a unified, accessible, and high-performance user interface. Our team bridges the gap between traditional Oracle development and modern web technologies, ensuring your Fusion Cloud investment delivers the best possible experience for your employees and customers.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Core Oracle Services
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We provide end-to-end support for your Redwood transition, ensuring that every extension and integration meets the highest standards of the Oracle ecosystem.
                    </p>
                </div>
                
                <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                    {coreOracleServices.map((service, index) => (
                        <div key={index} className='flex items-start gap-3'>
                            <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{service}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Functional Expertise</CardTitle>
                  <CardDescription>
                    Understanding Redwood design patterns and business process alignment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {functionalRedwoodList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Technical Capabilities</CardTitle>
                  <CardDescription>
                    Advanced technical proficiency in the latest Oracle Cloud and Redwood stack.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {technicalRedwoodList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

             <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Choose our Oracle Services?</CardTitle>
                  <CardDescription>
                    We combine years of Oracle experience with deep knowledge of modern UX/UI trends and development standards.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Transitioning to Redwood and following the Oracle Cookbook isn't just about changing colors; it's about adopting a modern development philosophy. Our expertise ensures that your Fusion Cloud extensions are robust, user-friendly, and fully aligned with Oracle's future-facing architecture.</p>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Standard-Compliant Development:</span> We don't just build, we follow the Cookbook. This ensures that your customizations survive updates and remain supported by Oracle.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">User-Centric Focus:</span> Redwood is designed for people. We focus on creating interfaces that reduce clicks, improve clarity, and drive productivity.</p>
                  </div>
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to unlock the potential of Oracle Fusion Redwood?</strong> Contact us today to learn how our Cookbook-driven approach can modernize your business processes and provide a world-class user experience.
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
