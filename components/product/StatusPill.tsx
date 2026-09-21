import { cn } from "@/lib/utils";
import { roomStateLabels, type RoomState } from "@/data/content";

const tone: Record<RoomState, string> = {
  available: "bg-state-available-wash text-state-available",
  occupied: "bg-state-occupied-wash text-state-occupied",
  cleaning: "bg-state-cleaning-wash text-state-cleaning",
  maintenance: "bg-state-maintenance-wash text-state-maintenance",
};

const dot: Record<RoomState, string> = {
  available: "bg-state-available",
  occupied: "bg-state-occupied",
  cleaning: "bg-state-cleaning",
  maintenance: "bg-state-maintenance",
};

export function StatusPill({
  state,
  className,
  size = "md",
}: {
  state: RoomState;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-[0.66rem]" : "px-2.5 py-1 text-[0.72rem]",
        tone[state],
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dot[state])} />
      {roomStateLabels[state]}
    </span>
  );
}
