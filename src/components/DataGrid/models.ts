export interface IColumn<T> {
  name: keyof T;
  header: string;
}

export enum GridType {
  Gene = 'gene',
  Drug = 'drug',
}

export enum ScrollType {
  Infinite = 'infinite',
  Regular = 'regular',
}

export type SortOrder = 'asc' | 'desc' | undefined;

export interface ISortState {
  colIndex?: number
  order?: SortOrder
  colID?: string
}

export interface IColumnFilter {
  id: string;
  value: number | string;
}

export interface BaseColumns {
  variantName: string;
  variantGrade: string;
  consequence: string;
  globalFrequency: string;
  totalCounts: number;
  resistantCount: number;
  susceptbleCount: number;
  intermediateCount: number;
  nucleodicAnnName: string;
  proteicAnnName: string;
  drug: number;
  drugName: string;
}

export interface DrugTableColumns extends BaseColumns {
  geneName: string;
}

export interface GeneTableColumns extends BaseColumns {
  drug: number;
}
