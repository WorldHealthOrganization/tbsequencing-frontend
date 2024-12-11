import { IGenesOverview, ISearchCount } from '../../models';

export const mostSearches: ISearchCount[] = [
  {
    counter: 112, geneName: 'rpoB', geneDbCrossrefId: 114, locusTag: 'aboba',
  },
  {
    counter: 97, geneName: 'rpoC', geneDbCrossrefId: 154, locusTag: 'aboba',
  },
  {
    counter: 90, geneName: 'Rv0669c', geneDbCrossrefId: 144, locusTag: '',
  },
  {
    counter: 50, geneName: 'J8670_RS10355', geneDbCrossrefId: 116, locusTag: '',
  },
  {
    counter: 22, geneName: 'J8670_RS10350', geneDbCrossrefId: 118, locusTag: '',
  },
  {
    counter: 18, geneName: 'cfp21', geneDbCrossrefId: 125, locusTag: '',
  },
  {
    counter: 12, geneName: 'J8670_RS10345', geneDbCrossrefId: 119, locusTag: '',
  },
  {
    counter: 9, geneName: 'vapB8', geneDbCrossrefId: 120, locusTag: '',
  },
  {
    counter: 3, geneName: 'vapC8', geneDbCrossrefId: 121, locusTag: '',
  },
];

export const simpleData: IGenesOverview = {
  endPos: 763325,
  id: 694,
  geneDbCrossrefId: 694,
  geneDescription: 'DNA-directed RNA polymerase subunit beta',
  geneName: 'rpoB',
  geneType: 'NP_215181.1',
  locusTag: 'Rv0667',
  ncbiId: '888164',
  proteinLength: 1172,
  startPos: 759807,
  strand: 1,
};

export const drugsTable = [
  { code: 'RIF', drugName: 'Rifampicine', drugId: 2 },
  { code: 'INH', drugName: 'Isoniazid', drugId: 1 },
  { code: 'EMB', drugName: 'Ethambutol', drugId: 4 },
  { code: 'LZD', drugName: 'Linezolid', drugId: 21 },
];

export const association = [
  { geneName: 'cfp21', drugs: [{ code: 'INH' }, { code: 'ZLD' }], geneDbCrossref: 1 },
  { geneName: 'J8670 RS10345', drugs: [{ code: 'INH' }, { code: 'ZLD' }], geneDbCrossref: 2 },
  { geneName: 'rpoB', drugs: [{ code: 'INH' }, { code: 'ZLD' }], geneDbCrossref: 694 },
  { geneName: 'Rv2490a', drugs: [{ code: 'INH' }, { code: 'ZLD' }], geneDbCrossref: 7 },
];
