import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import type { RootState } from '../../../app/store';

export type ReduxApiType = Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>;

export const attachBearer = (accessToken: string) => `Bearer ${accessToken}`;

export const prepareHeaders = (headers: Headers, { getState }: ReduxApiType) => {
  const { accessToken } = (getState() as RootState).auth;

  if (accessToken) {
    headers.set('authorization', attachBearer(accessToken));
  }

  return headers;
};
