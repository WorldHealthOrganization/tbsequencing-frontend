/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useCallback, useRef, useState } from 'react';

import { Popover } from '@mui/material';

import { select as d3Select } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';

import { geoEquirectangular } from 'd3-geo';
// @ts-ignore
import { geoScaleBar } from 'd3-geo-scale-bar';

import geoJson from '../../assets/odata.json';

import { ReactComponent as WHOLogo } from '../../../../components/AboutUs/assets/whoLogo.svg';

import * as styles from './styles';
import MapTooltip from '../MapTooltip';
import TmpTooltip from '../InfoTooltip';
import BasePage from '../../../../components/BasePage';
import MapFilters from '../MapFilters';
import { useGetAllDrugsByAllRegionsQuery, useGetDrugsDataQuery } from '../../../../services/drugsApi/drugsApi';
import { useGetGlobalSamplesQuery } from '../../../../services/overviewApi/overviewApi';
import ActivityIndicator from '../../../../components/ActivityIndicator';
import { useMapApi } from './hooks/useMapApi';
import { useMapFilters } from './hooks/useMapFilters';
import HeatmapLegend from '../HeatmapLegend';
import { HEADER_HEIGHT } from '../../../../utils/dimensions';
import RegionCharts from '../RegionCharts';
import { getOffset } from './utils/renderingHelpers';
import { Regions } from '../../../drugsView/models';
import { getRegionByCountry } from '../../../../services/drugsApi/utils';
import appColors from '../../../../styles/colors';
import { match } from 'ts-pattern';
import { getAggregatedDrugByRegionId } from './utils/dataExtractors';
import { RectConfig } from '../RegionCharts/RegionCharts';
import { getDrugsSelections } from './utils/getDrugsSelections';
import { brokenCountriesList } from '../../brokenCountriesList';
import H1 from '../../../../components/typography/H1';
import AppPaper from '../../../../components/AppPaper';
import PrimaryText from '../../../../components/typography/PrimaryText';

d3Select.prototype.transition = d3Transition; // This is because internal bug in d3.js
// https://stackoverflow.com/questions/43653228/property-transition-does-not-exist-on-type-selectionbasetype-null-unde

const initialPosition = { top: 0, left: 0 };

