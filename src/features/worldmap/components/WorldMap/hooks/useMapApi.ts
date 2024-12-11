import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import useMapData, { IMapCountry } from '../../../hooks/useMapData';
import useDisputedBordersData, { IMapDisputedBorders } from '../../../hooks/useDisputedBordersData';
import useWaterBodiesData, { IMapWaterBodies } from '../../../hooks/useWaterBodiesData';
import useDisputedAreasData, { IMapDisputedAreas } from '../../../hooks/useDisputedAreasData';

import { Props as ITooltipProps } from '../../MapTooltip/MapTooltip';
import { useWindowSize } from '../../../hooks/useWindowSize';
import appColors from '../../../../../styles/colors';
import { Regions, ResistantType } from '../../../../drugsView/models';
import { IGetGlobalSamplesResponse } from '../../../../../services/overviewApi/models';
import { getCountriesByRegion } from '../../../../../services/drugsApi/utils';
import { IAggregatedGlobalDrug, IAggregatedGlobalDrugsWithColor } from '../../../../../services/drugsApi/models';
import { getAggregatedDrugByRegionId } from '../utils/dataExtractors';

const HOVER_BORDER_COLOR = appColors.secondary.whoBlue;
const DEFAULT_BORDER_COLOR = appColors.primary.navy;

interface IMapApiProps {
  setResistantType: (resistantType: ResistantType) => void;
  resistantType: ResistantType;
  globalSamples?: IGetGlobalSamplesResponse;
  isHeatMap: boolean;
  aggregatedDrugsData: IAggregatedGlobalDrugsWithColor[];
}

