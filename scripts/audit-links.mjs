import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('content');
const SRC_DIR = path.resolve('src');

// Collect all existing content posts and their valid routes
const categories = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const allPosts = [];
const validRoutes = new Set([
  '/',
  '/disclaimer',
  '/privacy-policy',
  '/tools',
  '/tools/allergy-quiz',
  '/tools/breed-matcher',
]);

for (const cat of categories) {
  validRoutes.add(`/${cat}`);
  const catPath = path.join(CONTENT_DIR, cat);
  const files = fs.readdirSync(catPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(catPath, file), 'utf8');
    const { data } = matter(raw);
    const slug = data.slug || file.replace(/\.mdx?$/, '');
    allPosts.push({ category: cat, slug, file: path.join(cat, file), title: data.title });
    validRoutes.add(`/${cat}/${slug}`);
  }
}

console.log('Known valid routes:');
for (const r of Array.from(validRoutes).sort()) {
  console.log('  ' + r);
}

// Function to scan file for links
function scanFileForLinks(filePath, content) {
  const issues = [];
  // Markdown links: [text](url)
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    const text = match[1];
    const url = match[2].trim();
    checkUrl(filePath, text, url, match.index, issues);
  }

  // Next/HTML Link/a tags: href="..."
  const hrefRegex = /href=["']([^"']+)["']/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1].trim();
    checkUrl(filePath, 'href', url, match.index, issues);
  }

  // ReviewCallout slug="..."
  const calloutRegex = /<ReviewCallout[^>]*slug=["']([^"']+)["']/g;
  while ((match = calloutRegex.exec(content)) !== null) {
    const slug = match[1].trim();
    const targetPost = allPosts.find(p => p.category === 'product-reviews' && p.slug === slug);
    if (!targetPost) {
      issues.push({
        file: filePath,
        type: 'ReviewCallout to non-existent review',
        target: slug,
        suggestion: null
      });
    }
  }

  return issues;
}

function checkUrl(filePath, text, url, index, issues) {
  // Ignore external links, mailto, tel, anchors
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:') || url === '#') {
    return;
  }
  if (url.startsWith('#')) {
    return; // local anchor
  }

  // Normalize path (strip query and hash)
  const cleanUrl = url.split('#')[0].split('?')[0];
  if (!cleanUrl) return;

  // Check if valid
  if (validRoutes.has(cleanUrl)) {
    return;
  }

  // Does it match a slug directly without category? (e.g. /best-cat-food-for-allergies)
  const nakedSlug = cleanUrl.replace(/^\//, '');
  const matchedPost = allPosts.find(p => p.slug === nakedSlug);
  if (matchedPost) {
    issues.push({
      file: filePath,
      type: 'Missing category prefix',
      url,
      suggestedFix: `/${matchedPost.category}/${matchedPost.slug}`
    });
    return;
  }

  // Check if category exists but slug does not, or neither
  issues.push({
    file: filePath,
    type: 'Non-existent internal link (404)',
    url,
    suggestedFix: null
  });
}

const allIssues = [];

// Scan all content MDX files
for (const post of allPosts) {
  const fullPath = path.join(CONTENT_DIR, post.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const issues = scanFileForLinks(post.file, content);
  allIssues.push(...issues);
}

// Scan all src files
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      const relPath = path.relative(process.cwd(), fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      const issues = scanFileForLinks(relPath, content);
      allIssues.push(...issues);
    }
  }
}
scanDir(SRC_DIR);

console.log('\n--- Link Audit Issues Found: ' + allIssues.length + ' ---');
for (const issue of allIssues) {
  console.log(`[${issue.type}] in ${issue.file}: ${issue.url || issue.target} -> Suggestion: ${issue.suggestedFix || 'None (Non-existent post!)'}`);
}
