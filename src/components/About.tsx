"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { company, stats } from "@/data/site";

const statement =
  "For over a decade we have supplied glass fabricators, installers and architects with fittings they can trust — stainless, solid, precisely machined and always in stock.";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Words light up as you scroll through the statement.
      gsap.fromTo(
        ".ab-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".ab-statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      // Count-up numbers.
      gsap.utils.toArray<HTMLElement>(".ab-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString()),
        });
      });

      gsap.from(".ab-stat", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats", start: "top 85%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="about" ref={ref} className="relative mx-auto max-w-7xl px-6 pt-32 pb-8 md:pt-44">
      <p className="mb-10 text-xs tracking-[0.35em] text-glass uppercase">About {company.name}</p>
      <p className="ab-statement font-display text-[clamp(1.9rem,4.2vw,3.8rem)] leading-[1.12]">
        {statement.split(" ").map((w, i) => (
          <span key={i} className="ab-word">
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="ab-stats mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="ab-stat bg-ink p-8 md:p-10">
            <div className="metal-text font-display text-5xl md:text-6xl">
              <span className="ab-num" data-value={s.value}>
                0
              </span>
              {s.suffix}
            </div>
            <div className="mt-3 text-sm text-steel">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
