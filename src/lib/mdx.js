import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export const PREDEFINED_CATEGORIES = {
  'breeds': {
    slug: 'breeds',
    name: 'Breeds',
    description: 'Discover feline breeds known to produce lower levels of Fel d 1 protein allergens.',
  },
  'allergy-guide': {
    slug: 'allergy-guide',
    name: 'Allergy Guide',
    description: 'Learn the science behind cat allergies, symptoms, triggers, and medical management.',
  },
  'product-reviews': {
    slug: 'product-reviews',
    name: 'Product Reviews',
    description: 'Expert reviews and top picks for HEPA air purifiers, grooming wipes, and low-dust litters.',
  },
  'tools': {
    slug: 'tools',
    name: 'Tools',
    description: 'Interactive tools and helpful guides for managing cat allergies effectively.',
  },
};

export function getAllCategories() {
  if (!fs.existsSync(CONTENT_PATH)) {
    return [];
  }

  const entries = fs.readdirSync(CONTENT_PATH, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function formatCategoryName(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCategoryInfo(categorySlug) {
  if (PREDEFINED_CATEGORIES[categorySlug]) {
    return PREDEFINED_CATEGORIES[categorySlug];
  }
  const name = formatCategoryName(categorySlug);
  return {
    slug: categorySlug,
    name,
    description: `Explore articles, guides, and resources in ${name}.`,
  };
}

export const CATEGORIES = new Proxy(PREDEFINED_CATEGORIES, {
  get(target, prop) {
    if (typeof prop === 'string') {
      if (prop in target) return target[prop];
      if (getAllCategories().includes(prop)) {
        return getCategoryInfo(prop);
      }
    }
    return target[prop];
  },
});

export function getPostsByCategory(categorySlug) {
  const categoryPath = path.join(CONTENT_PATH, categorySlug);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);

  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      const slug = data.slug || file.replace(/\.mdx?$/, '');

      return {
        ...data,
        content,
        category: categorySlug,
        categoryName: getCategoryInfo(categorySlug).name,
        slug,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getAllPosts() {
  const categories = getAllCategories();
  let allPosts = [];

  for (const category of categories) {
    const posts = getPostsByCategory(category);
    allPosts = allPosts.concat(posts);
  }

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(categorySlug, postSlug) {
  if (!postSlug) {
    postSlug = categorySlug;
    const allPosts = getAllPosts();
    return allPosts.find((post) => post.slug === postSlug) || null;
  }

  const posts = getPostsByCategory(categorySlug);
  return posts.find((post) => post.slug === postSlug) || null;
}

export function getRelatedPosts(categorySlug, currentSlug, limit = 3) {
  const categoryPosts = getPostsByCategory(categorySlug);
  return categoryPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}

