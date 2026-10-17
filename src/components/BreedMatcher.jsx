'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackGAEvent } from '@/lib/analytics';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import questionsData from '@/data/breed-matcher-questions.json';
import breedsData from '@/data/breeds.json';
import { calculateBreedMatches } from '@/lib/breedMatcherScoring';

function subscribeStorage(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getStoredQuizTier() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem('allergy_quiz_tier');
    }
  } catch (_) {}
  return null;
}

function getServerSnapshot() {
  return null;
}

const PRODUCT_REVIEWS = [
  {
    slug: 'best-air-purifiers-for-cat-allergies',
    title: '4 Best Air Purifiers for Cat Allergies',
    badge: 'Air Filtration',
    desc: 'True HEPA filters proven to capture microscopic airborne Fel d 1 dander.',
    type: 'air_purifier',
  },
  {
    slug: 'best-cat-food-for-allergies',
    title: 'Purina Pro Plan LiveClear Tested & Reviewed',
    badge: 'Dietary Defense',
    desc: 'Egg-based IgY protein diet clinically shown to neutralize salivary Fel d 1.',
    type: 'cat_food',
  },
  {
    slug: 'best-hepa-vacuum-for-pet-hair',
    title: '4 Best HEPA Vacuums for Cat Hair & Dander',
    badge: 'Deep Cleaning',
    desc: 'Sealed HEPA systems that trap sticky dander without blowing it back into the room.',
    type: 'vacuum',
  },
  {
    slug: 'best-allergy-medication-for-cat-owners',
    title: 'The Best Allergy Medication for Cat Owners',
    badge: 'Clinical Relief',
    desc: 'Over-the-counter antihistamines, nasal sprays, and eye drops ranked by allergists.',
    type: 'medication',
  },
];

