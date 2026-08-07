'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const dropdownData = {
  breeds: {
    label: 'Breeds',
    items: [
      { label: 'Best Hypoallergenic Cat Breeds', href: '/breeds/best-hypoallergenic-cat-breeds' },
      { label: 'Siberian Cats', href: '/breeds/siberian-cats' },
      { label: 'Balinese Cat Guide', href: '/breeds/balinese-cat-guide' },
    ],
    viewAll: { label: 'View All Breeds →', href: '/breeds' },
  },
  allergyGuide: {
    label: 'Allergy Guide',
    items: [
      { label: 'What Causes Cat Allergies?', href: '/allergy-guide/what-causes-cat-allergies' },
      { label: 'Cat Allergy Symptoms', href: '/allergy-guide/cat-allergy-symptoms' },
      { label: 'Cat Allergy Testing', href: '/allergy-guide/cat-allergy-testing' },
      { label: 'How Long Do Symptoms Last?', href: '/allergy-guide/how-long-do-cat-allergy-symptoms-last' },
    ],
    viewAll: { label: 'View All Guides →', href: '/allergy-guide' },
  },
  productReviews: {
    label: 'Product Reviews',
    items: [
      { label: 'Best Air Purifiers', href: '/product-reviews/best-air-purifiers-for-cat-allergies' },
      { label: 'Best Allergy Medication', href: '/product-reviews/best-allergy-medication-for-cat-owners' },
      { label: 'Best Cat Food for Allergies', href: '/product-reviews/best-cat-food-for-allergies' },
      { label: 'Best HEPA Vacuums', href: '/product-reviews/best-hepa-vacuum-for-pet-hair' },
    ],
    viewAll: { label: 'View All Reviews →', href: '/product-reviews' },
  },
  tools: {
    label: 'Tools',
    items: [
      { label: 'Allergy Severity Quiz', href: '/tools/allergy-quiz' },
      { label: 'Breed Matcher Tool', href: '/tools/breed-matcher' },
    ],
    viewAll: { label: 'View All Tools →', href: '/tools' },
  },
};

function DesktopDropdown({ data, isOpen, onOpen, onClose, onToggle, isTouchDevice, dropdownRef }) {
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isTouchDevice) {
      onOpen();
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 150);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onToggle}
        onFocus={onOpen}
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-sage transition-colors py-2 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {data.label}
        <svg
          className={`w-3.5 h-3.5 text-charcoal/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-cream rounded-xl border border-sage/15 shadow-lg shadow-charcoal/8 py-2 z-50 transition-all duration-[180ms] ease-out origin-top before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      >
        {data.items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            role="menuitem"
            onClick={onClose}
            className="block px-5 py-2.5 text-sm text-charcoal hover:bg-sage/10 hover:text-sage transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}

        {data.viewAll && (
          <>
            <div className="mx-4 my-2 border-t border-sage/15" />
            <Link
              href={data.viewAll.href}
              role="menuitem"
              onClick={onClose}
              className="block px-5 py-2.5 text-sm font-semibold text-terracotta hover:bg-terracotta/10 transition-colors"
            >
              {data.viewAll.label}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function MobileDropdownSection({ data, isOpen, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2.5 text-base font-medium text-charcoal hover:text-sage transition-colors"
        aria-expanded={isOpen}
      >
        {data.label}
        <svg
          className={`w-4 h-4 text-charcoal/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-4 pb-2 space-y-1">
          {data.items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="block py-2 text-sm text-charcoal/80 hover:text-sage transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}

          {data.viewAll && (
            <>
              <div className="my-2 border-t border-sage/15" />
              <Link
                href={data.viewAll.href}
                className="block py-2 text-sm font-semibold text-terracotta hover:text-terracotta/80 transition-colors"
              >
                {data.viewAll.label}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState({});
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const navRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Close desktop dropdown on click outside
  const handleClickOutside = useCallback((e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setOpenDesktopDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Close desktop dropdown on Escape key (global)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpenDesktopDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMobileDropdown = (key) => {
    setOpenMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dropdownKeys = ['breeds', 'allergyGuide', 'productReviews', 'tools'];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sage/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="h-12 w-auto transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="CatAllergyGuide Logo"
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-sage block leading-none">
                CatAllergyGuide
              </span>
              <span className="text-[11px] font-medium text-sage/80 tracking-wide mt-1 block">
                Love Cats. Breathe Easy. Live Better.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-7 text-sm font-medium text-charcoal">
            {dropdownKeys.map((key) => (
              <DesktopDropdown
                key={key}
                data={dropdownData[key]}
                isOpen={openDesktopDropdown === key}
                onOpen={() => setOpenDesktopDropdown(key)}
                onClose={() => setOpenDesktopDropdown(null)}
                onToggle={() => setOpenDesktopDropdown((prev) => (prev === key ? null : key))}
                isTouchDevice={isTouchDevice}
              />
            ))}
          </nav>

          {/* Allergy Quiz CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              href="/tools/allergy-quiz"
              className="bg-terracotta hover:bg-terracotta/90 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              Allergy Quiz
            </Link>
          </div>

          {/* Mobile / Tablet menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-charcoal hover:text-sage hover:bg-beige transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-out ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream border-t border-sage/10 px-4 pt-3 pb-6 space-y-1 overflow-y-auto max-h-[75vh]">
          {dropdownKeys.map((key) => (
            <MobileDropdownSection
              key={key}
              data={dropdownData[key]}
              isOpen={!!openMobileDropdowns[key]}
              onToggle={() => toggleMobileDropdown(key)}
            />
          ))}

          <div className="pt-4">
            <Link
              href="/tools/allergy-quiz"
              className="block w-full text-center bg-terracotta text-white font-semibold px-5 py-3 rounded-full shadow"
            >
              Allergy Quiz
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
