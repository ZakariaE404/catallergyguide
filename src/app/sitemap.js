import { getAllPosts, CATEGORIES } from '@/lib/mdx';

export default async function sitemap() {
  const baseUrl = 'https://catallergyguide.com';

  // Base routes
  const staticRoutes = [
    '',
    '/tools/allergy-quiz',
    '/tools/breed-matcher',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }));

  // Category routes
  const categoryRoutes = Object.keys(CATEGORIES).map((categorySlug) => ({
    url: `${baseUrl}/${categorySlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Blog post routes
  const posts = getAllPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
