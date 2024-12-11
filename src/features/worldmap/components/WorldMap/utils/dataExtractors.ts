import { match } from 'ts-pattern';
import appColors from '../../../../../styles/colors';
import type {
  IAggregatedGlobalDrug, IAggregatedGlobalDrugsWithColor,
  IGlobalDrugsMapResponse,
  IGlobalDrugsResponse,
} from '../../../../../services/drugsApi/models';
import { Regions } from '../../../../drugsView/models';

const MAX = 100;
const ORANGE_RATIO = 87.5;
const LIGHT_ORANGE_RATIO = 75;
const LIGHTER_ORANGE_RATIO = 62.5;
const LIGHTEST_ORANGE_RATIO = 50;
const LIGHTER_BLUE_RATIO = 37.5;
const LIGHT_BLUE_RATIO = 25;
const BLUE_RATIO = 12.5;
const WHITE_RATIO = 0;

const isOrange = (ratio: number) => ratio > ORANGE_RATIO && ratio <= MAX;
const isLightOrange = (ratio: number) => ratio > LIGHT_ORANGE_RATIO && ratio <= ORANGE_RATIO;
const isLighterOrange = (
  ratio: number,
) => ratio > LIGHTER_ORANGE_RATIO && ratio <= LIGHT_ORANGE_RATIO;

const isLightestOrange = (
  ratio: number,
) => ratio > LIGHTEST_ORANGE_RATIO && ratio <= LIGHTER_ORANGE_RATIO;

const isLighterBlue = (
  ratio: number,
) => ratio > LIGHTER_BLUE_RATIO && ratio <= LIGHTEST_ORANGE_RATIO;

const isLightBlue = (ratio: number) => ratio > LIGHT_BLUE_RATIO && ratio <= LIGHTER_BLUE_RATIO;
const isBlue = (ratio: number) => ratio > BLUE_RATIO && ratio <= LIGHT_BLUE_RATIO;
const isWhite = (ratio: number) => ratio > WHITE_RATIO && ratio <= BLUE_RATIO;

export const getHeatmapRegionColor = (ratio: number) => {
  if (Number.isNaN(ratio)) {
    return appColors.neutral.white;
  }

  const returnedColor = match<number, string>(ratio)
    .when(isOrange, () => appColors.secondary.whoOrange)
    .when(isLightOrange, () => appColors.tints.whoOrange.light)
    .when(isLighterOrange, () => appColors.tints.whoOrange.lighter)
    .when(isLightestOrange, () => appColors.tints.whoOrange.lightest)
    .when(isLighterBlue, () => appColors.tints.whoBlue.lightest)
    .when(isLightBlue, () => appColors.tints.whoBlue.lighter)
    .when(isBlue, () => appColors.tints.whoBlue.light)
    .when(isWhite, () => appColors.neutral.white)
    .otherwise(() => appColors.secondary.whoBlue);

  return returnedColor;
};

export const getRatio = (total: number, ratioFrom: number) => {
  const part = total / 100;
  const ratio = ratioFrom / part;

  return ratio;
};

export const formatPercents = (percents: number): string => `${percents.toFixed(1)}`;

export const getAllDrugsByRegion = (
  regionCountries: string[] | undefined,
  globalDrugs: IGlobalDrugsMapResponse[],
) => {
  if (!regionCountries) {
    return [];
  }

  const drugsByRegion = globalDrugs.filter((globalDrug) => {
    const isMatchingWithRegion = regionCountries.find(
      (regionCountry) => regionCountry === globalDrug.countryId,
    );

    return isMatchingWithRegion;
  });

  return drugsByRegion;
};

export const getAggregatedDrugsData = (
  drugsByRegion: IGlobalDrugsResponse[],
  regionId: Regions,
):
IAggregatedGlobalDrug => {
  const aggregatedTotal = drugsByRegion
    .reduce((prevDrugValue, currentDrug) => prevDrugValue + currentDrug.total, 0);

  const aggregatedSusceptible = drugsByRegion
    .reduce((prevDrugValue, currentDrug) => prevDrugValue + currentDrug.susceptible, 0);

  const aggregatedResistant = drugsByRegion
    .reduce((prevDrugValue, currentDrug) => prevDrugValue + currentDrug.resistant, 0);

  const aggregatedIntermediate = drugsByRegion
    .reduce((prevDrugValue, currentDrug) => prevDrugValue + currentDrug.intermediate, 0);

  const aggregatedSusceptibleRatio = getRatio(aggregatedTotal, aggregatedSusceptible);
  const aggregatedResistantRatio = getRatio(aggregatedTotal, aggregatedResistant);
  const aggregatedIntermediateRatio = getRatio(aggregatedTotal, aggregatedIntermediate);

  const aggregatedSusceptibleRatioFormatted = formatPercents(aggregatedSusceptibleRatio);
  const aggregatedResistantRatioFormatted = formatPercents(aggregatedResistantRatio);
  const aggregatedIntermediateRatioFormatted = formatPercents(aggregatedIntermediateRatio);

  const regionName = match<Regions, string>(regionId)
    .with(Regions.ALL, () => 'All regions')
    .with(Regions.EUROPE, () => 'Europe')
    .with(Regions.AMERICA, () => 'America')
    .with(Regions.AFRICA, () => 'Africa')
    .with(Regions.SOUTH_EAST_ASIA, () => 'South East Asia')
    .with(Regions.WESTERN_PACIFIC, () => 'Western Pacific')
    .with(Regions.EASTERN_MEDITERRANEAN, () => 'Eastern Mediterranean')
    .exhaustive();

  return {
    aggregatedTotal,
    aggregatedSusceptible,
    aggregatedResistant,
    aggregatedIntermediate,
    aggregatedSusceptibleRatio,
    aggregatedResistantRatio,
    aggregatedIntermediateRatio,
    aggregatedSusceptibleRatioFormatted,
    aggregatedResistantRatioFormatted,
    aggregatedIntermediateRatioFormatted,
    regionId,
    regionName,
  };
};

export const getAggregatedDrugByRegionId = (
  aggregatedDrugs: IAggregatedGlobalDrugsWithColor[],
  regionId: Regions | undefined,
) => aggregatedDrugs.find((aggregatedDrug) => aggregatedDrug.regionId === regionId);

export const addColorToAggregatedDrug = (
  totalMax: number,
  aggregatedDrug: IAggregatedGlobalDrug,
):IAggregatedGlobalDrugsWithColor => {
  const ratio = getRatio(totalMax, aggregatedDrug.aggregatedTotal);
  const drugColor = getHeatmapRegionColor(ratio);

  return {
    ...aggregatedDrug,
    drugColor,
  };
};
