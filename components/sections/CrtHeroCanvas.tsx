"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/Button";

const CrtScene = dynamic(
  () =>
    import("@/components/three/CrtScene").then((mod) => mod.CrtScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center bg-surface-high">
        <p className="font-mono text-xs text-muted">Initializing display…</p>
      </div>
    ),
  },
);

const CHANNEL_INTERVAL_MS = 5500;

export function CrtHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [channelIndex, setChannelIndex] = useState(0);

  const nextChannel = useCallback(() => {
    setChannelIndex((c) => (c + 1) % projects.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "100px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion) return;
    const id = window.setInterval(nextChannel, CHANNEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [mounted, reduceMotion, nextChannel]);

  const current = projects[channelIndex];

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="glow-mint relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-low"
        role="img"
        aria-label={`CRT preview showing project channel: ${current.title}`}
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.08)_0px,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_3px)] opacity-40" />
        <div className="aspect-[4/3] w-full min-h-[280px]">
          {mounted ? (
            <CrtScene
              animate={!reduceMotion}
              channelIndex={channelIndex}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-surface-high">
              <p className="font-mono text-xs text-muted">CRT standby</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-wide text-muted sm:text-xs">
        <div className="flex flex-wrap gap-4">
          <span className="text-tertiary/90">
            ● CH {String(channelIndex + 1).padStart(2, "0")}: {current.title}
          </span>
          <span>SIGNAL: PAL 50Hz</span>
          <span>MODEL: RETRO CRT-98</span>
        </div>
        <Button
          variant="secondary"
          type="button"
          onClick={nextChannel}
          className="min-h-9 rounded-lg px-4 py-1.5 text-xs"
        >
          Next Channel
        </Button>
      </div>
    </div>
  );
}
