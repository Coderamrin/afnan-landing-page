"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id: "asiya",
    name: "আসিয়া সেট",
    nameEn: "Asiya Set",
    price: "২৪০০",
    originalPrice: "২৯০০",
    image: "/images/product-1.jpg",
    link: "/asiya-set",
    description: "বোরকা + হিজাব + নিকাব — প্রিমিয়াম দুবাই চেরি ফেব্রিক",
    tag: "Best Seller"
  },
  {
    id: "maryam",
    name: "মারইয়াম সেট",
    nameEn: "Maryam Set",
    price: "২২৫০",
    originalPrice: "২৭০০",
    image: "/images/product-2.jpg",
    link: "/maryam-set",
    description: "স্টাইলিশ এবং মার্জিত ডিজাইন, সর্বোচ্চ আরাম নিশ্চিত",
    tag: "New Arrival"
  },
  {
    id: "muslima",
    name: "মুসলিমাহ সেট",
    nameEn: "Muslima Set",
    price: "২৩০০",
    originalPrice: "২৮০০",
    image: "/images/product-3.jpg",
    link: "/muslima-set",
    description: "সিম্পল কিন্তু গর্জিয়াস লুক, প্রতিদিনের ব্যবহারের জন্য সেরা",
    tag: "Premium"
  },
];

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 bg-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#1a6b2e] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6">
            আপনার পছন্দের <span className="text-[#1a6b2e]">সেটটি বেছে নিন</span>
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-1.5 bg-[#1a6b2e] rounded-full"></div>
            <div className="w-4 h-1.5 bg-[#d4a017] rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-green-900/5 group hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-md text-[#1a6b2e] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <Link 
                    href={product.link}
                    className="w-full bg-white text-black font-bold py-4 rounded-2xl text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#1a1a1a] mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{product.nameEn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1a6b2e] font-black text-2xl">৳{product.price}</p>
                    <p className="text-gray-300 text-sm line-through font-bold">৳{product.originalPrice}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={product.link}
                    className="flex items-center justify-center gap-3 w-full bg-[#1a6b2e] hover:bg-[#144f22] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-100 group/btn"
                  >
                    🛒 এখনই কিনুন
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover/btn:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
