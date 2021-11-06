import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
import {
  indexPage,
  randomIdolPickupService,
  randomMusicPickupService,
} from "./src/controller.ts";

console.log("Listening on http://localhost:8080");

const app = new Application();
app.use(logger.logger);
app.use(logger.responseTime);

const router = new Router();
router
  .get("/", indexPage)
  .post("/idol", randomIdolPickupService)
  .post("/music", randomMusicPickupService);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
