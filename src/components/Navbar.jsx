'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sage/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-sage flex items-center justify-center p-2 text-sage transition-transform group-hover:scale-105">
              {/* Cat line art logo matching mockup */}
              <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.5 0-2.5-.8-3-1.5M12 14c1.5 0 2.5-.8 3-1.5M12 14v1.5m-3-7.5l-2-3.5L4 5.5l1.5 5C4.2 11.7 4 13.3 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-1.7-.2-3.3-1.5-4.5L20 5.5l-3 2-2-3.5m-6 3.5h.01m5.99 0h.01" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-sage block leading-none">
                CatAllergyGuide
              </span>
              <span className="text-[11px] font-medium text-sage/80 tracking-wide mt-1 block">
                Love Cats. Breathe Easy. Live Better.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-charcoal">
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-sage transition-colors py-2">
              <Link href="/hypoallergenic-breeds">Breeds</Link>
              <svg className="w-4 h-4 text-charcoal/60 group-hover:text-sage transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <Link href="/understanding-allergies" className="hover:text-sage transition-colors py-2">
              Allergy Guide
            </Link>

            <Link href="/best-products" className="hover:text-sage transition-colors py-2">
              Product Reviews
            </Link>

            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-sage transition-colors py-2">
              <Link href="/tools/breed-matcher">Tools</Link>
              <svg className="w-4 h-4 text-charcoal/60 group-hover:text-sage transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <Link href="/managing-allergies-at-home" className="hover:text-sage transition-colors py-2">
              Blog
            </Link>
          </nav>

          {/* Allergy Quiz CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/tools/allergy-quiz"
              className="bg-terracotta hover:bg-terracotta/90 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              Allergy Quiz
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-charcoal hover:text-sage hover:bg-beige transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-t border-sage/10 px-4 pt-4 pb-6 space-y-3">
          <Link href="/hypoallergenic-breeds" className="block py-2 text-base font-medium text-charcoal hover:text-sage">
            Breeds
          </Link>
          <Link href="/understanding-allergies" className="block py-2 text-base font-medium text-charcoal hover:text-sage">
            Allergy Guide
          </Link>
          <Link href="/best-products" className="block py-2 text-base font-medium text-charcoal hover:text-sage">
            Product Reviews
          </Link>
          <Link href="/tools/breed-matcher" className="block py-2 text-base font-medium text-charcoal hover:text-sage">
            Tools
          </Link>
          <Link href="/managing-allergies-at-home" className="block py-2 text-base font-medium text-charcoal hover:text-sage">
            Blog
          </Link>
          <div className="pt-2">
            <Link
              href="/tools/allergy-quiz"
              className="block w-full text-center bg-terracotta text-white font-semibold px-5 py-3 rounded-full shadow"
            >
              Allergy Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
