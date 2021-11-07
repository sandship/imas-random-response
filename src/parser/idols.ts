// local common import
import { Brands, IdolInformation } from "../interface.ts";

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

const query = `
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
`;

const url = "https://sparql.crssnky.xyz/spql/imas/query?query=" +
  encodeURIComponent(query);

export const fetchIdolList = async (): Promise<IdolInformation[]> => {
  const response = await fetch(url);
  const fetchedData: ImasparqlResponse = JSON.parse(await response.text());

  const idols: IdolInformation[] = fetchedData.results.bindings.filter((idol) =>
    idol.name["xml:lang"] === "ja"
  ).map((idol): IdolInformation => ({
    name: idol.name.value,
    brand: idol.brand.value,
    url: idol.url.value,
  }));

  return idols;
};
