import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getEndpoint } from '../../utils/getEndpoint';
import { IGetGlobalSamplesRequest, IGetGlobalSamplesResponse } from './models';

const baseUrl = getEndpoint();

export const overviewApi = createApi({
  reducerPath: 'overviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getGlobalSamples: build.query<IGetGlobalSamplesResponse, IGetGlobalSamplesRequest>({
      query: () => ({
        url: '/overview/global-samples/',
      }),
    }),
  }),
});

export const {
  useGetGlobalSamplesQuery,
} = overviewApi;
