"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVideo?: "quick" | "full";
}

const modalVideos = {
  quick: {
    title: "1-Min Quick Tour",
    badge: "1:07",
    src: "/videos/demo_hotel_1.mp4",
  },
  full: {
    title: "4-Min Complete Walkthrough",
    badge: "4:11",
    src: "/videos/demo_hotel_2.mp4",
  },
};

export function VideoModal({ isOpen, onClose, defaultVideo = "quick" }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeMode, setActiveMode] = useState<"quick" | "full">(defaultVideo);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setActiveMode(defaultVideo);
  }, [defaultVideo, isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const active = modalVideos[activeMode];

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isOpen, activeMode]);

  const handleSwitchMode = (mode: "quick" | "full") => {
    if (activeMode === mode) return;
    setActiveMode(mode);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar with Video Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brass animate-pulse" />
                <div className="inline-flex rounded-full bg-black/50 p-1 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("quick")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition cursor-pointer ${
                      activeMode === "quick"
                        ? "bg-brass text-navy shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>1-Min Tour</span>
                    <span className="opacity-80 text-[0.68rem]">(1:07)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("full")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition cursor-pointer ${
                      activeMode === "full"
                        ? "bg-brass text-navy shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Film className="h-3 w-3" />
                    <span>4-Min Full Tour</span>
                    <span className="opacity-80 text-[0.68rem]">(4:11)</span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video container */}
            <div className="relative aspect-video w-full bg-black group">
              <video
                key={active.src}
                ref={videoRef}
                src={active.src}
                playsInline
                className="h-full w-full object-contain cursor-pointer"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Big center play icon if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/30 cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brass text-navy shadow-xl transition-transform hover:scale-110">
                    <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                  </div>
                </button>
              )}

              {/* Floating controls bar */}
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 translate-x-0.5 fill-current" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <span className="text-xs text-white/80 font-medium">
                    {active.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
