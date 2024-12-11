import { Regions, ResistantType } from '../../features/drugsView/models';

export interface IDrug {
  drugId: number,
  drugName: string,
  code: string
}
export interface IDrugsParams {
  isAssociated?: number,
}

export interface IDrugsViewResponse<T> {
  count: number,
  next: number,
  previous: string,
  results: T[]
}

export interface IGlobalDrugsResponse {
  drug: number,
  susceptible: number,
  resistant: number,
  intermediate: number,
  ratioResistant: string,
  ratioSusceptible: string,
  ratioIntermediate: string,
  total: number
}

export interface IGlobalDrugsMapResponse extends IGlobalDrugsResponse {
  countryId: string;
}

export interface IChartDataLocal {
  drug?: IDrug
  susceptible: number,
  resistant: number,
  intermediate: number,
  ratioResistant: string,
  ratioSusceptible: string,
  ratioIntermediate: string,
  countryId: string;
  total: number;
  drugCode: string;
}

export type TableData = Record<string, number | string>;

export interface GeneAssociationGroupedData {
  drugId: number;
  geneDbCrossrefId: number;
  geneName: string;
  locusTag: string;
  tier: number;
}

export interface GeneAssociationData {
  geneDbCrossref: number;
  geneName: string;
  drugs: IDrug[]
}

export interface ITableResponse {
  rowsCount: number;
  tableData: TableData[];
}

export interface IChartDataParams {
  resistantType: ResistantType,
  year: number[];
  countryId: string;
  drug?: number;
}

export interface IChartData {
  drug: number,
  susceptible: number,
  resistant: number,
  intermediate: number,
  ratioResistant: string,
  ratioSusceptible: string,
  ratioIntermediate: string,
  countryId: string;
  total: number
}

export interface IGetGlobalDrugsRequest {
  resistanceType: ResistantType,
  yearGte?: string;
  yearLte: string;
  countryId?: string;
  drug?: string;
}

export interface ITableDataParams {
  drugID?: number | string;
  geneDbCrossrefId?: number;
  order?: string;
  search?: Record<string, unknown>;
  page?: number;
  pageSize?: number;
}

export interface IAggregatedGlobalDrug {
  aggregatedTotal: number;
  aggregatedSusceptible: number;
  aggregatedResistant: number;
  aggregatedIntermediate: number;
  aggregatedSusceptibleRatio: number;
  aggregatedResistantRatio: number;
  aggregatedIntermediateRatio: number;
  aggregatedSusceptibleRatioFormatted: string;
  aggregatedResistantRatioFormatted: string;
  aggregatedIntermediateRatioFormatted: string;
  regionId: Regions;
  regionName: string;
}

export interface IAggregatedGlobalDrugsWithColor extends IAggregatedGlobalDrug {
  drugColor: string;
}

export interface IGetAllDrugsByAllRegionsResponse {
  africa: IGlobalDrugsResponse[],
  europe: IGlobalDrugsResponse[],
  america: IGlobalDrugsResponse[],
  easternMediterranean: IGlobalDrugsResponse[],
  westernPacific: IGlobalDrugsResponse[],
  southEastAsia: IGlobalDrugsResponse[],
  aggregatedDrugs: IAggregatedGlobalDrugsWithColor[],
}
