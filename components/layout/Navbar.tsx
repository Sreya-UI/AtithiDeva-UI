"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/common/Button";
import { Logo } from "@/components/layout/Logo";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled || open
          ? "border-b border-brass-soft/25 bg-ivory/85 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(16,39,72,0.07)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6 lg:h-18">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((link) => {
            const active = link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[1rem] font-medium transition-all duration-200",
                    active ? "text-ink font-semibold" : "text-ink-70 hover:text-ink hover:bg-paper/60",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-brass-soft via-brass to-brass-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          
          <ButtonLink href="/register" size="md" className="shadow-[0_4px_14px_rgba(25,58,107,0.35)] hover:shadow-[0_6px_20px_rgba(25,58,107,0.45)]">
            Add your property
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-paper text-ink transition-colors hover:bg-brass-wash lg:hidden"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-linen bg-ivory lg:hidden"
          >
            <div className="shell py-5">
              <ul className="flex flex-col">
                {primaryNav.map((link) => (
                  <li key={link.href} className="border-b border-linen-soft last:border-0">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-[1rem] text-ink transition-colors hover:text-brass"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5">
                <ButtonLink href="/register" onClick={() => setOpen(false)} className="w-full">
                  Add your property
                </ButtonLink>
                
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
