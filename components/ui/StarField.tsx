"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  twinkle: number;
  twinkleDir: number;
}

interface StarFieldProps {
  numStars?: number;
  speed?: number;
  className?: string;
}

export function StarField({ numStars = 300, speed = 0.2, className = "" }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        speed: Math.random() * speed + 0.05,
        opacity: Math.random() * 0.7 + 0.1,
        twinkle: Math.random() * 0.015 + 0.003,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of starsRef.current) {
        s.opacity += s.twinkle * s.twinkleDir;
        if (s.opacity > 0.9 || s.opacity < 0.05) s.twinkleDir *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();

        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = -2;
          s.x = Math.random() * canvas.width;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [numStars, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
