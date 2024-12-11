import { geoEquirectangular, geoPath } from 'd3-geo';
import { SVGProps } from 'react';
import geoJson from '../assets/odata.json';
import { IAggregatedGlobalDrugsWithColor } from '../../../services/drugsApi/models';
import { getRegionByCountry } from '../../../services/drugsApi/utils';
import { getAggregatedDrugByRegionId } from '../components/WorldMap/utils/dataExtractors';
import appColors from '../../../styles/colors';

export interface IMapCountry {
  countryName: string;
  whoRegion: string;
  polygon: SVGProps<SVGPathElement>;
  border: SVGProps<SVGPathElement>;
  countryCode: string;
  heatmapColor: string;
  id: string;
  type: string;
}

export interface IGeoJSONFeatureProperties {
  ADM0_SOVRN: string;
  ISO_3_CODE: string;
  GUID: string;
}
export interface IGeoJSONFeatureGeometry {
  type: string;
  geometries: Array<IGeoJSONFeature>;
}

export interface IGeoJSONFeature {
  type: string;
  properties: IGeoJSONFeatureProperties;
  geometry: IGeoJSONFeatureGeometry;
}

const defaultColor = appColors.neutral.whoNoData;

// @ts-ignore
export const geoJSONData: IGeoJSONFeature[] = geoJson.features;

const constructCountries = (
  mapSize: [number, number],
  aggregatedGlobalDrugs: IAggregatedGlobalDrugsWithColor[],
): IMapCountry[] => {
  const projection = geoEquirectangular().fitSize(mapSize, geoJson as any).precision(10);
  const geoPathGenerator = geoPath().projection(projection);

  const countries = geoJSONData.map((feature) => {
    const countryCode = feature.properties.ISO_3_CODE;
    const whoRegionId = getRegionByCountry(countryCode);
    const aggregatedDrug = getAggregatedDrugByRegionId(aggregatedGlobalDrugs, whoRegionId);
    const heatmapColor = aggregatedDrug?.drugColor || defaultColor;

    let svgPropsPolygon: SVGProps<SVGPathElement> = {
      d: geoPathGenerator(feature as any) || '',
      stroke: defaultColor,
      fill: defaultColor,
    };

    let svgPropsBorder: SVGProps<SVGPathElement> = {
      ...svgPropsPolygon,
      stroke: defaultColor,
      fill: defaultColor,
    };

    if (feature.geometry.type === 'MultiPolygon') {
      svgPropsPolygon = {
        ...svgPropsPolygon,
        stroke: 'none',
        fill: '#ffffff',
      };
      svgPropsBorder = {
        ...svgPropsPolygon,
        stroke: appColors.primary.navy,
        fill: 'none',
      };
    } else if (feature.geometry.type === 'GeometryCollection') {
      svgPropsPolygon = {
        d: geoPathGenerator(feature.geometry.geometries[0] as any) || '',
        stroke: 'none',
        fill: '#ffffff',
      };
      svgPropsBorder = {
        d: geoPathGenerator(feature.geometry.geometries[1] as any) || '',
        stroke: appColors.primary.navy,
        fill: 'none',
      };
    }
    // const svgPropsBorder = {
    //   ...svgPropsPolygon,
    //   stroke: appColors.primary.navy,
    //   fill: 'none',
    // };

    return {
      countryName: feature.properties.ADM0_SOVRN,
      countryCode,
      polygon: svgPropsPolygon,
      border: svgPropsBorder,
      heatmapColor,
      id: feature.properties.GUID,
      type: feature.geometry.type,
    } as IMapCountry;
  });

  return countries;
};

const useMapData = () => ({
  constructCountries,
});

export default useMapData;
