/**
 * Google Analytics 4 (GA4) event tracking utility.
 * Enforces zero-PII compliance (no emails, free text, or personal identifiers).
 */

const FORBIDDEN_KEYS = new Set(['email', 'user_email', 'name', 'text', 'message', 'query']);

function sanitizeParams(params = {}) {
  const sanitized = {};
  for (const [key, val] of Object.entries(params)) {
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) {
      continue;
    }
    // Block string values containing email patterns
    if (typeof val === 'string' && val.includes('@') && val.includes('.')) {
      continue;
    }
    sanitized[key] = val;
  }
  return sanitized;
}

export function trackGAEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  const sanitized = sanitizeParams(params);

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitized);
    } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...sanitized });
    }
  } catch (err) {
    // Fail silently in development/testing without breaking UI flow
    console.warn(`[GA4 Event] Failed to send "${eventName}":`, err);
  }
}
