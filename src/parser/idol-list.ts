// global import
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import sampleSize from "https://github.com/lodash/lodash/raw/master/sampleSize.js";

// local common import
import {
  fetchOption,
  IdolInformation,
  IntellectualProperty,
} from "../interface.ts";

const SOURCE_URL = "http://imas-db.jp/calendar/birthdays";
const CONTENTS_MAP = new Map<string, IntellectualProperty>([
  ["1", "765AS"],
  ["3", "DearlyStars"],
  ["4", "Cinderella"],
  ["5", "MillionStars"],
  ["6", "SideM"],
  ["8", "ShinyColors"],
]);

const query = "https://sparql.crssnky.xyz/spql/imas/query?query=" + encodeURIComponent(`
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
SELECT ?o ?h
WHERE {
  ?s schema:name|schema:alternateName ?o;
     schema:height ?h.
}order by(?h)
`)

const isDisplay = (node: Element): boolean => {
  const isIdol = (node.getAttribute("data-kind") ?? "1") === "1";
  return isIdol;
};

export const fetchIdolList = async (
  option: fetchOption,
): Promise<IdolInformation[]> => {

  // console.log(JSON.parse(await (await fetch(query)).text()).results.bindings.map((d: any) => d.o).filter((d: any) => d[""]))


  const response = await fetch(SOURCE_URL);
  const domtext = await response.text();

  const document = new DOMParser().parseFromString(domtext, "text/html");

  const listItems = document?.getElementsByTagName("li");
  const idols: IdolInformation[] = []; // init

  listItems?.forEach((node) => {
    const name = node.textContent.split(" ")[2];
    const ip = CONTENTS_MAP.get(node.getAttribute("data-brand-ids") ?? "99");
    if (isDisplay(node) && name && ip) idols.push({ name, ip });
  });

  return sampleSize(idols, option.number);
};

// sample output
console.log(await fetchIdolList({ number: 3 }));
