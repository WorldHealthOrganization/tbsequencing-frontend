import { DrugTableColumns } from './models';

const STATIC_VALUE = 10000.02;

const singleRow = (): DrugTableColumns => ({
  variantName: 'NC_000962.3-760800-G-A',
  variantGrade: 'AUTO GRADE',
  geneName: 'rpoC',
  resistantCount: Math.floor(STATIC_VALUE),
  susceptbleCount: Math.floor(STATIC_VALUE),
  intermediateCount: Math.floor(STATIC_VALUE),
  nucleodicAnnName: 'YnZHz',
  proteicAnnName: 'YnZHz',
  globalFrequency: `${Math.floor(STATIC_VALUE)}%`,
  totalCounts: Math.floor(STATIC_VALUE),
  consequence: 'upstream',
  drug: Math.floor(STATIC_VALUE),
  drugName: 'Rifampicin',
});

export const makeData = (length: number): DrugTableColumns[] => (
  Array.from({ length }, () => singleRow()));
