'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-sage text-cream overflow-hidden pt-16 pb-8">
      {/* Decorative Leaf Watermark on bottom right */}
      <div className="absolute right-0 bottom-0 w-80 h-80 opacity-15 pointer-events-none transform translate-x-1/4 translate-y-1/4">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 0 C120 40 160 80 200 100 C160 120 120 160 100 200 C80 160 40 120 0 100 C40 80 80 40 100 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="md:col-span-5 space-y-4 pr-md-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="h-10 w-auto transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="CatAllergyGuide Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                CatAllergyGuide
              </span>
            </Link>

            <p className="text-cream/80 text-sm max-w-sm leading-relaxed">
              Helping allergy-sensitive cat lovers build happier, healthier homes — one purr at a time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans font-bold text-lg text-cream tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-medium">
              <li><Link href="/" className="hover:text-cream hover:underline transition-colors">Home</Link></li>
              <li><Link href="/breeds" className="hover:text-cream hover:underline transition-colors">Breeds</Link></li>
              <li><Link href="/allergy-guide" className="hover:text-cream hover:underline transition-colors">Allergy Guide</Link></li>
              <li><Link href="/product-reviews" className="hover:text-cream hover:underline transition-colors">Product Reviews</Link></li>
              <li><Link href="/tools" className="hover:text-cream hover:underline transition-colors">Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-sans font-bold text-lg text-cream tracking-wide">
              Newsletter
            </h3>
            <p className="text-cream/80 text-sm leading-relaxed">
              Helpful tips and resources—straight to your inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-lg bg-cream text-charcoal placeholder-charcoal/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="border-t border-cream/20 pt-6 text-center text-xs text-cream/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 CatAllergyGuide. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:underline hover:text-cream">Privacy Policy</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline hover:text-cream">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
