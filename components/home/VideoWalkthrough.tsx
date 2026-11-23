"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles, ArrowRight, Lock, CheckCircle2, Film } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";

const videoOptions = [
  {
    id: "quick",
    title: "1-Min Quick Tour",
    badge: "1:07",
    tagline: "High-level overview of core hotel workflows & operations",
    src: "/videos/demo_hotel_1.mp4",
    icon: Sparkles,
  },
  {
    id: "full",
    title: "4-Min Full Walkthrough",
    badge: "4:11",
    tagline: "End-to-end deep dive: front desk check-in, dining POS, folio & night audit",
    src: "/videos/demo_hotel_2.mp4",
    icon: Film,
  },
];

export function VideoWalkthrough() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState<"quick" | "full">("quick");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeOption = videoOptions.find((v) => v.id === activeTab) || videoOptions[0];

  const handleSelectTab = (id: "quick" | "full") => {
    if (activeTab === id) return;
    setActiveTab(id);
    setHasStarted(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="walkthrough" className="relative overflow-hidden border-t border-linen py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-paper via-ivory to-paper">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,160,80,0.12),transparent_70%)] blur-3xl" />
      </div>

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brass-soft/50 bg-brass-wash/80 px-4 py-1 text-[0.78rem] font-semibold tracking-wide text-brass mb-3.5 shadow-sm">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              Interactive Video Walkthrough
            </span>
            <h2 className="optical-display text-[2.2rem] leading-[1.08] font-medium tracking-tight sm:text-[2.8rem] lg:text-[3.2rem]">
              See how AtithiDeva runs your hotel floor
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.68] text-ink-70">
              Watch how reservations, guest check-in, restaurant orders, billing and the night audit connect seamlessly in real time.
            </p>
          </Reveal>

          {/* Video Switcher Tabs */}
          <div className="mt-8 flex justify-center">
            <Reveal index={1}>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-linen bg-white/90 p-1.5 shadow-md backdrop-blur-md">
                {videoOptions.map((opt) => {
                  const isActive = activeTab === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectTab(opt.id as "quick" | "full")}
                      className={`inline-flex items-center gap-2.5 rounded-full px-4 sm:px-6 py-2.5 text-xs sm:text-[0.88rem] font-semibold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-navy text-white shadow-[0_4px_16px_rgba(25,58,107,0.3)] scale-[1.02]"
                          : "text-ink-70 hover:text-navy hover:bg-navy-wash/60"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-brass" : "text-ink-40"}`} />
                      <span>{opt.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-paper text-ink-50 border border-linen"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-ink-50 italic">
                {activeOption.tagline}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Video Player Device Frame */}
        <div className="mt-10 lg:mt-14">
          <Reveal index={2}>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-linen bg-ink shadow-[0_25px_60px_-15px_rgba(25,58,107,0.22)]">
              {/* Browser Mockup Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56] opacity-80" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-80" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F] opacity-80" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[0.72rem] text-white/70">
                  <Lock className="h-3 w-3 text-brass" />
                  <span>https://atithideva.app/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brass/20 px-2 py-0.5 text-[0.68rem] font-semibold text-brass">
                    {activeOption.badge}
                  </span>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" title="System Live" />
                </div>
              </div>

              {/* Video Player Area */}
              <div className="relative aspect-video w-full bg-black group">
                <video
                  key={activeOption.src}
                  ref={videoRef}
                  src={activeOption.src}
                  playsInline
                  controls={hasStarted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="h-full w-full object-contain cursor-pointer"
                  onClick={handlePlayToggle}
                />

                {/* Initial Luxury Play Overlay */}
                {!hasStarted && (
                  <div
                    onClick={handlePlayToggle}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 p-6 text-center backdrop-blur-[2px] transition hover:bg-black/45 cursor-pointer"
                  >
                    <div className="group/btn relative flex h-20 w-20 items-center justify-center rounded-full bg-brass text-navy shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95">
                      <div className="absolute inset-0 rounded-full bg-brass/40 animate-ping" />
                      <Play className="relative h-8 w-8 translate-x-0.5 fill-current" />
                    </div>
                    <p className="mt-5 text-base font-semibold tracking-wide text-white drop-shadow">
                      Play {activeOption.title}
                    </p>
                    <span className="mt-1 text-xs text-white/70 max-w-sm">
                      {activeOption.tagline}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Value Pillars under the video */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          <Reveal index={3}>
            <div className="rounded-2xl border border-linen bg-paper/80 p-5 shadow-sm hover:border-brass-soft transition-colors">
              <div className="flex items-center gap-2.5 text-navy font-semibold text-[0.95rem]">
                <CheckCircle2 className="h-4 w-4 text-brass shrink-0" />
                <span>Single-Click Check-in</span>
              </div>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-70">
                Front desk checks in guests, scans ID, assigns rooms, and issues instant booking vouchers without delays.
              </p>
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="rounded-2xl border border-linen bg-paper/80 p-5 shadow-sm hover:border-brass-soft transition-colors">
              <div className="flex items-center gap-2.5 text-navy font-semibold text-[0.95rem]">
                <CheckCircle2 className="h-4 w-4 text-brass shrink-0" />
                <span>Direct F&B & Folio Settlement</span>
              </div>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-70">
                Restaurant table orders and room service post automatically to room accounts with live GST computation.
              </p>
            </div>
          </Reveal>

          <Reveal index={5}>
            <div className="rounded-2xl border border-linen bg-paper/80 p-5 shadow-sm hover:border-brass-soft transition-colors">
              <div className="flex items-center gap-2.5 text-navy font-semibold text-[0.95rem]">
                <CheckCircle2 className="h-4 w-4 text-brass shrink-0" />
                <span>Zero-Mismatch Night Audit</span>
              </div>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-70">
                Daily closing reconciles payments across card, cash and UPI. Folio balances always match the books.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Reveal index={6}>
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contact" className="shadow-[0_10px_25px_-8px_rgba(25,58,107,0.5)] group">
                Request a personal walkthrough
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="/#quotations" variant="secondary">
                See corporate quotations
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
