"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { company, nav } from "@/data/site";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(ref.current, { yPercent: -100, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });

      // Hide on scroll down, reveal on scroll up; add a background once past the hero.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const el = ref.current!;
          el.dataset.scrolled = String(self.scroll() > 40);
          if (self.scroll() > 300) {
            gsap.to(el, { yPercent: self.direction === 1 ? -110 : 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to(el, { yPercent: 0, duration: 0.3, overwrite: "auto" });
          }
        },
      });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!menuRef.current) return;
      if (open) {
        gsap.fromTo(menuRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.out" });
        gsap.fromTo(".m-link", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.15, ease: "power3.out" });
      }
    },
    { dependencies: [open], scope: menuRef },
  );

  return (
    <>
      <header
        ref={ref}
        data-scrolled="false"
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background,border-color] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-ink/70 data-[scrolled=true]:backdrop-blur-xl"
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3" aria-label={company.name}>
            <span className="pane relative grid size-10 place-items-center overflow-hidden rounded-lg font-display text-lg">
              {company.short}
            </span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase">
              AZ <span className="text-steel">Glass Hardware</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group relative text-sm text-mist transition-colors hover:text-white">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-glass transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-glass hover:bg-glass hover:text-ink md:inline-block"
          >
            Get a quote
          </a>

          <button
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {open && (
        <div ref={menuRef} className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-ink px-8 md:hidden">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="m-link font-display text-5xl">
              {n.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
