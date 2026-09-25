"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";

const luxurySlides = [
  {
    src: "/images/hotel-pool.jpg",
    title: "Twilight Resort Living",
    subtitle: "Lagoon pool & luxury cabanas",
    tag: "Resorts & Leisure",
  },
  {
    src: "/images/hotel_lobby.jpg",
    title: "Grand Architectural Arrival",
    subtitle: "High-ceiling marble lobby & concierge",
    tag: "Boutique & 5-Star",
  },
  {
    src: "/images/hotel_room.jpg",
    title: "Presidential Executive Suites",
    subtitle: "Panoramic skyline views & private lounge",
    tag: "Luxury Suites",
  },
  {
    src: "/images/hotel_dining.jpg",
    title: "Fine Dining & Gourmet Spaces",
    subtitle: "Integrated table service & KOT orders",
    tag: "Food & Beverage",
  },
  {
    src: "/images/hotel_spa.jpg",
    title: "Serene Wellness & Spa Sanctuary",
    subtitle: "Holistic therapy & retreat suites",
    tag: "Spa & Wellness",
  },
];

export function HotelShowcase() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % luxurySlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + luxurySlides.length) % luxurySlides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % luxurySlides.length);
  };

  const slide = luxurySlides[current];

  return (
    <section className="border-t border-linen bg-ink py-8 text-ivory">
      <Container>
        <div 
          className="relative h-[65vh] min-h-[460px] w-full overflow-hidden rounded-3xl sm:h-[72vh] lg:h-[80vh] shadow-2xl group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="h-full w-full object-cover object-center brightness-[0.88] transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Luxury Gradient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40 pointer-events-none" />

          {/* Slide Info Badge */}
          <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 z-10 max-w-xl">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-[0.76rem] font-semibold text-brass-soft backdrop-blur-md">
                <Sparkles className="size-3 text-brass-soft" />
                {slide.tag}
              </span>
              <h3 className="optical-display mt-3 text-[1.8rem] sm:text-[2.5rem] font-medium leading-tight text-ivory">
                {slide.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] text-ivory/80 font-medium sm:text-[1.05rem]">
                {slide.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-10 flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
            {luxurySlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={'Go to slide ' + (idx + 1)}
                className={'h-1.5 rounded-full transition-all duration-300 cursor-pointer ' + (
                  idx === current ? "w-6 bg-brass-soft" : "w-1.5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
