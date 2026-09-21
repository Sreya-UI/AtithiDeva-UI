import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/screenshots";

type ProductFrameProps = {
  /** Path shown in the frame's address bar. */
  path?: string;
  screenshot?: Screenshot;
  /** Rendered when the screenshot slot is empty. */
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * An application window frame. Neutral enough that a real product screenshot
 * dropped into the slot looks native inside it, and the built-in mockup looks
 * like the same product when the slot is empty.
 */
export function ProductFrame({
  path = "atithideva.app/dashboard",
  screenshot,
  children,
  className,
  bodyClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: ProductFrameProps) {
  const hasImage = Boolean(screenshot?.src);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-linen bg-paper shadow-panel",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-linen bg-[#e9f0f7] px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c7d3de]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#c7d3de]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#c7d3de]" />
        </div>
        <div className="mx-auto flex max-w-[60%] flex-1 items-center justify-center rounded-md bg-ivory px-3 py-1">
          <span className="truncate text-[0.68rem] text-ink-50">{path}</span>
        </div>
        <div aria-hidden className="w-12" />
      </div>

      <div className={cn("relative bg-paper", bodyClassName)}>
        {hasImage && screenshot?.src ? (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
