import { cn } from "@/lib/utils";

/**
 * Every mockup on this site carries one of these. The figures inside product
 * visuals are illustrative, and the site says so rather than implying results.
 */
export function DemoNote({ className, label = "Sample data shown for illustration" }: { className?: string; label?: string }) {
  return (
    <p className={cn("text-[0.74rem] leading-relaxed text-ink-30", className)}>{label}</p>
  );
}
