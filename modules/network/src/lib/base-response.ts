export interface BaseResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  errorDetail: string;
  token: string;
  errorCode: number;
  data: T;
}
