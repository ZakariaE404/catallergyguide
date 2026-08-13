import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://catallergyguide.com'),
  title: {
    default: "CatAllergyGuide — Love Cats. Breathe Easy. Live Better.",
    template: "%s | CatAllergyGuide",
  },
  description: "Expert guidance, trusted resources, and hypoallergenic cat breeds for allergy-sensitive homes.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "CatAllergyGuide — Love Cats. Breathe Easy. Live Better.",
    description: "Expert guidance, trusted resources, and hypoallergenic cat breeds for allergy-sensitive homes.",
    url: 'https://catallergyguide.com',
    siteName: 'CatAllergyGuide',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-cat.jpg',
        width: 1200,
        height: 630,
        alt: 'CatAllergyGuide — Hypoallergenic Cat Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CatAllergyGuide — Love Cats. Breathe Easy. Live Better.",
    description: "Expert guidance, trusted resources, and hypoallergenic cat breeds for allergy-sensitive homes.",
    images: ['/images/hero-cat.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K4X1QBLNM1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K4X1QBLNM1');
        `}
      </Script>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">{children}</body>
    </html>
  );
}
