import { geoEquirectangular, geoPath } from 'd3-geo';
import { SVGProps } from 'react';
import geoJson from '../assets/Detailed_Boundary_Disputed_Borders.json';
import geoJsonRef from '../assets/odata.json';

import appColors from '../../../styles/colors';

export interface IMapDisputedBorders {
  name: string;
  border: SVGProps<SVGPathElement>;
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

const defaultColor = appColors.primary.navy;

// @ts-ignore
export const geoJSONDisputed: IGeoJSONFeature[] = geoJson.features;
// @ts-ignore
// export const geoJSONAll: IGeoJSONFeature[] = geoJsonRef.features + geoJsonRef.features;

const constructDisputedBorders = (
  mapSize: [number, number],
): IMapDisputedBorders[] => {
  const projection = geoEquirectangular().fitSize(mapSize, geoJsonRef as any);
  const geoPathGenerator = geoPath().projection(projection);

  const disputedBorder = geoJSONDisputed.map((feature) => {
    const borderId = feature.properties.OBJECTID.toString();
    let svgPropsBorder: SVGProps<SVGPathElement> = {
      d: geoPathGenerator(feature as any) || '',
      stroke: defaultColor,
      fill: 'none',
    };

    if (feature.properties.Type === 'dashed') {
      svgPropsBorder = {
        ...svgPropsBorder,
        strokeDasharray: '3',
        strokeWidth: '0.8',
      };
    } else if (feature.properties.Type === 'dotted') {
      svgPropsBorder = {
        ...svgPropsBorder,
        strokeDasharray: '1 2',
        strokeWidth: '0.8',
      };
    } else if (feature.properties.Type === 'half-dashed') {
      svgPropsBorder = {
        ...svgPropsBorder,
        strokeDasharray: '2 3',
        strokeWidth: '0.8',
      };
    } else if (feature.properties.Type === 'full') {
      svgPropsBorder = {
        ...svgPropsBorder,
        strokeWidth: '0.5',
      };
    }
    // const svgPropsBorder = {
    //   ...svgPropsPolygon,
    //   stroke: appColors.primary.navy,
    //   fill: 'none',
    // };

    return {
      name: borderId,
      border: svgPropsBorder,
    } as IMapDisputedBorders;
  });

  return disputedBorder;
};

const useDisputedBordersData = () => ({
  constructDisputedBorders,
});

export default useDisputedBordersData;
