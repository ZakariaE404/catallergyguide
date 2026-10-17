'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { trackGAEvent } from '@/lib/analytics';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import quizData from '@/data/allergy-quiz-data.json';

const CONTENT_METADATA = {
  // Breeds
  'best-hypoallergenic-cat-breeds': {
    title: 'The 7 Best Hypoallergenic Cat Breeds',
    category: 'breeds',
    badge: 'Breed Guide',
    excerpt: 'Comprehensive comparison of low-Fel d 1 breeds and living suitability.',
  },
  'siberian-cats-hypoallergenic': {
    title: 'Are Siberian Cats Hypoallergenic?',
    category: 'breeds',
    badge: 'Breed Spotlight',
    excerpt: 'Fel d 1 genetics and real-world owner guide for allergy sufferers.',
  },
  'devon-rex-vs-sphynx-allergies': {
    title: 'Devon Rex vs. Sphynx for Allergies',
    category: 'breeds',
    badge: 'Comparison',
    excerpt: 'Comparing curly-coated vs. hairless cats for dander control.',
  },
  'russian-blue-cat-allergies': {
    title: 'Are Russian Blue Cats Hypoallergenic?',
    category: 'breeds',
    badge: 'Breed Spotlight',
    excerpt: 'Naturally lower allergen secretion and dense double-coat grooming tips.',
  },
  // Product Reviews
  'best-air-purifiers-for-cat-allergies': {
    title: '4 Best Air Purifiers for Cat Allergies',
    category: 'product-reviews',
    badge: 'Air Filtration',
    excerpt: 'Top-rated True HEPA filters proven to capture microscopic Fel d 1 dander.',
  },
  'best-cat-food-for-allergies': {
    title: 'Purina Pro Plan LiveClear Tested & Reviewed',
    category: 'product-reviews',
    badge: 'Allergen Neutralizing Food',
    excerpt: 'Egg-based IgY protein diet clinically shown to neutralize salivary Fel d 1.',
  },
  'best-allergy-medication-for-cat-owners': {
    title: 'The Best Allergy Medication for Cat Owners',
    category: 'product-reviews',
    badge: 'Medication Guide',
    excerpt: 'Over-the-counter antihistamines, nasal sprays, and eye drops ranked.',
  },
  'best-hepa-vacuum-for-pet-hair': {
    title: '4 Best HEPA Vacuums for Cat Hair & Dander',
    category: 'product-reviews',
    badge: 'Vacuum Guide',
    excerpt: 'Sealed HEPA systems that trap sticky allergens without blowing them back into the air.',
  },
  // Educational Guides
  'cat-allergy-symptoms': {
    title: 'Cat Allergy Symptoms: Early Signs to Asthma',
    category: 'allergy-guide',
    badge: 'Symptom Guide',
    excerpt: 'Recognizing when upper nasal allergies progress to lower airway reactivity.',
  },
  'cat-allergy-testing': {
    title: 'Cat Allergy Testing: Skin Prick vs. Blood Tests',
    category: 'allergy-guide',
    badge: 'Clinical Testing',
    excerpt: 'How allergists measure specific IgE antibodies and prepare for clinical visits.',
  },
  'what-causes-cat-allergies': {
    title: 'What Causes Cat Allergies? The Fel d 1 Reality',
    category: 'allergy-guide',
    badge: 'Allergy Science',
    excerpt: 'The science behind the 35 kDa secretoglobin protein causing 95% of feline allergies.',
  },
  'how-long-do-cat-allergy-symptoms-last': {
    title: 'How Long Do Cat Allergy Symptoms Last?',
    category: 'allergy-guide',
    badge: 'Recovery Guide',
    excerpt: 'Timeline of symptom clearance after removing dander and environmental hygiene tips.',
  },
};

