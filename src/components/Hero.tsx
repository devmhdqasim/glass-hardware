"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const lines = ["Hardware that", "holds glass", "beautifully."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-pane", { opacity: 0, scale: 0.6, rotate: (i) => (i % 2 ? 25 : -25), duration: 1.8, stagger: 0.12 })
          .from(".hero-char", { yPercent: 110, rotate: 8, duration: 1.2, stagger: 0.018 }, 0.3)
          .from(".hero-fade", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.9);

        // Panes drift apart on scroll.
        gsap.to(".hero-pane", {
          yPercent: (i) => [-60, -120, -30, -90][i] ?? -50,
          rotate: (i) => (i % 2 ? 12 : -12),
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          yPercent: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Mouse parallax on the pane layer.
        const xTo = gsap.quickTo(".hero-layer", "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(".hero-layer", "y", { duration: 1.2, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 40);
          yTo((e.clientY / window.innerHeight - 0.5) * 40);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-glass/15 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-steel/15 blur-[120px]" />
        <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      {/* Floating glass panes */}
      <div className="hero-layer pointer-events-none absolute inset-0">
        <div className="hero-pane pane absolute top-[14%] right-[8%] h-[46vh] w-[22vw] min-w-40 rounded-2xl" />
        <div className="hero-pane pane absolute top-[38%] right-[24%] h-[36vh] w-[16vw] min-w-32 rounded-2xl" />
        <div className="hero-pane pane absolute right-[34%] bottom-[6%] h-[20vh] w-[14vw] min-w-28 rounded-2xl opacity-60" />
        <div className="hero-pane pane absolute top-[18%] left-[42%] h-[14vh] w-[9vw] min-w-20 rounded-xl opacity-70" />
        {/* A hinge "holding" the biggest pane */}
        <div className="hero-pane absolute top-[30%] right-[calc(8%+22vw-12px)] h-16 w-6 rounded-md bg-gradient-to-b from-white via-steel to-white/80 shadow-lg" />
      </div>

      <div className="hero-copy relative mx-auto w-full max-w-7xl px-6 pt-24">
        <p className="hero-fade mb-6 text-xs tracking-[0.35em] text-glass uppercase">Glass fittings &amp; systems</p>
        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-tight">
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              {line.split("").map((c, ci) => (
                <span key={ci} className={`hero-char inline-block ${li === 2 ? "metal-text italic" : ""}`}>
                  {c === " " ? " " : c}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-fade mt-8 max-w-md text-lg text-mist">
          Hinges, patch fittings, spider systems, handles and railings — engineered for frameless glass in homes,
          shops and towers.
        </p>
        <div className="hero-fade mt-10 flex flex-wrap gap-4">
          <a href="#products" className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-glass">
            Explore products
          </a>
          <a href="#contact" className="rounded-full border border-white/25 px-7 py-3.5 text-sm transition hover:border-white">
            Request a quote
          </a>
        </div>
      </div>

      <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-steel uppercase">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-glass" />
        </span>
      </div>
    </section>
  );
}