const WorldMap = () => {
  const { data: drugsData} = useGetDrugsDataQuery({ isAssociated: 1 });
  const africaRectRef = useRef<SVGPathElement>(null!);
  const americaRectRef = useRef<SVGPathElement>(null!);
  const europeRectRef = useRef<SVGPathElement>(null!);
  const easternMediterraneanRectRef = useRef<SVGPathElement>(null!);
  const westernPacificRectRef = useRef<SVGPathElement>(null!);
  const southEastAsiaReactRef = useRef<SVGPathElement>(null!);

  const {
    selectedDrugId,
    setSelectedDates,
    setSelectedDrugId,
    resistantType,
    setResistantType,
    selectedDates,
    mapType,
    setMapType,
    isHeatMap,
  } = useMapFilters();

  const { data: globalSamplesData, isLoading: globalSamplesLoading } = useGetGlobalSamplesQuery({});

  const baseDrugsRequestProps = {
    yearGte: selectedDates[0].toString(),
    yearLte:  selectedDates[1].toString(),
    drug: selectedDrugId === '0' ? undefined : selectedDrugId,
    resistanceType: resistantType,
  }

  const { data: aggregatedDrugsData } = useGetAllDrugsByAllRegionsQuery(baseDrugsRequestProps);

  const getRegionRef = (countryCode: string) => {
    const ref = match<string, MutableRefObject<SVGPathElement> | undefined | (() => void) >(countryCode)
      .with('COD', () => africaRectRef)
      .with('GTM', () => americaRectRef)
      .with('GBR', () => europeRectRef)
      .with('IRQ', () => easternMediterraneanRectRef)
      .with('PNG', () => westernPacificRectRef)
      .with('LKA', () => southEastAsiaReactRef)
      .with('FRA', () => handleRect) // anchor to track that ref was changed
      .otherwise(() => undefined);

    return ref;
  }

  const aggregatedDrugsDataArray = aggregatedDrugsData?.aggregatedDrugs || [];

  const {
    mapCountries,
    mapDisputedBorders,
    mapWaterBodies,
    mapDisputedAreas,
    tooltipProps,
    getOnCountryClickHandler,
    handlePopoverClose,
    windowHeight,
    windowWidth,
    getOnRegionClickHandler,
    selectedRegionId,
  } = useMapApi({
    resistantType, setResistantType,
    globalSamples: globalSamplesData,
    isHeatMap,
    aggregatedDrugsData: aggregatedDrugsDataArray,
  });

  const [rectConfig, setRectConfig] = useState<RectConfig>({
    [Regions.AFRICA]: initialPosition,
    [Regions.AMERICA]: initialPosition,
    [Regions.EUROPE]: initialPosition,
    [Regions.EASTERN_MEDITERRANEAN]: initialPosition,
    [Regions.WESTERN_PACIFIC]: initialPosition,
    [Regions.SOUTH_EAST_ASIA]: initialPosition,
    [Regions.ALL]: { top: 0, left: 0 },
  })

  const handleRect = useCallback(() => {
    setTimeout(() => {
      setRectConfig(() => {
       // Sorry, we have to little time to fix this properly
        // Ideally we have to calculate position NOT based on ref
        // But based on country coordinates

        const africaPosition = getOffset(africaRectRef.current);
        const americaPosition = getOffset(americaRectRef.current);
        const europePosition = getOffset(europeRectRef.current);
        const easternMediterraneanPosition = getOffset(easternMediterraneanRectRef.current);
        const westernPacificPosition = getOffset(westernPacificRectRef.current);
        const southEastAsiaPosition = getOffset(southEastAsiaReactRef.current);


        return  {
          [Regions.AFRICA]: africaPosition,
          [Regions.AMERICA]: americaPosition,
          [Regions.EUROPE]: europePosition,
          [Regions.EASTERN_MEDITERRANEAN]: easternMediterraneanPosition,
          [Regions.WESTERN_PACIFIC]: westernPacificPosition,
          [Regions.SOUTH_EAST_ASIA]: southEastAsiaPosition,
          [Regions.ALL]: { top: 0, left: 0 },
        }
      })
    }, 0)

  }, [windowWidth, windowHeight])

  if (globalSamplesLoading && !globalSamplesData) {
    return <ActivityIndicator centered />;
  }

  // if (!drugsData || !globalSamplesData) {
  //   return null;
  // }


  const svgViewBox = `0 0 ${windowWidth} ${windowHeight - HEADER_HEIGHT}`;
  const grey = appColors.neutral.whoDisputedGrey;
  const waterBodiesColor =  appColors.tints.whoBlue.lightest;

  const map =
      <svg
        viewBox={svgViewBox}
        css={styles.svgTag}
        key='full-map'
        id='full-map'
      >
        <defs>
          <pattern id="pattern_dashed_disputed" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
            <line
              x1="0"
              y="0"
              x2="0"
              y2="3"
              stroke={grey}
              strokeWidth="4.5"
              />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width={windowWidth}
          height={windowHeight}
          fill={waterBodiesColor}
          stroke='none'
          id='rect-background'
          />

          {mapCountries.map((country, index) => {
            const selectedRegion = getRegionByCountry(country.countryCode);
            const drug = getAggregatedDrugByRegionId(aggregatedDrugsDataArray, selectedRegion);
            const stroke = selectedRegion === selectedRegionId ? appColors.secondary.whoBlue : appColors.primary.navy;

           const isBrokenCountry = brokenCountriesList.find((brokenCountry) => {
             return brokenCountry === country.countryCode;
           })
         
         
            const svg = isHeatMap ? {
              ...country.polygon,
              fill: country.heatmapColor,
            } : country.polygon;

            const keyborder = `${country.id}-${index}-border`
            const keypoly = `${country.id}-${index}-poly`
            const groupkey = `${country.id}-${index}`

            if (country.type=='MultiPolygon') {
            return (
                <path
                  ref={getRegionRef(country.countryCode)}
                  key={keypoly}
                  {...svg as unknown}
                  stroke={stroke}
                  strokeWidth='0.5'
                  onClick={ getOnCountryClickHandler(
                    country, selectedRegion, drug
                  ) }
                />
              );
            } else if (country.type=='GeometryCollection') {
              return(
              <g key={groupkey}>
                <path
                  ref={getRegionRef(country.countryCode)}
                    key={keypoly}
                    {...svg as unknown}
                    stroke='none'
                    onClick={ getOnCountryClickHandler(
                      country, selectedRegion, drug
                    ) }
                />
                <path
                  ref={getRegionRef(country.countryCode)}
                  key={keyborder}
                  {...country.border as unknown}
                  stroke={stroke}
                  strokeWidth='0.5'
                  fill='none'
                />
              </g>
              );
            }})}
          {mapWaterBodies.map((water, index) => {

            const keywaterbodies = `${index}-water-${water.id}`
            return (
                <path
                  key={keywaterbodies}
                  {...water.border as unknown}
                  fill={waterBodiesColor}
                  fillOpacity='1'
                />
            );
            })}
          {mapDisputedAreas.map((area) => {

            const keydisputedareas = `${area.name}-disputed`
            return (
                <path
                  key={keydisputedareas}
                  {...area.polygon as unknown}
                  stroke='none'
                />
            );
            })}
          {mapDisputedBorders.map((border) => {

            const keydisputedborder = `${border.name}-border-disputed`
            // d3Select("#full-map").call(scaleBar)
            return (
                <path
                  key={keydisputedborder}
                  {...border.border as unknown}
                  fill='none'
                />
            );
            })}
      <g
        css={styles.scaleTag}
        id="legend"
        >
        <rect 
          x="0"
          y="-40"
          width="15"
          height="15"
          fill={appColors.neutral.whoDisputedGrey}
          stroke={appColors.primary.navy}
          />
        <text 
          x="23"
          y="-27"
          fill={appColors.primary.navy}
          fontSize="12px"
          >
          Not applicable
          </text>

        </g>
      </svg>

  const projection = geoEquirectangular().fitSize([windowWidth, windowHeight], geoJson as any);
  const scaleBar = geoScaleBar().projection(projection).size([windowWidth, windowHeight]).left(0.94).top(0.45);

  const legend = d3Select("#legend");

  legend.call(scaleBar);

  return (
    <BasePage style={styles.wrapperStyles}>
    <H1 style={styles.mapTitle}>
      Geospatial overview of phenotypic and sequencing information
    </H1>
    {map}
    <div css={styles.filtersContainer}>
        <MapFilters
          closePopover={handlePopoverClose}
          setMapType={setMapType}
          selectedDrugId={selectedDrugId}
          resistantType={resistantType}
          // selectedDates={selectedDates}
          // setSelectedDates={setSelectedDates}
          drugsSelections={getDrugsSelections(drugsData)}
          mapType={mapType}
          setResistantType={setResistantType}
          setSelectedDrug={setSelectedDrugId}
        />
      </div>
      <MapTooltip {...tooltipProps} resistantType={resistantType}  onClose={handlePopoverClose} />
      {isHeatMap && <div css={styles.heatMapContainer}>
        <HeatmapLegend />
      </div>}
      {aggregatedDrugsData && !isHeatMap &&
        <RegionCharts
          rectConfig={rectConfig}
          getOnRegionClickHandler={getOnRegionClickHandler}
          aggregatedData={aggregatedDrugsData.aggregatedDrugs}
        />}
      <div css={styles.footNote}>
        <TmpTooltip 
          title='Disclaimer'
        />
      </div> 
     <div css={styles.footNoteBottom}>
       <WHOLogo height="100" />
      </div> 
    </BasePage>
  );
};

export default WorldMap;