export default function AllergyQuiz() {
  const { questions, tierThresholds, tierContent, recommendations } = quizData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [householdStatus, setHouseholdStatus] = useState('living_with_cat');
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Result state
  const [resultTier, setResultTier] = useState('mild');
  const [calculatedScore, setCalculatedScore] = useState(0);

  const containerRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Scroll smoothly to container top on step change if offscreen
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentIndex, isCompleted]);

  const handleSelectOption = (option) => {
    if (isTransitioning) return;

    // Fire quiz_start on first question selection
    if (!hasStarted) {
      setHasStarted(true);
      const chosenStatus = option.value || householdStatus;
      trackGAEvent('quiz_start', {
        household_status: chosenStatus,
      });
    }

    setSelectedOptionId(option.id);
    setIsTransitioning(true);

    const updatedAnswers = {
      ...answers,
      [currentIndex]: option,
    };
    setAnswers(updatedAnswers);

    // Save household status if Q1
    let activeHouseholdStatus = householdStatus;
    if (currentQuestion.id === 'household_status' && option.value) {
      activeHouseholdStatus = option.value;
      setHouseholdStatus(option.value);
    }

    // Auto-advance with smooth tactile delay
    setTimeout(() => {
      // 1. Check for Red-Flag option
      if (option.isRedFlag) {
        setResultTier('red_flag');
        setCalculatedScore(0);
        setIsCompleted(true);
        setIsTransitioning(false);
        setSelectedOptionId(null);

        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem('allergy_quiz_tier', 'red_flag');
          }
        } catch (_) {}

        trackGAEvent('quiz_complete', {
          score: 0,
          tier: 'red_flag',
          household_status: activeHouseholdStatus,
        });
        trackGAEvent('quiz_result_tier', {
          tier: 'red_flag',
          score: 0,
          household_status: activeHouseholdStatus,
        });
        return;
      }

      // 2. Next question
      if (currentIndex < totalQuestions - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setSelectedOptionId(null);
        setIsTransitioning(false);

        trackGAEvent('quiz_step', {
          step_index: nextIndex + 1,
          total_steps: totalQuestions,
          question_id: questions[nextIndex].id,
        });
      } else {
        // 3. Final question answered -> Compute score & tier (max possible score is 16)
        let totalScore = 0;
        Object.values(updatedAnswers).forEach((ans) => {
          if (ans && typeof ans.points === 'number') {
            totalScore += ans.points;
          }
        });

        let finalTier = 'mild';
        if (totalScore >= tierThresholds.high.min) {
          finalTier = 'high';
        } else if (totalScore >= tierThresholds.moderate.min) {
          finalTier = 'moderate';
        }

        setCalculatedScore(totalScore);
        setResultTier(finalTier);
        setIsCompleted(true);
        setIsTransitioning(false);
        setSelectedOptionId(null);

        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem('allergy_quiz_tier', finalTier);
          }
        } catch (_) {}

        trackGAEvent('quiz_complete', {
          score: totalScore,
          tier: finalTier,
          household_status: activeHouseholdStatus,
        });
        trackGAEvent('quiz_result_tier', {
          tier: finalTier,
          score: totalScore,
          household_status: activeHouseholdStatus,
        });
      }
    }, 240);
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isTransitioning) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedOptionId(null);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setSelectedOptionId(null);
    setIsTransitioning(false);
    setResultTier('mild');
    setCalculatedScore(0);
    setHasStarted(false);
  };

  const handleRecommendationClick = (type, slug) => {
    trackGAEvent('quiz_recommendation_click', {
      recommendation_type: type,
      slug,
      tier: resultTier || 'red_flag',
      household_status: householdStatus,
    });
  };

  // Determine current active recommendations
  const activeRecs =
    resultTier === 'red_flag'
      ? recommendations.red_flag
      : recommendations[resultTier]?.[householdStatus] || recommendations[resultTier]?.living_with_cat;

  const currentTierInfo = tierContent[resultTier];

  return (
    <div
      ref={containerRef}
      className="w-full bg-beige/60 border border-charcoal/10 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300"
    >
      {/* Screen Reader Progress Announcements */}
      <div aria-live="polite" className="sr-only">
        {isCompleted
          ? `Quiz completed. Your result is: ${currentTierInfo?.name || 'Allergy assessment'}.`
          : `Question ${currentIndex + 1} of ${totalQuestions}: ${currentQuestion?.question}`}
      </div>

      {!isCompleted ? (
        /* QUIZ QUESTION VIEW */
        <div className="space-y-6 min-h-[440px] sm:min-h-[460px] flex flex-col justify-between">
          <div>
            {/* Top Bar: Progress & Step Counter */}
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
              aria-label="Quiz progress"
            >
              <div
                className="h-full bg-sage transition-all duration-300 ease-out rounded-full"
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
                <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* Tap Targets (Options) */}
            <div
              className="space-y-3"
              role="radiogroup"
              aria-label={currentQuestion.question}
            >
              {currentQuestion.options.map((option) => {
                const isSelected =
                  selectedOptionId === option.id || answers[currentIndex]?.id === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isTransitioning}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                      isSelected
                        ? 'bg-sage/15 border-sage shadow-xs ring-2 ring-sage/20'
                        : 'bg-cream hover:bg-[#F3EDE2] border-charcoal/10 hover:border-sage/40 shadow-2xs'
                    }`}
                  >
                    {/* Radio Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'border-sage bg-sage text-white'
                          : 'border-charcoal/30 group-hover:border-sage bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1">
                      <div className="font-semibold text-charcoal text-base sm:text-lg group-hover:text-sage transition-colors leading-snug">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-xs sm:text-sm text-charcoal/70 mt-1 leading-relaxed">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls: Back Button & Context Helper */}
          <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
            {currentIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isTransitioning}
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded-lg px-3 py-1.5 transition-colors"
                aria-label="Back to previous question"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-charcoal/50 italic">
                Select an option to automatically advance
              </span>
            )}

            <span className="text-xs text-charcoal/50 font-medium">
              Educational Assessment
            </span>
          </div>
        </div>
      ) : (
        /* QUIZ RESULT VIEW (Rendered in Component State) */
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  resultTier === 'red_flag'
                    ? 'bg-red-700 text-white'
                    : resultTier === 'high'
                    ? 'bg-terracotta text-white'
                    : resultTier === 'moderate'
                    ? 'bg-terracotta/90 text-white'
                    : 'bg-sage text-white'
                }`}
              >
                {currentTierInfo.badge}
              </span>

              {resultTier !== 'red_flag' && (
                <span className="text-xs font-semibold text-charcoal/60 bg-cream px-3 py-1 rounded-full border border-charcoal/10">
                  Assessment Score: {calculatedScore} / 16
                </span>
              )}

              <span className="text-xs text-charcoal/60 bg-cream px-3 py-1 rounded-full border border-charcoal/10">
                {householdStatus === 'living_with_cat'
                  ? 'Current Cat Owner'
                  : 'Prospective Adopter'}
              </span>
            </div>

            {/* Tier Headline / Title */}
            {resultTier === 'red_flag' ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 sm:p-7 space-y-4 text-red-950">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center flex-shrink-0 text-red-700 font-bold">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-red-900 leading-tight">
                      Please Consult a Doctor or Board-Certified Allergist
                    </h2>
                    <p className="text-sm sm:text-base text-red-900/90 leading-relaxed">
                      {activeRecs.summary}
                    </p>
                  </div>
                </div>

                {/* Emergency Medical Guidance */}
                <div className="bg-red-100/80 border-l-4 border-red-600 rounded-r-xl p-4 text-xs sm:text-sm text-red-950 font-sans leading-relaxed">
                  <p className="font-bold text-red-900 flex items-center gap-1.5 mb-1">
                    <svg className="w-4 h-4 fill-current text-red-700 flex-shrink-0" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Emergency Warning:</span>
                  </p>
                  <p>
                    Seek immediate emergency medical care (call 911 or proceed to the nearest emergency department) if breathing trouble is severe or sudden, or if you experience any swelling of the face, lips, tongue, or throat.
                  </p>
                </div>

                <div className="bg-white/90 rounded-xl p-4 border border-red-200 text-xs sm:text-sm text-red-900 space-y-1.5 font-sans">
                  <p className="font-bold">Clinical Steps for Respiratory Assessment:</p>
                  <ul className="list-disc pl-5 space-y-1 text-red-900/85">
                    <li>Schedule an in-person evaluation with an allergist or pulmonologist for diagnostic spirometry.</li>
                    <li>Discuss prescription controller or rescue inhalers and specific IgE allergy testing.</li>
                    <li>Avoid direct feline contact and vacuuming without a high-efficiency certified HEPA mask until medically cleared.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {resultTier === 'high' ? (
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal leading-tight">
                    Consult an Allergist: Your symptoms suggest high sensitivity to cat allergens.
                  </h2>
                ) : (
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal leading-tight">
                    {currentTierInfo.name}
                  </h2>
                )}

                <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-normal">
                  {activeRecs.summary}
                </p>
              </div>
            )}
          </div>

          {/* RED FLAG: EDUCATIONAL GUIDES (STRICTLY ZERO PRODUCT RECOMMENDATIONS) */}
          {resultTier === 'red_flag' && activeRecs.educationalSlugs && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <h3 className="font-serif font-bold text-xl text-charcoal">
                  Essential Medical & Clinical Resources
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeRecs.educationalSlugs.map((slug) => {
                  const meta = CONTENT_METADATA[slug];
                  if (!meta) return null;

                  return (
                    <Link
                      key={slug}
                      href={`/${meta.category}/${slug}`}
                      onClick={() => handleRecommendationClick('guide', slug)}
                      className="group bg-cream hover:bg-white border border-charcoal/10 hover:border-red-400 rounded-2xl p-5 transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100/70 px-2.5 py-0.5 rounded-md">
                          {meta.badge}
                        </span>
                        <h4 className="font-serif font-bold text-base text-charcoal group-hover:text-red-800 transition-colors leading-snug">
                          {meta.title}
                        </h4>
                        <p className="text-xs text-charcoal/70 leading-relaxed">
                          {meta.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-700 mt-4 inline-flex items-center gap-1 group-hover:underline">
                        Read Clinical Guide →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCORED TIERS: RECOMMENDED BREEDS */}
          {resultTier !== 'red_flag' && activeRecs.breedSlugs && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sage"></span>
                  <h3 className="font-serif font-bold text-xl text-charcoal">
                    {householdStatus === 'thinking_of_adopting'
                      ? 'Recommended Low-Allergen Breeds to Explore'
                      : 'Hypoallergenic Breeds for Comparison'}
                  </h3>
                </div>
                <Link
                  href="/breeds"
                  className="text-xs font-semibold text-sage hover:underline"
                >
                  View All Breeds →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeRecs.breedSlugs.map((slug) => {
                  const meta = CONTENT_METADATA[slug];
                  if (!meta) return null;

                  return (
                    <Link
                      key={slug}
                      href={`/${meta.category}/${slug}`}
                      onClick={() => handleRecommendationClick('breed', slug)}
                      className="group bg-cream hover:bg-white border border-charcoal/10 hover:border-sage rounded-2xl p-5 transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-sage bg-sage/10 px-2.5 py-0.5 rounded-md">
                          {meta.badge}
                        </span>
                        <h4 className="font-serif font-bold text-base text-charcoal group-hover:text-sage transition-colors leading-snug">
                          {meta.title}
                        </h4>
                        <p className="text-xs text-charcoal/70 leading-relaxed">
                          {meta.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-sage mt-4 inline-flex items-center gap-1 group-hover:underline">
                        Explore Breed →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCORED TIERS: RECOMMENDED PRODUCT REVIEWS */}
          {resultTier !== 'red_flag' && activeRecs.productSlugs && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                  <h3 className="font-serif font-bold text-xl text-charcoal">
                    Recommended Allergen-Management Reviews
                  </h3>
                </div>
                <Link
                  href="/product-reviews"
                  className="text-xs font-semibold text-terracotta hover:underline"
                >
                  View All Reviews →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeRecs.productSlugs.map((slug) => {
                  const meta = CONTENT_METADATA[slug];
                  if (!meta) return null;

                  return (
                    <Link
                      key={slug}
                      href={`/${meta.category}/${slug}`}
                      onClick={() => handleRecommendationClick('product_review', slug)}
                      className="group bg-cream hover:bg-white border border-charcoal/10 hover:border-terracotta rounded-2xl p-5 transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-md">
                          {meta.badge}
                        </span>
                        <h4 className="font-serif font-bold text-base text-charcoal group-hover:text-terracotta transition-colors leading-snug">
                          {meta.title}
                        </h4>
                        <p className="text-xs text-charcoal/70 leading-relaxed">
                          {meta.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-terracotta mt-4 inline-flex items-center gap-1 group-hover:underline">
                        Read In-Depth Review →
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Affiliate Disclosure Caption */}
              <AffiliateDisclosure />
            </div>
          )}

          {/* SCORED TIERS: EDUCATIONAL GUIDES */}
          {resultTier !== 'red_flag' && activeRecs.educationalSlugs && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage"></span>
                <h3 className="font-serif font-bold text-xl text-charcoal">
                  Helpful Educational Guides
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeRecs.educationalSlugs.map((slug) => {
                  const meta = CONTENT_METADATA[slug];
                  if (!meta) return null;

                  return (
                    <Link
                      key={slug}
                      href={`/${meta.category}/${slug}`}
                      onClick={() => handleRecommendationClick('guide', slug)}
                      className="group bg-cream hover:bg-white border border-charcoal/10 hover:border-sage rounded-2xl p-5 transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-sage bg-sage/10 px-2.5 py-0.5 rounded-md">
                          {meta.badge}
                        </span>
                        <h4 className="font-serif font-bold text-base text-charcoal group-hover:text-sage transition-colors leading-snug">
                          {meta.title}
                        </h4>
                        <p className="text-xs text-charcoal/70 leading-relaxed">
                          {meta.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-sage mt-4 inline-flex items-center gap-1 group-hover:underline">
                        Read Guide →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Bar: Retake Quiz Button & Medical Disclaimer */}
          <div className="pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-cream font-semibold text-sm px-6 py-3 rounded-full transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retake Allergy Quiz</span>
            </button>

            <p className="text-xs text-charcoal/60 text-center sm:text-right max-w-md">
              Disclaimer: This quiz is an educational self-assessment tool, not a medical diagnosis. Consult a qualified allergist or doctor for personalized medical evaluation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
