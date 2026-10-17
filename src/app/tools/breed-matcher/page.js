import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreedMatcher from '@/components/BreedMatcher';
import FAQAccordion from '@/components/FAQAccordion';
import breedsData from '@/data/breeds.json';

export const metadata = {
  title: 'Hypoallergenic Cat Breed Matcher — CatAllergyGuide',
  description:
    'Find low-allergen cat breeds that match your lifestyle, grooming availability, and household space. Science-backed comparisons of Fel d 1 evidence, shedding, and temperament.',
  robots: {
    index: false,
    follow: false,
  },
};

const MATCHER_FAQS = [
  {
    question: 'Are any cat breeds truly 100% hypoallergenic?',
    answer:
      'No. There is no scientifically verified 100% hypoallergenic cat breed. All cats produce Fel d 1—the primary allergen responsible for up to 95% of human feline allergies—in their saliva, sebaceous skin glands, and lacrimal glands. Breeds marketed as hypoallergenic either produce lower baseline concentrations of Fel d 1 (biological reduction) or shed fewer dander-coated hairs into household air (mechanical reduction).',
  },
  {
    question: 'Why do some allergic people tolerate Siberian cats better?',
    answer:
      'Peer-reviewed genetic investigations have documented mutations in the Ch1 and Ch2 genes of certain Siberian cat lines, causing lower salivary Fel d 1 concentrations. However, protein output varies dramatically from individual cat to individual cat within the breed. Some Siberians produce very low concentrations, while others produce standard domestic levels.',
  },
  {
    question: 'Does a hairless cat like the Sphynx produce less Fel d 1?',
    answer:
      'No. The Sphynx produces normal baseline levels of Fel d 1 protein in its saliva and sebaceous glands. Because Sphynx cats lack fur, they do not shed hair into the air or onto furniture. However, allergen-rich sebum oils accumulate directly on their bare skin, which is why Sphynx cats require frequent, regular sponge baths to keep surface allergens in check.',
  },
  {
    question: 'How do coat density and shedding affect dander in the home?',
    answer:
      'When cats groom themselves, saliva dries onto the fur and sloughs off as microscopic airborne dander particles (under 5 microns in size). Dense double coats (such as the Russian Blue) trap dander close to the skin surface, whereas short, sparse curly coats (such as the Devon Rex) minimize loose hair dispersion. Both mechanisms reduce the volume of airborne dander circulating through living spaces.',
  },
  {
    question: 'Can choosing a hypoallergenic breed replace clinical allergy treatment?',
    answer:
      'No. Choosing a low-shedding or lower-allergen breed is only one component of managing feline allergies. Highly sensitive individuals, especially those with asthma or lower airway hyperreactivity, often require a layered protocol combining True HEPA air filtration, allergen-neutralizing feline nutrition, and medical guidance from a board-certified allergist.',
  },
];

