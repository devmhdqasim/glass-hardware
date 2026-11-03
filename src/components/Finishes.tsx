"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { finishes } from "@/data/site";

export default function Finishes() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const f = finishes[active];

  const { contextSafe } = useGSAP(
    () => {
      gsap.fromTo(".fn-swatch", { scale: 0, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        stagger: 0.07,
        duration: 0.8,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".fn-swatches", start: "top 85%" },
      });
      gsap.from(".fn-handle", {
        rotate: -25,
        y: 120,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    },
    { scope: ref },
  );

  // Swap the finish and re-animate the preview.
  const pick = contextSafe((i: number) => {
    if (i === active) return;
    setActive(i);
    gsap.fromTo(".fn-handle-inner", { rotateY: -70 }, { rotateY: 0, duration: 0.9, ease: "power3.out" });
    gsap.fromTo(".fn-name", { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "power3.out" });
  });

  const metal = `linear-gradient(90deg, ${f.from}, ${f.via} 45%, ${f.to} 60%, ${f.via})`;

  return (
    <section id="finishes" ref={ref} className="relative overflow-hidden bg-paper py-32 text-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs tracking-[0.35em] text-[#2b7488] uppercase">Finishes</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Match the hardware <span className="italic">to the room.</span>
          </h2>
          <p className="mt-6 max-w-md text-[#4a525a]">
            Most of our range is available in six PVD and electroplated finishes, built to stay bright in humid
            bathrooms and busy shopfronts.
          </p>

          <div className="fn-swatches mt-12 flex flex-wrap gap-4">
            {finishes.map((s, i) => (
              <button
                key={s.name}
                onClick={() => pick(i)}
                aria-label={s.name}
                aria-pressed={active === i}
                className={`fn-swatch size-14 rounded-full shadow-md ring-offset-4 ring-offset-paper transition-shadow hover:brightness-110 ${
                  active === i ? "ring-2 ring-ink" : ""
                }`}
                style={{ background: `linear-gradient(135deg, ${s.from}, ${s.via} 55%, ${s.to})` }}
              />
            ))}
          </div>
          <div className="mt-8 h-10 overflow-hidden">
            <p className="fn-name font-display text-3xl">{f.name}</p>
          </div>
        </div>

        {/* Pull handle preview on a glass door */}
        <div className="fn-handle relative mx-auto aspect-[3/4] w-full max-w-sm [perspective:1000px]">
          <div className="absolute inset-0 rounded-sm border border-[#b9c7cf] bg-gradient-to-br from-[#dff1f6]/80 via-white/40 to-[#cfe6ee]/70 shadow-2xl" />
          <div className="absolute inset-y-0 left-[18%] w-px bg-white/80" />
          <div className="fn-handle-inner absolute top-[18%] left-1/2 flex h-[64%] -translate-x-1/2 items-center gap-6">
            {[0, 1].map((k) => (
              <div key={k} className="relative h-full">
                <div className="absolute top-[6%] left-1/2 h-3 w-8 -translate-x-1/2 rounded-sm" style={{ background: metal }} />
                <div className="absolute bottom-[6%] left-1/2 h-3 w-8 -translate-x-1/2 rounded-sm" style={{ background: metal }} />
                <div className="h-full w-4 rounded-full shadow-lg" style={{ background: metal }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
