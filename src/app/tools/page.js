import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Cat Allergy Tools & Interactive Resources — CatAllergyGuide',
  description: 'Explore interactive cat allergy severity assessments, breed matching tools, and expert guides to manage feline allergies effectively.',
  openGraph: {
    title: 'Cat Allergy Tools & Interactive Resources | CatAllergyGuide',
    description: 'Explore interactive cat allergy assessments, breed matching tools, and expert resources.',
    url: 'https://catallergyguide.com/tools',
    siteName: 'CatAllergyGuide',
    type: 'website',
  },
};

export default function ToolsHubPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://catallergyguide.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://catallergyguide.com/tools',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-grow py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-sage font-medium" aria-current="page">
              Tools
            </span>
          </nav>

          {/* Hub Header with ~150 words of real editorial copy */}
          <header className="max-w-3xl space-y-4">
            <span className="inline-block bg-terracotta text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              Interactive Resources
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight">
              Cat Allergy Tools & Interactive Resources
            </h1>
            <div className="space-y-3 text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              <p>
                Managing feline allergies begins with understanding your individual physiological sensitivity. Cat allergies are primarily triggered by Fel d 1, an airborne salivary protein that spreads silently across household surfaces and fabrics. Because immune sensitivity varies dramatically—from mild ocular itching to acute bronchial airway constriction—our interactive tools are built to help cat lovers assess their personal reaction profiles and choose realistic, evidence-based management paths.
              </p>
              <p>
                Whether you are currently living with a cat and need multi-layered dander mitigation protocols, or preparing to adopt and exploring genetically lower-Fel d 1 breeds, our diagnostic assessments pair your reported symptoms with actionable advice. Use our tools below to benchmark your sensitivity tier, discover compatible cat breeds, and learn when professional clinical allergist care is recommended.
              </p>
            </div>
          </header>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tool 1: Allergy Severity Quiz */}
            <div className="bg-beige rounded-3xl p-7 sm:p-9 border border-charcoal/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-sage border border-sage/20 shadow-xs">
                  <svg className="w-9 h-9 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-sage/15 text-sage text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      Interactive Assessment
                    </span>
                    <span className="text-xs text-charcoal/50">• 7 Questions</span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-charcoal">
                    Cat Allergy Severity Quiz
                  </h2>

                  <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
                    Evaluate your symptom intensity across exposure speed, nasal rhinitis, eye irritation, respiratory discomfort, and skin sensitivity. Receive an immediate tier assessment and tailored recommendations.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/tools/allergy-quiz"
                  className="inline-block bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-xs"
                >
                  Take the Quiz →
                </Link>
              </div>
            </div>

            {/* Tool 2: Breed Matcher Tool */}
            <div className="bg-beige rounded-3xl p-7 sm:p-9 border border-charcoal/10 shadow-xs flex flex-col justify-between opacity-95">
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-sage/70 border border-sage/10 shadow-xs">
                  <svg className="w-9 h-9 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-charcoal/10 text-charcoal/60 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-charcoal">
                    Hypoallergenic Breed Matcher
                  </h2>

                  <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
                    An intelligent matching engine filtering cat breeds by Fel d 1 protein secretion, coat maintenance, household space, and family lifestyle requirements.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/tools/breed-matcher"
                  className="inline-block bg-charcoal/10 hover:bg-charcoal/20 text-charcoal/80 text-sm font-semibold px-7 py-3 rounded-full transition-colors"
                >
                  Coming Soon (Preview) →
                </Link>
              </div>
            </div>

          </div>

          {/* Educational Guides Section Linking ONLY to Existing Slugs */}
          <div className="bg-cream border border-sage/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-lg font-serif font-bold text-charcoal">
                Explore the Clinical Science Behind Cat Allergies
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Before purchasing products or visiting catteries, learn how Fel d 1 proteins circulate through indoor environments and discover clinical strategies to minimize allergic reactions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/allergy-guide/what-causes-cat-allergies"
                className="inline-block bg-sage hover:bg-sage/90 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors"
              >
                Fel d 1 Science →
              </Link>
              <Link
                href="/allergy-guide/cat-allergy-symptoms"
                className="inline-block bg-beige hover:bg-beige/80 text-charcoal font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors border border-charcoal/10"
              >
                Symptom Guide →
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
