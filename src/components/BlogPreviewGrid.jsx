import Image from 'next/image';
import Link from 'next/link';

const posts = [
  {
    category: 'BREED GUIDE',
    title: '5 Hypoallergenic Cat Breeds That May Be Right for You',
    excerpt: 'These cats produce fewer allergens and may be a better fit for sensitive homes.',
    date: 'May 20, 2024',
    image: '/images/blog-1.jpg',
    href: '#',
  },
  {
    category: 'ALLERGY GUIDE',
    title: 'Understanding Cat Allergies: The Complete Guide',
    excerpt: 'Learn the causes, symptoms, and steps to create a more comfortable home.',
    date: 'May 18, 2024',
    image: '/images/blog-2.jpg',
    href: '#',
  },
  {
    category: 'PRODUCT REVIEW',
    title: 'The Best Cat Products for Allergy-Sensitive Homes',
    excerpt: 'Our top picks for air purifiers, litter, grooming tools, and more.',
    date: 'May 15, 2024',
    image: '/images/blog-3.jpg',
    href: '#',
  },
];

export default function BlogPreviewGrid() {
  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="bg-beige rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative w-full h-52 bg-sage/10 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sage/30 to-beige -z-10 flex items-center justify-center p-4 text-charcoal/60 text-xs font-mono">
                  {post.image}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Category Pill Tag */}
                  <div>
                    <span className="inline-block bg-terracotta text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-xl text-charcoal group-hover:text-sage transition-colors leading-snug">
                    <Link href={post.href}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-charcoal/75 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Published Date */}
                <div className="pt-2 text-xs font-medium text-charcoal/50">
                  {post.date}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
