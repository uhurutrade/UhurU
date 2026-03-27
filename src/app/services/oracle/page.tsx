import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'Oracle Fusion Redbook- & Cookbook Services | UhurU',
  description: 'Specialized enterprise services for Oracle Fusion Redbook- UI/UX and Cookbook-driven implementations. Expert technical and functional consulting for Financials and across all Oracle Cloud modules.',
};


const oracleServices = [
    {
        title: "FIN & SCM Transformation",
        description: "Specialized functional orchestration of General Ledger, Procurement, and Supply Chain modules using native Redbook- patterns for maximum business value."
    },
    {
        title: "VBCS & OIC Extensions",
        description: "Advanced development in Visual Builder Studio and Oracle Integration Cloud to build custom extensions that feel and behave like native Fusion applications."
    },
    {
        title: "Bespoke Technical Development",
        description: "End-to-end delivery of custom-tailored solutions and complex technical orchestrations designed specifically to solve unique organizational challenges."
    },
    {
        title: "Cookbook Standards Compliance",
        description: "Strict enforcement of Oracle Development Cookbook patterns, ensuring all code is standard-compliant, 100% upgrade-safe, and future-proof."
    },
    {
        title: "All-Module Functional Support",
        description: "Expert advisory and technical support across the entire Oracle Fusion ecosystem, including HCM, CX, Projects, and Cost Management."
    },
    {
        title: "Proprietary Infrastructure Testing",
        description: "Validation of complex integrations in our isolated sandboxes. We pre-test quarterly updates to ensure zero risk during production deployment."
    }
];

const functionalExpertiseList = [
    "Functional Mastery in FIN & SCM (Supply Chain)",
    "Full-suite support for all Oracle Modules (HCM, CX, Projects)",
    "Bespoke, custom-tailored development & extensions",
    "General Ledger (GL) & SLA Customization",
    "P2P and O2C Redbook- Workflow Orchestration",
    "Pre-release testing of Oracle quarterly updates"
];

const technicalExpertiseList = [
    "Visual Builder Cloud Service (VBCS) & VBS",
    "Oracle Integration Cloud (OIC) & REST APIs",
    "Oracle JET (Javascript Extension Toolkit)",
    "Oracle Development Cookbook Patterns",
    "OTBI & BI Publisher Redbook- Templates",
    "Advanced CSS & Oracle Redbook- Branding"
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
                  alt="Oracle Fusion Redbook- & Cookbook" 
                  width={800} 
                  height={200}
                  priority
                  className="h-auto w-auto max-w-[85vw] md:max-w-[600px] lg:max-w-[700px] dark:invert-0 invert transition-all duration-300"
                />
              </h1>
              <p className="mx-auto mt-4 max-w-4xl text-lg text-muted-foreground">
                Mastering the full Oracle Fusion stack with functional excellence in <strong className="text-foreground">FIN & SCM</strong>. We provide end-to-end support for all modules while delivering bespoke, custom-tailored developments built to the highest technical standards.
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
              <Card className="bg-secondary/50 p-8 text-center border-accent/20 border">
                  <h2 className="text-3xl font-bold font-headline text-accent">Proprietary Testing Infrastructure</h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    At UhurU, we operate our own private Oracle Fusion sandboxes and testing environments. This allows our team to prototype complex Redbook- components and OIC integrations in a secure, isolated environment. We validate every technical solution and pre-test Oracle quarterly updates before they ever touch your production environment, ensuring zero disruption to your business cycles.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        The Oracle Development Cookbook Advantage
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        By strictly adhering to the Oracle Development Cookbook, we eliminate technical debt. Every VBCS component and integration is built using certified patterns, guaranteeing that your system remains 100% upgrade-safe and ultra-performant.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Functional Mastery & All-Module Support</CardTitle>
                  <CardDescription>
                    Deep functional expertise in FIN & SCM, with total support for the entire Oracle Fusion ecosystem and bespoke development.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {functionalExpertiseList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Advanced Technical Stack</CardTitle>
                  <CardDescription>
                    Proficiency in the specialized tools required for modern Oracle Fusion Cloud development.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {technicalExpertiseList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="bg-card shadow-lg border-accent/20 border-2">
                <CardHeader className="bg-secondary/10 p-8 md:p-12 border-b border-accent/10">
                  <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-accent">Redbook-The New Oracle Standard</CardTitle>
                  <CardDescription className="text-lg mt-4 text-foreground/80 leading-relaxed font-medium">
                    Redbook- is not just a UI update; it represents the <strong className="text-foreground">most significant paradigm shift</strong> in Oracle's 40-year history. It replaces the aging Java/ADF architecture with a <strong className="text-foreground">Consumer-Grade experience</strong> powered by native Oracle JET.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12 space-y-10">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold font-headline">The Standard for Modern Enterprise</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Legacy Oracle Cloud UIs were primarily designed for data entry on desktops. Redbook- is <strong className="text-foreground">Mobile-Native and AI-Centric</strong>, built to anticipate user needs rather than just reacting to inputs.
                        </p>
                        <p className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 font-medium">
                            Studies show that a correct Redbook- implementation leads to an <strong className="text-accent">80% reduction in complex task completion times</strong> through intelligent automation.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground"><span className="font-bold text-foreground">AI-Native Navigation</span> Redbook- natively integrates <strong className="text-foreground">Machine Learning</strong> to suggest resolutions for exceptions before they become bottlenecks.</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground"><span className="font-bold text-foreground">Zero-Disruption Migration</span> Built on <strong className="text-foreground">JET architecture</strong>, ensuring your customizations are decoupled and 100% safe for all future quarterly updates.</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground"><span className="font-bold text-foreground">Unified Workflow</span> A single, <strong className="text-foreground">perfectly consistent experience</strong> across Financials, SCM, and HCM, reducing organizational training costs by over 50%.</p>
                        </div>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-accent/10 text-center">
                    <p className="text-xl font-bold text-accent/80 font-headline md:whitespace-nowrap">
                        "Redbook- transforms enterprise software from a chore into a high-performance asset."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

             <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Partner With UhurU for Redbook?</CardTitle>
                  <CardDescription>
                    We deliver more than just technology. We deliver clarity, efficiency, and a strategic foundation for growth.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Choosing the right partner for your Redbook- transition is critical. Our specialized experience in the Oracle ecosystem, combined with a background in senior financial management and our unique proprietary testing infrastructure, ensures we deliver solutions that provide real business value. We understand the challenges of complex, multi-national implementations and ensure a seamless, upgrade-safe transition.</p>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Zero-Risk Prototyping</span> Test complex solutions in our private infrastructure before production deployment.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Cookbook Perfection</span> Strict adherence to Oracle standards prevents technical debt and ensures future-proof systems.</p>
                  </div>
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to modernize your operations?</strong> Contact us today to discover how our deep Oracle Redbook- expertise and unique testing infrastructure can provide the robust financial backbone needed to scale with confidence.
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
