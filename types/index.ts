export type ServiceCategory =
  | "rezidential"
  | "business"
  | "agricultura";

export interface ServiceType {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  basePrice: number | null;
  priceLabel: string;
  description: string;
  symptoms: string[];
  process: string[];
  faq: { question: string; answer: string }[];
  featured?: boolean;
}

export type PropertyType =
  | "apartament"
  | "casa"
  | "restaurant"
  | "hotel"
  | "birou"
  | "magazin"
  | "depozit"
  | "asociatie"
  | "ferma"
  | "vie"
  | "livada"
  | "alt-tip";

export type InfestationLevel =
  | "1-2-observate"
  | "apar-frecvent"
  | "infestare-serioasa"
  | "nu-stiu";

export interface BookingPayload {
  serviceSlug: string;
  propertyType: PropertyType;
  propertySize: string;
  infestationLevel: InfestationLevel;
  city: string;
  postalCode: string;
  preferredDate: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface Area {
  name: string;
  slug: string;
  phase: 1 | 2 | 3;
}
