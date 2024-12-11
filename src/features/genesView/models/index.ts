import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { IGene, IVariant } from '../../../services/genesApi/models';

export type AutocompleteParams = typeof skipToken | { search?: string };

export interface IGenomeContextWrapperProps {
  data?: IGene[];
  isLoading?: boolean;
  selectedGene?: IGenesOverview;
  minDomain?: number;
  maxDomain?: number;
}

export interface IGenomeContextProps extends IGenomeContextWrapperProps {
  width: number;
}

export interface IVariantLocal extends IVariant {
  pos: number;
}

export interface ISearchResult {
  geneName: string;
  geneDbCrossrefId: number;
  locusTag: string;
}

export interface ISearchCount extends ISearchResult {
  counter: number;
}

export interface ISearchRecent extends ISearchResult {
  counter: string;
  date: Date | string;
}

export interface IGenesOverview extends IGene {
  geneDescription: string;
  geneType: string;
  ncbiId: string;
  proteinLength: number;
}

export interface IGenesOverviewTableData {
  title: string;
  value: string | number | null;
  element?: React.ReactNode;
}

export interface IGenesOverviewResponse {
  genes: IGene;
  genesOverview: IGenesOverview
}
