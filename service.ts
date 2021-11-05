import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {
  randomIdolPickupService,
  randomMusicPickupService,
} from "./src/service.ts"

console.log("Listening on http://localhost:8080");

const app = new Application();

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "hello";
  })
  .post("/idol", randomIdolPickupService)
  .post("/music", randomMusicPickupService);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
