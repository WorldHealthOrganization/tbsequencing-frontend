import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError, FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import * as Sentry from '@sentry/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logout, setAccess } from '../features/auth/authSlice';
import { clearTokens, setAccessToken } from '../features/auth/storeToken';
import type { RootState } from './store';
import { IRefreshTokenResult } from '../services/indentityApi/models';
import { IHttpError } from '../models/HttpError';
// eslint-disable-next-line import/no-cycle
import { identityApi } from '../services/indentityApi/identityApi';

const mutex = new Mutex();

const isAuthError = (
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
): boolean => {
  if (!result.error) {
    return false;
  }

  return result.error.status === 401;
};

const isNonAuthError = (
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
): boolean => {
  if (!result.error) {
    return false;
  }

  return result.error.status !== 401;
};

const createErrorLikeObject = (
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  if (!result.error) {
    return {};
  }

  const errors: Record<string, string> = {};

  const errorData = result.error as IHttpError;

  errorData.data.errors.forEach((err, index) => {
    const errorEntries = Object.entries(err);
    const aggregatedError = errorEntries.map(([key, value]) => `${key}: ${value}`);
    const aggregatedErrorString = aggregatedError.join(' \n');

    errors[index] = aggregatedErrorString;
  });

  return {
    status: result.error.status,
    // @ts-ignore
    type: result.error.data.type,
    // @ts-ignore
    requestURL: result.meta.request.url,
    // @ts-ignore
    responseURL: result.meta.response.url,
    errors,
  };
};

export const getFetchWithAuth = (baseFetchProps: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({
    ...baseFetchProps,
  });

  const fetchWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    const refresh = (api.getState() as RootState).auth.refreshToken;
    let result = await baseQuery(args, api, extraOptions);

    if (isAuthError(result) && refresh) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            { url: '/identity/token/refresh/', method: 'POST', body: { refresh } },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            api.dispatch(setAccess(refreshResult.data));
            setAccessToken((refreshResult.data as IRefreshTokenResult).access);

            result = await baseQuery(args, api, extraOptions);
          } else {
            clearTokens();
            api.dispatch(logout());
            api.dispatch(identityApi.util.resetApiState());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    if (isNonAuthError(result)) {
      Sentry.captureException(createErrorLikeObject(result));
    }

    return result;
  };

  return fetchWithAuth;
};

export default getFetchWithAuth;
