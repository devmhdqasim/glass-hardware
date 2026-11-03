"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { applications } from "@/data/site";

// Abstract glass "scene" per application, drawn with CSS panes.
function Scene({ index }: { index: number }) {
  const layouts = [
    // shower: two tall panes + hinge dots
    <>
      <div className="pane absolute top-[10%] left-[18%] h-[80%] w-[34%] rounded-md" />
      <div className="pane absolute top-[10%] left-[54%] h-[80%] w-[28%] rounded-md" />
      <div className="absolute top-[28%] left-[53%] h-8 w-3 rounded bg-mist" />
      <div className="absolute top-[68%] left-[53%] h-8 w-3 rounded bg-mist" />
    </>,
    // shopfront: wide doors with long handles
    <>
      <div className="pane absolute top-[8%] left-[10%] h-[84%] w-[39%] rounded-sm" />
      <div className="pane absolute top-[8%] left-[51%] h-[84%] w-[39%] rounded-sm" />
      <div className="absolute top-[30%] left-[45%] h-[40%] w-1.5 rounded-full bg-mist" />
      <div className="absolute top-[30%] left-[54%] h-[40%] w-1.5 rounded-full bg-mist" />
    </>,
    // partitions: row of panes
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="pane absolute top-[12%] h-[76%] w-[19%] rounded-sm" style={{ left: `${10 + i * 20.5}%` }} />
      ))}
      <div className="absolute top-[10%] left-[8%] h-1 w-[84%] bg-mist/80" />
    </>,
    // balustrade: stairs of panes with a top rail
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="pane absolute h-[38%] w-[26%] rounded-sm"
          style={{ left: `${12 + i * 26}%`, bottom: `${12 + i * 14}%` }}
        />
      ))}
      <div className="absolute bottom-[50%] left-[10%] h-1 w-[82%] origin-left -rotate-[18deg] rounded-full bg-mist" />
    </>,
    // facade: grid with spider points
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="pane absolute h-[40%] w-[26%] rounded-sm"
          style={{ left: `${10 + (i % 3) * 27}%`, top: `${8 + Math.floor(i / 3) * 42}%` }}
        />
      ))}
      {[0, 1].map((c) => (
        <div
          key={c}
          className="absolute size-4 rounded-full border-2 border-mist bg-ink"
          style={{ left: `calc(${36.5 + c * 27}% - 8px)`, top: "calc(49% - 8px)" }}
        />
      ))}
    </>,
  ];
  return <div className="ap-scene relative h-full w-full">{layouts[index]}</div>;
}

export default function Applications() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin and scroll horizontally.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".ap-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Each panel's scene assembles as it slides into view.
        gsap.utils.toArray<HTMLElement>(".ap-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".ap-scene > *"), {
            y: 80,
            opacity: 0,
            rotate: 6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="applications" ref={ref} className="relative overflow-hidden bg-ink-2 md:h-svh">
      <div className="absolute top-0 left-0 z-10 w-full px-6 pt-24 md:px-12">
        <p className="text-xs tracking-[0.35em] text-glass uppercase">Applications</p>
        <div className="mt-4 h-px w-full max-w-xs overflow-hidden bg-line">
          <div className="ap-progress h-full origin-left scale-x-0 bg-glass" />
        </div>
      </div>

      <div ref={track} className="flex flex-col gap-16 px-6 pt-40 pb-24 md:h-full md:w-max md:flex-row md:items-center md:gap-0 md:px-0 md:py-0">
        <div className="flex shrink-0 flex-col justify-center md:w-[45vw] md:px-12">
          <h2 className="font-display text-5xl leading-none md:text-8xl">
            Built for <br />
            <span className="metal-text italic">every space.</span>
          </h2>
          <p className="mt-6 max-w-sm text-mist">From a single shower screen to a full curtain-wall facade.</p>
        </div>

        {applications.map((a, i) => (
          <article key={a.no} className="ap-panel flex shrink-0 flex-col gap-8 md:w-[70vw] md:flex-row md:items-center md:px-12 lg:w-[60vw]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-[#1b2229] to-ink md:w-1/2">
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-glass/10 blur-3xl" />
              <Scene index={i} />
            </div>
            <div className="md:w-1/2">
              <span className="font-mono text-sm text-glass">{a.no}</span>
              <h3 className="mt-3 font-display text-4xl md:text-5xl">{a.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-mist">{a.desc}</p>
            </div>
          </article>
        ))}
        <div className="hidden shrink-0 md:block md:w-[10vw]" />
      </div>
    </section>
  );
}
