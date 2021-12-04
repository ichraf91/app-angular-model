export enum DataStateEnum{
  Loaded,
  Error

}



export interface AppDataState<T>{
  dataState: DataStateEnum,
  data?:T,
  errorMessage:string

}
