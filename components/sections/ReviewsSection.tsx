"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const reviewScreenshots = [
  { src: "/images/review-1.jpg", alt: "গ্রাহকের রিভিউ ১" },
  { src: "/images/review-2.jpg", alt: "গ্রাহকের রিভিউ ২" },
  { src: "/images/review-3.jpg", alt: "গ্রাহকের রিভিউ ৩" },
  { src: "/images/review-4.jpg", alt: "গ্রাহকের রিভিউ ৪" },
  { src: "/images/review-5.jpg", alt: "গ্রাহকের রিভিউ ৫" },
];

export default function ReviewsSection() {
  return (
    <section className="py-12 px-10 bg-[#e8f3e9]">
      {" "}
      {/* হালকা গ্রিন ব্যাকগ্রাউন্ড */}
      <div className="max-w-6xl mx-auto">
        {/* Header - ইমেজের মতো ডিজাইন */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#7a2a3a] mb-2">
            আমাদের গ্রাহকদের মতামত
          </h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-1.5 bg-[#1a6b2e] rounded-sm" />
            ))}
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="review-slider-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1} // মোবাইলে ১টি
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 }, // ট্যাবে ২টি
              1024: { slidesPerView: 3 }, // ডেসকটপে ৩টি (ইমেজের মতো)
            }}
            className="pb-12"
          >
            {reviewScreenshots.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6">
          <a
            href="#order"
            className="inline-flex items-center gap-2 bg-[#1a6b2e] hover:bg-[#144f22] text-white font-bold text-lg px-8 py-3 rounded-full transition-all shadow-lg"
          >
            🛒 অর্ডার করতে এখানে ক্লিক করুন
          </a>
        </div>
      </div>
      {/* কাস্টম স্টাইল ডট ইন্ডিকেটরের জন্য */}
      <style jsx global>{`
        .review-slider-container .swiper-pagination-bullet {
          background: #000 !important;
          opacity: 0.3;
        }
        .review-slider-container .swiper-pagination-bullet-active {
          background: #1a6b2e !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
