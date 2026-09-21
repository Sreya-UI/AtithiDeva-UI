"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { roomStateLabels, sampleRooms, type RoomState, type SampleRoom } from "@/data/content";

const FILTERS: { key: "all" | RoomState | "arrivals" | "departures"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "occupied", label: "Occupied" },
  { key: "cleaning", label: "Cleaning" },
  { key: "maintenance", label: "Maintenance" },
  { key: "arrivals", label: "Arrivals" },
  { key: "departures", label: "Departures" },
];

const stateStyles: Record<RoomState, { card: string; text: string; dot: string }> = {
  available: {
    card: "border-linen-soft bg-paper",
    text: "text-state-available",
    dot: "bg-state-available",
  },
  occupied: {
    card: "border-[#e5d5b0] bg-state-occupied-wash",
    text: "text-state-occupied",
    dot: "bg-state-occupied",
  },
  cleaning: {
    card: "border-[#cfdde4] bg-state-cleaning-wash",
    text: "text-state-cleaning",
    dot: "bg-state-cleaning",
  },
  maintenance: {
    card: "border-[#e6cec4] bg-state-maintenance-wash",
    text: "text-state-maintenance",
    dot: "bg-state-maintenance",
  },
};

/**
 * The turnover the board is telling: a departing room checks out, enters the
 * housekeeping cycle, and only then returns as available. One room moves at a
 * time, slowly, so the board reads as a working board rather than a light show.
 */
const CYCLE: RoomState[] = ["occupied", "cleaning", "available"];

function RoomTile({
  room,
  state,
  compact,
}: {
  room: SampleRoom;
  state: RoomState;
  compact?: boolean;
}) {
  const style = stateStyles[state];

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-lg border p-3 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact ? "min-h-[74px]" : "min-h-[92px]",
        style.card,
      )}
    >
      <div className="flex items-start justify-between">
        <span data-numeric className="text-[0.95rem] font-semibold text-ink">
          {room.number}
        </span>
        {room.marker ? (
          <span
            className={cn(
              "rounded-full p-1",
              room.marker === "arrival"
                ? "bg-state-available-wash text-state-available"
                : "bg-state-occupied-wash text-state-occupied",
            )}
            title={room.marker === "arrival" ? "Arrival today" : "Departure today"}
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

      <div className="mt-2">
        <p className="text-[0.7rem] text-ink-50">{room.type}</p>
        <p className={cn("mt-1 flex items-center gap-1.5 text-[0.72rem] font-medium", style.text)}>
          <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
          {roomStateLabels[state]}
        </p>
      </div>
    </div>
  );
}

export function RoomBoard({
  compact = false,
  animate = true,
  className,
}: {
  compact?: boolean;
  animate?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const rooms = useMemo(() => (compact ? sampleRooms.slice(0, 8) : sampleRooms), [compact]);

  // Index into `rooms` of the tile currently being turned over, and its phase.
  const [turnover, setTurnover] = useState<{ room: number; phase: number } | null>(null);

  useEffect(() => {
    if (!animate || reduceMotion) return;

    // Only rooms that start occupied can run the turnover story.
    const candidates = rooms
      .map((room, index) => ({ room, index }))
      .filter(({ room }) => room.state === "occupied")
      .map(({ index }) => index);

    if (candidates.length === 0) return;

    let candidate = 0;
    let phase = 0;

    const tick = () => {
      phase += 1;
      if (phase >= CYCLE.length) {
        phase = 0;
        candidate = (candidate + 1) % candidates.length;
        setTurnover(null);
        return;
      }
      setTurnover({ room: candidates[candidate], phase });
    };

    const id = window.setInterval(tick, 2600);
    return () => window.clearInterval(id);
  }, [animate, reduceMotion, rooms]);

  const resolvedStates = rooms.map((room, index) =>
    turnover && turnover.room === index ? CYCLE[turnover.phase] : room.state,
  );

  const counts = {
    available: resolvedStates.filter((s) => s === "available").length,
    occupied: resolvedStates.filter((s) => s === "occupied").length,
    cleaning: resolvedStates.filter((s) => s === "cleaning").length,
    maintenance: resolvedStates.filter((s) => s === "maintenance").length,
    arrivals: rooms.filter((r) => r.marker === "arrival").length,
    departures: rooms.filter((r) => r.marker === "departure").length,
  };

  const activeRoom = turnover ? rooms[turnover.room] : null;

  return (
    <div className={cn("bg-paper", className)}>
      {/* Board header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linen px-4 py-3 sm:px-5">
        <div>
          <p className="text-[0.86rem] font-semibold text-ink">Room status</p>
          <p className="text-[0.7rem] text-ink-50">
            Business date{" "}
            <span data-numeric>18 Sep</span> · {rooms.length} rooms
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-state-available-wash px-2.5 py-1">
          <span aria-hidden className="atd-live-dot h-1.5 w-1.5 rounded-full bg-state-available" />
          <span className="text-[0.68rem] font-medium text-state-available">Live</span>
        </div>
      </div>

      {/* Filters — the documented filter model */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-linen px-4 py-2.5 sm:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((filter, i) => (
          <span
            key={filter.key}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] whitespace-nowrap",
              i === 0
                ? "bg-ink text-ivory"
                : "border border-linen-soft bg-ivory text-ink-50",
            )}
          >
            {filter.label}
            {filter.key !== "all" ? (
              <span data-numeric className="ml-1 opacity-60">
                {counts[filter.key as keyof typeof counts]}
              </span>
            ) : null}
          </span>
        ))}
      </div>

      {/* Tiles */}
      <div
        className={cn(
          "grid gap-2 p-4 sm:p-5",
          compact ? "grid-cols-4" : "grid-cols-3 sm:grid-cols-4",
        )}
      >
        {rooms.map((room, index) => (
          <RoomTile key={room.number} room={room} state={resolvedStates[index]} compact={compact} />
        ))}
      </div>

      {/* Turnover narration — explains what the board is doing, in product language */}
      <div className="flex min-h-[46px] items-center gap-2 border-t border-linen px-4 py-3 sm:px-5">
        <AnimatePresence mode="wait">
          {activeRoom && turnover ? (
            <motion.p
              key={`${activeRoom.number}-${turnover.phase}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[0.74rem] text-ink-70"
            >
              <span data-numeric className="font-semibold text-ink">
                Room {activeRoom.number}
              </span>{" "}
              {turnover.phase === 1
                ? "checked out. Cleaning required before it can be sold again."
                : "passed reception inspection and is back on the board."}
            </motion.p>
          ) : (
            <motion.p
              key="idle"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.74rem] text-ink-50"
            >
              Every room holds one state. Bookings decide what the card says.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
