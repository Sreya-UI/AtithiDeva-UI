"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
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
  const reduceMotion = useReducedMotion();
  const screen = screens[active];

  return (
    <section
      id="showcase"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading
          marker="Inside AtithiDeva"
          title="The screens your team will actually live in"
          lede={
            <p>
              Dense where the work is dense, quiet everywhere else. Nothing here asks a receptionist
              to hold a number in their head between two screens.
            </p>
          }
        />

        <Reveal index={2}>
          <div
            role="tablist"
            aria-label="Product screens"
            className="mt-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {screens.map((item, index) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`showcase-tab-${item.key}`}
                aria-selected={index === active}
                aria-controls={`showcase-panel-${item.key}`}
                onClick={() => setActive(index)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[0.84rem] whitespace-nowrap transition-colors duration-200",
                  index === active
                    ? "bg-ink text-ivory"
                    : "border border-linen bg-paper text-ink-70 hover:border-brass-soft hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal index={3}>
          <div className="relative mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen.key}
                id={`showcase-panel-${screen.key}`}
                role="tabpanel"
                aria-labelledby={`showcase-tab-${screen.key}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
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

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-[60ch] text-[0.9rem] leading-[1.6] text-ink-70">{screen.caption}</p>
          <DemoNote />
        </div>
      </Container>
    </section>
  );
}
