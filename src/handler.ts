import * as express from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { EndHandler } from "https://raw.githubusercontent.com/NMathar/deno-express/master/types/index.ts";

import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";

import { fetchIdolList } from "./parser/idol-list.ts";
import { fetchMusicList } from "./parser/music-list.ts";

const DEFAULT_RETURN_NUM = 3
type RequestBody = {
  number?: string;
  limit?: string;
};

const random = new Random();

const randomList = (
  parser: typeof fetchIdolList | typeof fetchMusicList,
): EndHandler =>
  async (
    req: express.Request,
    res: express.Response,
  ) => {
    console.log(req);
    const { number, limit } = req.data as RequestBody;
    const returnNumberOf = number
      ? parseInt(number)
      : limit
      ? random.int(1, limit)
      : DEFAULT_RETURN_NUM;

    const response = {
      payload: await parser({ number: returnNumberOf }),
    };
    res.send(JSON.stringify(response));
  };

export const randomIdols = randomList(fetchIdolList);
export const randomMusics = randomList(fetchMusicList);
