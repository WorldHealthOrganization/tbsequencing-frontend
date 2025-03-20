import {
  formatRecentlySearch, formatMostSearch, formatDrugsTableGenesView,
} from '../utils';

const searchRecentlyMock = [
  {
    geneName: 'rpoC', geneDbCrossrefId: 1, locusTag: 'RV006', counter: 'Yesterday', date: '2009-11-08 21:22:05',
  },
  {
    geneName: '', geneDbCrossrefId: 2, locusTag: 'RV0086', counter: 'Today', date: '2012-11-08 21:22:05',
  },
];

const searchRecentlyResult = [
  { id: 1, leftColValue: 'rpoC', rightColValue: 'over 15 years ago' },
  { id: 2, leftColValue: 'RV0086', rightColValue: 'over 12 years ago' },
];

const searchMostMock = [
  {
    geneName: 'rpoC', geneDbCrossrefId: 1, locusTag: 'RV006', counter: 45,
  },
  {
    geneName: '', geneDbCrossrefId: 2, locusTag: 'RV0086', counter: 99,
  },
];

const searchMostResult = [
  { id: 1, leftColValue: 'rpoC', rightColValue: 45 },
  { id: 2, leftColValue: 'RV0086', rightColValue: 99 },
];

const drugsTableMock = [
  { code: 'RIF', drugName: 'Rifampicine', drugId: 1 },
  { code: 'INH', drugName: 'Isoniazid', drugId: 3 },
];

const drugsTableResult = [
  { id: 1, leftColValue: 'RIF', rightColValue: 'Rifampicine' },
  { id: 3, leftColValue: 'INH', rightColValue: 'Isoniazid' },
];

describe('AssociationTable formatters', () => {
  test.each([
    [[], []],
    [undefined, []],
    [searchRecentlyMock, searchRecentlyResult],
  ])('formatRecentlySearch', (data, expected) => {
    const result = formatRecentlySearch(data);

    expect(result).toEqual(expected);
  });

  test.each([
    [[], []],
    [undefined, []],
    [searchMostMock, searchMostResult],
  ])('formatMostSearch', (data, expected) => {
    const result = formatMostSearch(data);

    expect(result).toEqual(expected);
  });

  test.each([
    [[], []],
    [undefined, []],
    [drugsTableMock, drugsTableResult],
  ])('formatDrugsTableGenesView', (data, expected) => {
    const result = formatDrugsTableGenesView(data);

    expect(result).toEqual(expected);
  });
});
