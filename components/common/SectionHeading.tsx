import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Short department or context marker. Sits on the rule above the title. */
  marker?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  marker,
  title,
  lede,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {marker ? (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3 text-[0.78rem] text-ink-50",
              align === "center" && "justify-center",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-brass-soft" />
            <span>{marker}</span>
          </div>
        </Reveal>
      ) : null}

      <Reveal index={1}>
        <Tag
          className={cn(
            "optical-display mt-5 text-[2.1rem] leading-[1.06] font-medium sm:text-[2.6rem] lg:text-[3rem]",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lede ? (
        <Reveal index={2}>
          <div
            className={cn(
              "mt-5 text-[1.02rem] leading-[1.65] text-ink-70",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
