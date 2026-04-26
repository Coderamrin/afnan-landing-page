'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a6b2e] rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">আ</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1a6b2e] leading-tight">আফনান ফ্যাশন</h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Borka • Hijab • Niqab</p>
          </div>
        </div>
        <a
          href="#order"
          className="bg-[#1a6b2e] hover:bg-[#144f22] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-md shadow-green-200"
        >
          🛒 অর্ডার করুন
        </a>
      </div>
    </header>
  );
}
