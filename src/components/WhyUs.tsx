"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { process, reasons } from "@/data/site";

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".wy-row").forEach((row) => {
        gsap.from(row, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });

      // Timeline line draws as you scroll; each step lights up when the line reaches it.
      gsap.fromTo(
        ".ps-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ps-list", start: "top 65%", end: "bottom 65%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>(".ps-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="mx-auto grid max-w-7xl gap-24 px-6 py-32 md:py-44 lg:grid-cols-2">
      <div>
        <p className="mb-4 text-xs tracking-[0.35em] text-glass uppercase">Why AZ</p>
        <h2 className="font-display text-5xl leading-none md:text-6xl">
          Trusted by the <span className="metal-text italic">trade.</span>
        </h2>
        <div className="mt-14 divide-y divide-line border-y border-line">
          {reasons.map((r, i) => (
            <div key={r.title} className="wy-row grid grid-cols-[3rem_1fr] gap-4 py-7">
              <span className="font-mono text-sm text-glass">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-medium">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs tracking-[0.35em] text-glass uppercase">How we work</p>
        <h2 className="font-display text-5xl leading-none md:text-6xl">From drawing to door.</h2>
        <ol className="ps-list relative mt-14 space-y-14 pl-10">
          <span className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
          <span className="ps-line absolute top-2 bottom-2 left-[5px] w-px origin-top bg-glass" />
          {process.map((p, i) => (
            <li key={p.title} className="ps-step relative">
              <span className="absolute top-2 -left-10 size-[11px] rounded-full border border-glass bg-ink" />
              <span className="font-mono text-xs text-steel">Step {i + 1}</span>
              <h3 className="mt-1 font-display text-4xl">{p.title}</h3>
              <p className="mt-2 max-w-sm text-mist">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
