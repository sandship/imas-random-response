import {
  ConnectOptions,
  MongoClient,
} from "https://deno.land/x/mongo@v0.28.0/mod.ts";

import { BaseInformation, DataType, FetchFunction } from "../interface.ts";

const { DB_USER, DB_PASSWORD, DB_HOST } = Deno.env.toObject();
const DB_NAME = "imas-dataset";

const connectOption =
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authMechanism=SCRAM-SHA-1`;
const findOption = { noCursorTimeout: false, projection: { _id: 0 } };

export const refreshList = async (
  option: { fetch: FetchFunction; datatype: DataType },
): Promise<void> => {
  const client = new MongoClient();
  const db = await client.connect(connectOption).catch((err) =>
    console.log(err)
  );
  if (!db) throw Error("DB Connection error");

  const { fetch, datatype } = option;

  console.log(`[DEBUG] ${new Date().toISOString()}: refresh ${datatype} list`);
  const fetched: BaseInformation[] = await fetch();
  const namseInDatabase = new Set(
    (await db.collection<BaseInformation>(datatype).find({}, findOption)
      .toArray()).map(
        (doc) => doc.name,
      ),
  );
  await db.collection<BaseInformation>(datatype).insertMany(
    fetched.filter((doc) => !namseInDatabase.has(doc.name)),
  );
  await db.collection<BaseInformation>(datatype).createIndexes({
    indexes: [{ name: "name", key: { name: 1 } }],
  });
};

export const fetchList = async (option: { datatype: DataType }) => {
  const client = new MongoClient();
  const db = await client.connect(connectOption).catch((err) =>
    console.log(err)
  );
  if (!db) throw Error("DB Connection error");
  return async (): Promise<BaseInformation[]> => {
    const { datatype } = option;
    return await db.collection<BaseInformation>(datatype).find({}, findOption)
      .toArray();
  };
};
