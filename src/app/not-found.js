import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page Not Found — CatAllergyGuide',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-beige rounded-3xl p-8 sm:p-12 text-center border border-charcoal/5 shadow-sm space-y-6">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-cream border-2 border-sage flex items-center justify-center p-3 text-sage">
            <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.5 0-2.5-.8-3-1.5M12 14c1.5 0 2.5-.8 3-1.5M12 14v1.5m-3-7.5l-2-3.5L4 5.5l1.5 5C4.2 11.7 4 13.3 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-1.7-.2-3.3-1.5-4.5L20 5.5l-3 2-2-3.5" />
            </svg>
          </div>

          <div className="space-y-3">
            <span className="text-terracotta font-serif font-bold text-5xl sm:text-6xl block">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
              Oops! Page Not Found
            </h1>
            <p className="text-charcoal/75 text-base leading-relaxed max-w-md mx-auto">
              It seems this page has wandered off like a curious cat. Let's get you back to safety.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
