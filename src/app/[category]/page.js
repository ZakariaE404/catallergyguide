import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getAllCategories, getCategoryInfo, getPostsByCategory } from '@/lib/mdx';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const categories = getAllCategories();

  if (!categories.includes(categorySlug)) {
    return {
      title: 'Category Not Found — CatAllergyGuide',
    };
  }

  const category = getCategoryInfo(categorySlug);

  return {
    title: `${category.name} — CatAllergyGuide`,
    description: category.description,
    openGraph: {
      title: `${category.name} | CatAllergyGuide`,
      description: category.description,
      type: 'website',
      url: `https://catallergyguide.com/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const categories = getAllCategories();

  if (!categories.includes(categorySlug)) {
    notFound();
  }

  const category = getCategoryInfo(categorySlug);
  const posts = getPostsByCategory(categorySlug);


  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />

      <main className="flex-grow py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-sage font-medium" aria-current="page">
              {category.name}
            </span>
          </nav>

          {/* Category Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight">
              {category.name}
            </h1>
            <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Category Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-beige rounded-2xl p-12 text-center text-charcoal/70">
              <p className="text-lg">No articles found in this category yet. Check back soon!</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
