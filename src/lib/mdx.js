import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export const CATEGORIES = {
  'hypoallergenic-breeds': {
    slug: 'hypoallergenic-breeds',
    name: 'Hypoallergenic Breeds',
    description: 'Discover feline breeds known to produce lower levels of Fel d 1 protein allergens.',
  },
  'understanding-allergies': {
    slug: 'understanding-allergies',
    name: 'Understanding Allergies',
    description: 'Learn the science behind cat allergies, symptoms, triggers, and medical management.',
  },
  'best-products': {
    slug: 'best-products',
    name: 'Best Products',
    description: 'Expert reviews and top picks for HEPA air purifiers, grooming wipes, and low-dust litters.',
  },
  'managing-allergies-at-home': {
    slug: 'managing-allergies-at-home',
    name: 'Managing Allergies at Home',
    description: 'Practical daily routines, home cleaning techniques, and environmental sanctuary setups.',
  },
};

export function getAllPosts() {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_PATH);

  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        ...data,
        content,
        slug: data.slug || file.replace(/\.mdx?$/, ''),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getPostsByCategory(categorySlug) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === categorySlug);
}

export function getPostBySlug(slug) {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}

export function getRelatedPosts(categorySlug, currentSlug, limit = 3) {
  const categoryPosts = getPostsByCategory(categorySlug);
  return categoryPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}
