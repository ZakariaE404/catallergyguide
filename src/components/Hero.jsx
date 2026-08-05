'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-16 lg:pt-16 lg:pb-24">
      
      {/* Background Organic Beige Blob & Botanical Leaf (Matching Mockup exactly) */}
      <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none -z-0 hidden md:block">
        {/* Soft Organic Wavy Backdrop */}
        <svg viewBox="0 0 700 600" fill="none" className="w-full h-full text-[#E8E0D2] opacity-80">
          <path
            fill="currentColor"
            d="M250,0 C400,0 700,50 700,250 C700,450 550,600 350,600 C200,600 150,480 180,350 C210,220 100,0 250,0 Z"
          />
        </svg>

        {/* Top-Right Decorative Leaves */}
        <div className="absolute top-6 right-8 w-44 h-44 text-sage/35 transform rotate-12">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 Q65 25 90 30 Q65 50 50 100 Q35 50 10 30 Q35 25 50 0 Z" />
            <path d="M48 20 Q30 40 20 65 Q45 55 48 20 Z" fill="#3D5A4B" opacity="0.4" />
            <path d="M52 20 Q70 40 80 65 Q55 55 52 20 Z" fill="#3D5A4B" opacity="0.4" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 lg:pr-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-serif font-bold text-charcoal tracking-tight leading-[1.12]">
              Find the Right Cat.<br />
              Live Allergy-Free.<br />
              Love More.
            </h1>
            
            <p className="text-base sm:text-lg text-charcoal/80 max-w-lg leading-relaxed pt-1">
              Expert guidance, trusted resources, and hypoallergenic cat breeds to help you and your sensitive self build a happier home together.
            </p>

            <div className="pt-3">
              <Link
                href="#"
                className="inline-block bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
              >
                Start Your Allergy Journey
              </Link>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[1.1/1] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/images/hero-cat.jpg"
                alt="Fluffy white cat resting comfortably on a soft blanket"
                fill
                priority
                className="object-cover object-center transform hover:scale-102 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
