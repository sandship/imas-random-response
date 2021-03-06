import { BRANDS_LIST, STRATEGIES } from "../interface.ts";

export const page = `<html>
<title>IM@S Random Response</title>
<head>
  <meta http-equiv="content-type" charset="UTF-8">
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<h1>Imas Random Response API</h1>
<text>this API is for the game <code>We're JUNGO</code>, which is played in IM@S OTAKU CAMP TRAINING. </text>

<h1>Acknowledgement</h1>
<ol>
<li><a href="https://sparql.crssnky.xyz/imas/">im@sparql</a> as IDOL Data Source</li>
<li><a href="https://music765plus.com">アイドルマスター楽曲メモ</a> as Music Data Source</li>
</ol>

  <h2>Sample Usage</h2>
  <h3>1. Get Music List</h3>
  <ol>
    <li><code>curl -X POST https://imas-random-list.deno.dev/music </code></li>
    random pick 3 musics from all brands with even weight.
    <li><code>curl -X POST -d '{"number": 5}' -H 'content-type: application/json' https://imas-random-list.deno.dev/music </code></li>
    random pick <bold>5</bold> musics from all brands with even weight.
    <li><code>curl -X POST -d '{"number": 16, brands: ["765AS", "CinderellaGirls"]}' -H 'content-type: application/json' https://imas-random-list.deno.dev/music </code></li>
    random pick <bold>16</bold> musics from "765AS" | "CinderellaGirls" brands with even weight.
    <li><code>curl -X POST -d '{"number": 16, brands: ["765AS", "CinderellaGirls", "KR"], "strategy": "brand-flat"}' -H 'content-type: application/json' https://imas-random-list.deno.dev/music </code></li>
    random pick <bold>16</bold> musics from "765AS" | "CinderellaGirls" | "KR" brands with even weight <bold>each brand</bold>.
  </ol>
  
  <h3>2. Get Idol List</h3>
  <ol>
  <li><code>curl -X POST https://imas-random-list.deno.dev/idol </code></li>
  random pick 3 idols from all brands with even weight.
  <li><code>curl -X POST -d '{"number": 5}' -H 'content-type: application/json' https://imas-random-list.deno.dev/idol </code></li>
  random pick <bold>5</bold> idols from all brands with even weight.
  <li><code>curl -X POST -d '{"number": 16, brands: ["765AS", "CinderellaGirls"]}' -H 'content-type: application/json' https://imas-random-list.deno.dev/idol </code></li>
  random pick <bold>16</bold> idols from "765AS" | "CinderellaGirls" brands with even weight.
  <li><code>curl -X POST -d '{"number": 16, brands: ["765AS", "CinderellaGirls", "KR"], "strategy": "brand-flat"}' -H 'content-type: application/json' https://imas-random-list.deno.dev/idol </code></li>
  random pick <bold>16</bold> idols from "765AS" | "CinderellaGirls" | "KR" brands with even weight <bold>each brand</bold>.
  </ol>

  <h3>3. Reference</h3>
  <h4>3.1 Supported Brands</h4>
  <ol>${
  BRANDS_LIST.map((brand) => "<li><code>" + brand + "</code></li>").join("")
}</ol>

  <h4>3.2 Supported Strategy</h4>
  <ol>${
  STRATEGIES.map((strategy) => "<li><code>" + strategy + "</code></li>").join(
    "",
  )
}</ol>
  
</body>
</html>`;
