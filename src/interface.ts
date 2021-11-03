export type IntellectualProperty =
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
  ip: IntellectualProperty;
  url?: string;
};

export type MusicInformation = {
  name: string;
  ip: IntellectualProperty;
  release?: string;
};

export type fetchOption = {
  number: number;
  seed?: number;
};
