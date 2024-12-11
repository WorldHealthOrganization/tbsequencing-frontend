import { geoEquirectangular, geoPath } from 'd3-geo';
import { SVGProps } from 'react';
import geoJson from '../assets/Detailed_Boundary_Water_Bodies.json';
import geoJsonRef from '../assets/odata.json';

export interface IMapWaterBodies {
  name: string;
  border: SVGProps<SVGPathElement>;
  id: string;
}

export interface IGeoJSONFeatureProperties {
  NAME: string;
  OBJECTID: number;
}

export interface IGeoJSONFeature {
  type: string;
  properties: IGeoJSONFeatureProperties;
}

// @ts-ignore
export const geoJSON: IGeoJSONFeature[] = geoJson.features;

const constructWaterBodies = (
  mapSize: [number, number],
): IMapWaterBodies[] => {
  const projection = geoEquirectangular().fitSize(mapSize, geoJsonRef as any);
  const geoPathGenerator = geoPath().projection(projection);

  const disputedBorder = geoJSON.map((feature) => {
    const borderName = feature.properties.NAME;
    const borderId = feature.properties.OBJECTID.toString();
    const svgPropsBorder: SVGProps<SVGPathElement> = {
      d: geoPathGenerator(feature as any) || '',
      stroke: 'none',
      fillOpacity: '1',
    };

    // const svgPropsBorder = {
    //   ...svgPropsPolygon,
    //   stroke: appColors.primary.navy,
    //   fill: 'none',
    // };

    return {
      name: borderName,
      border: svgPropsBorder,
      id: borderId,
    } as IMapWaterBodies;
  });

  return disputedBorder;
};

const useWaterBodiesData = () => ({
  constructWaterBodies,
});

export default useWaterBodiesData;
