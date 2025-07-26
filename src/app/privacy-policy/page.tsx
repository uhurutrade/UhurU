import SubPageHeader from '@/components/uhuru/subpage-header';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 11, 2024";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Privacy Policy</h1>
          </div>

          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            This Privacy Policy outlines how Uhuru Trade Ltd. ("we", "our", or "us") collects, uses, discloses, and protects your personal data when you use our website (the "Website"). We are committed to protecting your privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
          <p>
            Uhuru Trade Ltd. is a registered company in the United Kingdom, company number 15883242, with its registered office at Unit 13 Freeland Park Wareham Road, Lytchett Matravers, BH16 6FA Poole, UK.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Who we are</h2>
          <p>Our website address is: <Link href="/" className="underline hover:text-foreground">https://uhurutrade.com</Link>.</p>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. What data we collect and why</h2>
          
          <h3 className="mt-6 text-xl font-semibold text-foreground">Comments</h3>
          <p>
            When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
          </p>
          <p>
            An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Media</h3>
          <p>
            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Cookies</h3>
          <p>
            If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
          </p>
          <p>
            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
          </p>
          <p>
            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
          </p>
          <p>
            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Embedded content from other websites</h3>
          <p>
            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
          </p>
          <p>
            These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Who we share your data with</h2>
          <p>
            If you request a password reset, your IP address will be included in the reset email. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. How long we retain your data</h2>
          <p>
            If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
          </p>
          <p>
            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. What rights you have over your data</h2>
          <p>
            Under the UK GDPR, you have various rights in relation to your personal data. These include the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request the correction of inaccurate personal data.</li>
            <li>Request the erasure of your personal data in certain circumstances.</li>
            <li>Object to the processing of your personal data.</li>
            <li>Request the restriction of processing of your personal data.</li>
            <li>Request the transfer of your personal data to another party.</li>
          </ul>
          <p>
            If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
          </p>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">7. Where your data is sent</h2>
          <p>
            Visitor comments may be checked through an automated spam detection service. Your data may be transferred to and stored at a destination outside the UK. Where we transfer your data outside the UK, we will ensure that appropriate safeguards are in place to protect your data in accordance with UK data protection laws.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">8. Contact Information</h2>
          <p>
            For any questions or requests regarding your data and privacy, please contact our Data Protection Officer at <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
