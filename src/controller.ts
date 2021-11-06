import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { PickOption } from "./interface.ts";

import { fetchIdolList } from "./parser/idols.ts";
import { fetchMusicList } from "./parser/musics.ts";

import { RandomPicker } from "./picker/mod.ts";

import { page } from "./page/index.ts";

type fetchFunction = typeof fetchIdolList | typeof fetchMusicList;

const randomListController = (fetch: fetchFunction) =>
  async (context: RouterContext): Promise<void> => {
    const body: PickOption = await context.request.body().value;
    console.log(
      `[${new Date().toISOString()}][DEBUG]request received: ${
        JSON.stringify(body)
      }`,
    );

    // logic
    const payload = new RandomPicker({...body, candidated: await fetch()} ?? {}).pick()

    const response = JSON.stringify({
      payload,
      returnNum: payload.length,
    });

    context.response.body = response;
    context.response.headers.set("content-type", "application/json");
    console.log(
      `[${new Date().toISOString()}][DEBUG]response send: ${
        JSON.stringify(response)
      }`,
    );
  };

export const indexPage = (context: RouterContext): void => {
  context.response.body = page;
  context.response.headers.set("content-type", "text/html");
};
export const randomIdolPickupService = randomListController(fetchIdolList);
export const randomMusicPickupService = randomListController(fetchMusicList);
