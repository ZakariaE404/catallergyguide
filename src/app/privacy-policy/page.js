import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — CatAllergyGuide',
  description: 'Learn how CatAllergyGuide collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-grow py-10 md:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sage font-medium" aria-current="page">Privacy Policy</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-charcoal/70 text-sm">Last updated: August 7, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed prose-headings:font-serif prose-headings:text-charcoal prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-a:text-terracotta hover:prose-a:underline">

            <p>
              CatAllergyGuide (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{' '}
              <strong>catallergyguide.com</strong> (the &quot;Site&quot;). This Privacy Policy explains what
              information we collect, how we use it, and your rights regarding your data.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Newsletter Subscription:</strong> If you subscribe to our newsletter, we collect your email address.</li>
              <li><strong>Contact Forms:</strong> If you contact us, we may collect your name, email address, and message content.</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> We collect standard web analytics data including pages visited, time spent on pages, referring URLs, browser type, device type, and IP address.</li>
              <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your browsing experience and gather aggregated analytics. See our Cookie section below for details.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To deliver and improve our content and services</li>
              <li>To send newsletters and updates you have opted into</li>
              <li>To analyze website traffic and user behavior for content optimization</li>
              <li>To respond to your inquiries or support requests</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>3. Cookies and Tracking Technologies</h2>
            <p>
              We may use first-party and third-party cookies for analytics purposes (e.g., Google Analytics).
              These cookies help us understand how visitors interact with the Site. You can control cookie
              preferences through your browser settings. Disabling cookies may affect certain features of the Site.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>We may use the following third-party services:</p>
            <ul>
              <li><strong>Google Analytics</strong> — for website traffic analysis</li>
              <li><strong>Email Marketing Providers</strong> — for newsletter delivery</li>
              <li><strong>Affiliate Networks</strong> — some product links may be affiliate links (see our <Link href="/disclaimer">Disclaimer</Link> for details)</li>
            </ul>
            <p>
              These third parties have their own privacy policies governing how they use your data.
            </p>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>
              We do <strong>not</strong> sell, trade, or rent your personal information to third parties.
              We may share data only in the following circumstances:
            </p>
            <ul>
              <li>With service providers who assist in operating our Site (under strict confidentiality)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes outlined
              in this policy, or as required by law. You may request deletion of your data at any time.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to or restrict certain data processing</li>
              <li>Request data portability</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at the email provided below.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              The Site is not directed at children under 13. We do not knowingly collect personal information
              from children under 13. If we learn that we have collected such information, we will take steps
              to delete it promptly.
            </p>

            <h2>9. Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your
              information. However, no method of internet transmission or electronic storage is 100% secure.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with
              an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your personal data, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@catallergyguide.com
            </p>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