export const useMapApi = ({
  setResistantType, resistantType, aggregatedDrugsData,
}: IMapApiProps) => {
  const { width, height } = useWindowSize();
  const [mapCountries, setMapCountries] = useState<IMapCountry[]>([]);
  const selectedRegionRef = useRef<Regions | undefined>(undefined);
  const [mapDisputedBorders, setDisputedBorders] = useState<IMapDisputedBorders[]>([]);
  const [mapDisputedAreas, setDisputedAreas] = useState<IMapDisputedAreas[]>([]);

  const [mapWaterBodies, setWaterBodies] = useState<IMapWaterBodies[]>([]);

  const [tooltipProps, setTooltipProps] = useState<ITooltipProps>({
    title: '',
    opened: false,
    top: 0,
    left: 0,
    totalSamples: 0,
    intermediateRatio: '22.22',
    shouldRenderColorLegend: true,
    resistantType,
    resistantQuantity: 0,
    resistantRatio: '22.22',
    intermediateQuantity: 0,
    susceptibleRatio: '22.22',
    susceptibleQuantity: 0,
    setResistantType,
  });

  const {
    constructCountries,
  } = useMapData();

  const {
    constructDisputedBorders,
  } = useDisputedBordersData();

  const {
    constructDisputedAreas,
  } = useDisputedAreasData();

  const {
    constructWaterBodies,
  } = useWaterBodiesData();

  const mapSize: [number, number] = useMemo(() => [
    (width) || 0,
    (height) || 0,
  ], [height, width]);

  const handleMouseOverCountry = (
    evt: React.MouseEvent<SVGPathElement, MouseEvent>,
    country: IMapCountry,
  ) => {
    const countries = mapCountries.filter(
      (filterCountry) => country.countryName !== filterCountry.countryName,
    )
      .map((filterCountry) => ({
        ...filterCountry,
        svg: {
          ...filterCountry.border,
          stroke: DEFAULT_BORDER_COLOR,
        },
      }));

    const countryToInsert = {
      ...country,
      svg: {
        ...country.border,
        stroke: HOVER_BORDER_COLOR,
      },
    };

    // In order to render border properly we need to render selected country last!

    setMapCountries([...countries, countryToInsert]);
  };

  const handleMouseLeaveCountry = () => {
    const countries = mapCountries.map((country) => ({
      ...country,
      svg: {
        ...country.border,
        stroke: DEFAULT_BORDER_COLOR,
      },
    }));

    setMapCountries(countries);
  };

  const selectRegion = (region: Regions) => {
    selectedRegionRef.current = region;

    setMapCountries((prevState) => {
      const regionCountries = getCountriesByRegion(region);

      const countries = prevState.map((country) => {
        const isMatchingWithRegion = regionCountries?.find((
          regionCountry,
        ) => regionCountry === country.countryCode);
        const stroke = isMatchingWithRegion ? HOVER_BORDER_COLOR : DEFAULT_BORDER_COLOR;

        return {
          ...country,
          svg: {
            ...country.border,
            stroke,
          },
        };
      });

      const otherCountries = countries.filter(
        (({ countryCode }) => !regionCountries?.includes(countryCode)),
      );

      const selectedCountries = countries.filter(
        (({ countryCode }) => regionCountries?.includes(countryCode)),
      );

      return [...otherCountries, ...selectedCountries];
    });
  };

  const updateTooltipProps = (
    clientX: number,
    clientY: number,
    globalDrug: IAggregatedGlobalDrug,
  ) => {
    const {
      regionId, regionName,
      aggregatedResistant,
      aggregatedIntermediate,
      aggregatedIntermediateRatioFormatted,
      aggregatedSusceptibleRatioFormatted,
      aggregatedSusceptible,
      aggregatedResistantRatioFormatted,
      aggregatedTotal,
    } = globalDrug;

    selectRegion(regionId);

    setTooltipProps({
      ...tooltipProps,
      title: regionName,
      opened: true,
      top: clientY,
      left: clientX,
      susceptibleQuantity: aggregatedSusceptible,
      susceptibleRatio: aggregatedSusceptibleRatioFormatted,
      resistantRatio: aggregatedResistantRatioFormatted,
      resistantQuantity: aggregatedResistant,
      intermediateRatio: aggregatedIntermediateRatioFormatted,
      intermediateQuantity: aggregatedIntermediate,
      totalSamples: aggregatedTotal,
    });
  };

  const getOnRegionClickHandler = (
    globalDrug: IAggregatedGlobalDrug,
  ) => (event: React.MouseEvent<HTMLDivElement | SVGPathElement>) => {
    const { clientX, clientY } = event;

    updateTooltipProps(clientX, clientY, globalDrug);
  };

  const getOnCountryClickHandler = (
    country: IMapCountry,
    selectedRegion: Regions,
    drug?: IAggregatedGlobalDrugsWithColor,
  ) => {
    if (!drug) {
      return undefined;
    }

    return getOnRegionClickHandler(drug);
  };

  const deselectAll = () => {
    selectedRegionRef.current = undefined;

    setMapCountries((prevState) => prevState.map((country) => ({
      ...country,
      svg: {
        ...country.border,
        stroke: DEFAULT_BORDER_COLOR,
      },
    })));
  };

  const handlePopoverClose = () => {
    setTooltipProps((prevState) => ({
      ...prevState,
      opened: false,
    }));

    deselectAll();
  };

  useEffect(() => {
    const { top, left } = tooltipProps;
    const currentSelectedGlobalDrug = getAggregatedDrugByRegionId(
      aggregatedDrugsData,
      selectedRegionRef.current,
    );

    if (!currentSelectedGlobalDrug) {
      return;
    }

    updateTooltipProps(left, top, currentSelectedGlobalDrug);
  }, [resistantType, aggregatedDrugsData]);

  useEffect(() => {
    const initialMapCountries = constructCountries(mapSize, aggregatedDrugsData);
    setMapCountries(initialMapCountries);

    const initialDisputedBorders = constructDisputedBorders(mapSize);
    setDisputedBorders(initialDisputedBorders);

    const initialDisputedAreas = constructDisputedAreas(mapSize);
    setDisputedAreas(initialDisputedAreas);

    const initialWaterBodies = constructWaterBodies(mapSize);
    setWaterBodies(initialWaterBodies);
  }, [constructCountries,
    constructDisputedBorders,
    constructWaterBodies,
    constructDisputedAreas,
    mapSize,
    aggregatedDrugsData]);

  return {
    mapCountries,
    mapDisputedBorders,
    mapWaterBodies,
    mapDisputedAreas,
    tooltipProps,
    handleMouseOverCountry,
    handleMouseLeaveCountry,
    getOnCountryClickHandler,
    handlePopoverClose,
    windowHeight: height,
    windowWidth: width,
    getOnRegionClickHandler,
    selectedRegionId: selectedRegionRef.current,
  };
};
