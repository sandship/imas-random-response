// global import
import sampleSize from "https://github.com/lodash/lodash/raw/master/sampleSize.js";

// local common import
import { Brands, FetchOption, IdolInformation } from "../interface.ts";

type ImasparqlResponse = {
  results: {
    bindings: {
      name: { "type": string; "xml:lang": "en" | "ja"; "value": string };
      brand: {
        "type": string;
        "xml:lang": "en" | "ja";
        "value": Brands;
      };
      url: { "type": string; "xml:lang": "en" | "ja"; "value": string };
    }[];
  };
};

const query = "https://sparql.crssnky.xyz/spql/imas/query?query=" +
  encodeURIComponent(`
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX imasrdf: <https://sparql.crssnky.xyz/imasrdf/RDFs/detail/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX math: <http://www.w3.org/2005/xpath-functions/math#>
PREFIX xsd: <https://www.w3.org/TR/xmlschema11-2/#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?brand ?url
WHERE {
  ?s rdf:type imas:Idol;
    schema:name ?name;
    imas:Brand ?brand;
    imas:IdolListURL ?url;
}order by ?name
`);

export const fetchIdolList = async (
  option: FetchOption,
): Promise<IdolInformation[]> => {
  const { number, seed, strategy } = option;

  const response = await fetch(query);
  const fetchedData: ImasparqlResponse = JSON.parse(await response.text());

  const idols: IdolInformation[] = fetchedData.results.bindings.filter((idol) =>
    idol.name["xml:lang"] === "ja"
  ).map((idol): IdolInformation => ({
    name: idol.name.value,
    brand: idol.brand.value,
    url: idol.url.value,
  }));

  return sampleSize(idols, option.number);
};
