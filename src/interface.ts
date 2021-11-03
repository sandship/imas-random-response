export type IntellectualProperty =
  | "765AS"
  | "DearlyStars"
  | "CinderellaGirls"
  | "MillionLive"
  | "SideM"
  | "ShinyColors"
  | "Unknown";

export type IdolInformation = {
  name: string;
  ip: IntellectualProperty;
  url?: string;
};

export type MusicInformation = {
  name: string;
  ip: IntellectualProperty;
  description?: string;
};

export type fetchOption = {
  number: number;
  seed?: number;
};
