"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "💎",
    title: "প্রিমিয়াম কোয়ালিটি",
    description: "আমরা ব্যবহার করি সেরা মানের ফেব্রিক যা টেকসই এবং আরামদায়ক।"
  },
  {
    icon: "🛡️",
    title: "১০০% পর্দা নিশ্চিত",
    description: "আমাদের প্রতিটি পোশাক শরীয়াহ সম্মত এবং শালীনতা বজায় রাখে।"
  },
  {
    icon: "🚚",
    title: "দ্রুত ডেলিভারি",
    description: "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি এবং দ্রুততম সময়ে পণ্য হাতে পান।"
  },
  {
    icon: "⭐",
    title: "সেরা গ্রাহক সেবা",
    description: "আপনার যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিম সবসময় প্রস্তুত।"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-[#f0faf3] text-4xl flex items-center justify-center rounded-3xl mx-auto mb-6 group-hover:bg-[#1a6b2e] group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
