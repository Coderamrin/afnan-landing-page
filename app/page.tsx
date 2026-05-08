import Header from "@/components/sections/Header";
import HomeHero from "@/components/sections/HomeHero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProductGrid from "@/components/sections/ProductGrid";
import ReviewsSection from "@/components/sections/ReviewsSection";
import {
  WhatsAppSection,
  Footer,
  WhatsAppFloatButton,
} from "@/components/sections/FooterSection";

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <HomeHero />

      {/* Trust Features Section */}
      <FeaturesSection />

      {/* Product Showcase (The 3 Cards) */}
      <ProductGrid />

      {/* WhatsApp Support Section */}
      <WhatsAppSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatButton />
    </main>
  );
}
