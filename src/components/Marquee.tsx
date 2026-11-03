"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const words = ["Hinges", "Patch Fittings", "Spider Systems", "Pull Handles", "Sliding Kits", "Railings", "Clamps", "Locks"];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Infinite loop; scroll velocity speeds it up and flips direction.
      const loop = gsap.to(".mq-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      loop.totalTime(loop.duration() * 1000); // headroom so it can also run in reverse
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const v = self.getVelocity() / 300;
          const dir = self.direction;
          gsap.to(loop, { timeScale: dir * Math.max(1, Math.min(Math.abs(v), 6)), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 });
        },
      });
    },
    { scope: ref },
  );

  const row = [...words, ...words];
  return (
    <div ref={ref} className="relative overflow-hidden border-y border-line bg-ink-2 py-6" aria-hidden>
      <div className="mq-track flex w-max">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 font-display text-4xl text-white/80 md:text-6xl">
            {w}
            <span className="inline-block size-3 rotate-45 border border-glass" />
          </span>
        ))}
      </div>
    </div>
  );
}
