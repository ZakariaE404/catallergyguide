import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/mdx';

export default function ReviewCallout({
  slug,
  text,
  heading = 'Our Top Pick',
  currentCategory,
}) {
  // Enforce placement rule: Do not render on product-reviews pages
  if (currentCategory === 'product-reviews') {
    return null;
  }

  if (!slug) {
    return null;
  }

  // Fetch the review post data by slug from /content/product-reviews/
  const reviewPost = getPostBySlug('product-reviews', slug);

  if (!reviewPost) {
    return null;
  }

  const title = reviewPost.title;
  const image = reviewPost.featuredImage || reviewPost.image || '/images/hero-cat.jpg';
  const contextText = text || reviewPost.description;
  const destinationUrl = `/product-reviews/${reviewPost.slug}`;

  return (
    <div className="not-prose my-8">
      <Link
        href={destinationUrl}
        className="block bg-beige/80 hover:bg-beige border-2 border-sage/25 hover:border-sage/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xs hover:shadow-md group"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Featured Image Thumbnail */}
          {image && (
            <div className="relative w-full sm:w-36 h-40 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-charcoal/10">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 144px"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="flex-1 space-y-2">
            {/* Header Tag with Icon */}
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-sage text-white">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-sage">
                {heading}
              </span>
            </div>

            {/* Post Title */}
            <h4 className="font-serif font-bold text-lg sm:text-xl text-charcoal group-hover:text-sage transition-colors leading-snug">
              {title}
            </h4>

            {/* Context Line */}
            <p className="text-sm text-charcoal/80 leading-relaxed line-clamp-2">
              {contextText}
            </p>
          </div>

          {/* Action Button */}
          <div className="sm:self-center flex-shrink-0 pt-2 sm:pt-0">
            <span className="inline-flex items-center gap-1.5 bg-terracotta group-hover:bg-terracotta/90 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs">
              <span>Read Review</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
