import { css } from '@emotion/react';
import appColors from '../../styles/colors';
import { Consequence } from '../../services/genesApi/models';
import { font } from '../typography/fontSizes';

type IColors = Record<Consequence, string>;

export const colors: IColors = {
  missense_variant: appColors.secondary.whoYellow,
  synonymous_variant: appColors.secondary.whoGreen,
  upstream_gene_variant: appColors.secondary.whoMagenta,
  'ins-del': appColors.secondary.whoBlue,
  start_lost: appColors.secondary.whoOrange,
  frameshift_variant: appColors.secondary.whoOrange,
  stop_gained: appColors.secondary.whoOrange,
  OTHER: appColors.neutral.ncbiGrey,
};

export const container = css({
  position: 'relative',
  text: {
    fontFamily: font.bold,
    fontSize: '11px !important',
  },
});

export const legendContainer = css({
  marginTop: '10px',
  display: 'flex',
});

export const legendItem = (consequence: Consequence) => css({
  display: 'flex',
  border: `1px solid ${colors[consequence]}`,
  alignItems: 'center',
  padding: '5px',
  marginRight: '6px',
  borderRadius: '4px',
});

export const box = (consequence: Consequence) => css({
  width: '10px',
  height: '10px',
  borderRadius: '4px',
  backgroundColor: colors[consequence],
  marginRight: '5px',
});

export const additionalAxisContainer = css({
  position: 'relative',
});

export const additionalAxisLabel = css({
  position: 'absolute',
  left: 0,
  bottom: 0,
});
