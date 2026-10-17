import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateBreedData } from '../src/lib/validateBreedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const breedsDataPath = path.join(rootDir, 'src', 'data', 'breeds.json');

if (!fs.existsSync(breedsDataPath)) {
  console.error(`[Prebuild Error] Breeds data file not found at ${breedsDataPath}`);
  process.exit(1);
}

try {
  const breedsData = JSON.parse(fs.readFileSync(breedsDataPath, 'utf8'));
  validateBreedData(breedsData, {
    contentRoot: path.join(rootDir, 'content', 'breeds'),
  });
  console.log(`✅ [Prebuild Breed Validation] All ${breedsData.length} breeds and contentSlugs verified successfully.`);
  process.exit(0);
} catch (err) {
  console.error(`\n❌ ${err.message}\n`);
  process.exit(1);
}
