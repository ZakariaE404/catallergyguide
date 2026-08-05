'use client';

import Link from 'next/link';

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
              <div className="w-10 h-10 rounded-full border-2 border-cream/80 flex items-center justify-center p-1.5 text-cream">
                <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.5 0-2.5-.8-3-1.5M12 14c1.5 0 2.5-.8 3-1.5M12 14v1.5m-3-7.5l-2-3.5L4 5.5l1.5 5C4.2 11.7 4 13.3 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-1.7-.2-3.3-1.5-4.5L20 5.5l-3 2-2-3.5" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                CatAllergyGuide
              </span>
            </Link>

            <p className="text-cream/80 text-sm max-w-sm leading-relaxed">
              Helping allergy-sensitive cat lovers build happier, healthier homes — one purr at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2 text-cream/90">
              <a href="#" className="hover:text-terracotta transition-colors p-1" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href="#" className="hover:text-terracotta transition-colors p-1" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              <a href="#" className="hover:text-terracotta transition-colors p-1" aria-label="Pinterest">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>

              <a href="#" className="hover:text-terracotta transition-colors p-1" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans font-bold text-lg text-cream tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-medium">
              <li><Link href="/" className="hover:text-cream hover:underline transition-colors">Home</Link></li>
              <li><Link href="/hypoallergenic-breeds" className="hover:text-cream hover:underline transition-colors">Breeds</Link></li>
              <li><Link href="/understanding-allergies" className="hover:text-cream hover:underline transition-colors">Allergy Guide</Link></li>
              <li><Link href="/best-products" className="hover:text-cream hover:underline transition-colors">Product Reviews</Link></li>
              <li><Link href="/tools/allergy-quiz" className="hover:text-cream hover:underline transition-colors">Tools</Link></li>
              <li><Link href="/managing-allergies-at-home" className="hover:text-cream hover:underline transition-colors">Blog</Link></li>
              <li><Link href="/blog" className="hover:text-cream hover:underline transition-colors">All Posts</Link></li>
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
            © 2024 CatAllergyGuide. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:underline hover:text-cream">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline hover:text-cream">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
