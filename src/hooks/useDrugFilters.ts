import { useState } from 'react';
import { IDrug } from '../services/drugsApi/models';
import { ChartDataType, ResistantType } from '../features/drugsView/models';

export const useDrugFilters = () => {
  const [selectedDrug, setSelectedDrug] = useState<IDrug | {}>({});
  const [resistantType, setResistantType] = useState<ResistantType>(ResistantType.Phenotypic);
  const [selectedDates, setSelectedDates] = useState<number[]>([1964, new Date().getFullYear()]);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [dataType, setDataType] = useState<ChartDataType>(ChartDataType.Ratio);

  return {
    selectedDrug,
    setSelectedDates,
    selectedRegion,
    dataType,
    setDataType,
    setSelectedDrug,
    resistantType,
    setSelectedRegion,
    setResistantType,
    selectedDates,
  };
};
