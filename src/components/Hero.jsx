'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-charcoal tracking-tight leading-[1.15]">
              Find the Right Cat.<br />
              Live Allergy-Free.<br />
              Love More.
            </h1>
            
            <p className="text-lg sm:text-xl text-charcoal/80 max-w-xl font-normal leading-relaxed">
              Expert guidance, trusted resources, and hypoallergenic cat breeds to help you and your sensitive self build a happier home together.
            </p>

            <div className="pt-2">
              <Link
                href="#"
                className="inline-block bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                Start Your Allergy Journey
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image with Organic Backdrop & Botanical Motifs */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Background organic blob background shape */}
            <div className="absolute -inset-4 sm:-inset-6 bg-[#E8E0D2] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] opacity-70 blur-xs -z-10 transform scale-105" />

            {/* Botanical Leaf Overlay Behind Image */}
            <div className="absolute -right-8 -top-8 w-40 h-40 text-sage/30 pointer-events-none -z-10">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0C60 30 80 40 100 50C70 60 60 80 50 100C40 70 20 60 0 50C30 40 40 20 50 0Z" opacity="0.6" />
                <path d="M20 10 Q 50 40 80 10 Q 50 70 20 10 Z" />
              </svg>
            </div>

            {/* Main Cat Image Container */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[1/1] rounded-3xl overflow-hidden shadow-xl border-4 border-white/60">
              <Image
                src="/images/hero-cat.jpg"
                alt="Fluffy white hypoallergenic cat resting peacefully"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              
              {/* Image visual fallback container if no local image is uploaded yet */}
              <div className="absolute inset-0 bg-gradient-to-br from-beige to-sage/20 -z-10 flex flex-col items-center justify-center p-6 text-center text-sage">
                <svg className="w-16 h-16 mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-sm">Hero Image Placeholder</span>
                <span className="text-xs opacity-75">(/images/hero-cat.jpg)</span>
              </div>
            </div>

            {/* Bottom Botanical Branch Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 text-sage/40 pointer-events-none z-10 hidden sm:block">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10,90 Q40,70 80,20" />
                <path d="M30,77 Q20,60 15,65 M30,77 Q45,65 50,68" />
                <path d="M50,55 Q40,40 32,45 M50,55 Q65,45 70,48" />
                <path d="M70,32 Q60,20 52,25 M70,32 Q85,20 88,26" />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
