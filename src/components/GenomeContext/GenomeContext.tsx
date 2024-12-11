/** @jsxImportSource @emotion/react */
import {
  scaleBand, scaleLinear,
} from 'd3-scale';

import React from 'react';
import { max } from 'd3-array';
import { useD3 } from '../../hooks/useD3';
import { defaultBar, genomeContext, selectedBar } from './styles';
import { font } from '../typography/fontSizes';
import { formatGenomeContextData } from './utils';
import { IGenomeData } from './models';
import { IGenomeContextProps } from '../../features/genesView/models';

// EXAMPLE ARROW TO THE LEFT
// 20,20 5,35.5 20,52 100,52 100,20
// {
//   1: left-bottom coordinate (x1 + 15),
//   2: arrow-dot coordinate (x1),
//   3: left-top coordinate (x1 + 15),
//   4: right-top coordinate (x2),
//   5: right-bottom coordinate (x2),
// }

// EXAMPLE ARROW TO THE RIGHT
// 100,52 20,52 20,20 100,20 115,35
// {
//   100,52 = right-top coordinate (x2 - 15),
//   20,52 = left-top coordinate (x1),
//   20,20 = left-bottom coordinate (x1),
//   100,20 = right-bottom coordinate (x2 - 15),
//   115,35 = arrow-dot coordinate (x2)
// }

// polygon points it is an array with pairs of coordinates x,y
// x1 and x2 calculates by d3 library, depends on passed range,
// so we just pass x's in and change X coordinates from default example
// Y coordinates remains same
const getPolygonPoints = (x1: number, x2: number, strand?: 1 | -1) => {
  // arrow to the left
  if (strand === -1) {
    // if gene is to small need to add arrow not to transform it
    if (x1 + 15 > x2) {
      return `${x1},20 ${x1 - 15},35.5 ${x1},52 ${x2},52 ${x2},20`;
    }
    return `${x1 + 15},20 ${x1},35.5 ${x1 + 15},52 ${x2},52 ${x2},20`;
  }
  // arrow to the right

  // if gene is to small need to add arrow not to transform it
  if (x2 - 15 < x1) {
    return `${x2},52 ${x1},52 ${x1},20 ${x2},20 ${x2 + 15},35.5`;
  }
  return `${x2 - 15},52 ${x1},52 ${x1},20 ${x2 - 15},20 ${x2},35.5`;
};

export const GenomeContext = ({
  data, selectedGene, minDomain, maxDomain, width,
}: IGenomeContextProps) => {
  const ref = useD3((svg) => {
    if (!data?.length) return;

    const formattedData = formatGenomeContextData(data, selectedGene);

    const height = max(formattedData, (d) => d.y) * 65;
    const keyFunction = (d: IGenomeData) => d.geneDbCrossrefId;

    const x = scaleLinear([minDomain!, maxDomain!], [0, width]);
    const y = scaleBand()
      .domain(formattedData.map((item) => item.y as unknown as string))
      .rangeRound([0, height]);

    const rectTransform = (d: IGenomeData) => `translate(0, ${y(d.y as unknown as string)})`;

    // Clear everything before rerender
    svg.selectAll('*').remove();

    svg
      .attr('class', 'chart')
      .attr('width', width)
      .attr('height', height);

    const group = svg.selectAll('.chart')
      .data(formattedData, keyFunction).enter()
      .append('g')
      .attr('y', 0)
      .attr('style', (d: IGenomeData) => {
        if (d.isSelected) return selectedBar;
        return defaultBar;
      })
      .attr('transform', rectTransform)
      .attr('height', 32);

    group.append('polygon')
      .attr('style', (d: IGenomeData) => {
        if (d.isSelected) return selectedBar;
        return defaultBar;
      })
      .attr('points', (d: IGenomeData) => getPolygonPoints(x(d.startPos), x(d.endPos), d.strand));

    group.append('text')
      .text((d: IGenomeData) => d.geneName || d.locusTag)
      .attr('font-size', 16)
      .attr('font-family', font.bold)
      .attr('fill', 'black')
      .attr('y', 36)
      .attr('x', (d: IGenomeData) => {
        // If gene startPos less than min coordinate,
        // or gene endPos more than end coordinate,
        // it means that gene overflows the widget, and
        // we have to cut the polygon to display
        // locus tag || geneName relative to min or max coordinate accordingly
        const start = d.startPos < minDomain! ? minDomain! : d.startPos;
        const end = d.endPos > maxDomain! ? maxDomain! : d.endPos;
        return x((start + end) / 2);
      })
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle');

    svg.exit().remove();
  }, [data, minDomain, maxDomain, selectedGene, width]);

  return (
    <svg
      style={genomeContext}
      ref={ref}
    />
  );
};

export default GenomeContext;
