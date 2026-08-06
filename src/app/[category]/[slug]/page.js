import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getAllPosts, getPostBySlug, getRelatedPosts, getCategoryInfo } from '@/lib/mdx';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    return {
      title: 'Post Not Found — CatAllergyGuide',
    };
  }

  const siteUrl = 'https://catallergyguide.com';
  const imageUrl = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/images/hero-cat.jpg`;

  return {
    title: `${post.title} — CatAllergyGuide`,
    description: post.description,
    authors: [{ name: post.author || 'CatAllergyGuide Team' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'CatAllergyGuide Team'],
      url: `${siteUrl}/${post.category}/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(category);
  const relatedPosts = getRelatedPosts(category, slug, 3);

  // Article JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://catallergyguide.com${post.featuredImage || '/images/hero-cat.jpg'}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author || 'CatAllergyGuide Team',
      url: 'https://catallergyguide.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CatAllergyGuide',
      logo: {
        '@type': 'ImageObject',
        url: 'https://catallergyguide.com/images/hero-cat.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://catallergyguide.com/${post.category}/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      {/* Inject JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-grow py-10 md:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60 mb-8 overflow-x-auto" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors flex-shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${categoryInfo.slug}`} className="hover:text-sage transition-colors flex-shrink-0">
              {categoryInfo.name}
            </Link>
            <span>/</span>
            <span className="text-sage font-medium truncate" aria-current="page">
              {post.title}
            </span>
          </nav>

          {/* Post Header */}
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Link
                href={`/${categoryInfo.slug}`}
                className="inline-block bg-terracotta text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md hover:bg-terracotta/90 transition-colors"
              >
                {categoryInfo.name}
              </Link>
              <time className="text-sm font-medium text-charcoal/60">{post.date}</time>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed font-normal">
              {post.description}
            </p>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-sm border border-charcoal/5">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          {/* Main MDX Content */}
          <div className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed space-y-6 prose-headings:font-serif prose-headings:text-charcoal prose-headings:font-bold prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-a:text-terracotta hover:prose-a:underline prose-strong:text-sage">
            <MDXRemote source={post.content} />
          </div>

        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-sage/20">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal tracking-tight">
                Related Articles in {categoryInfo.name}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <PostCard key={relPost.slug} post={relPost} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
