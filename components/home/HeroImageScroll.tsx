"use client";

import { motion, useReducedMotion } from "framer-motion";

const column1 = [
  { src: "/images/hotel_room.jpg", alt: "Luxury hotel suite" },
  { src: "/images/hotel_dining.jpg", alt: "Fine dining restaurant" },
  { src: "/images/hotel_room.jpg", alt: "Luxury hotel suite" },
  { src: "/images/hotel_dining.jpg", alt: "Fine dining restaurant" },
];

const column2 = [
  { src: "/images/hotel_lobby.jpg", alt: "Grand hotel lobby" },
  { src: "/images/hotel_spa.jpg", alt: "Serene hotel spa" },
  { src: "/images/hotel_lobby.jpg", alt: "Grand hotel lobby" },
  { src: "/images/hotel_spa.jpg", alt: "Serene hotel spa" },
];

export function HeroImageScroll() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="grid grid-cols-2 gap-4 h-[600px] overflow-hidden rounded-3xl border border-linen/60 bg-paper p-3 shadow-panel">
        <div className="flex flex-col gap-4">
          <img src={column1[0].src} alt={column1[0].alt} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lift" />
          <img src={column1[1].src} alt={column1[1].alt} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lift" />
        </div>
        <div className="flex flex-col gap-4 pt-10">
          <img src={column2[0].src} alt={column2[0].alt} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lift" />
          <img src={column2[1].src} alt={column2[1].alt} className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lift" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[560px] w-full max-w-lg mx-auto overflow-hidden rounded-3xl border border-linen/70 bg-gradient-to-b from-paper via-sand/20 to-paper p-3 shadow-panel lg:h-[660px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      {/* Floating Luxury Badge Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-ink/80 px-4 py-2 text-[0.75rem] font-medium text-white backdrop-blur-md shadow-2xl">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Curated 5-Star Operations</span>
        </div>
      </div>

      <div className="absolute inset-0 grid grid-cols-2 gap-4 sm:gap-5 px-3 py-2">
        {/* Column 1: Scrolls Up */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 26,
                ease: "linear",
              },
            }}
            className="flex flex-col gap-4 sm:gap-5 w-full absolute top-0 left-0"
          >
            {column1.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-float transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 2: Scrolls Down */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex flex-col gap-4 sm:gap-5 w-full absolute top-0 left-0"
          >
            {column2.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-float transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
