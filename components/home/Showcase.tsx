"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductFrame } from "@/components/product/ProductFrame";
import { RoomBoard } from "@/components/product/RoomBoard";
import { MockCheckIn, MockCheckout, MockNightAudit } from "@/components/product/mocks";
import { screenshots, type ScreenshotKey } from "@/data/screenshots";
import { cn } from "@/lib/utils";

const screens: {
  key: ScreenshotKey;
  label: string;
  path: string;
  caption: string;
  fallback: ReactNode;
}[] = [
  {
    key: "roomBoard",
    label: "Room board",
    path: "atithideva.app/dashboard/rooms",
    caption: "Every room in one state, with arrivals and departures marked for the day.",
    fallback: <RoomBoard animate={false} />,
  },
  {
    key: "checkIn",
    label: "Check-in",
    path: "atithideva.app/frontdesk/checkin/102",
    caption: "Guest profile, identity, stay dates, meal plan, discount, GST and advance in one form.",
    fallback: <MockCheckIn />,
  },
  {
    key: "checkout",
    label: "Checkout",
    path: "atithideva.app/frontdesk/occupied/102",
    caption: "Grand total, total paid and balance due, read from the booking's payment records.",
    fallback: <MockCheckout />,
  },
  {
    key: "nightAudit",
    label: "Night audit",
    path: "atithideva.app/businessday/night-audit",
    caption: "Revenue by department, collections, cash movement, occupancy, ADR and RevPAR.",
    fallback: <MockNightAudit />,
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const screen = screens[active];

  // Auto-play screen slides every 4.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevTab = () => {
    setActive((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const nextTab = () => {
    setActive((prev) => (prev + 1) % screens.length);
  };

  return (
    <section
      id="showcase"
      className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14 bg-sand/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            marker="Inside AtithiDeva"
            title="The screens your team will actually live in"
            lede={
              <p>
                Dense where the work is dense, quiet everywhere else. Watch the system cycle
                automatically or click any tab to explore.
              </p>
            }
          />

          {/* Manual Previous / Next controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTab}
              aria-label="Previous screen"
              className="flex size-10 items-center justify-center rounded-full border border-linen bg-paper text-ink transition-all hover:border-navy hover:bg-sand/40 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={nextTab}
              aria-label="Next screen"
              className="flex size-10 items-center justify-center rounded-full border border-linen bg-paper text-ink transition-all hover:border-navy hover:bg-sand/40 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <Reveal index={2}>
          <div
            role="tablist"
            aria-label="Product screens"
            className="mt-10 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {screens.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  id={'showcase-tab-' + item.key}
                  aria-selected={isActive}
                  aria-controls={'showcase-panel-' + item.key}
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative shrink-0 rounded-full px-5 py-2.5 text-[0.86rem] font-medium whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden",
                    isActive
                      ? "bg-navy text-white shadow-md font-semibold"
                      : "border border-linen bg-paper text-ink-70 hover:border-brass-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  {/* Subtle timer progress line on active tab */}
                  {isActive && !isPaused && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4.8, ease: "linear" }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brass origin-left"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal index={3}>
          <div className="relative mt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen.key}
                id={'showcase-panel-' + screen.key}
                role="tabpanel"
                aria-labelledby={'showcase-tab-' + screen.key}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductFrame
                  path={screen.path}
                  screenshot={screenshots[screen.key]}
                  sizes="(max-width: 1024px) 100vw, 78vw"
                >
                  {screen.fallback}
                </ProductFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-[60ch] text-[0.94rem] leading-[1.6] text-ink-70 font-medium">{screen.caption}</p>
          <DemoNote />
        </div>
      </Container>
    </section>
  );
}
