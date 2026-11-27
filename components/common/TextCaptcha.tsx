"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";

const CAPTCHA_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export interface TextCaptchaHandle {
  verify: () => Promise<{ ok: boolean; token?: string; error?: string }>;
  refresh: () => Promise<void>;
}

interface TextCaptchaProps {
  apiBase: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  disabled?: boolean;
}

function generateLocalCanvasCaptcha(): { code: string; imageDataUrl: string } {
  const chars = Array.from({ length: 6 }, () =>
    CAPTCHA_ALPHABET[Math.floor(Math.random() * CAPTCHA_ALPHABET.length)]
  );
  const code = chars.join("");

  const width = 220;
  const height = 64;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return { code, imageDataUrl: "" };
  }

  // Subtle textured gradient background
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#f8fafc");
  grad.addColorStop(0.5, "#eef2ff");
  grad.addColorStop(1, "#f1f5f9");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Interference dots
  for (let i = 0; i < 36; i++) {
    ctx.fillStyle = `rgba(100, 116, 139, ${(0.18 + Math.random() * 0.25).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      0.8 + Math.random() * 1.4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Curved interference lines
  const lineColors = [
    "rgba(30, 58, 138, 0.28)",
    "rgba(180, 130, 60, 0.35)",
    "rgba(71, 85, 105, 0.28)",
    "rgba(15, 23, 42, 0.22)",
  ];
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = lineColors[i % lineColors.length];
    ctx.lineWidth = 1.2 + Math.random() * 0.9;
    ctx.beginPath();
    ctx.moveTo(0, 10 + Math.random() * (height - 20));
    ctx.bezierCurveTo(
      width * 0.3,
      Math.random() * height,
      width * 0.7,
      Math.random() * height,
      width,
      10 + Math.random() * (height - 20)
    );
    ctx.stroke();
  }

  // Draw individual rotated characters
  const charColors = ["#0f172a", "#1e3a8a", "#334155", "#1e293b", "#0f766e", "#3730a3"];
  chars.forEach((char, idx) => {
    const x = 22 + idx * 31 + (Math.random() * 6 - 3);
    const y = 38 + (Math.random() * 10 - 5);
    const angle = (Math.random() * 34 - 17) * (Math.PI / 180);
    const fontSize = 26 + Math.floor(Math.random() * 5);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
    ctx.fillStyle = charColors[idx % charColors.length];
    ctx.textBaseline = "middle";
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });

  return {
    code,
    imageDataUrl: canvas.toDataURL("image/png"),
  };
}

export const TextCaptcha = forwardRef<TextCaptchaHandle, TextCaptchaProps>(
  function TextCaptcha({ apiBase, value, onChange, error, disabled }, ref) {
    const [imageDataUrl, setImageDataUrl] = useState("");
    const [captchaId, setCaptchaId] = useState("");
    const [localAnswer, setLocalAnswer] = useState("");
    const [isServerChallenge, setIsServerChallenge] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const loadingRef = useRef(false);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    const loadChallenge = useCallback(async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setIsLoading(true);
      onChangeRef.current("");

      try {
        const res = await fetch(`${apiBase}/onboarding/captcha`, {
          method: "GET",
          cache: "no-store",
        });
        if (res.ok) {
          const payload = await res.json();
          const data = payload?.data;
          if (payload?.success && data?.captchaId && data?.imageDataUrl) {
            setCaptchaId(data.captchaId);
            setImageDataUrl(data.imageDataUrl);
            setLocalAnswer("");
            setIsServerChallenge(true);
            return;
          }
        }
      } catch {
        // Fallback to local canvas challenge if backend endpoint is unavailable
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }

      const local = generateLocalCanvasCaptcha();
      setCaptchaId("");
      setLocalAnswer(local.code);
      setImageDataUrl(local.imageDataUrl);
      setIsServerChallenge(false);
      setIsLoading(false);
    }, [apiBase]);

    useEffect(() => {
      void loadChallenge();
    }, [loadChallenge]);

    useImperativeHandle(
      ref,
      () => ({
        refresh: loadChallenge,
        verify: async () => {
          const trimmed = value.trim();
          if (!trimmed) {
            return { ok: false, error: "Please enter the CAPTCHA characters shown." };
          }

          if (isServerChallenge && captchaId) {
            try {
              const res = await fetch(`${apiBase}/onboarding/verify-captcha`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ captchaId, code: trimmed }),
              });
              const payload = await res.json().catch(() => null);
              if (res.ok && payload?.success && payload?.data?.verificationToken) {
                return { ok: true, token: payload.data.verificationToken };
              }
              await loadChallenge();
              return {
                ok: false,
                error: payload?.message || "Incorrect CAPTCHA code. Please try again.",
              };
            } catch {
              await loadChallenge();
              return {
                ok: false,
                error: "Could not verify CAPTCHA. Please try again.",
              };
            }
          }

          if (trimmed.toUpperCase() === localAnswer.toUpperCase()) {
            return { ok: true, token: `local_captok_${Date.now()}` };
          }

          await loadChallenge();
          return {
            ok: false,
            error: "Incorrect CAPTCHA code. Please try again.",
          };
        },
      }),
      [apiBase, captchaId, isServerChallenge, loadChallenge, localAnswer, value]
    );

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-sm font-medium text-ink-70">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Security Verification (CAPTCHA) <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-ink-40">Case-insensitive</span>
        </div>

        <div className="rounded-xl border border-ink-10 bg-ink-5/30 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative h-16 w-[220px] rounded-lg border border-ink-15 bg-white overflow-hidden flex items-center justify-center select-none shadow-sm">
              {isLoading || !imageDataUrl ? (
                <span className="text-xs text-ink-40 animate-pulse">Loading CAPTCHA...</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageDataUrl}
                  alt="CAPTCHA security code"
                  className="h-full w-full object-contain pointer-events-none select-none"
                  draggable={false}
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadChallenge()}
              disabled={disabled || isLoading}
              title="Refresh CAPTCHA"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ink-15 bg-white text-xs font-medium text-ink-70 hover:bg-ink-5 hover:text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              New Code
            </button>
          </div>

          <div>
            <input
              type="text"
              autoComplete="off"
              spellCheck={false}
              maxLength={8}
              disabled={disabled}
              value={value}
              onChange={(e) => onChange(e.target.value.replace(/\s+/g, ""))}
              placeholder="Type the 6 characters shown above"
              className={`form-input font-mono tracking-[0.2em] uppercase text-sm ${
                error ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              }`}
            />
            {error && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
