import { MongoClient } from "https://deno.land/x/mongo@v0.28.0/mod.ts";

import { BaseInformation, DataType, FetchFunction } from "../interface.ts";

const { DB_USER, DB_PASSWORD } = Deno.env.toObject();
const HOST =
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@imas-dataset.h73ol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


export const refreshList = async (
  option: { fetch: FetchFunction; datatype: DataType },
): Promise<void> => {
  const mongodb = new MongoClient();
  const db = await mongodb.connect(HOST)

  const { fetch, datatype } = option;
  console.log(`[DEBUG] ${new Date().toISOString()}: refresh ${datatype} list`);
  await db.collection(datatype).insertMany(await fetch());
};

export const fetchList = async (option: { datatype: DataType }) =>{
  const mongodb = new MongoClient();
  const db = await mongodb.connect(HOST)
  return async (): Promise<BaseInformation[]> => {
    const { datatype } = option;
    return await db.collection<BaseInformation>(datatype).find().toArray();
  };
}