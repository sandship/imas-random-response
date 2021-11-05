import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { PickOption } from "./interface.ts";

import { fetchIdolList } from "./parser/idols.ts";
import { fetchMusicList } from "./parser/musics.ts";

import { RandomPicker } from "./picker/mod.ts";

type fetchFunction = typeof fetchIdolList | typeof fetchMusicList;

const randomListService = (fetch: fetchFunction) =>
  async (context: RouterContext): Promise<void> => {
    const body = await context.request.body().value ?? {} as PickOption;
    const picker = new RandomPicker(body);

    context.response.body = JSON.stringify({
      payload: picker.pick(await fetch()),
    });
    context.response.headers.set("content-type", "application/json");
  };

export const randomIdolPickupService = randomListService(fetchIdolList);
export const randomMusicPickupService = randomListService(fetchMusicList);
