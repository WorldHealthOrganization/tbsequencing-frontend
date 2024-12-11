import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getEndpoint } from '../../utils/getEndpoint';
import { IPaginationResponse } from '../../models/Response';
import { IGene } from './models';
import {
  IGenesOverviewResponse,
  ISearchCount,
  ISearchRecent,
} from '../../features/genesView/models';
import { ITableDataParams, TableData } from '../drugsApi/models';

const baseUrl = getEndpoint();

export const genesApi = createApi({
  reducerPath: 'genesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getGenes: build.query<IGene[], { search?: string }>({
      query: (params) => ({
        url: '/overview/genes/',
        params,
      }),
      transformResponse: (response: IPaginationResponse<IGene>) => response.results.map((gene) => ({
        ...gene,
        id: gene.geneDbCrossrefId,
      })),
    }),
    getGenesById: build.query<IGenesOverviewResponse, { geneDbCrossrefId: number }>({
      query: (params) => ({
        url: `/overview/genes/${params.geneDbCrossrefId}/`,
      }),
    }),
    getGenomeContext: build.query<IGene[], { startPos?: number, endPos?: number }>({
      query: (params) => ({
        url: '/overview/genes/genome-context/',
        params,
      }),
    }),
    getGenesTableData: build.query<{ tableData: TableData }, ITableDataParams>({
      query: (params) => ({
        url: '/overview/drug-gene-infos/',
        params: {
          ...params.search,
          geneDbCrossrefId: params.geneDbCrossrefId,
          drug: params.drugID,
        },
      }),
      transformResponse(response: TableData) {
        return {
          tableData: response,
        };
      },
    }),
    getMostSearchHistory: build.query<ISearchCount[], void>({
      query: () => ({
        url: '/overview/gene-search-history/',
      }),
    }),
    getRecentSearchHistory: build.query<ISearchRecent[], void>({
      query: () => ({
        url: '/overview/gene-search-history/recently/',
      }),
    }),
  }),
});

export const {
  useGetGenesQuery,
  useGetGenesByIdQuery,
  useGetMostSearchHistoryQuery,
  useGetRecentSearchHistoryQuery,
  useGetGenomeContextQuery,
  useGetGenesTableDataQuery,
} = genesApi;
