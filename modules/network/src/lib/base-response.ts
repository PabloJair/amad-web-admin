export interface BaseResponse<T> {
  status: Status;
  message: string;
  timestamp: string;
  errorDetail: string;
  token: string;
  errorCode: number;
  data: T;
}

export enum Status {
  OK=200
}