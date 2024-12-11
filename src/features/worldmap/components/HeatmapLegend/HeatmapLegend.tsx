/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import MapLegendSquare from '../MapLegendSquare';

const legendItemStyles: SerializedStyles[] = [
  styles.white,
  styles.blue,
  styles.lightBlue,
  styles.lighterBlue,
  styles.lightestOrange,
  styles.lightestOrange,
  styles.lighterOrange,
  styles.lightOrange,
  styles.orange,
];

export const HeatmapLegend = () => (
  <legend css={styles.container}>
    {
      // in this case we can use index, since array will never be reordered and it is static
      /* eslint-disable-next-line react/no-array-index-key */}
    {legendItemStyles.map((style, index) => <MapLegendSquare key={`${style.name}-${index}`} style={style} />)}
  </legend>
);

export default HeatmapLegend;
