/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
// @ts-ignore
import BaseVariantTrack from '@gnomad/track-variants';
import { IVariant } from '../../services/genesApi/models';
import { colors } from '../GnomadVariants/styles';

interface IVariantTrackProps {
  variants: IVariant[];
  title?: string;
  width?: number;
}

const color = (variant: IVariant) => colors[variant.consequence];

const VariantTrack = (props : IVariantTrackProps) => (
  <BaseVariantTrack variantColor={color} {...props} />
);

export default memo(VariantTrack);
