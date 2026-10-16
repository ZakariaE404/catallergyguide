import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateQuizData } from '../src/lib/validateQuizData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const quizDataPath = path.join(rootDir, 'src', 'data', 'allergy-quiz-data.json');

if (!fs.existsSync(quizDataPath)) {
  console.error(`[Prebuild Error] Quiz data file not found at ${quizDataPath}`);
  process.exit(1);
}

try {
  const quizData = JSON.parse(fs.readFileSync(quizDataPath, 'utf8'));
  validateQuizData(quizData);
  console.log('✅ [Prebuild Quiz Validation] All 3×2 tier combinations and recommendation slugs verified successfully.');
  process.exit(0);
} catch (err) {
  console.error(`\n❌ ${err.message}\n`);
  process.exit(1);
}
