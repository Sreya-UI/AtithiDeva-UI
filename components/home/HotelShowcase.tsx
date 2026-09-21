"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/common/Container";

export function HotelShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax effect: moves the background image slightly as the user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="border-t border-linen">
      <div 
        ref={ref}
        className="relative h-[60vh] min-h-[400px] w-full overflow-hidden sm:h-[70vh] lg:h-[80vh]"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[20%] -bottom-[20%] h-[140%] w-full"
        >
          <img
            src="/images/hotel-pool.jpg"
            alt="Luxury hotel resort with a swimming pool at twilight"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        
        {/* Subtle gradient overlay to ensure the image doesn't clash with content above/below */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/20 via-transparent to-ivory/40 pointer-events-none" />
      </div>
    </section>
  );
}
