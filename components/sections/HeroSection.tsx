"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";


export default function FeaturedProductSlider({ productImages }: { productImages: { src: string, alt: string }[] }) {
  return (
    <section className="py-16 bg-[#f9fbf9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* --- আকর্ষণীয় হেডার সেকশন --- */}
        <div className="text-center mb-12">
          <span className="text-[#1a6b2e] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
            Premium Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4">
            আমাদের বিশেষ কালেকশন
          </h2>
          {/* হেডারের নিচের ডিজাইন (ইমেজের মতো ড্যাশ) */}
          <div className="flex justify-center items-center gap-1">
            <div className="w-8 h-1.5 bg-[#1a6b2e] rounded-full"></div>
            <div className="w-8 h-1.5 bg-[#d4a017] rounded-full"></div>
            <div className="w-8 h-1.5 bg-[#1a6b2e] rounded-full"></div>
          </div>
        </div>

        {/* --- স্লাইডার সেকশন --- */}
        <div className="smooth-swiper-container relative group">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            speed={6000} // স্মুথ মুভমেন্টের জন্য ৫-৬ সেকেন্ড
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group overflow-hidden rounded-2xl shadow-lg border-4 border-white transition-all duration-500 hover:shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* ছবির উপর হালকা ওভারলে ইফেক্ট */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- অর্ডারের জন্য কল-টু-অ্যাকশন বাটন --- */}
        <div className="text-center mt-4">
          <a
            href="#order"
            className="inline-flex items-center gap-3 bg-[#1a6b2e] hover:bg-[#144f22] text-white font-black text-xl md:text-2xl px-10 py-3 rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_rgba(26,107,46,0.3)] animate-pulse-slow"
          >
            <span className="animate-bounce">🛒</span>
            অর্ডার করতে এখানে ক্লিক করুন
          </a>
          <p className="mt-4 text-gray-500 text-sm italic">
            * স্টোক সীমিত, দ্রুত আপনার পছন্দের বোরকাটি বেছে নিন
          </p>
        </div>
      </div>

      {/* কাস্টম স্টাইলস */}
      <style jsx global>{`
        /* লিনিয়ার মুভমেন্ট নিশ্চিত করার জন্য */
        .smooth-swiper-container .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        /* ডট ইন্ডিকেটর ডিজাইন */
        .smooth-swiper-container .swiper-pagination-bullet {
          background: #d1d1d1 !important;
          opacity: 1;
        }
        .smooth-swiper-container .swiper-pagination-bullet-active {
          background: #1a6b2e !important;
          width: 25px;
          border-radius: 10px;
        }

        /* বাটন অ্যানিমেশন */
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
