
import SubPageHeader from '@/components/uhuru/subpage-header';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CookiePolicyPage() {
  const lastUpdated = "July 13, 2024";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground">
          <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Cookie Policy</h1>

          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            This Cookie Policy explains how Uhuru Trade Ltd. ("we", "our", or "us") uses cookies and similar technologies on our website <Link href="/" className="underline hover:text-foreground">https://uhurutrade.com</Link> (the "Website"). This policy should be read alongside our <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>. By using our Website, you consent to the use of cookies as described in this policy.
          </p>
          <p>
            Our company is Uhuru Trade Ltd., a company registered in the United Kingdom under company number 15883242. Our registered office is at Unit 13 Freeland Park Wareham Road, Lytchett Matravers, BH16 6FA Poole, UK.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies help us to recognise your device and remember information about your visit, like your preferences, settings, and how you use our website.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. How we use cookies</h2>
          <p>
            We use cookies for a variety of reasons, which are detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
          </p>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. The website cannot function properly without these cookies.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you make (such as your user name or the region you are in) and provide enhanced, more personal features. For instance, these cookies can be used to remember your theme preference (light/dark mode).
            </li>
            <li>
              <strong>Performance/Analytical Cookies:</strong> These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us to optimize our website and make it easier for you to navigate. These cookies don't collect information that identifies you. All information these cookies collect is aggregated and therefore anonymous.
            </li>
            <li>
              <strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver adverts more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns. They are usually placed by advertising networks with the website operator’s permission.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Cookies we use</h2>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cookie Type</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Strictly Necessary</TableCell>
                <TableCell>Essential for website navigation and core features like theme settings and chat widget functionality.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Performance</TableCell>
                <TableCell>We use analytical cookies (e.g., from Google Analytics) to understand how visitors interact with our website, helping us improve user experience. These are collected anonymously.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Functionality</TableCell>
                <TableCell>Used to remember your preferences, such as language or theme, to provide a more personalized experience.</TableCell>
              </TableRow>
            </TableBody>
          </Table>


          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. How to manage cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
          </p>
          <p>To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">www.allaboutcookies.org</a>.</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. Changes to this Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. We will let you know via a prominent notice on our Website, prior to the change becoming effective and update the "last updated" date at the top of this Cookie Policy.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">7. Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at: <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
