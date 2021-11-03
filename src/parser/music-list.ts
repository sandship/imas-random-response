// global import
import sampleSize from "https://github.com/lodash/lodash/raw/master/sampleSize.js";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.16-alpha/deno-dom-wasm.ts";

// local common import
import {
  fetchOption,
  IntellectualProperty,
  MusicInformation,
} from "../interface.ts";

const SOURCE_URL = "https://music765plus.com/全曲一覧#ALL";
const CONTENTS_MAP = new Map<string, IntellectualProperty>([
  ["合同", "ALL"],
  ["765", "765AS"],
  ["961", "765AS"],
  ["[876]", "DearlyStars"],
  ["CIN", "CinderellaGirls"],
  ["CINR", "CinderellaGirls"],
  ["CIN別", "CinderellaGirls"],
  ["CINC", "CinderellaGirls"],
  ["MIL", "MillionLive"],
  ["MIL別", "MillionLive"],
  ["MILR", "MillionLive"],
  ["SdM", "SideM"],
  ["SnC", "ShinyColors"],
  ["RAD", "RADIO"],
  ["KR", "KR"],
  ["XNG", "XENOGLOSSIA"],
]);

export const fetchMusicList = async (
  option: fetchOption,
): Promise<MusicInformation[]> => {
  const response = await fetch(SOURCE_URL);
  const domtext = await response.text();

  const document = new DOMParser().parseFromString(domtext, "text/html");
  const listItems = document?.getElementsByTagName("tr");

  const musics: MusicInformation[] = [];
  listItems?.forEach((node) => {
    const content = node.getElementsByTagName("td");

    const ip = content[0]?.textContent;
    const name = content[1]?.textContent;
    const release = content[3]?.textContent;

    if (ip && name) {
      musics.push({ ip: CONTENTS_MAP.get(ip) ?? "Unknown", name, release });
    }
  });

  return sampleSize(musics, option.number);
};
