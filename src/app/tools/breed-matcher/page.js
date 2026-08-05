import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Breed Matcher Tool (Coming Soon) — CatAllergyGuide',
  description: 'Find hypoallergenic cat breeds that match your lifestyle and allergy needs.',
};

export default function BreedMatcherPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full bg-beige rounded-3xl p-8 sm:p-12 text-center border border-charcoal/5 shadow-sm space-y-6">
          
          <div className="w-20 h-20 mx-auto rounded-2xl bg-cream flex items-center justify-center text-sage border border-sage/10 shadow-xs">
            <svg className="w-10 h-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-3">
            <span className="inline-block bg-terracotta text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Tool Coming Soon
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
              Breed Matcher Tool
            </h1>

            <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              Find hypoallergenic cat breeds that fit your living space, grooming preferences, and sensitivity level.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-block bg-sage hover:bg-sage/90 text-cream font-semibold px-8 py-3 rounded-full transition-colors shadow-xs"
            >
              Return to Homepage
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
