/**
 * Scoring engine for Hypoallergenic Breed Matcher.
 * Pure function: takes user answers and breeds dataset,
 * applies hard filters, calculates weighted soft distance,
 * generates 2-3 specific reasons, and assigns Strong/Good/Possible labels.
 * NO percentages output.
 */

export function calculateBreedMatches(answers = {}, breeds = []) {
  if (!Array.isArray(breeds) || breeds.length === 0) {
    return { matches: [], filteredCount: 0, hasStrongMatch: false };
  }

  // 1. HARD FILTERS
  const passedBreeds = breeds.filter((breed) => {
    // Household: Kids
    if (answers.household === 'with_children' || answers.household === 'busy_family') {
      if (breed.kidFriendly === false) return false;
    }
    // Household: Other pets
    if (answers.household === 'with_other_pets' || answers.household === 'busy_family') {
      if (breed.otherPetsFriendly === false) return false;
    }
    // Home: Apartment
    if (answers.home === 'apartment') {
      if (breed.apartmentOk === false) return false;
    }
    return true;
  });

  const filteredCount = passedBreeds.length;

  // 2. SOFT WEIGHTED DISTANCE
  const scoredBreeds = passedBreeds.map((breed) => {
    let score = 0;
    const reasons = [];

    // --- A. Energy Matching (Max 25 pts) ---
    // Calm (target: 2), Moderate (target: 3), High (target: 4.5)
    let targetEnergy = 3;
    if (answers.energy === 'calm') targetEnergy = 2;
    else if (answers.energy === 'moderate') targetEnergy = 3;
    else if (answers.energy === 'high') targetEnergy = 4.5;

    const energyDiff = Math.abs(breed.energy - targetEnergy);
    const energyScore = Math.max(0, (1 - energyDiff / 3.5)) * 25;
    score += energyScore;

    if (energyDiff <= 0.5) {
      if (answers.energy === 'calm') {
        reasons.push('Calm, composed temperament suited for a relaxing home environment.');
      } else if (answers.energy === 'high') {
        reasons.push('High-energy and playful athleticism to keep up with an active household.');
      } else {
        reasons.push('Balanced energy level alternating between playful bursts and quiet rest.');
      }
    }

    // --- B. Grooming & Shedding Matching (Max 30 pts) ---
    // Low (target: 1.5), Moderate (target: 2.5), High (target: 4)
    let targetGrooming = 2.5;
    if (answers.grooming === 'low') targetGrooming = 1.5;
    else if (answers.grooming === 'moderate') targetGrooming = 2.5;
    else if (answers.grooming === 'high') targetGrooming = 4;

    const groomingDiff = Math.abs(breed.grooming - targetGrooming);
    let groomingScore = Math.max(0, (1 - groomingDiff / 3.5)) * 30;

    // Small penalty if user selected low grooming but breed has high shedding
    if (answers.grooming === 'low' && breed.shedding >= 4) {
      groomingScore = Math.max(0, groomingScore - 8);
    }
    score += groomingScore;

    if (answers.grooming === 'low' && breed.grooming <= 2) {
      reasons.push('Minimal coat upkeep requiring only low-maintenance weekly grooming.');
    } else if (answers.grooming === 'high' && breed.grooming >= 3) {
      reasons.push('Well matched for owners ready for dedicated grooming or bathing routines.');
    } else if (answers.grooming === 'moderate' && breed.grooming <= 3) {
      reasons.push('Manageable grooming routine with regular weekly brushing.');
    }

    // Coat & shedding specific bonus reasons
    if (breed.shedding <= 2 && reasons.length < 3) {
      if (breed.coat === 'hairless') {
        reasons.push('Zero fur shedding eliminates loose airborne pet hairs.');
      } else {
        reasons.push('Low-shedding coat limits dried salivary dander spreading onto furniture.');
      }
    }

    // --- C. Vocalization / Alone-Time (Max 25 pts) ---
    // quiet_independent (1.5), balanced (2.5), vocal_social (3.5)
    let targetVocal = 2.5;
    if (answers.vocal_alone === 'quiet_independent') targetVocal = 1.5;
    else if (answers.vocal_alone === 'balanced') targetVocal = 2.5;
    else if (answers.vocal_alone === 'vocal_social') targetVocal = 3.5;

    const vocalDiff = Math.abs(breed.vocal - targetVocal);
    const vocalScore = Math.max(0, (1 - vocalDiff / 3)) * 25;
    score += vocalScore;

    if (vocalDiff <= 0.5 && reasons.length < 3) {
      if (answers.vocal_alone === 'quiet_independent') {
        reasons.push('Quiet and self-sufficient disposition, rarely prone to loud vocal demands.');
      } else if (answers.vocal_alone === 'vocal_social') {
        reasons.push('Engaging and vocal personality that loves interactive human communication.');
      } else {
        reasons.push('Social yet adaptable, content during quiet hours and working days.');
      }
    }

    // --- D. Budget Tier (Max 20 pts) ---
    let budgetScore = 20;
    if (answers.budget && answers.budget !== 'flexible') {
      let targetTier = 2;
      if (answers.budget === 'tier_2') targetTier = 2;
      else if (answers.budget === 'tier_3') targetTier = 3;
      else if (answers.budget === 'tier_4') targetTier = 4;

      const budgetDiff = Math.abs(breed.priceTier - targetTier);
      budgetScore = Math.max(0, (1 - budgetDiff / 3)) * 20;

      if (budgetDiff === 0 && reasons.length < 3) {
        reasons.push('Falls directly within your intended adoption and ongoing care tier.');
      }
    }
    score += budgetScore;

    // Ensure at least 2 distinct reasons are present
    if (reasons.length < 2) {
      if (breed.apartmentOk) {
        reasons.push('Proven adaptability to comfortable indoor and apartment living.');
      }
      if (reasons.length < 2 && breed.evidence === 'limited') {
        reasons.push('Scientific reports document lower baseline Fel d 1 secretion in specific lines.');
      } else if (reasons.length < 2) {
        reasons.push('Distinct coat mechanics help control household dander dispersion.');
      }
    }

    // Assign Match Label (NO percentages)
    let label = 'Possible';
    if (score >= 76) {
      label = 'Strong';
    } else if (score >= 60) {
      label = 'Good';
    }

    return {
      breed,
      score,
      label, // 'Strong' | 'Good' | 'Possible'
      reasons: reasons.slice(0, 3),
    };
  });

  // Sort by score descending
  scoredBreeds.sort((a, b) => b.score - a.score);

  const hasStrongMatch = scoredBreeds.some((m) => m.label === 'Strong');

  return {
    matches: scoredBreeds,
    filteredCount,
    hasStrongMatch,
  };
}
