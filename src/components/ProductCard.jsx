import Image from 'next/image';

export default function ProductCard({ name, image, link, price }) {
  if (!name || !link) return null;

  return (
    <div className="not-prose h-full">
      <a
        href={link}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="flex flex-col h-full bg-beige/70 hover:bg-beige border border-charcoal/10 hover:border-sage/40 rounded-2xl p-5 transition-all duration-300 shadow-xs hover:shadow-md group text-none no-underline"
      >
        {/* Product Image Container */}
        {image && (
          <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-cream/70 border border-charcoal/5 flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Amazon Associate Disclaimer Caption */}
        <p className="text-[11px] text-charcoal/50 italic mt-2 mb-3 text-center leading-tight">
          Amazon product — as an Amazon Associate, I earn from qualifying purchases.
        </p>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal group-hover:text-sage transition-colors leading-snug">
              {name}
            </h3>
            {price && (
              <p className="text-sm font-semibold text-terracotta mt-1">
                {price}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <span className="inline-flex items-center justify-center w-full gap-2 bg-terracotta group-hover:bg-terracotta/90 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs">
              <span>View on Amazon</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
