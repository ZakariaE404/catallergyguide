import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import AllergyQuiz from '@/components/AllergyQuiz';
import { validateQuizData } from '@/lib/validateQuizData';
import quizData from '@/data/allergy-quiz-data.json';

// Execute build-time slug validation (fails build if any slug is missing)
validateQuizData(quizData);

export const metadata = {
  title: 'Cat Allergy Severity Quiz: Test Your Sensitivity Level — CatAllergyGuide',
  description: 'Take our 7-question interactive cat allergy severity quiz to evaluate your symptom intensity, assess respiratory risk, and discover tailored breed and management steps.',
  openGraph: {
    title: 'Cat Allergy Severity Quiz: Test Your Sensitivity Level | CatAllergyGuide',
    description: 'Assess your feline allergy severity tier, check for respiratory red flags, and get personalized breed and home recommendations.',
    url: 'https://catallergyguide.com/tools/allergy-quiz',
    siteName: 'CatAllergyGuide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Allergy Severity Quiz: Test Your Sensitivity Level',
    description: 'Interactive self-assessment for cat allergy sufferers: identify your severity tier and personalized next steps.',
  },
};

const QUIZ_FAQS = [
  {
    question: 'How does this allergy quiz calculate my sensitivity score?',
    answer: 'The quiz evaluates your reactions across key physiological indicators: exposure onset speed, nasal congestion, ocular irritation, respiratory discomfort, skin contact sensitivity, and medication responsiveness. Points from scored questions are summed into three clinically informed tiers (Mild, Moderate, or High sensitivity). Any indication of wheezing or breathing difficulty immediately triggers a dedicated medical consultation alert.',
  },
  {
    question: 'Why is wheezing or trouble breathing treated as a red-flag condition?',
    answer: 'Microscopic Fel d 1 allergen particles are extraordinarily small (less than 5 microns), enabling them to bypass upper nasal filters and penetrate deep into pulmonary bronchioles. In sensitized individuals, this triggers bronchospasms and airway constriction characteristic of allergic asthma. Because lower respiratory reactions require professional clinical care or prescription inhalers, commercial product recommendations are strictly withheld in favor of immediate physician consultation.',
  },
  {
    question: 'Can a mild cat allergy worsen over time?',
    answer: 'Yes. Allergic sensitization can intensify with chronic, unmitigated exposure. If airborne dander levels remain consistently high in a home without air purification or bedroom sanctuaries, baseline immune inflammation can escalate, potentially progressing mild nasal sniffling into chronic sinusitis or feline-induced asthma.',
  },
  {
    question: 'Does a low score mean I will have zero symptoms with a hypoallergenic cat?',
    answer: 'No cat is 100% hypoallergenic. While breeds like Siberians, Balinese, and Russian Blues naturally secrete lower baseline quantities of Fel d 1 protein, individual allergen output fluctuates based on hormones, genetics, and age. We strongly recommend scheduling in-person visits with adult cats or reputable breeders before committing to adoption.',
  },
  {
    question: 'How does this quiz differ from clinical medical allergy testing?',
    answer: 'This quiz is an educational screening tool based on self-reported symptom patterns. Clinical medical testing—such as a percutaneous skin prick test (SPT) or specific IgE blood test—directly measures your biological antibody titers to feline proteins under the supervision of a board-certified allergist.',
  },
];

export default function AllergyQuizPage() {
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
        name: 'Cat Allergy Severity Quiz',
        item: 'https://catallergyguide.com/tools/allergy-quiz',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUIZ_FAQS.map((faq) => ({
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
      {/* Structured Data: BreadcrumbList & FAQPage */}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60 overflow-x-auto" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors flex-shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-sage transition-colors flex-shrink-0">
              Tools
            </Link>
            <span>/</span>
            <span className="text-sage font-medium truncate" aria-current="page">
              Cat Allergy Severity Quiz
            </span>
          </nav>

          {/* Page Shell Header & ~250-word Editorial Intro */}
          <header className="space-y-6">
            <div className="space-y-3">
              <span className="inline-block bg-terracotta text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                Interactive Assessment Tool
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal leading-tight">
                Cat Allergy Severity Quiz: Test Your Sensitivity Level
              </h1>
            </div>

            {/* ~250-Word Editorial Introduction with Natural Internal Links */}
            <div className="prose prose-charcoal max-w-none text-base sm:text-lg text-charcoal/85 leading-relaxed space-y-4">
              <p>
                Living with cat allergies is rarely an all-or-nothing proposition. While one person may experience nothing more than an occasional dry sniffle after an afternoon spent grooming their pet, another can face sudden eyelid swelling, intense skin hives, or debilitating sinus headaches within thirty minutes of walking into a cat-occupied apartment. Understanding where your immune system sits on this biological spectrum is essential before bringing a new pet into your home or purchasing environmental management supplies.
              </p>
              <p>
                Contrary to common folklore, cat fur itself does not cause allergic reactions. The true culprit is the microscopic <Link href="/allergy-guide/what-causes-cat-allergies" className="font-semibold text-sage underline hover:text-sage/80 transition-colors">Fel d 1 protein</Link>, an airborne allergen secreted naturally in feline saliva, sebaceous skin glands, and urine. Because these protein particles measure less than five microns in diameter, they float effortlessly through household air currents and settle deeply into carpets, curtains, and furniture upholstery for months after a feline leaves the premises.
              </p>
              <p>
                By recognizing the specific patterns of your <Link href="/allergy-guide/cat-allergy-symptoms" className="font-semibold text-sage underline hover:text-sage/80 transition-colors">cat allergy symptoms</Link>—and distinguishing mild mucosal irritation from lower airway inflammation—you can make informed decisions about bedroom sanctuaries, HEPA filtration, low-allergen cat breeds, or scheduling formal <Link href="/allergy-guide/cat-allergy-testing" className="font-semibold text-sage underline hover:text-sage/80 transition-colors">clinical allergy testing</Link> with a board-certified physician. Complete this quick 7-question assessment below to calculate your personal severity rating and receive tailored recommendations.
              </p>
            </div>

            {/* Prominent Visible Medical Disclaimer */}
            <div className="not-prose bg-amber-50/80 border-l-4 border-amber-500 rounded-r-2xl p-4 sm:p-5 shadow-2xs">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <span className="font-bold">Medical Disclaimer:</span> This interactive assessment is designed solely for informational and educational purposes. It does not provide medical diagnoses, treatment recommendations, or clinical advice. If you experience wheezing, shortness of breath, or persistent respiratory constriction, consult a licensed physician or board-certified allergist immediately.
                </div>
              </div>
            </div>
          </header>

          {/* Interactive Client Quiz Component */}
          <section aria-label="Interactive Cat Allergy Severity Assessment">
            <AllergyQuiz />
          </section>

          {/* FAQ Accordion Section with FAQPage Schema */}
          <section className="pt-6 border-t border-charcoal/10" aria-label="Frequently Asked Questions">
            <FAQAccordion faqs={QUIZ_FAQS} />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
