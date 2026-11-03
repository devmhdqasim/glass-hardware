// All site copy lives here so it can be edited in one place.
// NOTE: contact details below are placeholders — replace with the real ones.

export const company = {
  name: "AZ Glass Hardware",
  short: "AZ",
  tagline: "Precision hardware for frameless glass.",
  phone: "+00 000 000 0000",
  email: "info@azglasshardware.com",
  address: "Your showroom address, City, Country",
  hours: "Mon – Sat · 9:00 – 19:00",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Applications", href: "#applications" },
  { label: "Finishes", href: "#finishes" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years in the trade" },
  { value: 1200, suffix: "+", label: "Products in stock" },
  { value: 3500, suffix: "+", label: "Projects supplied" },
  { value: 98, suffix: "%", label: "Repeat clients" },
];

export type ProductIcon =
  | "hinge"
  | "patch"
  | "spider"
  | "handle"
  | "slide"
  | "rail"
  | "clamp"
  | "lock";

export const products: {
  title: string;
  desc: string;
  icon: ProductIcon;
  items: string[];
}[] = [
  {
    title: "Shower Hinges",
    desc: "Wall-to-glass and glass-to-glass hinges with soft self-closing action.",
    icon: "hinge",
    items: ["90° / 135° / 180°", "Adjustable", "Solid brass"],
  },
  {
    title: "Patch Fittings",
    desc: "Top, bottom and corner patches for heavy tempered glass doors.",
    icon: "patch",
    items: ["Floor springs", "Top pivots", "Overpanel"],
  },
  {
    title: "Spider Fittings",
    desc: "Point-fixed structural glazing systems for facades and canopies.",
    icon: "spider",
    items: ["1 / 2 / 4 arm", "Routels", "SS 316"],
  },
  {
    title: "Pull Handles",
    desc: "Back-to-back handles from minimal ladder pulls to statement bars.",
    icon: "handle",
    items: ["H-type", "Ladder", "Knobs"],
  },
  {
    title: "Sliding Systems",
    desc: "Top-hung and barn-style rollers for smooth, silent glass sliders.",
    icon: "slide",
    items: ["Soft-close", "Up to 120 kg", "Tracks"],
  },
  {
    title: "Railing Systems",
    desc: "Base shoe channels, standoffs and handrails for balustrades.",
    icon: "rail",
    items: ["U-channels", "Standoffs", "Cap rails"],
  },
  {
    title: "Glass Clamps",
    desc: "Wall, glass-to-glass and stair clamps in every profile.",
    icon: "clamp",
    items: ["Flat back", "Round", "D-shape"],
  },
  {
    title: "Locks & Accessories",
    desc: "Patch locks, door stoppers, seals, gaskets and towel bars.",
    icon: "lock",
    items: ["Patch locks", "Seals", "Stoppers"],
  },
];

export const applications = [
  {
    no: "01",
    title: "Shower Enclosures",
    desc: "Frameless, semi-frameless and sliding shower screens finished with hinges, clamps, seals and stabiliser bars.",
  },
  {
    no: "02",
    title: "Shopfronts & Entrances",
    desc: "Commercial glass doors with patch fittings, floor springs, locks and pull handles built for heavy daily use.",
  },
  {
    no: "03",
    title: "Office Partitions",
    desc: "Clean glass walls and sliding doors with top-hung systems, channels and acoustic seals.",
  },
  {
    no: "04",
    title: "Balustrades & Stairs",
    desc: "Glass railings for balconies, terraces and staircases using base shoes, standoffs and clamps.",
  },
  {
    no: "05",
    title: "Facades & Canopies",
    desc: "Structural point-fixed glazing with spider fittings and routels engineered for wind loads.",
  },
];

export const finishes = [
  { name: "Polished Chrome", from: "#f7f9fb", via: "#9aa5b0", to: "#e8edf1" },
  { name: "Satin Steel", from: "#d9dde1", via: "#a9b0b7", to: "#cfd4d8" },
  { name: "Matte Black", from: "#3a3d41", via: "#141517", to: "#2a2c2f" },
  { name: "Brushed Gold", from: "#f3dc9c", via: "#b88a3e", to: "#e7c87a" },
  { name: "Rose Gold", from: "#f4cdbf", via: "#b77a66", to: "#e6b4a1" },
  { name: "Gunmetal", from: "#7a7f86", via: "#3d4146", to: "#62676d" },
];

export const reasons = [
  {
    title: "Marine-grade materials",
    desc: "SS 304 / 316 and solid brass bodies that resist corrosion in wet areas and coastal sites.",
  },
  {
    title: "Ready stock",
    desc: "A deep warehouse inventory so fabricators and contractors never wait on a job.",
  },
  {
    title: "Technical support",
    desc: "Help choosing the right fitting for glass thickness, weight and load before you order.",
  },
  {
    title: "Trade pricing",
    desc: "Competitive rates for glass shops, installers, architects and project buyers.",
  },
];

export const process = [
  { title: "Consult", desc: "Share your drawings, glass size and thickness, or visit our showroom." },
  { title: "Specify", desc: "We recommend the right hardware, finish and load rating for the job." },
  { title: "Supply", desc: "Pick up from stock or get it delivered straight to site." },
  { title: "Support", desc: "After-sales help with installation, adjustment and replacements." },
];
