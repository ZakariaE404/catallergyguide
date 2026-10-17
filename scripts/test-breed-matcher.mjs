import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculateBreedMatches } from '../src/lib/breedMatcherScoring.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const breedsDataPath = path.join(rootDir, 'src', 'data', 'breeds.json');
const breeds = JSON.parse(fs.readFileSync(breedsDataPath, 'utf8'));

console.log('--- Running 5 Persona Unit Tests for Breed Matcher Scoring ---');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}: ${message}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// Persona 1: Quiet Apartment Dweller
// Needs quiet, low grooming, calm energy, apartment-friendly, budget tier 2
// -------------------------------------------------------------
const p1Answers = {
  household: 'adults_only',
  home: 'apartment',
  energy: 'calm',
  grooming: 'low',
  budget: 'tier_2',
  vocal_alone: 'quiet_independent',
};
const p1Result = calculateBreedMatches(p1Answers, breeds);
assert(p1Result.filteredCount === 4, 'Persona 1: Filter count', 'All 4 breeds should pass apartment filter');
assert(p1Result.matches[0].breed.id === 'russian-blue', 'Persona 1: Top match', `Expected Russian Blue, got ${p1Result.matches[0]?.breed.id}`);
assert(p1Result.matches[0].label === 'Strong', 'Persona 1: Label', `Expected Strong match, got ${p1Result.matches[0]?.label}`);
assert(p1Result.matches[0].reasons.length >= 2, 'Persona 1: Reasons count', 'Should have at least 2 specific reasons');

// -------------------------------------------------------------
// Persona 2: Active Family with Children
// Needs kid-friendly, high energy, handles high grooming / brushing, tier 3
// -------------------------------------------------------------
const p2Answers = {
  household: 'with_children',
  home: 'single_family',
  energy: 'high',
  grooming: 'high',
  budget: 'tier_3',
  vocal_alone: 'balanced',
};
const p2Result = calculateBreedMatches(p2Answers, breeds);
assert(p2Result.matches[0].breed.id === 'siberian', 'Persona 2: Top match', `Expected Siberian, got ${p2Result.matches[0]?.breed.id}`);
assert(p2Result.matches[0].label === 'Strong', 'Persona 2: Label', `Expected Strong match, got ${p2Result.matches[0]?.label}`);
assert(p2Result.hasStrongMatch === true, 'Persona 2: Strong match present', 'Should flag hasStrongMatch');

// -------------------------------------------------------------
// Persona 3: Zero-Hair / Frequent Grooming Enthusiast
// Seeks hairless/bathing, vocal companion, tier 4 premium
// -------------------------------------------------------------
const p3Answers = {
  household: 'adults_only',
  home: 'apartment',
  energy: 'high',
  grooming: 'high',
  budget: 'tier_4',
  vocal_alone: 'vocal_social',
};
const p3Result = calculateBreedMatches(p3Answers, breeds);
assert(p3Result.matches[0].breed.id === 'sphynx', 'Persona 3: Top match', `Expected Sphynx, got ${p3Result.matches[0]?.breed.id}`);
assert(p3Result.matches[0].label === 'Strong', 'Persona 3: Label', `Expected Strong match, got ${p3Result.matches[0]?.label}`);
assert(p3Result.matches[0].reasons.some((r) => r.toLowerCase().includes('fur') || r.toLowerCase().includes('grooming') || r.toLowerCase().includes('bathing')), 'Persona 3: Reason relevance', 'Should mention coat or grooming/bathing');

// -------------------------------------------------------------
// Persona 4: Busy Playful Single in Apartment
// Moderate energy, low grooming, curly coat, tier 3
// -------------------------------------------------------------
const p4Answers = {
  household: 'adults_only',
  home: 'apartment',
  energy: 'high',
  grooming: 'low',
  budget: 'tier_3',
  vocal_alone: 'vocal_social',
};
const p4Result = calculateBreedMatches(p4Answers, breeds);
assert(p4Result.matches[0].breed.id === 'devon-rex', 'Persona 4: Top match', `Expected Devon Rex, got ${p4Result.matches[0]?.breed.id}`);
assert(['Strong', 'Good'].includes(p4Result.matches[0].label), 'Persona 4: Label', `Expected Strong or Good match, got ${p4Result.matches[0]?.label}`);

// -------------------------------------------------------------
// Persona 5: High-Mismatch Edge Case (Tests honest reporting & hard filters)
// Polar contradictory preferences testing fallback & no-padding rule
// -------------------------------------------------------------
const p5Answers = {
  household: 'busy_family',
  home: 'apartment',
  energy: 'calm',
  grooming: 'low',
  budget: 'tier_2',
  vocal_alone: 'vocal_social',
};
const p5Result = calculateBreedMatches(p5Answers, breeds);
assert(p5Result.matches.length === 4, 'Persona 5: Match count', 'Matches should accurately reflect catalog size without padding');
assert(p5Result.matches.every((m) => ['Strong', 'Good', 'Possible'].includes(m.label)), 'Persona 5: Strict labels', 'All labels must be Strong, Good, or Possible (no percentages)');

// Test hard filter with synthetic mock data
const mockBreeds = [
  ...breeds,
  {
    id: 'not-apartment-cat',
    contentSlug: 'siberian-cats-hypoallergenic',
    name: 'Outdoor Cat',
    coat: 'short',
    shedding: 3,
    grooming: 3,
    energy: 5,
    vocal: 3,
    kidFriendly: false,
    otherPetsFriendly: false,
    apartmentOk: false,
    priceTier: 2,
    allergenNote: 'Mock note',
    evidence: 'unsupported',
    image: '/images/mock.webp',
  },
];
const filterResult = calculateBreedMatches({ household: 'with_children', home: 'apartment' }, mockBreeds);
assert(filterResult.filteredCount === 4, 'Hard Filter: Apartment & Kids blocker', 'Breed with kidFriendly=false or apartmentOk=false must be eliminated');

console.log(`\nTest results: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('✅ All 5 Persona Tests & Hard-Filter Invariants Passed Successfully!');
  process.exit(0);
}
