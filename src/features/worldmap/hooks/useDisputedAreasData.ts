import { geoEquirectangular, geoPath } from 'd3-geo';
import { SVGProps } from 'react';
import geoJson from '../assets/Detailed_Boundary_Disputed_Areas.json';
import geoJsonRef from '../assets/odata.json';

import appColors from '../../../styles/colors';

export interface IMapDisputedAreas {
  name: string;
  polygon: SVGProps<SVGPathElement>;
}

export interface IGeoJSONFeatureProperties {
  NAME: string;
  OBJECTID: number;
  Type: string;
}

export interface IGeoJSONFeature {
  type: string;
  properties: IGeoJSONFeatureProperties;
}

// @ts-ignore
export const geoJSONDisputed: IGeoJSONFeature[] = geoJson.features;

const constructDisputedAreas = (
  mapSize: [number, number],
): IMapDisputedAreas[] => {
  const projection = geoEquirectangular().fitSize(mapSize, geoJsonRef as any);
  const geoPathGenerator = geoPath().projection(projection);

  const disputedBorder = geoJSONDisputed.map((feature) => {
    const areaId = feature.properties.OBJECTID.toString();
    let svgPropsPolygon: SVGProps<SVGPathElement> = {
      d: geoPathGenerator(feature as any) || '',
      stroke: 'none',
      fill: appColors.neutral.whoDisputedGrey,
    };

    if (feature.properties.Type === 'dashed') {
      svgPropsPolygon = {
        ...svgPropsPolygon,
        fill: 'url(#pattern_dashed_disputed)',
      };
    }

    return {
      name: areaId,
      polygon: svgPropsPolygon,
    } as IMapDisputedAreas;
  });

  return disputedBorder;
};

const useDisputedAreasData = () => ({
  constructDisputedAreas,
});

export default useDisputedAreasData;
