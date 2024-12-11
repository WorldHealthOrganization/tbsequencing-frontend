/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';

interface Props {
  style?: SerializedStyles;
}

export const MapLegendSquare = ({ style }: Props) => (
  <div css={[styles.baseStyle, style]} />
);

export default MapLegendSquare;
