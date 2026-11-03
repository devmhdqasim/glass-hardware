import { company, nav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="metal-text font-display text-[clamp(3rem,12vw,10rem)] leading-none">AZ</p>
          <p className="mt-2 text-sm text-steel">{company.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-mist">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-steel">
          © 2026 {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
