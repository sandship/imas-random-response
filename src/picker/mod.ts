import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";
import sampleSize from "https://github.com/lodash/lodash/raw/master/sampleSize.js";
import sample from "https://github.com/lodash/lodash/raw/master/sample.js";
import shuffle from "https://github.com/lodash/lodash/raw/master/shuffle.js";

import {
  Brands,
  BRANDS_LIST,
  PickOption,
  Strategy,
} from "../interface.ts";

const DEFAULT_RETURN_NUM = 3;
const random = new Random();

type PickupFunction = <T extends { brand: Brands }>(
  array: T[],
) => T[];

export class RandomPicker {
  private readonly _pickNum: number;
  private readonly _strategy?: Strategy;
  private readonly _brands: Brands[];

  constructor(option: PickOption) {
    const { number, limit, strategy, brands } = option;

    const randomNum = limit ? random.int(1, limit) : undefined;
    this._pickNum = number ?? randomNum ?? DEFAULT_RETURN_NUM;
    this._strategy = strategy;

    this._brands = brands ?? BRANDS_LIST.map(b => b)
  }

  private _dispatchPickFunction = (): PickupFunction => {
    const flatPickup: PickupFunction = (array) =>
      sampleSize(array, this._pickNum);

    const brandFlatPickup: PickupFunction = <T extends { brand: Brands }>(
      array: T[],
    ) => {
      const boxes = (shuffle(array) as T[]).reduce((previous, elm) => {
        previous.set(elm.brand, [...(previous.get(elm.brand) ?? []), elm]);
        return previous;
      }, new Map<Brands, T[]>());

      const selectElm = (_: unknown): T => {
        return boxes.get(sample(this._brands))?.pop() ?? selectElm(_);
      };

      return [...Array(this._pickNum)].map(selectElm);
    };

    switch (this._strategy) {
      case "full-flat":
        return flatPickup;
      case "brand-flat":
        return brandFlatPickup;
      default:
        return flatPickup;
    }
  };

  pick: PickupFunction = (array) => {
    const brandFilteredArray = array.filter((elm) =>
      this._brands.includes(elm.brand)
    );
    const pickFunction = this._dispatchPickFunction();

    return pickFunction(brandFilteredArray);
  };
}
