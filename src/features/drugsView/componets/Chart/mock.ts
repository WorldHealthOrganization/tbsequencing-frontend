import { IGlobalDrugsResponse } from '../../../../services/drugsApi/models';

export const drugs = [
  {
    drugId: 1,
    drugName: 'Rifampicin',
    code: 'RIF',
  }, {
    drugId: 2,
    drugName: 'Isoniazid',
    code: 'ISO',
  }, {
    drugId: 3,
    drugName: 'Ethambutol',
    code: 'ETB',
  }, {
    drugId: 4,
    drugName: 'Pyrazinamide',
    code: 'PYR',
  }, {
    drugId: 5,
    drugName: 'Levofloxacin',
    code: 'LEV',
  }, {
    drugId: 6,
    drugName: 'Moxifloxacin',
    code: 'MOX',
  }, {
    drugId: 7,
    drugName: 'Bedaquiline',
    code: 'BED',
  }, {
    drugId: 8,
    drugName: 'Linezolid',
    code: 'LIN',
  }, {
    drugId: 9,
    drugName: 'Clofazimine',
    code: 'CLO',
  }, {
    drugId: 10,
    drugName: 'Delamanid',
    code: 'DEL',
  }, {
    drugId: 11,
    drugName: 'Amikacin',
    code: 'AMI',
  }, {
    drugId: 12,
    drugName: 'Streptomycin',
    code: 'STR',
  }, {
    drugId: 13,
    drugName: 'Ethionamide',
    code: 'ETN',
  }, {
    drugId: 14,
    drugName: 'Kanamycina',
    code: 'KAN',
  }, {
    drugId: 15,
    drugName: 'Capreomycin',
    code: 'CAP',
  },

];

export const data = (): IGlobalDrugsResponse[] => drugs.map((name, index) => ({
  drug: index + 1,
  susceptible: Math.floor(Math.random() * 4000),
  resistant: Math.floor(Math.random() * 4000),
  intermediate: Math.floor(Math.random() * 4000),
  ratioSusceptible: `${Math.floor(Math.random() * 100)}%`,
  ratioResistant: `${Math.floor(Math.random() * 100)}%`,
  ratioIntermediate: `${Math.floor(Math.random() * 100)}%`,
  total: Math.floor(Math.random() * 20000),
}));
