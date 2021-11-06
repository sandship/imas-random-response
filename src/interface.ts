export const BRANDS_LIST = [
  "ALL",
  "765AS",
  "DearlyStars",
  "CinderellaGirls",
  "MillionLive",
  "SideM",
  "ShinyColors",
  "RADIO",
  "KR",
  "XENOGLOSSIA",
  "Unknown",
] as const;
export type Brands = typeof BRANDS_LIST[number];

export type IdolInformation = {
  name: string;
  brand: Brands;
  url?: string;
};

export type MusicInformation = {
  name: string;
  brand: Brands;
  release?: string;
};

export type PickOption = {
  number?: number;
  limit?: number;
  seed?: number;
  strategy?: Strategy;
  brands?: Brands[];
};

export const STRATEGIES = ["brand-flat", "full-flat"] as const;
export type Strategy = typeof STRATEGIES[number];
