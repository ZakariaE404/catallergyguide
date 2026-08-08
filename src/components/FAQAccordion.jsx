'use client';

import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;

          return (
            <div
              key={index}
              className="bg-beige/70 rounded-2xl border border-charcoal/5 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded-2xl group transition-colors duration-200"
              >
                <span className="font-serif font-bold text-base sm:text-lg text-sage group-hover:text-sage/80 pr-4 leading-snug">
                  {faq.question}
                </span>

                <span className="flex-shrink-0 ml-2 p-1 rounded-full bg-cream/80 text-charcoal/70 group-hover:text-sage transition-colors duration-200">
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ease-out ${
                      isOpen ? 'rotate-180 text-terracotta' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-charcoal/85 leading-relaxed font-normal text-sm sm:text-base border-t border-charcoal/5 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
