import { IDrug } from '../../../../../services/drugsApi/models';

export const getDrugsSelections = (drugs?: IDrug[]) => {
  if (!drugs) {
    return [];
  }

  const drugsSelections = drugs.map((drug) => ({
    value: `${drug.drugId}`,
    label: drug.drugName,
  }));

  return [...drugsSelections];
};
