export default function AffiliateDisclosure({ text }) {
  const disclosureText =
    text ||
    'This post contains affiliate links. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.';

  return (
    <aside className="not-prose my-6 border-l-4 border-sage bg-beige/60 p-3.5 sm:p-4 rounded-r-xl shadow-2xs">
      <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
        <span className="font-semibold text-sage mr-1">Affiliate Disclosure:</span>
        {disclosureText}
      </p>
    </aside>
  );
}
