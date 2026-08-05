import Link from 'next/link';

export default function ToolsSection() {
  return (
    <section className="py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decorative Divider Header */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="flex-grow border-t border-sage/20"></div>
          <div className="px-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage/40"></span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal tracking-tight">
              Popular Tools
            </h2>
            <span className="w-2 h-2 rounded-full bg-sage/40"></span>
          </div>
          <div className="flex-grow border-t border-sage/20"></div>
        </div>

        {/* 2 Tool Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tool 1: Allergy Severity Quiz */}
          <div className="bg-beige rounded-2xl p-6 sm:p-8 flex items-start gap-6 border border-charcoal/5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cream flex-shrink-0 flex items-center justify-center p-3 text-sage border border-sage/10">
              {/* Clipboard Checklist Icon */}
              <svg className="w-10 h-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-sans font-bold text-xl text-charcoal">
                Allergy Severity Quiz
              </h3>
              <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
                Answer a few questions to get your personalized allergy assessment and next steps.
              </p>
              <div>
                <Link
                  href="#"
                  className="inline-block bg-terracotta hover:bg-terracotta/90 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-xs transition-colors"
                >
                  Try It Now
                </Link>
              </div>
            </div>
          </div>

          {/* Tool 2: Breed Matcher Tool */}
          <div className="bg-beige rounded-2xl p-6 sm:p-8 flex items-start gap-6 border border-charcoal/5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cream flex-shrink-0 flex items-center justify-center p-3 text-sage border border-sage/10">
              {/* Magnifying glass with paw print icon */}
              <svg className="w-10 h-10 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              </svg>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-sans font-bold text-xl text-charcoal">
                Breed Matcher Tool
              </h3>
              <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
                Find hypoallergenic breeds that match your lifestyle and allergy needs.
              </p>
              <div>
                <Link
                  href="#"
                  className="inline-block bg-terracotta hover:bg-terracotta/90 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-xs transition-colors"
                >
                  Try It Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
