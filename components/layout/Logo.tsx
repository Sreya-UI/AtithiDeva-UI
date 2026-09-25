import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * AtithiDeva brand symbol / mark.
 * Uses the authentic golden AD monogram.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/atithiDeva-symbol.png"
      alt="AtithiDeva Symbol"
      width={48}
      height={30}
      className={cn("h-7 w-auto object-contain", className)}
      priority
    />
  );
}

/**
 * Main AtithiDeva Logo component.
 * Uses the official brand logo from /images/atithiDeva.png.
 * On ivory/dark backgrounds, renders the light variant for optimal contrast.
 */
export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <Link
      href="/"
      aria-label="AtithiDeva — home"
      className={cn(
        "group inline-flex items-center transition-opacity hover:opacity-85",
        className,
      )}
    >
      <Image
        src={tone === "ivory" ? "/images/atithiDeva-light.png" : "/images/atithiDeva.png"}
        alt="AtithiDeva"
        width={210}
        height={37}
        className="h-8 lg:h-9 w-auto object-contain"
        priority
      />
    </Link>
  );
}
