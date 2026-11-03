import type { ProductIcon as IconName } from "@/data/site";

// Simple line drawings of each hardware family. Strokes use currentColor.
const paths: Record<IconName, React.ReactNode> = {
  hinge: (
    <>
      <rect x="8" y="14" width="14" height="36" rx="2" />
      <rect x="26" y="18" width="30" height="28" rx="3" />
      <path d="M22 26h4M22 38h4" />
      <circle cx="41" cy="32" r="4" />
    </>
  ),
  patch: (
    <>
      <path d="M10 44h44v8H10z" />
      <path d="M16 44V22a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v22" />
      <path d="M26 16v28M38 16v28" opacity=".5" />
    </>
  ),
  spider: (
    <>
      <circle cx="32" cy="32" r="5" />
      <path d="M28 28 14 14M36 28l14-14M28 36 14 50M36 36l14 14" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="52" cy="12" r="4" />
      <circle cx="12" cy="52" r="4" />
      <circle cx="52" cy="52" r="4" />
    </>
  ),
  handle: (
    <>
      <path d="M24 8v48" />
      <path d="M24 14h10M24 50h10" />
      <path d="M34 10v44" strokeWidth="3" />
      <path d="M18 4v56" opacity=".35" />
    </>
  ),
  slide: (
    <>
      <path d="M4 14h56" strokeWidth="3" />
      <circle cx="20" cy="14" r="5" />
      <circle cx="44" cy="14" r="5" />
      <path d="M20 19v8M44 19v8" />
      <rect x="12" y="27" width="40" height="30" rx="1" opacity=".6" />
    </>
  ),
  rail: (
    <>
      <path d="M6 14h52" strokeWidth="3" />
      <rect x="10" y="18" width="44" height="28" rx="1" opacity=".6" />
      <path d="M6 46h52v10H6z" />
      <path d="M14 46v10M50 46v10" opacity=".5" />
    </>
  ),
  clamp: (
    <>
      <path d="M12 12v40" strokeWidth="3" />
      <path d="M12 24h24a8 8 0 0 1 8 8 8 8 0 0 1-8 8H12" />
      <path d="M44 32h14" opacity=".6" />
      <circle cx="28" cy="32" r="2.5" />
    </>
  ),
  lock: (
    <>
      <rect x="14" y="28" width="36" height="26" rx="4" />
      <path d="M22 28v-8a10 10 0 0 1 20 0v8" />
      <circle cx="32" cy="40" r="3" />
      <path d="M32 43v5" />
    </>
  ),
};

export default function ProductIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
