export type Brands =
  | "ALL"
  | "765AS"
  | "DearlyStars"
  | "CinderellaGirls"
  | "MillionLive"
  | "SideM"
  | "ShinyColors"
  | "RADIO"
  | "KR"
  | "XENOGLOSSIA"
  | "Unknown";

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

export type FetchOption = {
  number: number;
  seed?: number;
  strategy?: Strategy;
  brands?: Brands[];
};

type Strategy = "brand-even" | "character-even";

export type PickupFunction = <T extends { brand: Brands }>(
  candidated: T[],
  option: { number: number },
) => T[];
