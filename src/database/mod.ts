import { BaseInformation, DataType, FetchFunction } from "../interface.ts";


const resouces: {[D in DataType]: BaseInformation[]} = {
  "idol": [],
  "music": []
}

export const refreshList = async (
  option: { fetch: FetchFunction; datatype: DataType },
): Promise<void> => {
  
  const { fetch, datatype } = option;

  console.log(`[DEBUG] ${new Date().toISOString()}: refresh ${datatype} list`);
  const fetched: BaseInformation[] = await fetch();
  
  resouces[datatype] = fetched
};

export const fetchList = (option: { datatype: DataType }): FetchFunction => {  
  return async (): Promise<BaseInformation[]> => {
    const { datatype } = option;
    return resouces[datatype]
  };
};