export default function BreedMatcherPage() {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Breed Matcher',
        item: 'https://catallergyguide.com/tools/breed-matcher',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MATCHER_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            <Link href="/tools" className="hover:text-sage transition-colors">
              Tools
            </Link>
            <span>/</span>
            <span className="text-sage font-medium" aria-current="page">
              Breed Matcher
            </span>
          </nav>

          {/* Editorial Intro Shell (~250 words) */}
          <header className="max-w-3xl space-y-5">
            <span className="inline-block bg-terracotta text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              Interactive Breed Assessment
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight">
              Hypoallergenic Cat Breed Matcher
            </h1>
            
            <div className="space-y-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              <p>
                For individuals with feline allergies, discovering a compatible cat breed requires separating commercial marketing from biological immunology. In human medicine, cat allergies are driven primarily by <strong>Fel d 1</strong>—a potent 35-kilodalton secretoglobin protein synthesized in feline sebaceous skin glands, salivary glands, and lacrimal ducts. When cats groom, saliva coats their fur; as it dries, microscopic dander particles detach and remain suspended in ambient indoor air for hours.
              </p>
              <p>
                Crucially, <strong>no cat breed is 100% allergen-free</strong>. Genuine hypoallergenic compatibility operates through two distinct scientific mechanisms: <em>biological reduction</em>, where genetic mutations in select breeds like the Siberian produce fewer micrograms of Fel d 1 per gram of saliva; and <em>mechanical reduction</em>, where coat architecture—such as the dense double fur of the Russian Blue or the minimal undercoat of the Devon Rex—reduces airborne hair and dander dispersion throughout living quarters.
              </p>
              <p>
                Our interactive Breed Matcher pairs your household dynamics, available weekly grooming time, living square footage, and budget against verified breed profiles. Answer the six diagnostic questions below to evaluate which feline companions offer the best lifestyle and allergen match for your home.
              </p>
            </div>
          </header>

          {/* Client Wizard Component */}
          <section aria-label="Interactive Breed Matcher Tool">
            <BreedMatcher />
          </section>

          {/* Server-Rendered Comparison Table of All Breeds */}
          <section className="bg-cream border border-charcoal/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="inline-block bg-sage/20 text-sage text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Complete Breed Database
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                Hypoallergenic Cat Breeds Comparison Table
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 max-w-3xl">
                Review the core diagnostic traits, coat dynamics, grooming burdens, and scientific Fel d 1 evidence levels for all verified breeds in our catalog.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-charcoal/15 bg-beige/60 text-charcoal font-serif font-bold">
                    <th scope="col" className="py-3.5 px-4">Breed</th>
                    <th scope="col" className="py-3.5 px-4">Coat Architecture</th>
                    <th scope="col" className="py-3.5 px-4">Shedding</th>
                    <th scope="col" className="py-3.5 px-4">Grooming Need</th>
                    <th scope="col" className="py-3.5 px-4">Energy</th>
                    <th scope="col" className="py-3.5 px-4">Fel d 1 Evidence</th>
                    <th scope="col" className="py-3.5 px-4">In-Depth Guide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/10 text-charcoal/85">
                  {breedsData.map((breed) => {
                    let evidenceBadge = 'bg-stone-100 text-charcoal/70';
                    let evidenceLabel = 'Anecdotal';
                    if (breed.evidence === 'limited') {
                      evidenceBadge = 'bg-blue-50 text-blue-800';
                      evidenceLabel = 'Limited Studies';
                    } else if (breed.evidence === 'unsupported') {
                      evidenceBadge = 'bg-red-50 text-red-800';
                      evidenceLabel = 'Unsupported';
                    }

                    return (
                      <tr key={breed.id} className="hover:bg-beige/40 transition-colors">
                        <td className="py-4 px-4 font-bold text-charcoal font-serif text-base">
                          {breed.name}
                        </td>
                        <td className="py-4 px-4 capitalize">
                          {breed.coat.replace(/-/g, ' ')}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">{breed.shedding}</span> / 5
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">{breed.grooming}</span> / 5
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">{breed.energy}</span> / 5
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${evidenceBadge}`}>
                            {evidenceLabel}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/breeds/${breed.contentSlug}`}
                            className="text-terracotta hover:underline font-semibold text-xs sm:text-sm inline-flex items-center gap-1"
                          >
                            <span>Read Guide</span>
                            <span>→</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Methodology & Sources Section */}
          <section className="bg-beige/50 border border-charcoal/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="space-y-3">
              <span className="inline-block bg-charcoal/10 text-charcoal text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                Scientific Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                Evaluation Methodology & Research Sources
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-charcoal/80 leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-charcoal">
                  How We Assess Hypoallergenic Mechanisms
                </h3>
                <p>
                  Our scoring framework categorizes hypoallergenic attributes into verified biochemical traits versus physical coat dynamics. Biological low-allergen designations require peer-reviewed documentation of lower mean salivary Fel d 1 secretoglobin output compared to standard domestic cat baselines.
                </p>
                <p>
                  Mechanical dander reduction is scored based on coat density, hair shedding index, and sebum production. Breeds with reduced shedding (like the Devon Rex) or dander-trapping double coats (like the Russian Blue) receive mechanical advantages for airborne particle reduction, though their baseline salivary protein secretion remains standard.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-charcoal">
                  Veterinary Immunology Sources & Standards
                </h3>
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
                  <li>
                    <strong>Satyaraj et al. (2019):</strong> <em>Anti-Fel d 1 antibodies and salivary allergen neutralization</em>, Journal of Feline Medicine and Surgery.
                  </li>
                  <li>
                    <strong>Bonnet et al. (2018):</strong> <em>An update on molecular cat allergens: Fel d 1 through Fel d 8</em>, Allergy, Asthma & Clinical Immunology.
                  </li>
                  <li>
                    <strong>American Academy of Allergy, Asthma & Immunology (AAAAI):</strong> Clinical position statements on indoor pet allergen management and human bronchial reactivity.
                  </li>
                  <li>
                    <strong>Cat Fanciers’ Association (CFA) & TICA:</strong> Breed standard conformation, coat architecture definitions, and grooming care indices.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section aria-label="Frequently Asked Questions">
            <FAQAccordion faqs={MATCHER_FAQS} />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
