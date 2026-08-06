import Link from 'next/link';

const categories = [
  {
    title: 'Hypoallergenic Breeds',
    href: '/breeds',
    icon: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.5 0-2.5-.8-3-1.5M12 14c1.5 0 2.5-.8 3-1.5M12 14v1.5m-3-7.5l-2-3.5L4 5.5l1.5 5C4.2 11.7 4 13.3 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-1.7-.2-3.3-1.5-4.5L20 5.5l-3 2-2-3.5" />
      </svg>
    ),
  },
  {
    title: 'Allergy Guide',
    href: '/allergy-guide',
    icon: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 1.152A12.007 12.007 0 0012 21.5a12.007 12.007 0 009-8.348V6.5L12 3.5 3 6.5v6.652z" />
      </svg>
    ),
  },
  {
    title: 'Product Reviews',
    href: '/product-reviews',
    icon: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        <circle cx="12" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Tools & Resources',
    href: '/tools',
    icon: (
      <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a1.5 1.5 0 00-2.5-1.1c-.8.8-.8 2 0 2.8l2.5 2.3 2.5-2.3c.8-.8.8-2 0-2.8a1.5 1.5 0 00-2.5 1.1z" />
      </svg>
    ),
  },
];

export default function CategoryCards() {
  return (
    <section className="py-10 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group bg-beige hover:bg-[#E8DFC8] p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs hover:shadow-md border border-charcoal/5"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-sage/10 shadow-xs">
                {cat.icon}
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg text-charcoal group-hover:text-sage transition-colors leading-snug">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
