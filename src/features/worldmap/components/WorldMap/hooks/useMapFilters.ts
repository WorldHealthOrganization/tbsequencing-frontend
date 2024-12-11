import { useState } from 'react';
import { useDrugFilters } from '../../../../../hooks/useDrugFilters';
import { MapType } from '../models';

export const useMapFilters = () => {
  const {
    setSelectedDates,
    resistantType,
    setResistantType,
    selectedDates,
  } = useDrugFilters();

  const [mapType, setMapType] = useState<MapType>('macroRegions');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('2');
  const isHeatMap = mapType === 'heatmap';

  return {
    selectedDrugId,
    setSelectedDates,
    setSelectedDrugId,
    resistantType,
    setResistantType,
    selectedDates,
    mapType,
    setMapType,
    isHeatMap,
  };
};
