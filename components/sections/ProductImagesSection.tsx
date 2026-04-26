"use client";
import ImageCarousel from "@/components/ui/ImageCarousel";

const productImages = [
  { src: "/images/product-1.jpg", alt: "বোরকা ফ্রন্ট ভিউ" },
  { src: "/images/product-2.jpg", alt: "বোরকা সাইড ভিউ" },
  { src: "/images/product-3.jpg", alt: "হিজাব ক্লোজআপ" },
  { src: "/images/product-4.jpg", alt: "নিকাব ডিটেইল" },
  { src: "/images/product-5.jpg", alt: "ফুল সেট" },
];

const whyItems = [
  { icon: "✅", text: "উন্নত মানের কাপড়, ১০০% পর্দা নিশ্চিত" },
  { icon: "✅", text: "খুলে পড়ে না এমন মজবুত বোরকা" },
  { icon: "✅", text: 'ডিজাইন: ৪৫", সাইজ: ৪৮" থেকে ৫৮"' },
  { icon: "✅", text: "ধোয়া যায় সহজেই মেশিনে" },
  { icon: "✅", text: "ওজন মাত্র ৩৫০-৪০০ গ্রাম" },
  { icon: "✅", text: "ডেলিভারি সারা বাংলাদেশে" },
  { icon: "✅", text: "ক্যাশ অন ডেলিভারি সুবিধা" },
];

export default function ProductImagesSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#1a6b2e] text-sm font-bold uppercase tracking-widest">
            আমাদের পণ্য
          </span>
          <h2 className="text-3xl font-black text-[#1a1a1a] mt-2 mb-3">
            প্রিমিয়াম বোরকা কালেকশন
          </h2>
          <div className="flex justify-center gap-1">
            <div className="w-12 h-1 bg-[#1a6b2e] rounded-full" />
            <div className="w-4 h-1 bg-[#d4a017] rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left - Carousel */}
          <div>
            <ImageCarousel
              images={productImages}
              autoPlayInterval={3500}
              aspectRatio="aspect-[3/4]"
              label="নতুন কালেকশন"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-2xl font-black text-[#1a1a1a] mb-1">
                বোরকা হিজাব নিকাব সেট
              </h3>
              <p className="text-gray-500 text-sm">পরিপূর্ণ পর্দার সমাধান</p>
            </div>

            {/* 🔥 Pricing Section */}
            <div className="relative bg-gradient-to-br from-[#f0faf3] to-white rounded-2xl p-6 border-2 border-[#1a6b2e]/20 shadow-xl overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                🔥 আজকের অফার
              </div>

              {/* Old Price */}
              <p className="text-gray-400 text-sm mb-1">
                রেগুলার মূল্য:{" "}
                <span className="line-through text-red-500 font-semibold">
                  ২৬০০/- টাকা
                </span>
              </p>

              {/* Save */}
              <p className="text-green-700 text-sm font-semibold mb-2">
                🎉 আজই সেভ করুন ২১০ টাকা!
              </p>

              {/* New Price */}
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-[#1a6b2e] leading-none">
                  ২৩৯০/-
                </span>
                <span className="text-gray-600 text-sm mb-1">টাকা</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                  ⚡ সীমিত স্টক
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  ✔ COD Available
                </span>
              </div>

              {/* Trust */}
              <p className="text-xs text-gray-500 mt-3">
                ✔ প্রিমিয়াম কোয়ালিটি ✔ ৭ দিন রিটার্ন ✔ দ্রুত ডেলিভারি
              </p>

              {/* Glow */}
              <div className="absolute -z-10 inset-0 bg-green-400/10 blur-2xl rounded-2xl" />
            </div>

            {/* Why Items */}
            <div className="space-y-2.5">
              <p className="font-bold text-[#1a1a1a] text-sm uppercase tracking-wide">
                কেন এই বোরকা বেস্ট:
              </p>

              {whyItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#order"
              className="block w-full text-center bg-[#1a6b2e] hover:bg-[#144f22] text-white font-black text-lg py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-[#1a6b2e]/25"
            >
              🛒 এখনই অর্ডার করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
