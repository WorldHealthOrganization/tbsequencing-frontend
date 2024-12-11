import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getEndpoint } from '../../utils/getEndpoint';
import { ICountry } from './models';

const baseUrl = getEndpoint();

export const dictionariesApi = createApi({
  reducerPath: 'dictionariesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getCountries: build.query<ICountry[], void>({
      query: () => ({
        url: '/genphen/countries/',
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = dictionariesApi;
