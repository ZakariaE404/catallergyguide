import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <article className="bg-beige rounded-2xl overflow-hidden border border-charcoal/5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      {/* Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden">
        <Image
          src={post.featuredImage || post.image || '/images/blog-1.jpg'}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category Tag Pill */}
          <div>
            <Link
              href={`/${post.category}`}
              className="inline-block bg-terracotta text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md hover:bg-terracotta/90 transition-colors"
            >
              {post.categoryName || post.category?.replace(/-/g, ' ')}
            </Link>
          </div>

          {/* Post Title */}
          <h3 className="font-sans font-bold text-lg sm:text-xl text-charcoal group-hover:text-sage transition-colors leading-snug">
            <Link href={`/${post.category}/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-charcoal/75 text-sm leading-relaxed line-clamp-3">
            {post.description || post.excerpt}
          </p>
        </div>

        {/* Publication Date */}
        <div className="pt-2 text-xs font-medium text-charcoal/60">
          {post.date}
        </div>
      </div>
    </article>
  );
}
