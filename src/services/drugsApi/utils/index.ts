import geoJSON from './WHORegions.json';
import { Regions } from '../../../features/drugsView/models';

export const getCountriesByRegion = (regionID: Regions): string[] | undefined => {
  if (regionID === Regions.ALL || !regionID) return undefined;

  return geoJSON
    .filter((item) => item.WHO_REGION === regionID)
    .map((item) => item.ISO_A3);
};

export const getRegionByCountry = (countryId: string):Regions => {
  const foundRegion = geoJSON.find((item) => item.ISO_A3 === countryId);

  return foundRegion ? foundRegion.WHO_REGION as Regions : Regions.ALL;
};

export const createQueryParamsFromRegion = (regionID: Regions) => {
  const countries = getCountriesByRegion(regionID);
  if (!countries) return '';
  return countries.join('&countryId=');
};

export const africaRegionCountries = getCountriesByRegion(Regions.AFRICA);
export const europeRegionCountries = getCountriesByRegion(Regions.EUROPE);
export const americaRegionCountries = getCountriesByRegion(Regions.AMERICA);
export const easternMediterraneanCountries = getCountriesByRegion(
  Regions.EASTERN_MEDITERRANEAN,
);
export const westernPacificRegionCountries = getCountriesByRegion(Regions.WESTERN_PACIFIC);
export const southEastAsiaRegionCountries = getCountriesByRegion(Regions.SOUTH_EAST_ASIA);
