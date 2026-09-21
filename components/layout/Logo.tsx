import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The mark is a doorway arch: the threshold a guest is received at.
 * It doubles as a room key bit, which is why the base is notched.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      <path
        d="M4 21V10.5a8 8 0 0 1 16 0V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 21v-9.5a2.5 2.5 0 0 1 5 0V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M2.5 21h19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "ivory" }) {
  return (
    <Link
      href="/"
      aria-label="AtithiDeva — home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-80",
        tone === "ivory" ? "text-ivory" : "text-ink",
        className,
      )}
    >
      <LogoMark className={tone === "ivory" ? "text-brass-soft" : "text-brass"} />
      <span className="optical-text font-display text-[1.28rem] leading-none font-semibold tracking-[-0.02em]">
        AtithiDeva
      </span>
    </Link>
  );
}
