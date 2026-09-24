import {
  Bug,
  Rat,
  Sprout,
  Bird,
  Flower2,
  Droplets,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  plosnite: Bug,
  gandaci: Bug,
  rozatoare: Rat,
  furnici: Bug,
  purici: Bug,
  capuse: Bug,
  tantari: Bug,
  molii: Bug,
  viespi: Bug,
  porumbei: Bird,
  gradina: Sprout,
  deratizare: Rat,
  dezinsectie: Bug,
  dezinfectie: Droplets,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Flower2;
}
