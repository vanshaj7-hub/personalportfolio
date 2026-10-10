"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { projects } from "@/lib/projects";

const WIDTH = 640;
const HEIGHT = 480;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  zoom: number,
  panX: number,
  panY: number,
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(WIDTH / iw, HEIGHT / ih) * zoom;
  const w = iw * scale;
  const h = ih * scale;
  const x = (WIDTH - w) / 2 + panX;
  const y = (HEIGHT - h) / 2 + panY;
  ctx.drawImage(img, x, y, w, h);
}

function drawScanlines(ctx: CanvasRenderingContext2D, time: number) {
  const offset = (time * 120) % 4;
  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  for (let y = offset; y < HEIGHT; y += 4) {
    ctx.fillRect(0, y, WIDTH, 2);
  }
  ctx.fillStyle = "rgba(78, 222, 163, 0.04)";
  for (let y = offset + 2; y < HEIGHT; y += 4) {
    ctx.fillRect(0, y, WIDTH, 1);
  }
}

function drawNoise(ctx: CanvasRenderingContext2D, intensity: number) {
  if (intensity <= 0) return;
  const count = Math.floor(800 * intensity);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const a = Math.random() * 0.35 * intensity;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1);
  }
}

function drawStaticBurst(ctx: CanvasRenderingContext2D, strength: number) {
  const bands = 12 + Math.floor(strength * 20);
  for (let i = 0; i < bands; i++) {
    const y = Math.random() * HEIGHT;
    const h = 4 + Math.random() * 40 * strength;
    ctx.fillStyle = `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},${255},${0.15 + strength * 0.4})`;
    ctx.fillRect(0, y, WIDTH, h);
  }
  drawNoise(ctx, 0.5 + strength * 0.5);
}

function drawVignette(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.2,
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.75,
  );
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawHud(
  ctx: CanvasRenderingContext2D,
  channelIndex: number,
  time: number,
  live: boolean,
) {
  const project = projects[channelIndex];
  const ch = String(channelIndex + 1).padStart(2, "0");

  ctx.fillStyle = "rgba(16, 20, 21, 0.72)";
  ctx.fillRect(0, 0, WIDTH, 44);
  ctx.fillRect(0, HEIGHT - 36, WIDTH, 36);

  const pulse = live ? 0.5 + Math.sin(time * 6) * 0.5 : 0.3;
  ctx.fillStyle = `rgba(78, 222, 163, ${pulse})`;
  ctx.beginPath();
  ctx.arc(18, 22, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4edea3";
  ctx.font = "bold 13px monospace";
  ctx.fillText("● LIVE", 30, 26);

  ctx.fillStyle = "rgba(224, 227, 229, 0.9)";
  ctx.font = "12px monospace";
  ctx.fillText(`CH ${ch}`, WIDTH - 120, 26);
  ctx.fillText(project.category, WIDTH - 120, HEIGHT - 14);

  ctx.fillStyle = "#e0e3e5";
  ctx.font = "bold 16px monospace";
  ctx.fillText(project.title.toUpperCase(), 16, HEIGHT - 14);

  const barW = 60 + Math.sin(time * 3) * 20;
  ctx.fillStyle = "rgba(78, 222, 163, 0.35)";
  ctx.fillRect(16, 32, barW, 3);
}

function drawPhosphorGlow(ctx: CanvasRenderingContext2D, time: number) {
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = `rgba(78, 222, 163, ${0.03 + Math.sin(time * 2) * 0.02})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = "source-over";
}

type ScreenOptions = {
  active: boolean;
  channelIndex: number;
  animate: boolean;
};

export function useCrtScreenTexture({
  active,
  channelIndex,
  animate,
}: ScreenOptions) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const channelRef = useRef(channelIndex);
  const switchStartRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(projects.map((p) => loadImage(p.image)))
      .then((imgs) => {
        if (!cancelled) imagesRef.current = imgs;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (channelRef.current !== channelIndex) {
      channelRef.current = channelIndex;
      switchStartRef.current = performance.now();
    }
  }, [channelIndex]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    setTexture(tex);

    return () => {
      tex.dispose();
    };
  }, []);

  useEffect(() => {
    if (!active || !texture) return;

    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    const start = performance.now();

    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      const ch = channelRef.current;
      const img = imagesRef.current[ch];

      const switchAge =
        switchStartRef.current != null
          ? (now - switchStartRef.current) / 1000
          : 999;
      const switching = switchAge < 0.35;
      const switchStrength = switching ? 1 - switchAge / 0.35 : 0;

      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (img) {
        const zoom = animate ? 1.08 + Math.sin(t * 0.4 + ch) * 0.04 : 1.05;
        const panX = animate ? Math.sin(t * 0.55 + ch * 2) * 12 : 0;
        const panY = animate ? Math.cos(t * 0.45 + ch) * 8 : 0;
        drawImageCover(ctx, img, zoom, panX, panY);
      } else {
        ctx.fillStyle = "#0a1628";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }

      if (switching) {
        drawStaticBurst(ctx, switchStrength);
      }

      if (animate && Math.random() < 0.02) {
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.drawImage(canvas, -4, 0);
        ctx.restore();
      }

      drawPhosphorGlow(ctx, t);
      drawScanlines(ctx, t);
      drawHud(ctx, ch, t, animate);
      drawVignette(ctx);
      drawNoise(ctx, animate ? 0.08 : 0.04);

      texture.needsUpdate = true;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, texture, animate]);

  return texture;
}
