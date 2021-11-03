import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { randomIdols, randomMusics } from "./src/handler.ts";

console.log("Listening on http://localhost:8080");

const app = new Application();

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "hello";
  })
  .post("/idol", randomIdols)
  .post("/music", randomMusics);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
