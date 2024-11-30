import { AxiosRequestConfig } from "axios";

export type ServerSettings = {
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  url?: string;
};
export type ServerProps = {
  settings?: ServerSettings | undefined;
  payload?: any;
};

export type ClientSettings = {
  method: string;
  url: string;
  headers: any;
  withCredentials: boolean;
  data?: any;
  params?: any;
};

export type OnSuccessFunction = (a: any) => void;
export type OnFailureFunction = (a: any) => void;

export type ApiProps = {
  config?: ApiConfig;
  headers?: Object;
  payload?: any;
  callback?: (response: any) => void;
  onSuccess?: OnSuccessFunction;
  onFailure?: OnFailureFunction;
};

export type ApiConfig = {
  showLoader?: boolean;
  url?: string;
  isFormData?: boolean;
};

export type ApiCallData = {
  settings: AxiosRequestConfig;
  config: ApiConfig;
  onSuccess?: OnSuccessFunction;
  onFailure?: OnFailureFunction;
  status: string;
  _id: string;
  callback?: (response: any) => void;
};

export type UpdateStatusPayload = {
  _id: string;
  status: string;
};

export type ApiResponse = {
  body: any;
};
