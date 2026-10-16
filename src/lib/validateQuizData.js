import fs from 'fs';
import path from 'path';

/**
 * Validates quiz data recommendations:
 * 1. Asserts every tier × household combination (3 × 2: mild/moderate/high × living_with_cat/thinking_of_adopting)
 *    has breed, product, and educational recommendations defined.
 * 2. Asserts red_flag has educational recommendations defined and zero product recommendations.
 * 3. Asserts all referenced slugs exist on disk in their respective content directories.
 * Throws an Error and fails the build if any check fails.
 */
export function validateQuizData(quizData) {
  const contentRoot = path.join(process.cwd(), 'content');
  const errors = [];

  function verifySlug(category, slug, contextInfo) {
    if (!slug) {
      errors.push(`Empty or null slug found in ${contextInfo}.`);
      return;
    }
    const mdxPath = path.join(contentRoot, category, `${slug}.mdx`);
    const mdPath = path.join(contentRoot, category, `${slug}.md`);

    if (!fs.existsSync(mdxPath) && !fs.existsSync(mdPath)) {
      errors.push(
        `Missing content file for slug "${slug}" in category "${category}" (${contextInfo}). Looked for "${mdxPath}".`
      );
    }
  }

  const recommendations = quizData?.recommendations;
  if (!recommendations) {
    throw new Error('[Quiz Validation Error] Missing "recommendations" section in quiz data.');
  }

  const scoredTiers = ['mild', 'moderate', 'high'];
  const householdKeys = ['living_with_cat', 'thinking_of_adopting'];

  // Check 3 × 2 combinations
  for (const tier of scoredTiers) {
    const tierRecs = recommendations[tier];
    if (!tierRecs) {
      errors.push(`Missing recommendations object for tier "${tier}".`);
      continue;
    }

    for (const hk of householdKeys) {
      const rec = tierRecs[hk];
      const context = `${tier} × ${hk}`;

      if (!rec) {
        errors.push(`Missing recommendation mapping for combination: ${context}.`);
        continue;
      }

      // Assert breed recommendations defined and non-empty
      if (!Array.isArray(rec.breedSlugs) || rec.breedSlugs.length === 0) {
        errors.push(`Missing or empty "breedSlugs" for combination: ${context}.`);
      } else {
        rec.breedSlugs.forEach((slug) => verifySlug('breeds', slug, `${context} -> breedSlugs`));
      }

      // Assert product recommendations defined and non-empty
      if (!Array.isArray(rec.productSlugs) || rec.productSlugs.length === 0) {
        errors.push(`Missing or empty "productSlugs" for combination: ${context}.`);
      } else {
        rec.productSlugs.forEach((slug) => verifySlug('product-reviews', slug, `${context} -> productSlugs`));
      }

      // Assert educational recommendations defined and non-empty
      if (!Array.isArray(rec.educationalSlugs) || rec.educationalSlugs.length === 0) {
        errors.push(`Missing or empty "educationalSlugs" for combination: ${context}.`);
      } else {
        rec.educationalSlugs.forEach((slug) => verifySlug('allergy-guide', slug, `${context} -> educationalSlugs`));
      }
    }
  }

  // Check red-flag tier
  const redFlagRec = recommendations.red_flag;
  if (!redFlagRec) {
    errors.push('Missing "red_flag" recommendations object.');
  } else {
    if (!Array.isArray(redFlagRec.educationalSlugs) || redFlagRec.educationalSlugs.length === 0) {
      errors.push('Missing or empty "educationalSlugs" in red_flag tier.');
    } else {
      redFlagRec.educationalSlugs.forEach((slug) =>
        verifySlug('allergy-guide', slug, 'red_flag -> educationalSlugs')
      );
    }

    // Assert strictly zero product recommendations on red_flag
    if (redFlagRec.productSlugs && redFlagRec.productSlugs.length > 0) {
      errors.push('Violation: red_flag tier must NOT have any product recommendations defined.');
    }
  }

  if (errors.length > 0) {
    const errorMsg = `[Quiz Validation Error] Build halted with ${errors.length} validation failure(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`;
    throw new Error(errorMsg);
  }

  return true;
}
