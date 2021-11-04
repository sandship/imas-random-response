import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";

import { fetchIdolList } from "./parser/idol-list.ts";
import { fetchMusicList } from "./parser/music-list.ts";

import { FetchOption } from "./interface.ts";

const DEFAULT_RETURN_NUM = 3;
type fetchFunction = typeof fetchIdolList | typeof fetchMusicList;

const random = new Random();

const randomList = (fetch: fetchFunction) =>
  async (context: RouterContext) => {
    const body = await context.request.body().value ?? {} as FetchOption;
    const { number, limit, strategy, brands } = body;
    const randomNum = limit ? random.int(1, limit) : undefined;
    const exactNumber = number ?? randomNum ?? DEFAULT_RETURN_NUM;

    context.response.body = JSON.stringify({
      payload: await fetch({ number: exactNumber, strategy, brands }),
    });
    context.response.headers.set("content-type", "application/json");
  };

export const randomIdols = randomList(fetchIdolList);
export const randomMusics = randomList(fetchMusicList);
