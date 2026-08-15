"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Boot sequence for the portfolio agent.
 *
 * A single rAF timeline drives everything: `progress` is derived from elapsed
 * time, and the active step is derived from `progress`. That keeps the bar,
 * the percentage and the log in lockstep with no competing timers.
 */

const STEPS = [
  { tool: "boot", label: "initializing runtime", result: "ok" },
  { tool: "load_context", label: "loading résumé context", result: "ready" },
  { tool: "index_projects", label: "indexing projects", result: "10 indexed" },
  { tool: "mount_session", label: "mounting agent session", result: "live" },
] as const;

const DURATION_MS = 2000;
const FADE_MS = 500;

/** Deterministic so server and client markup agree (no hydration mismatch). */
const SPARKS = [
  { left: "12%", top: "22%", color: "#f97316", delay: "0s" },
  { left: "84%", top: "18%", color: "#3b82f6", delay: "0.4s" },
  { left: "22%", top: "76%", color: "#eab308", delay: "0.8s" },
  { left: "72%", top: "68%", color: "#f97316", delay: "1.2s" },
  { left: "50%", top: "12%", color: "#a855f7", delay: "1.6s" },
  { left: "8%", top: "50%", color: "#3b82f6", delay: "2s" },
  { left: "92%", top: "46%", color: "#eab308", delay: "2.4s" },
  { left: "62%", top: "88%", color: "#a855f7", delay: "2.8s" },
];

export default function ModernLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const finished = useRef(false);

  /** Runs at most once, whether reached by timeline or by skipping. */
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setProgress(100);
    setIsComplete(true);
    setTimeout(onComplete, FADE_MS);
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      finish();
      return;
    }

    let frame = 0;

    const tick = () => {
      // performance.now() is measured from navigation start, not from mount.
      // Anchoring here absorbs hydration latency: however long the client
      // takes to boot, the loader still clears ~DURATION_MS after page load
      // instead of stacking a fresh 2s on top of the wait.
      const pct = Math.min(100, (performance.now() / DURATION_MS) * 100);
      setProgress(pct);

      if (pct >= 100) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish]);

  // Any key or click skips straight to the site.
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finish]);

  const activeStep = Math.min(
    STEPS.length - 1,
    Math.floor((progress / 100) * STEPS.length)
  );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background transition-all duration-500 ${
        isComplete ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      {/* Drifting grid */}
      <div
        className="animate-grid-pan absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(249,115,22,0.16), transparent 55%)",
        }}
      />

      {/* Drifting sparks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {SPARKS.map((spark) => (
          <span
            key={spark.left + spark.top}
            className="animate-float-particle absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: spark.left,
              top: spark.top,
              backgroundColor: spark.color,
              animationDelay: spark.delay,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo mark */}
        <div className="relative mx-auto mb-8 h-20 w-20">
          <span className="animate-ping-ring absolute inset-0 rounded-full border border-orange-500/40" />
          <span
            className="animate-ping-ring absolute inset-0 rounded-full border border-orange-500/40"
            style={{ animationDelay: "1s" }}
          />
          <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500" />
          <div className="animate-spin-reverse absolute inset-[3px] rounded-full bg-gradient-to-r from-blue-500 via-transparent to-orange-500" />
          <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-background">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              R
            </span>
          </div>
        </div>

        {/* Boot log */}
        <div className="mb-6 rounded-lg border border-orange-500/20 bg-card/60 p-4 backdrop-blur-sm">
          <div className="space-y-1.5 text-left text-xs">
            {STEPS.map((step, i) => {
              const done = i < activeStep || progress >= 100;
              const active = i === activeStep && progress < 100;
              if (!done && !active) {
                return (
                  <div key={step.tool} className="h-4 opacity-0" aria-hidden />
                );
              }
              return (
                <div
                  key={step.tool}
                  className={`flex items-center gap-2 transition-opacity duration-300 ${
                    done ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <span className="text-blue-400">{step.tool}</span>
                  <span className="truncate text-muted-foreground">
                    {step.label}
                  </span>
                  {done ? (
                    <span className="ml-auto shrink-0 text-green-500">
                      → {step.result}
                    </span>
                  ) : (
                    <span className="animate-blink ml-auto shrink-0 text-orange-500">
                      ▍
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
          <div className="animate-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>booting portfolio agent…</span>
          <span className="tabular-nums text-orange-400">
            {Math.round(progress)}%
          </span>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/60">
          press any key to skip
        </p>
      </div>
    </div>
  );
}
