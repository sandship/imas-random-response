import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";
import sampleSize from "https://github.com/lodash/lodash/raw/master/sampleSize.js";
import sample from "https://github.com/lodash/lodash/raw/master/sample.js";
import shuffle from "https://github.com/lodash/lodash/raw/master/shuffle.js";

import { Brands, BRANDS_LIST, PickOption, Strategy } from "../interface.ts";

const DEFAULT_RETURN_NUM = 3;
const random = new Random();

const isNotUndefined = (arg: any): arg is Exclude<typeof arg, undefined> =>
  typeof arg !== "undefined";

type PickupFunction = <T extends { brand: Brands }>(
  array: T[],
) => T[];

export class RandomPicker {
  private readonly _pickNum: number;
  private readonly _strategy?: Strategy;
  private _candidateBrand: Brands[];

  constructor(option: PickOption) {
    const { number, limit, strategy, brands } = option;

    const randomNum = limit ? random.int(1, limit) : undefined;
    this._pickNum = number ?? randomNum ?? DEFAULT_RETURN_NUM;
    this._strategy = strategy;

    this._candidateBrand = brands ?? BRANDS_LIST.map((b) => b);
  }

  private _flatPickup: PickupFunction = (array) =>
    sampleSize(array, this._pickNum);

  private _brandFlatPickup: PickupFunction = <T extends { brand: Brands }>(
    array: T[],
  ) => {
    const boxes = (shuffle(array) as T[]).reduce((previous, elm) => {
      previous.set(elm.brand, [...(previous.get(elm.brand) ?? []), elm]);
      return previous;
    }, new Map<Brands, T[]>());

    const selectElm = (_: unknown): T | undefined => {
      this._candidateBrand = this._candidateBrand.filter((brand) =>
        (boxes.get(brand)?.length ?? 0) > 0
      );
      if (this._candidateBrand.length === 0) return undefined;
      return boxes.get(sample(this._candidateBrand))?.pop() ?? selectElm(_);
    };

    return [...Array(this._pickNum)].map(selectElm).filter(isNotUndefined);
  };
  private _dispatchPickFunction = (): PickupFunction => {
    switch (this._strategy) {
      case "full-flat":
        return this._flatPickup;
      case "brand-flat":
        return this._brandFlatPickup;
      default:
        return this._flatPickup;
    }
  };

  pick: PickupFunction = (array) => {
    const brandFilteredArray = array.filter((elm) =>
      this._candidateBrand.includes(elm.brand)
    );
    const pickFunction = this._dispatchPickFunction();

    return pickFunction(brandFilteredArray);
  };
}
