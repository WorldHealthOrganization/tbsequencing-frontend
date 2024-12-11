import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getEndpoint } from '../../utils/getEndpoint';

import type {
  GeneAssociationData,
  GeneAssociationGroupedData,
  IChartData,
  IChartDataParams,
  IDrug,
  IDrugsParams,
  IGetAllDrugsByAllRegionsResponse,
  IGetGlobalDrugsRequest,
  IGlobalDrugsResponse,
  ITableDataParams,
  ITableResponse,
  TableData,
} from './models';
import { IPaginationResponse } from '../../models/Response';
import { IVariant } from '../genesApi/models';
import { DrugTableColumns } from '../../components/DataGrid/models';

import {
  africaRegionCountries,
  americaRegionCountries,
  easternMediterraneanCountries,
  europeRegionCountries,
  southEastAsiaRegionCountries,
  westernPacificRegionCountries,
} from './utils';
import {
  addColorToAggregatedDrug,
  getAggregatedDrugsData,
  getAllDrugsByRegion,
} from '../../features/worldmap/components/WorldMap/utils/dataExtractors';
import { Regions } from '../../features/drugsView/models';
import { IGlobalDrugsMapResponse } from './models';

const baseUrl = getEndpoint();

export const drugsApi = createApi({
  reducerPath: 'drugsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getAllDrugsByAllRegions: build.query<IGetAllDrugsByAllRegionsResponse, IGetGlobalDrugsRequest>({
      query: (queryArgs) => ({
        url: '/overview/global-drugs/map',
        params: { ...queryArgs },
      }),
      transformResponse(response: IGlobalDrugsMapResponse[]) {
        const africa = getAllDrugsByRegion(africaRegionCountries, response);
        const europe = getAllDrugsByRegion(europeRegionCountries, response);
        const america = getAllDrugsByRegion(americaRegionCountries, response);
        const easternMediterranean = getAllDrugsByRegion(easternMediterraneanCountries, response);
        const westernPacific = getAllDrugsByRegion(westernPacificRegionCountries, response);
        const southEastAsia = getAllDrugsByRegion(southEastAsiaRegionCountries, response);

        const aggregatedAfrica = getAggregatedDrugsData(africa, Regions.AFRICA);
        const aggregatedEurope = getAggregatedDrugsData(europe, Regions.EUROPE);
        const aggregatedAmerica = getAggregatedDrugsData(america, Regions.AMERICA);

        const aggregatedEasternMediterranean = getAggregatedDrugsData(
          easternMediterranean,
          Regions.EASTERN_MEDITERRANEAN,

        );

        const aggregatedWesternPacific = getAggregatedDrugsData(
          westernPacific,
          Regions.WESTERN_PACIFIC,

        );

        const aggregatedSouthEastAsia = getAggregatedDrugsData(
          southEastAsia,
          Regions.SOUTH_EAST_ASIA,
        );

        const maxInputParams = [
          aggregatedAfrica.aggregatedTotal,
          aggregatedEurope.aggregatedTotal,
          aggregatedAmerica.aggregatedTotal,
          aggregatedEasternMediterranean.aggregatedTotal,
          aggregatedWesternPacific.aggregatedTotal,
          aggregatedSouthEastAsia.aggregatedTotal,
        ];

        const aggregatedMax = Math.max(...maxInputParams);

        return {
          africa,
          europe,
          america,
          easternMediterranean,
          westernPacific,
          southEastAsia,
          aggregatedDrugs: [
            addColorToAggregatedDrug(aggregatedMax, aggregatedAfrica),
            addColorToAggregatedDrug(aggregatedMax, aggregatedEurope),
            addColorToAggregatedDrug(aggregatedMax, aggregatedAmerica),
            addColorToAggregatedDrug(aggregatedMax, aggregatedEasternMediterranean),
            addColorToAggregatedDrug(aggregatedMax, aggregatedWesternPacific),
            addColorToAggregatedDrug(aggregatedMax, aggregatedSouthEastAsia),
          ],
        };
      },
    }),

    getChartData: build.query<IChartData[], IChartDataParams>({
      query: (params) => ({
        url: `/overview/global-drugs/${params.countryId ? `?countryId=${params.countryId}` : ''}`,
        params: {
          resistanceType: params.resistantType,
          yearGte: String(params.year[0]),
          yearLte: String(params.year[1]),
        },
      }),
      transformResponse(response: IChartData[]) {
        return response;
      },
    }),
    getDrugsData: build.query<IDrug[], IDrugsParams>({
      query: (params) => ({
        url: `/genphen/drugs/${params.isAssociated === 0 || params.isAssociated === 1
          ? `?is_associated=${params.isAssociated}` : ''}`,
      }),
      transformResponse(response: IDrug[]) {
        return response
          .filter((drug) => drug.code)
          .map((drug) => ({
            ...drug,
            id: drug.drugId,
          }))
          .sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
      },
    }),
    getGeneAssociationsGrouped: build.query<GeneAssociationGroupedData[], { drugId: number }>({
      query: (params) => ({
        url: '/genphen/gene-drug-resistance-associations/',
        params,
      }),
    }),
    getGeneAssociations: build.query<GeneAssociationData[], { drug: number }>({
      query: (params) => ({
        url: '/overview/gene-associations/',
        params,
      }),
    }),
    getGeneAssociationsByID: build.query<IDrug[], { geneDbCrossrefId: number }>({
      query: (params) => ({
        url: `/overview/gene-associations/${params.geneDbCrossrefId}/`,
      }),
      transformResponse(response: GeneAssociationData) {
        return response.drugs;
      },
    }),
    getGlobalDrugs: build.query<IGlobalDrugsResponse[], IGetGlobalDrugsRequest>({
      query: ({
        resistanceType, countryId, drug, yearGte, yearLte,
      }) => ({
        url: '/overview/global-drugs/',
        params: {
          resistanceType,
          countryId,
          drug,
          yearGte,
          yearLte,
        },
      }),
    }),
    getTableData: build.query<ITableResponse, ITableDataParams>({
      query: (params) => ({
        url: '/overview/drug-gene-infos/',
        params: {
          ...params.search,
          order: params.order,
          page: params.page,
          pageSize: params.pageSize,
          drug: params.drugID,
          geneDbCrossrefId: params.geneDbCrossrefId,
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
    getExportTable: build.query<TableData[], ITableDataParams>({
      query: (params) => ({
        url: '/overview/drug-gene-infos/',
        params: {
          ...params.search,
          order: params.order,
          drug: params.drugID,
          geneDbCrossrefId: params.geneDbCrossrefId,
        },
      }),
    }),
    getTableDataByID: build.query<DrugTableColumns[], ITableDataParams>({
      query: (params) => ({
        url: `/overview/drug-gene-infos/${params.drugID}/`,
        params: {
          ...params.search,
          order: params.order,
          page: params.page,
          pageSize: params.pageSize,
        },
      }),
    }),
    getAllTableData: build.query<IVariant[], number>({
      query: (id) => ({
        url: `/overview/drug-gene-infos/${id}/all/`,
      }),
    }),
  }),
});

export const useGetExportTableLazyQuery = drugsApi.endpoints.getExportTable.useLazyQuery;

export const {
  useGetGlobalDrugsQuery,
  useGetChartDataQuery,
  useGetDrugsDataQuery,
  useGetGeneAssociationsGroupedQuery,
  useGetGeneAssociationsQuery,
  useGetTableDataQuery,
  useGetTableDataByIDQuery,
  useGetGeneAssociationsByIDQuery,
  useGetAllTableDataQuery,
  useGetAllDrugsByAllRegionsQuery,
} = drugsApi;
