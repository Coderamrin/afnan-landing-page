import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import {
    WhatsAppSection,
    Footer,
    WhatsAppFloatButton,
} from "@/components/sections/FooterSection";
import ProductImagesSection from "@/components/sections/ProductImagesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import OrderSection from "@/components/sections/OrderSection";

const productImages = [
    { src: "/images/product-1.jpg", alt: "বোরকা ফ্রন্ট ভিউ" },
    { src: "/images/product-2.jpg", alt: "বোরকা সাইড ভিউ" },
    { src: "/images/product-3.jpg", alt: "হিজাব ক্লোজআপ" },
    { src: "/images/product-4.jpg", alt: "নিকাব ডিটেইল" },
    { src: "/images/product-5.jpg", alt: "ফুল সেট" },
];


export default function Page() {
    return (
        <main>
            <Header />
            <HeroSection productImages={productImages} />
            <ProductImagesSection productImages={productImages} />
            <ReviewsSection />
            <WhatsAppSection />
            <OrderSection />
            <Footer />
            <WhatsAppFloatButton />
        </main>
    );
}
