"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { company, products } from "@/data/site";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.from(".ct-title span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-title", start: "top 85%" },
      });
      gsap.from(".ct-fade", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-grid", start: "top 80%" },
      });
    },
    { scope: ref },
  );

  // No backend: opens the visitor's email client with the enquiry pre-filled.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nInterested in: ${d.get("product")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Quote request — " + d.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full border-b border-white/20 bg-transparent py-3 text-white outline-none transition placeholder:text-steel focus:border-glass";

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-t border-line py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-glass/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="ct-title font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
          <span className="block overflow-hidden">
            <span className="inline-block">Let&apos;s fit</span>
          </span>
          <span className="block overflow-hidden">
            <span className="metal-text inline-block italic">your project.</span>
          </span>
        </h2>

        <div className="ct-grid mt-20 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            {[
              ["Call", company.phone, `tel:${company.phone.replace(/\s/g, "")}`],
              ["Email", company.email, `mailto:${company.email}`],
              ["Visit", company.address, undefined],
              ["Hours", company.hours, undefined],
            ].map(([label, value, href]) => (
              <div key={label} className="ct-fade">
                <p className="text-xs tracking-[0.3em] text-steel uppercase">{label}</p>
                {href ? (
                  <a href={href} className="mt-2 block text-2xl transition hover:text-glass">
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-2xl">{value}</p>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="ct-fade pane relative grid gap-6 rounded-3xl p-8 md:grid-cols-2 md:p-10">
            <input required name="name" placeholder="Your name" className={field} />
            <input required name="phone" placeholder="Phone" className={field} />
            <select name="product" className={`${field} md:col-span-2 [&>option]:bg-ink`} defaultValue="">
              <option value="" disabled>
                What do you need?
              </option>
              {products.map((p) => (
                <option key={p.title}>{p.title}</option>
              ))}
              <option>Full project supply</option>
            </select>
            <textarea name="message" rows={4} placeholder="Glass size, thickness, quantity…" className={`${field} resize-none md:col-span-2`} />
            <button className="group relative mt-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium text-ink md:col-span-2 md:justify-self-start">
              <span className="relative z-10">{sent ? "Opening your email…" : "Send enquiry"}</span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-glass transition-transform duration-500 group-hover:scale-x-100" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
