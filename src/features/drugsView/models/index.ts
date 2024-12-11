export enum DrugStatus {
  Susceptible = 'susceptible',
  Resistant = 'resistant',
  Intermediate = 'intermediate',
  RatioSusceptible = 'ratioSusceptible',
  RatioResistant = 'ratioResistant',
  RatioIntermediate = 'ratioIntermediate',
}

export enum ResistantType {
  Phenotypic = 'Pheno',
  Genotypic = 'Geno',
}

export enum ChartDataType {
  Ratio = 'ratio',
  Count = 'count',
}

export enum Regions {
  ALL = 'ALL_REGIONS',
  AFRICA = 'AFR',
  EUROPE = 'EUR',
  AMERICA = 'AMR',
  EASTERN_MEDITERRANEAN = 'EMR',
  WESTERN_PACIFIC = 'WPR',
  SOUTH_EAST_ASIA = 'SEA',
}
