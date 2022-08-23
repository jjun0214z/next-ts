export type IAsyncTypes = 'REQUEST' | 'SUCCESS' | 'FAILER';

export interface IAsyncStateType {
  isLoading: boolean;
  error: boolean;
}

export interface ResponseFailure {
  status: { ok: boolean };
  data: { message: string };
}