export default function BreedMatcher() {
  const importedQuizTier = useSyncExternalStore(
    subscribeStorage,
    getStoredQuizTier,
    getServerSnapshot
  );
  const hasTrackedImport = useRef(false);

  const [step0Acknowledged, setStep0Acknowledged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef(null);
  const questions = questionsData;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  useEffect(() => {
    if (importedQuizTier && !hasTrackedImport.current) {
      hasTrackedImport.current = true;
      trackGAEvent('matcher_import_quiz', {
        imported_tier: importedQuizTier,
      });
    }
  }, [importedQuizTier]);

  // Smooth scroll to container when changing step
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentIndex, isCompleted, step0Acknowledged]);

  const handleSelectOption = (option) => {
    if (isTransitioning) return;

    if (!hasStarted) {
      setHasStarted(true);
      trackGAEvent('matcher_start', {
        quiz_tier_imported: Boolean(importedQuizTier),
      });
    }

    setSelectedOptionId(option.id);
    setIsTransitioning(true);

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option.value,
    };
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setSelectedOptionId(null);
        setIsTransitioning(false);

        trackGAEvent('matcher_step', {
          step_index: nextIndex + 1,
          total_steps: totalQuestions,
          question_id: questions[nextIndex].id,
        });
      } else {
        // Compute scoring
        const results = calculateBreedMatches(updatedAnswers, breedsData);
        setMatchResults(results);
        setIsCompleted(true);
        setIsTransitioning(false);
        setSelectedOptionId(null);

        const topMatch = results.matches[0];
        trackGAEvent('matcher_complete', {
          top_match_breed: topMatch ? topMatch.breed.name : 'none',
          top_match_label: topMatch ? topMatch.label : 'none',
          total_matches: results.matches.length,
          filters_applied: Object.keys(updatedAnswers).length,
        });
      }
    }, 240);
  };

  const handleBack = () => {
    if (isTransitioning) return;
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOptionId(null);
    } else if (importedQuizTier && step0Acknowledged) {
      // Go back to step 0
      setStep0Acknowledged(false);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOptionId(null);
    setIsTransitioning(false);
    setIsCompleted(false);
    setMatchResults(null);
    setHasStarted(false);
    setStep0Acknowledged(false);
  };

  const handleResultClick = (match) => {
    trackGAEvent('matcher_result_click', {
      breed_id: match.breed.id,
      content_slug: match.breed.contentSlug,
      match_label: match.label,
    });
  };

  const handleProductClick = (item) => {
    trackGAEvent('matcher_product_click', {
      product_slug: item.slug,
      product_type: item.type,
    });
  };

  // STEP 0: Show if quiz tier was imported and user hasn't acknowledged yet
  const showStep0 = importedQuizTier && !step0Acknowledged && !isCompleted;

  return (
    <div
      ref={containerRef}
      className="w-full bg-beige/60 border border-charcoal/10 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300 motion-safe:transition-all"
    >
      {/* Screen Reader Progress & Live Announcements */}
      <div aria-live="polite" className="sr-only">
        {isCompleted
          ? 'Breed Matcher assessment complete. Viewing your personalized breed recommendations and adoption checklist.'
          : showStep0
          ? 'Step 0: Medical allergy assessment imported from quiz.'
          : `Question ${currentIndex + 1} of ${totalQuestions}: ${currentQuestion?.question}`}
      </div>

      {/* STEP 0: ALLERGY QUIZ TIER GATE */}
      {showStep0 && (
        <div className="space-y-6">
          {importedQuizTier === 'red_flag' ? (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="inline-block bg-red-200 text-red-900 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Clinical Alert: Allergy Quiz Red-Flag
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-red-950">
                    Consult an Allergist Before Exploring Breeds
                  </h3>
                  <p className="text-sm sm:text-base text-red-900 leading-relaxed">
                    Based on your recent Allergy Severity Quiz, you reported severe symptoms such as breathing difficulties, asthma flare-ups, or rapid facial swelling.
                  </p>
                  <p className="text-sm sm:text-base text-red-900 font-medium leading-relaxed">
                    <strong>Critical Medical Truth:</strong> No cat breed is 100% hypoallergenic. All cats produce the Fel d 1 protein in their saliva and skin glands. Even low-allergen breeds can trigger life-threatening respiratory events for individuals with severe reactivity. We cannot safely recommend cat breeds without prior evaluation by a board-certified allergist.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/allergy-guide/cat-allergy-testing"
                  className="inline-block bg-red-700 hover:bg-red-800 text-white font-semibold text-sm px-6 py-3 rounded-full text-center transition-colors shadow-xs"
                >
                  Learn About Clinical Allergy Testing →
                </Link>
                <button
                  type="button"
                  onClick={() => setStep0Acknowledged(true)}
                  className="inline-block bg-white hover:bg-red-100 text-red-800 border border-red-300 font-semibold text-sm px-6 py-3 rounded-full transition-colors text-center"
                >
                  I Understand — View Informational Matcher Anyway
                </button>
              </div>
            </div>
          ) : importedQuizTier === 'high' ? (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="inline-block bg-amber-200 text-amber-950 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Quiz Result: High Sensitivity Tier
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                    High Sensitivity Advisory
                  </h3>
                  <p className="text-sm sm:text-base text-amber-900 leading-relaxed">
                    Your allergy assessment indicated high sensitivity. While certain breeds produce less Fel d 1 protein or trap dander more effectively, you will likely require multi-layered management (HEPA filtration, allergen-reducing cat food, and routine hygiene).
                  </p>
                  <p className="text-sm text-amber-900 font-medium">
                    We strongly recommend completing medical IgE testing and scheduling multiple in-person visits with any prospective breed before adopting.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep0Acknowledged(true)}
                  className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-xs"
                >
                  Continue to Breed Matcher →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-sage/10 border border-sage/30 rounded-2xl p-6 space-y-3">
              <span className="inline-block bg-sage/20 text-sage text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Quiz Result Imported: {importedQuizTier.toUpperCase()} Sensitivity
              </span>
              <p className="text-sm text-charcoal/80">
                Your allergy profile from the Severity Quiz has been linked. Let’s find which low-allergen breeds match your daily lifestyle and home.
              </p>
              <button
                type="button"
                onClick={() => setStep0Acknowledged(true)}
                className="bg-sage hover:bg-sage/90 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors shadow-xs"
              >
                Start Question 1 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* WIZARD QUESTIONS VIEW */}
      {!isCompleted && !showStep0 && (
        <div className="space-y-6 min-h-[440px] flex flex-col justify-between">
          <div>
            {/* Top Bar: Progress and Step Count */}
            <div className="flex items-center justify-between gap-4 mb-4 text-xs sm:text-sm font-semibold text-charcoal/70">
              <span className="uppercase tracking-wider text-sage font-bold">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{progressPercent}% Complete</span>
            </div>

            {/* Progress Bar Track */}
            <div
              className="w-full h-2.5 bg-cream rounded-full overflow-hidden border border-charcoal/5 mb-6"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Breed matcher progress"
            >
              <div
                className="h-full bg-sage transition-all duration-300 ease-out rounded-full motion-safe:transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Header */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                {currentQuestion.title}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-charcoal leading-snug">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed max-w-2xl">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3" role="radiogroup" aria-label={currentQuestion.question}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id || answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(option)}
                    disabled={isTransitioning}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 motion-safe:transition-all flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-sage text-white border-sage shadow-sm'
                        : 'bg-cream hover:bg-white border-charcoal/10 text-charcoal hover:border-sage/40 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'border-white bg-white' : 'border-charcoal/30 bg-transparent'
                      }`}
                    >
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-sage" />}
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-sm sm:text-base leading-snug block">
                        {option.label}
                      </span>
                      {option.desc && (
                        <span
                          className={`text-xs block leading-relaxed ${
                            isSelected ? 'text-white/90' : 'text-charcoal/70'
                          }`}
                        >
                          {option.desc}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={(currentIndex === 0 && !importedQuizTier) || isTransitioning}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                (currentIndex === 0 && !importedQuizTier) || isTransitioning
                  ? 'text-charcoal/30 cursor-not-allowed'
                  : 'text-charcoal/80 hover:text-charcoal hover:bg-cream'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>

            <span className="text-xs text-charcoal/50">
              Select an option to auto-advance
            </span>
          </div>
        </div>
      )}

      {/* RESULTS VIEW */}
      {isCompleted && matchResults && (
        <div className="space-y-10">
          {/* Header Summary */}
          <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-block bg-sage text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Matcher Results
              </span>
              <span className="text-xs text-charcoal/60">
                {matchResults.matches.length} Breeds Evaluated
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
              Your Personalized Hypoallergenic Breed Matches
            </h2>

            {!matchResults.hasStrongMatch && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 space-y-1">
                <p className="font-semibold">Honest Matching Advisory:</p>
                <p>
                  No breeds emerged as a <strong>Strong Match</strong> for your exact combination of lifestyle preferences and constraints. Below are the closest compatible options based on your answers.
                </p>
              </div>
            )}

            {matchResults.matches.length < 3 && (
              <div className="bg-beige border border-charcoal/10 rounded-xl p-4 text-xs sm:text-sm text-charcoal/80">
                Only {matchResults.matches.length} breed(s) in our catalog passed your filters. We display only verified hypoallergenic breeds and never pad recommendations.
              </div>
            )}

            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Every breed below has been scored against your household, home space, grooming availability, budget, and activity preferences. Read each breed’s conservative allergen reality before considering adoption.
            </p>
          </div>

          {/* Breed Result Cards */}
          <div className="space-y-6">
            {matchResults.matches.map((match) => {
              const { breed, label, reasons } = match;

              let badgeStyle = 'bg-stone-200 text-charcoal';
              if (label === 'Strong') {
                badgeStyle = 'bg-terracotta text-white';
              } else if (label === 'Good') {
                badgeStyle = 'bg-sage text-white';
              }

              let evidenceText = 'Anecdotal Evidence';
              let evidenceStyle = 'bg-stone-100 text-charcoal/70 border-charcoal/10';
              if (breed.evidence === 'limited') {
                evidenceText = 'Scientific Reports (Limited)';
                evidenceStyle = 'bg-blue-50 text-blue-800 border-blue-200';
              } else if (breed.evidence === 'unsupported') {
                evidenceText = 'Unsupported as Allergen-Free';
                evidenceStyle = 'bg-red-50 text-red-800 border-red-200';
              }

              return (
                <div
                  key={breed.id}
                  className="bg-cream border border-charcoal/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Breed Image */}
                    <div className="w-full md:w-56 h-48 sm:h-56 relative rounded-2xl overflow-hidden bg-beige flex-shrink-0 border border-charcoal/5">
                      <Image
                        src={breed.image}
                        alt={`${breed.name} cat portrait`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 224px"
                      />
                    </div>

                    {/* Breed Overview & Reasons */}
                    <div className="flex-grow space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${badgeStyle}`}>
                              {label} Match
                            </span>
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${evidenceStyle}`}>
                              {evidenceText}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                            {breed.name}
                          </h3>
                        </div>

                        <div className="text-xs text-charcoal/60 bg-beige px-3 py-1.5 rounded-lg border border-charcoal/5">
                          Coat: <span className="font-semibold capitalize text-charcoal">{breed.coat.replace(/-/g, ' ')}</span> • Shedding: <span className="font-semibold text-charcoal">{breed.shedding}/5</span>
                        </div>
                      </div>

                      {/* 2-3 Match Reasons */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                          Why this breed matches your answers:
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal/80">
                          {reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-sage font-bold mt-0.5">✓</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Conservative Allergen Note */}
                      <div className="bg-beige/80 border border-charcoal/10 rounded-xl p-4 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/70 flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Allergen Reality Check
                        </span>
                        <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                          {breed.allergenNote}
                        </p>
                      </div>

                      {/* Link to breed post */}
                      <div className="pt-2">
                        <Link
                          href={`/breeds/${breed.contentSlug}`}
                          onClick={() => handleResultClick(match)}
                          className="inline-flex items-center gap-2 bg-sage hover:bg-sage/90 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-colors shadow-xs"
                        >
                          <span>Read In-Depth {breed.name} Guide</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* "BEFORE YOU ADOPT" CHECKLIST */}
          <div className="bg-beige border border-charcoal/10 rounded-3xl p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="inline-block bg-terracotta text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                Crucial Step
              </span>
              <h3 className="text-2xl font-serif font-bold text-charcoal">
                Before You Adopt: The 4-Step Safety Checklist
              </h3>
              <p className="text-sm text-charcoal/80 max-w-2xl">
                Because immune reactions depend on individual Fel d 1 levels and human antibody sensitivity, follow these verified protocols before bringing any cat home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-cream rounded-2xl p-5 border border-charcoal/5 space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-charcoal">
                  <span className="w-6 h-6 rounded-full bg-sage text-white text-xs flex items-center justify-center font-sans">1</span>
                  <h4>Meet the Specific Cat Several Times</h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  Fel d 1 production varies enormously between individual cats of the same breed. Spend 1–2 hours in a closed room with the exact cat you plan to adopt, touching and handling them.
                </p>
              </div>

              <div className="bg-cream rounded-2xl p-5 border border-charcoal/5 space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-charcoal">
                  <span className="w-6 h-6 rounded-full bg-sage text-white text-xs flex items-center justify-center font-sans">2</span>
                  <h4>Inquire About Foster-to-Adopt Trials</h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  Reputable rescues and ethical catteries often allow trial foster periods. This gives your immune system a chance to experience exposure in your own living space over several days.
                </p>
              </div>

              <div className="bg-cream rounded-2xl p-5 border border-charcoal/5 space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-charcoal">
                  <span className="w-6 h-6 rounded-full bg-sage text-white text-xs flex items-center justify-center font-sans">3</span>
                  <h4>Undergo Clinical Allergy Testing</h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  Get certified skin-prick or specific serum IgE blood tests from a board-certified allergist. Explore our{' '}
                  <Link href="/allergy-guide/cat-allergy-testing" className="text-terracotta underline hover:text-terracotta/80 font-semibold">
                    Cat Allergy Testing Guide
                  </Link>{' '}
                  to understand your clinical numbers.
                </p>
              </div>

              <div className="bg-cream rounded-2xl p-5 border border-charcoal/5 space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-charcoal">
                  <span className="w-6 h-6 rounded-full bg-sage text-white text-xs flex items-center justify-center font-sans">4</span>
                  <h4>Explore Shelters and Rescues First</h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  Before paying thousands to commercial breeders, contact breed-specific rescues and local animal shelters. Many adult purebreds and hypoallergenic crosses are waiting for forever homes.
                </p>
              </div>
            </div>
          </div>

          {/* TRAIT-BASED INTERNAL PRODUCT REVIEWS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                  Recommended Home Defenses
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal">
                  Multi-Layered Protection for Allergic Cat Owners
                </h3>
              </div>
              <Link
                href="/product-reviews"
                className="text-xs sm:text-sm font-semibold text-terracotta hover:underline hidden sm:inline-block"
              >
                View All Reviews →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCT_REVIEWS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product-reviews/${item.slug}`}
                  onClick={() => handleProductClick(item)}
                  className="group bg-cream hover:bg-white border border-charcoal/10 hover:border-terracotta rounded-2xl p-5 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal group-hover:text-terracotta transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-terracotta mt-3 inline-flex items-center gap-1 group-hover:underline">
                    Read Review →
                  </span>
                </Link>
              ))}
            </div>

            <AffiliateDisclosure />
          </div>

          {/* VISIBLE DISCLAIMER & ACTION BAR */}
          <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-cream font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retake Breed Matcher</span>
            </button>

            <p className="text-xs text-charcoal/60 text-center sm:text-right max-w-lg">
              <strong>Medical Disclaimer:</strong> This breed matcher is an educational decision-support tool, not a veterinary or clinical diagnosis. Cat allergens (Fel d 1) are produced by all felines. Always consult a qualified medical allergist before adopting a pet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
