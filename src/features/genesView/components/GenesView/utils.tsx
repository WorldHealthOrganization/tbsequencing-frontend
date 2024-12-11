/** @jsxImportSource @emotion/react */
import React from 'react';
import { formatDistance, parseISO } from 'date-fns';
import { IGenesOverview, ISearchCount, ISearchRecent } from '../../models';
import { GeneAssociationData, GeneAssociationGroupedData } from '../../../../services/drugsApi/models';
import { cdsLink, geneOverviewLink } from './styles';

const getDayByDate = (date: string) => (date.includes('hours') ? 'Today' : date);

export const formatRecentlySearch = (searchRecentlyData?: ISearchRecent[]) => {
  if (!searchRecentlyData) return [];

  return searchRecentlyData.map((item) => ({
    id: item.geneDbCrossrefId,
    leftColValue: item.geneName || item.locusTag,
    rightColValue: getDayByDate(
      `${formatDistance(parseISO(item.date as string), new Date(), { addSuffix: true })}`,
    ),
  }));
};

export const formatMostSearch = (searchMostData?: ISearchCount[]) => {
  if (!searchMostData) return [];

  return searchMostData.map((item) => ({
    id: item.geneDbCrossrefId,
    leftColValue: item.geneName || item.locusTag,
    rightColValue: item.counter,
  }));
};

export const formatDrugsTableGenesView = (data?: any[]) => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.drugId,
    leftColValue: item.code,
    rightColValue: item.drugName,
  }));
};

export const formatResistantDataGrouped = (data?: GeneAssociationGroupedData[]) => {
  if (!data?.length) return [];

  return data.map((item) => ({
    id: item.geneDbCrossrefId,
    leftColValue: item.geneName || item.locusTag,
    tier: item.tier,
  }));
};

export const formatResistantData = (data?: GeneAssociationData[]) => {
  if (!data?.length) return [];

  return data.map((item) => ({
    id: item.geneDbCrossref,
    leftColValue: item.geneName,
    rightColValue: item.drugs.map((d) => d.code).join(', '),
  }));
};

export const getGenomeContextLength = (gene?: IGenesOverview) => {
  if (!gene) return {};
  const length = gene.endPos - gene.startPos;
  const startPos = parseInt(String(gene.startPos - length * 1.5), 10);
  const endPos = parseInt(String(gene.endPos + length * 1.5), 10);
  return {
    startPos: startPos > 0 ? startPos : 1,
    endPos,
  };
};

export const formatGenesOverviewData = (data?: IGenesOverview) => {
  if (!data) return [];
  const {
    geneName,
    locusTag,
    geneType,
    geneDescription,
    startPos,
    endPos,
    ncbiId,
    proteinLength,
  } = data;

  return [
    { title: 'Gene Symbol', value: geneName || locusTag },
    {
      title: 'NCBI Gene ID',
      value: ncbiId,
      element: (
        <a
          css={geneOverviewLink}
          target="_blank"
          href={`https://www.ncbi.nlm.nih.gov/gene/${ncbiId}`}
          rel="noreferrer"
        >
          {ncbiId}
        </a>
      ),
    },
    { title: 'Gene Description', value: geneDescription },
    { title: 'Locus Tag', value: locusTag },
    { title: 'Gene type', value: geneType ? 'protein coding' : null },
    {
      title: 'Location',
      value: endPos && startPos
        ? `${startPos.toLocaleString('en-US')}..${endPos.toLocaleString('en-US')}`
        : null,
    },
    {
      title: 'Length',
      value: endPos && startPos
        ? `${(endPos - startPos).toLocaleString('en-US')} nt`
        : null,
    },
    {
      title: 'CDS',
      value: geneType,
      element: (
        <a
          css={[geneOverviewLink, cdsLink]}
          target="_blank"
          href={`https://www.ncbi.nlm.nih.gov/protein/${geneType}`}
          rel="noreferrer"
        >
          {geneType}
        </a>
      ),
    },
    {
      title: 'Protein Length',
      value: proteinLength
        ? `${proteinLength.toLocaleString('en-US')} aa`
        : null,
    },
  ];
};
