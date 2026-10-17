import fs from 'fs';
import path from 'path';

/**
 * Validates breed data in src/data/breeds.json:
 * 1. Checks that the data is an array of breed objects.
 * 2. Asserts all required fields are present and correctly typed.
 * 3. Asserts each breed id is unique.
 * 4. Asserts each breed's contentSlug matches an existing file in content/breeds/{contentSlug}.(mdx|md).
 * Throws an Error and fails the build if any check fails.
 */
export function validateBreedData(breedsData, options = {}) {
  const contentRoot = options.contentRoot || path.join(process.cwd(), 'content', 'breeds');
  const errors = [];

  if (!Array.isArray(breedsData)) {
    throw new Error('[Breed Validation Error] Breeds data must be an array.');
  }

  if (breedsData.length === 0) {
    throw new Error('[Breed Validation Error] Breeds dataset is empty.');
  }

  const seenIds = new Set();
  const requiredFields = [
    'id',
    'contentSlug',
    'name',
    'coat',
    'shedding',
    'grooming',
    'energy',
    'vocal',
    'kidFriendly',
    'otherPetsFriendly',
    'apartmentOk',
    'priceTier',
    'allergenNote',
    'evidence',
    'image',
  ];

  breedsData.forEach((breed, index) => {
    const breedContext = breed.name ? `Breed "${breed.name}" (index ${index})` : `Breed at index ${index}`;

    // 1. Required fields presence
    for (const field of requiredFields) {
      if (breed[field] === undefined || breed[field] === null || breed[field] === '') {
        errors.push(`${breedContext}: Missing required field "${field}".`);
      }
    }

    // 2. ID uniqueness
    if (breed.id) {
      if (seenIds.has(breed.id)) {
        errors.push(`${breedContext}: Duplicate breed ID "${breed.id}" found.`);
      } else {
        seenIds.add(breed.id);
      }
    }

    // 3. Types validation
    if (breed.shedding !== undefined && typeof breed.shedding !== 'number') {
      errors.push(`${breedContext}: "shedding" must be a number.`);
    }
    if (breed.grooming !== undefined && typeof breed.grooming !== 'number') {
      errors.push(`${breedContext}: "grooming" must be a number.`);
    }
    if (breed.energy !== undefined && typeof breed.energy !== 'number') {
      errors.push(`${breedContext}: "energy" must be a number.`);
    }
    if (breed.vocal !== undefined && typeof breed.vocal !== 'number') {
      errors.push(`${breedContext}: "vocal" must be a number.`);
    }
    if (breed.kidFriendly !== undefined && typeof breed.kidFriendly !== 'boolean') {
      errors.push(`${breedContext}: "kidFriendly" must be a boolean.`);
    }
    if (breed.otherPetsFriendly !== undefined && typeof breed.otherPetsFriendly !== 'boolean') {
      errors.push(`${breedContext}: "otherPetsFriendly" must be a boolean.`);
    }
    if (breed.apartmentOk !== undefined && typeof breed.apartmentOk !== 'boolean') {
      errors.push(`${breedContext}: "apartmentOk" must be a boolean.`);
    }
    if (breed.priceTier !== undefined && typeof breed.priceTier !== 'number') {
      errors.push(`${breedContext}: "priceTier" must be a number.`);
    }

    // 4. Content slug verification
    if (breed.contentSlug) {
      const mdxPath = path.join(contentRoot, `${breed.contentSlug}.mdx`);
      const mdPath = path.join(contentRoot, `${breed.contentSlug}.md`);

      if (!fs.existsSync(mdxPath) && !fs.existsSync(mdPath)) {
        errors.push(
          `${breedContext}: Missing content file for contentSlug "${breed.contentSlug}". Looked for "${mdxPath}".`
        );
      }
    }
  });

  if (errors.length > 0) {
    const errorMsg = `[Breed Validation Error] Build halted with ${errors.length} validation failure(s):\n${errors
      .map((e) => `  - ${e}`)
      .join('\n')}`;
    throw new Error(errorMsg);
  }

  return true;
}
