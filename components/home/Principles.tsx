"use client";

import { useState } from "react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

const principles = [
  {
    rule: "A room holds one state",
    body: "Available, Occupied, Cleaning or Maintenance. Arrivals and departures are things the board shows you, not states a room can be parked in.",
  },
  {
    rule: "Bookings decide occupancy",
    body: "A room is occupied because it carries an active booking. Cancelled and checked-out bookings drop out, so they never hold a room off the market.",
  },
  {
    rule: "Checkout reads the ledger",
    body: "The balance comes from the booking's own payment records and pending amount, not from a figure recomputed on screen. Nothing shows as paid that was not collected.",
  },
  {
    rule: "Housekeeping closes the loop",
    body: "A room that checks out is not a room you can sell. It becomes available again after cleaning is completed and reception has inspected it.",
  },
];

export function Principles() {
  // Card 02 selected by default to emphasize selection state without intrusive text
  const [selected, setSelected] = useState(1);

  return (
    <section className="border-t border-linen py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-brass-soft/40 bg-brass-wash/60 px-3 py-1 text-[0.76rem] font-semibold text-brass mb-3.5">
                Operational Architecture
              </span>
              <h2 className="optical-display text-[2rem] leading-[1.1] font-medium sm:text-[2.3rem] lg:text-[2.5rem]">
                Built around the real rhythm of hotel operations
              </h2>
              <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-[1.65] text-ink-70">
                These are not marketing lines. They are the rules the system actually enforces, and
                they are the reason the numbers on the board can be trusted at eleven at night.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle, index) => {
              const isSelected = selected === index;
              return (
                <li
                  key={principle.rule}
                  onClick={() => setSelected(index)}
                  className={'group relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 cursor-pointer ' + (
                    isSelected
                      ? "border-brass bg-gradient-to-br from-brass-wash/80 via-paper to-sand/30 shadow-xl ring-2 ring-brass/35 -translate-y-1.5 z-10"
                      : "border-linen/90 bg-paper hover:-translate-y-1 hover:shadow-lg hover:border-brass-soft/70"
                  )}
                >
                  <Reveal index={index}>
                    <div className="flex items-center justify-between">
                      <span
                        className={'font-display text-[1.4rem] font-medium transition-colors ' + (
                          isSelected ? "text-brass font-bold" : "text-brass-soft/60 group-hover:text-brass"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {isSelected ? (
                        <span className="relative flex size-2.5 items-center justify-center">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brass opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-brass" />
                        </span>
                      ) : (
                        <span className="size-2 rounded-full bg-linen-soft group-hover:bg-brass-soft/60 transition-colors" />
                      )}
                    </div>
                    <h3
                      className={'optical-text font-display text-[1.2rem] leading-snug font-medium mt-3 transition-colors ' + (
                        isSelected ? "text-navy font-bold" : "text-ink group-hover:text-navy"
                      )}
                    >
                      {principle.rule}
                    </h3>
                    <p className="mt-2.5 text-[0.91rem] leading-[1.65] text-ink-70">{principle.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
