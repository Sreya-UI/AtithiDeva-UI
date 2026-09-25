"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusPill } from "@/components/product/StatusPill";
import { sampleRooms, type RoomState } from "@/data/content";
import { cn } from "@/lib/utils";

type FilterKey = "all" | RoomState | "arrivals" | "departures";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "occupied", label: "Occupied" },
  { key: "cleaning", label: "Cleaning" },
  { key: "maintenance", label: "Maintenance" },
  { key: "arrivals", label: "Arrivals" },
  { key: "departures", label: "Departures" },
];

function matches(filter: FilterKey, room: (typeof sampleRooms)[number]) {
  if (filter === "all") return true;
  if (filter === "arrivals") return room.marker === "arrival";
  if (filter === "departures") return room.marker === "departure";
  return room.state === filter;
}

export function RoomManagement() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const reduceMotion = useReducedMotion();
  const visible = sampleRooms.filter((room) => matches(filter, room));

  return (
    <section id="rooms" className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              marker="Room operations"
              title="The board is the job"
              lede={
                <p>
                  Open a room and the system already knows what you need next. Available goes to
                  check-in, occupied goes to the live stay, cleaning goes to housekeeping, and
                  maintenance goes to the repair record. Try the interactive filters below.
                </p>
              }
            />
            <Reveal index={3}>
              <dl className="mt-10 space-y-5 border-t border-linen pt-7">
                <div className="rounded-xl border border-linen/60 bg-paper/60 p-4 transition-all hover:border-brass-soft/60">
                  <dt className="text-[0.88rem] font-semibold text-ink flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Arrivals and departures
                  </dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[0.92rem] leading-[1.65] text-ink-70">
                    A room shows an arrival when check-in falls on today or the day before, and a
                    departure on the same rule for check-out.
                  </dd>
                </div>
                <div className="rounded-xl border border-linen/60 bg-paper/60 p-4 transition-all hover:border-brass-soft/60">
                  <dt className="text-[0.88rem] font-semibold text-ink flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                    Blocked inventory
                  </dt>
                  <dd className="mt-1.5 max-w-[46ch] text-[0.92rem] leading-[1.65] text-ink-70">
                    Maintenance rooms are treated as blocked stock. They cannot be checked into
                    until they are repaired and released.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal index={2} className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-linen/90 bg-ivory shadow-panel transition-all hover:shadow-2xl">
              <div
                role="tablist"
                aria-label="Room status filters"
                className="flex gap-1.5 overflow-x-auto border-b border-linen bg-paper px-4 py-3 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden"
              >
                {filters.map((item) => {
                  const active = filter === item.key;
                  const count = sampleRooms.filter((room) => matches(item.key, room)).length;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(item.key)}
                      className={cn(
                        "shrink-0 rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer",
                        active
                          ? "bg-navy text-white shadow-sm"
                          : "border border-linen-soft bg-ivory text-ink-70 hover:border-brass-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span data-numeric className="ml-1.5 opacity-75 font-semibold">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[360px] p-4 sm:p-5">
                <motion.ul layout={!reduceMotion} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {visible.map((room) => (
                      <motion.li
                        key={room.number}
                        layout={!reduceMotion}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="group rounded-xl border border-linen bg-paper p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brass-soft/60 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p data-numeric className="text-[1.12rem] font-bold text-ink">
                              {room.number}
                            </p>
                            <p className="text-[0.75rem] text-ink-50">
                              {room.type} · {room.floor}
                            </p>
                          </div>
                          {room.marker ? (
                            <span
                              className={cn(
                                "rounded-full p-1 shadow-sm",
                                room.marker === "arrival"
                                  ? "bg-state-available-wash text-state-available"
                                  : "bg-state-occupied-wash text-state-occupied",
                              )}
                            >
                              {room.marker === "arrival" ? (
                                <ArrowDownLeft aria-hidden className="h-3 w-3" />
                              ) : (
                                <ArrowUpRight aria-hidden className="h-3 w-3" />
                              )}
                              <span className="sr-only">
                                {room.marker === "arrival" ? "Arrival today" : "Departure today"}
                              </span>
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-3.5 flex items-center justify-between gap-2">
                          <StatusPill state={room.state} size="sm" />
                          <span data-numeric className="text-[0.76rem] font-semibold text-ink-70">
                            ₹{room.rate?.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <p className="mt-2.5 truncate text-[0.74rem] font-medium text-ink-50 group-hover:text-ink transition-colors">
                          {room.guest ?? "No active booking"}
                        </p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                {visible.length === 0 ? (
                  <p className="py-16 text-center text-[0.88rem] text-ink-50">
                    No rooms in this view right now.
                  </p>
                ) : null}
              </div>
            </div>
            <DemoNote className="mt-3" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
