import { createApi } from '@reduxjs/toolkit/query/react';
import { getEndpoint } from '../../utils/getEndpoint';
import { ILoginResponse } from '../../features/auth/storeToken';
// eslint-disable-next-line import/no-cycle
import getFetchWithAuth from '../../app/fetchWithAuth';

import type {
  ILoginRequest, IRefreshTokenResult,
  IRegistrationRequest, IRegistrationResponse, IUser, IVerifyEmailRequest,
} from './models';
import { prepareHeaders } from './utils/prepareHeaders';
import {
  IChangePasswordRequest,
  IChangeUserInfoRequest,
  IResetPasswordConfirmRequest,
  IResetPasswordRequest,
} from './models';

const baseUrl = getEndpoint();
const USER_UPDATE_TAG = 'UserUpdateTag';

export const identityApi = createApi({
  reducerPath: 'identityApi',
  baseQuery: getFetchWithAuth({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: [USER_UPDATE_TAG],
  endpoints: (build) => ({
    registration: build.mutation<IRegistrationResponse, IRegistrationRequest>({
      query: (body) => ({
        url: '/identity/registration/',
        method: 'POST',
        body,
      }),
    }),
    registrationConfirm: build.mutation<void, IVerifyEmailRequest>(
      {
        query: (body) => ({
          url: '/identity/registration/verify-email/',
          method: 'POST',
          body,
        }),
      },
    ),
    resetPassword: build.mutation<void, IResetPasswordRequest>(
      {
        query: (body) => ({
          url: '/identity/password/reset/',
          method: 'POST',
          body,
        }),
      },
    ),
    resetPasswordConfirm: build.mutation<void, IResetPasswordConfirmRequest>({
      query: (body) => ({
        url: 'identity/password/reset/confirm/',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: 'identity/login/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_UPDATE_TAG],
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/identity/user/',
      }),
      providesTags: [USER_UPDATE_TAG],
    }),
    verifyUser: build.mutation<void, void>({
      query: () => ({
        url: '/identity/user/',
        method: 'PATCH',
        body: {
          profile: {
            requestValidation: true,
          },
        },

      }),
      invalidatesTags: [USER_UPDATE_TAG],
    }),
    refreshToken: build.mutation<ILoginResponse, IRefreshTokenResult>({
      query: () => ({ url: '/refresh/', method: 'POST' }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/identity/logout/',
        method: 'POST',
      }),
      invalidatesTags: [USER_UPDATE_TAG],
    }),
    changePassword: build.mutation<void, IChangePasswordRequest>({
      query: (body) => ({
        url: '/identity/password/change/',
        body,
        method: 'POST',
      }),
    }),
    changeUserInfo: build.mutation<void, IChangeUserInfoRequest>({
      query: (body) => ({
        url: '/identity/user/',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: [USER_UPDATE_TAG],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useRegistrationConfirmMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useGetUserQuery,
  useVerifyUserMutation,
  useChangePasswordMutation,
  useChangeUserInfoMutation,
} = identityApi;
