"use client";
import { useState, useEffect, useCallback } from "react";

interface CarouselProps {
  images: { src: string; alt: string; placeholder?: string }[];
  autoPlayInterval?: number; // ms
  aspectRatio?: string;
  label?: string;
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 2000,
  aspectRatio = "aspect-[3/4]",
  label,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval, isPaused]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {label && (
        <div className="absolute top-3 left-3 z-20 bg-[#1a6b2e] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {label}
        </div>
      )}

      {/* Slides */}
      <div
        className={`relative ${aspectRatio} overflow-hidden rounded-2xl bg-gray-100 shadow-lg`}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            {img.src.startsWith("/") || img.src.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Placeholder when no real image */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0faf3] to-[#e8f5ec] text-[#1a6b2e]">
                <div className="text-6xl mb-3">👗</div>
                <p className="text-sm font-semibold opacity-70">{img.alt}</p>
                <p className="text-xs opacity-40 mt-1">
                  {img.placeholder || "ছবি যোগ করুন"}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Nav Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-6 h-2 bg-[#1a6b2e]"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!isPaused && (
        <div className="h-0.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            key={current}
            className="h-full bg-[#1a6b2e] rounded-full"
            style={{
              animation: `progressBar ${autoPlayInterval}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  );
}
