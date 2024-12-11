import { ICountry } from '../../../../../services/dictionariesApi/models';
import { ISelectableData } from '../types';

export const getCountriesData = (data: ICountry[]):ISelectableData[] => data.map((country) => ({
  label: country.countryUsualName,
  value: country.threeLettersCode,
}));
