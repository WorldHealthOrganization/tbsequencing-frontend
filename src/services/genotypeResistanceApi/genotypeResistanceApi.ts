import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getEndpoint } from '../../utils/getEndpoint';

import { IPaginationResponse } from '../../models/Response';

import type { ITableResponse, ITableDataParams, TableData } from './models';

const baseUrl = getEndpoint();

export const genotypeResistanceApi = createApi({
  reducerPath: 'genotypeResistanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getTableData: build.query<ITableResponse, ITableDataParams>({
      query: (params) => ({
        url: '/submission/genotype-resistance/',
        params: {
          ...params.search,
          order: params.order,
          page: params.page,
          pageSize: params.pageSize,
          drug: params.drugID,
          paginated: true,
        },
      }),
      transformResponse(response: IPaginationResponse<TableData>) {
        return {
          rowsCount: response.count,
          tableData: response.results,
        };
      },
    }),
  }),
});

export const { useGetTableDataQuery } = genotypeResistanceApi;
