import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";

import { fetchIdolList } from "./parser/idol-list.ts";
import { fetchMusicList } from "./parser/music-list.ts";

const DEFAULT_RETURN_NUM = 3;
type RequestBody = {
  exactNumber?: number;
  limit?: number;
};

type fetchFunction = typeof fetchIdolList | typeof fetchMusicList;

const random = new Random();

const randomList = (fetch: fetchFunction) =>
  async (context: RouterContext) => {
    const body = await context.request.body().value ?? {} as RequestBody;
    const { exactNumber, limit } = body
    const randomNum = limit ? random.int(1, limit) : undefined
    const number = exactNumber ?? randomNum ?? DEFAULT_RETURN_NUM

    context.response.body = JSON.stringify({
      payload: await fetch({ number }),
    });
    context.response.headers.set("content-type", "application/json");
  };

export const randomIdols = randomList(fetchIdolList);
export const randomMusics = randomList(fetchMusicList);
