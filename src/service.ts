import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { PickOption } from "./interface.ts";

import { fetchIdolList } from "./parser/idols.ts";
import { fetchMusicList } from "./parser/musics.ts";

import { RandomPicker } from "./picker/mod.ts";

type fetchFunction = typeof fetchIdolList | typeof fetchMusicList;

const randomListService = (fetch: fetchFunction) =>
  async (context: RouterContext): Promise<void> => {
    const body = await context.request.body().value ?? {} as PickOption;
    console.log(
      `[${new Date().toISOString()}][DEBUG]request received: ${
        JSON.stringify(body)
      }`,
    );

    const picker = new RandomPicker(body);

    const payload = picker.pick(await fetch());
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

export const randomIdolPickupService = randomListService(fetchIdolList);
export const randomMusicPickupService = randomListService(fetchMusicList);
