import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryCards from '@/components/CategoryCards';
import ToolsSection from '@/components/ToolsSection';
import BlogPreviewGrid from '@/components/BlogPreviewGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal selection:bg-terracotta/20 selection:text-terracotta">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow space-y-4 md:space-y-8 pb-12">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Four Core Category Cards */}
        <CategoryCards />

        {/* 4. Popular Tools Section */}
        <ToolsSection />

        {/* 5. Recent Blog Articles Grid */}
        <BlogPreviewGrid />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
