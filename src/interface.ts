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

export type BaseInformation = {
  name: string;
  brand: Brands;
};
export type IdolInformation = BaseInformation & {
  url?: string;
};
export type FetchIdolInformation = () => Promise<IdolInformation[]>;

export type MusicInformation = BaseInformation & {
  release?: string;
};
export type FetchMusicnformation = () => Promise<MusicInformation[]>;
export type PickOption = {
  number?: number;
  limit?: number;
  seed?: number;
  strategy?: Strategy;
  brands?: Brands[];
};

export const STRATEGIES = ["brand-flat", "full-flat"] as const;
export type Strategy = typeof STRATEGIES[number];
export type DataType = "music" | "idol";

export type FetchFunction = FetchMusicnformation | FetchIdolInformation;
