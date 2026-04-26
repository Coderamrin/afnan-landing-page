import dynamic from "next/dynamic";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import {
  WhatsAppSection,
  Footer,
  WhatsAppFloatButton,
} from "@/components/sections/FooterSection";

const ProductImagesSection = dynamic(
  () => import("@/components/sections/ProductImagesSection"),
);
const ReviewsSection = dynamic(
  () => import("@/components/sections/ReviewsSection"),
);
const OrderSection = dynamic(
  () => import("@/components/sections/OrderSection"),
);

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProductImagesSection />
      <ReviewsSection />
      <WhatsAppSection />
      <OrderSection />
      <Footer />
      <WhatsAppFloatButton />
    </main>
  );
}
