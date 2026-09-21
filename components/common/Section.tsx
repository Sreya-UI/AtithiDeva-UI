import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent vertical rhythm + optional tinted surface for every section. */
export function Section({
  id,
  children,
  className,
  tone = "ivory",
  rule = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "ivory" | "paper" | "sand" | "ink";
  rule?: boolean;
}) {
  const tones = {
    ivory: "bg-ivory",
    paper: "bg-paper",
    sand: "bg-sand",
    ink: "bg-ink text-ivory",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-12 sm:py-16 lg:py-20",
        tones[tone],
        rule && "border-t border-linen",
        className,
      )}
    >
      {children}
    </section>
  );
}
