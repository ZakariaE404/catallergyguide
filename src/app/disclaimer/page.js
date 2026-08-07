import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer — CatAllergyGuide',
  description: 'Important disclaimers regarding medical advice, affiliate links, and content accuracy on CatAllergyGuide.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-grow py-10 md:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sage font-medium" aria-current="page">Disclaimer</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight">
              Disclaimer
            </h1>
            <p className="mt-4 text-charcoal/70 text-sm">Last updated: August 7, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed prose-headings:font-serif prose-headings:text-charcoal prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-a:text-terracotta hover:prose-a:underline">

            <p>
              The information provided on CatAllergyGuide (&quot;the Site&quot;) is for general informational
              and educational purposes only. By using this Site, you acknowledge and agree to the following terms.
            </p>

            <h2>1. Not Medical Advice</h2>
            <p>
              The content on this Site is <strong>not</strong> intended to be a substitute for professional
              medical advice, diagnosis, or treatment. Always seek the advice of your physician, allergist,
              or other qualified healthcare provider with any questions you may have regarding a medical
              condition, including cat allergies.
            </p>
            <p>
              Never disregard professional medical advice or delay seeking it because of something you have
              read on CatAllergyGuide. If you think you may have a medical emergency, call your doctor or
              emergency services immediately.
            </p>

            <h2>2. Not Veterinary Advice</h2>
            <p>
              Information about cat breeds, cat health, diet, and grooming is provided for informational
              purposes only and should not replace professional veterinary care. Consult a licensed
              veterinarian for any concerns about your cat&apos;s health or well-being.
            </p>

            <h2>3. Affiliate Disclosure</h2>
            <p>
              CatAllergyGuide participates in affiliate marketing programs, which means we may earn
              commissions on purchases made through links on this Site. This includes, but is not
              limited to, the Amazon Associates Program.
            </p>
            <p>
              Our affiliate relationships do <strong>not</strong> influence our editorial content or
              product recommendations. We only recommend products we believe provide genuine value
              to allergy-sensitive cat owners. The price you pay is the same whether or not you use
              our affiliate links.
            </p>

            <h2>4. Product Reviews and Recommendations</h2>
            <p>
              Product reviews, ratings, and recommendations on this Site reflect our honest opinions
              based on research and, where applicable, personal experience. However:
            </p>
            <ul>
              <li>Individual results may vary based on personal sensitivity, environment, and usage</li>
              <li>Product specifications, pricing, and availability may change without notice</li>
              <li>We cannot guarantee the accuracy of third-party product claims</li>
              <li>Always read product labels, instructions, and manufacturer guidelines before use</li>
            </ul>

            <h2>5. Accuracy of Information</h2>
            <p>
              While we strive to provide accurate, up-to-date, and well-researched information, we make
              no representations or warranties of any kind, express or implied, about the completeness,
              accuracy, reliability, or suitability of the information contained on this Site.
            </p>
            <p>
              Medical and scientific understanding of cat allergies continues to evolve. Information
              that was accurate at the time of publication may become outdated. We encourage readers
              to verify critical information with qualified professionals.
            </p>

            <h2>6. External Links</h2>
            <p>
              This Site may contain links to external websites that are not operated by us. We have no
              control over the content, privacy policies, or practices of third-party sites and accept
              no responsibility for them. Following external links is at your own risk.
            </p>

            <h2>7. &quot;Hypoallergenic&quot; Claims</h2>
            <p>
              When we refer to certain cat breeds as &quot;hypoallergenic,&quot; we mean they are
              generally reported to produce fewer allergens (particularly the Fel d 1 protein) compared
              to average cats. <strong>No cat breed is 100% hypoallergenic.</strong> Individual cats
              within any breed may produce varying levels of allergens, and individual human sensitivity
              varies widely. We strongly recommend spending time with a specific cat before adopting to
              assess your personal reaction.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall CatAllergyGuide, its owners, authors, or contributors be liable for
              any loss or damage (including, without limitation, indirect or consequential loss or
              damage, personal injury, or any damages arising from loss of data or profits) arising
              out of or in connection with the use of this Site.
            </p>

            <h2>9. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update or modify this Disclaimer at any time without prior notice.
              Changes will be effective immediately upon posting to this page. Your continued use of the
              Site constitutes acceptance of any changes.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Disclaimer, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> hello@catallergyguide.com
            </p>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
