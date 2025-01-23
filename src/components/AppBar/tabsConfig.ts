import { appRoutes } from '../../navigation/appRoutes';

export const dropdownConfig = [
  { ...appRoutes.about, label: 'About' },
  { ...appRoutes.overview, label: 'Overview' },
  { ...appRoutes.drugs, label: 'Drugs' },
  { ...appRoutes.genes, label: 'Genes' },
];

export const tabsConfig = [
  { ...appRoutes.mutations, label: 'Mutation' },
  { ...appRoutes.genotypeResistance, label: 'Genotype Resistance' },
  { ...appRoutes.dataSubmission, label: 'Data submission' },
  { ...appRoutes.download, label: 'Download' },
];

export const userActiveTabsConfig: ITabsConfig = [
  {
    ...appRoutes.registration,
    label: 'Registration',
  },
  {
    ...appRoutes.dataSubmission,
    label: 'Data submission',
  },

];

export type ITabsConfig = typeof tabsConfig;
export type IDropdownConfig = typeof dropdownConfig;
