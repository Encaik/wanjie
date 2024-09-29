export enum ResStatus {
  Success = 200,
  AuthError = 400,
  ServerError = 500,
}

export interface Res<T=any>{
  status: ResStatus;
  msg:string;
  data:T
}
