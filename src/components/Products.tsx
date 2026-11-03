"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { products } from "@/data/site";
import ProductIcon from "./ProductIcon";

export default function Products() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pr-head > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-head", start: "top 85%" },
      });

      gsap.from(".pr-card", {
        y: 80,
        opacity: 0,
        rotateX: -15,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.08, grid: "auto", from: "start" },
        scrollTrigger: { trigger: ".pr-grid", start: "top 80%" },
      });

      // Draw each icon in when its card enters.
      gsap.utils.toArray<SVGElement>(".pr-card svg").forEach((svg) => {
        const shapes = svg.querySelectorAll("path, rect, circle");
        shapes.forEach((s) => {
          const len = (s as SVGGeometryElement).getTotalLength?.() ?? 200;
          gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 90%" },
        });
      });
    },
    { scope: ref },
  );

  // Subtle 3D tilt that follows the cursor.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, duration: 0.5, ease: "power2.out" });
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });

  return (
    <section id="products" ref={ref} className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="pr-head mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs tracking-[0.35em] text-glass uppercase">Product range</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Every fitting, <span className="metal-text italic">one supplier.</span>
          </h2>
        </div>
        <p className="max-w-sm text-mist">
          Eight core families, hundreds of variants — for 8 mm to 19 mm tempered and laminated glass.
        </p>
      </div>

      <div className="pr-grid grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <article
            key={p.title}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="pr-card group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 [transform-style:preserve-3d]"
          >
            {/* Cursor spotlight */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--mx)_var(--my),rgb(159_220_236/0.14),transparent_40%)]" />
            <div className="mb-10 flex items-start justify-between">
              <ProductIcon name={p.icon} className="size-16 text-white" />
              <span className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="text-xl font-medium">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel">{p.desc}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.items.map((it) => (
                <li key={it} className="rounded-full border border-line px-3 py-1 text-xs text-mist">
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
