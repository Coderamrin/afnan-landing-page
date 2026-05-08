"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f9fbf9] -skew-x-12 translate-x-20 z-0 hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[#1a6b2e] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Elegant & Modest Fashion
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] leading-tight mb-6">
            পর্দা এবং স্টাইল <br />
            <span className="text-[#1a6b2e]">একই সাথে</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
            আফনান ফ্যাশনে আমরা নিয়ে এসেছি প্রিমিয়াম কোয়ালিটির বোরকা, হিজাব এবং নিকাব কালেকশন। 
            যা আপনার ব্যক্তিত্বে আনবে মার্জিত সৌন্দর্য এবং নিশ্চিত করবে সর্বোচ্চ আরাম।
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-[#1a6b2e] hover:bg-[#144f22] text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-green-100 flex items-center gap-2"
            >
              কালেকশন দেখুন
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#reviews"
              className="border-2 border-[#1a6b2e] text-[#1a6b2e] hover:bg-[#1a6b2e] hover:text-white font-bold px-10 py-4 rounded-full transition-all"
            >
              রিভিউ দেখুন
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                  <img src={`/images/product-${i}.jpg`} alt="Customer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">৫০০+ সন্তুষ্ট গ্রাহক</p>
              <div className="flex text-yellow-400 text-xs">
                {"★".repeat(5)}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="/images/product-5.jpg" 
              alt="Premium Modest Wear" 
              className="w-full h-[600px] object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
            <p className="text-[#1a6b2e] font-black text-3xl italic">New!</p>
            <p className="text-sm text-gray-500 font-medium">Asiya Collection is now available.</p>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </motion.div>
      </div>
    </section>
  );
}
