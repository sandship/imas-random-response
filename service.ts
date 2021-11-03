import * as express from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { randomIdols, randomMusics } from "./src/handler.ts";

const apiPrefix = "/api/v1.0";

const app = new express.App();

app.use(express.simpleLog());
app.use(express.bodyParser.json());

app.get(apiPrefix + "/idol", randomIdols);
app.get(apiPrefix + "/music", randomMusics);

const server = await app.listen(8000, "0.0.0.0");
console.log("running server: " + server.port);
