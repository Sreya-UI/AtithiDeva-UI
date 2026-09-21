"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

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

  // If the user prefers reduced motion, we just show a static grid
  if (reduceMotion) {
    return (
      <div className="grid grid-cols-2 gap-4 h-[600px] overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-4">
          <img src={column1[0].src} alt={column1[0].alt} className="w-full rounded-xl object-cover" />
          <img src={column1[1].src} alt={column1[1].alt} className="w-full rounded-xl object-cover" />
        </div>
        <div className="flex flex-col gap-4 pt-12">
          <img src={column2[0].src} alt={column2[0].alt} className="w-full rounded-xl object-cover" />
          <img src={column2[1].src} alt={column2[1].alt} className="w-full rounded-xl object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[550px] w-full max-w-lg mx-auto overflow-hidden rounded-2xl lg:h-[650px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
      <div className="absolute inset-0 grid grid-cols-2 gap-4 sm:gap-6 px-2">
        
        {/* Column 1: Scrolls Up */}
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex flex-col gap-4 sm:gap-6 w-full absolute top-0 left-0"
          >
            {column1.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="w-full rounded-xl object-cover aspect-[3/4] shadow-float"
              />
            ))}
          </motion.div>
        </div>

        {/* Column 2: Scrolls Down */}
        <div className="relative h-full w-full overflow-hidden">
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
            className="flex flex-col gap-4 sm:gap-6 w-full absolute top-0 left-0"
          >
            {column2.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="w-full rounded-xl object-cover aspect-[3/4] shadow-float"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
