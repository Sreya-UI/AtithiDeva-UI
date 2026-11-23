"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { HeroImageScroll } from "@/components/home/HeroImageScroll";
import { VideoModal } from "@/components/home/VideoModal";

const occupancySplit = [
  { label: "Available", value: 24, className: "text-state-available", dotColor: "bg-emerald-500", pingColor: "bg-emerald-400" },
  { label: "Occupied", value: 18, className: "text-state-occupied", dotColor: "bg-amber-500", pingColor: "bg-amber-400" },
  { label: "Cleaning", value: 5, className: "text-state-cleaning", dotColor: "bg-sky-500", pingColor: "bg-sky-400" },
  { label: "Maintenance", value: 2, className: "text-state-maintenance", dotColor: "bg-rose-500", pingColor: "bg-rose-400" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [hotelName, setHotelName] = useState<string>("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const param = params.get("hotel") || params.get("name");
    if (param) {
      setHotelName(param);
      return;
    }
    const host = window.location.hostname;
    const parts = host.split(".");
    if (parts.length > 2 && parts[0] !== "www" && parts[0] !== "app") {
      const sub = parts[0];
      setHotelName(sub.charAt(0).toUpperCase() + sub.slice(1));
    }
  }, []);

  const fade = reduceMotion
    ? {}
    : {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
    };

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">
      {/* Luminous Ambient Background Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,160,80,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 right-[-10%] h-[450px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(25,58,107,0.08),transparent_70%)] blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
          {/* ---------------------------------------------------------- Copy */}
          <div className="min-w-0 max-w-xl">
            <motion.div
              {...fade}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-brass-soft/50 bg-brass-wash/80 px-4 py-1.5 text-[0.8rem] font-medium text-brass backdrop-blur-md shadow-sm mb-6 hover:scale-[1.02] transition-transform cursor-default"
            >
              <Sparkles aria-hidden className="size-3.5 text-brass" />
              <span>{hotelName ? `The Operating Standard for ${hotelName}` : "The Operating Standard for Luxury & Boutique Hotels"}</span>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[0.8rem] text-ink-50"
            >
              <span aria-hidden className="h-px w-8 bg-brass-soft" />
              <span>{hotelName ? `Direct guest website & operations` : "Hotel operations software"}</span>
            </motion.div>

            <motion.h1
              {...fade}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="optical-display mt-5 text-[2.8rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-[3.6rem] lg:text-[4.1rem]"
            >
              {hotelName ? (
                <>
                  Run the floor at {hotelName}.
                  <br />
                  Close the day.
                </>
              ) : (
                <>
                  Run the floor.
                  <br />
                  Close the day.
                </>
              )}
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[54ch] text-[1.06rem] leading-[1.68] text-ink-70"
            >
              {hotelName || "AtithiDeva"} holds rooms, reservations, guests, housekeeping, restaurant, banquets,
              billing, finance and reporting in one system. The front desk, the floor and the books
              all read from the same records, so the board on the wall and the balance on the folio
              never disagree.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <ButtonLink href="/contact" className="shadow-[0_10px_25px_-8px_rgba(25,58,107,0.5)] hover:shadow-[0_15px_30px_-8px_rgba(25,58,107,0.65)] group">
                Request a demo
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-brass-soft/80 bg-paper px-5 text-[0.88rem] font-medium text-navy transition-all duration-300 hover:scale-[1.03] hover:border-navy hover:bg-navy-wash active:scale-[0.98] shadow-sm group"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/20 text-brass group-hover:bg-brass group-hover:text-navy transition-colors">
                  <Play className="h-3 w-3 translate-x-0.5 fill-current" />
                </span>
                <span>Watch 1-Min Tour</span>
              </button>
              <ButtonLink href="/#quotations" variant="secondary" className="hover:border-navy/30">
                See how a quotation works
              </ButtonLink>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 rounded-2xl border border-linen/80 bg-paper/80 p-5 backdrop-blur-sm shadow-lift"
            >
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {occupancySplit.map((item) => (
                  <div key={item.label} className="group">
                    <dt className="flex items-center gap-2 text-[0.74rem] text-ink-50 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.pingColor} opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${item.dotColor}`} />
                      </span>
                      {item.label}
                    </dt>
                    <dd
                      className={`optical-text mt-1.5 font-display text-[1.75rem] leading-none font-medium transition-transform duration-200 group-hover:scale-105 ${item.className}`}
                    >
                      <AnimatedCounter value={item.value} pad={2} />
                    </dd>
                  </div>
                ))}
              </dl>
              <DemoNote className="mt-3.5" />
            </motion.div>
          </div>

          {/* ------------------------------------------------------- Product */}
          <motion.div
            {...(reduceMotion
              ? {}
              : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-w-0 lg:pl-6"
          >
            <HeroImageScroll />
          </motion.div>
        </div>
      </Container>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </section>
  );
}
