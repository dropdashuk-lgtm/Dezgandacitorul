import type { Area } from "@/types";

// Master Plan §5 — Zone inițiale
export const areas: Area[] = [
  { name: "București", slug: "bucuresti", phase: 1 },
  { name: "Ilfov", slug: "ilfov", phase: 1 },
  { name: "Otopeni", slug: "otopeni", phase: 2 },
  { name: "Voluntari", slug: "voluntari", phase: 2 },
  { name: "Pipera", slug: "pipera", phase: 2 },
  { name: "Chiajna", slug: "chiajna", phase: 2 },
  { name: "Popești-Leordeni", slug: "popesti-leordeni", phase: 2 },
  { name: "Bragadiru", slug: "bragadiru", phase: 2 },
  { name: "Măgurele", slug: "magurele", phase: 2 },
  { name: "Pantelimon", slug: "pantelimon", phase: 2 },
  { name: "Buftea", slug: "buftea", phase: 2 },
  { name: "Tunari", slug: "tunari", phase: 2 },
  { name: "Corbeanca", slug: "corbeanca", phase: 2 },
  { name: "Domnești", slug: "domnesti", phase: 2 },
  { name: "Clinceni", slug: "clinceni", phase: 2 },
  { name: "Berceni", slug: "berceni", phase: 2 },
  { name: "Afumați", slug: "afumati", phase: 2 },
  { name: "Balotești", slug: "balotesti", phase: 2 },
  { name: "Snagov", slug: "snagov", phase: 2 },
];

export const phase1Areas = areas.filter((a) => a.phase === 1);
