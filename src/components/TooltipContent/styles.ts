import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const resistanceHeaders = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const resistanceHeadersValues = css({
  display: 'flex',
  marginRight: 27,
  marginBottom: 8,
});

export const legendSectionWrapper = css({
  marginBottom: 16,
});

const BASE_LEGEND_SQUARE_STYLE = {
  marginRight: 16,
};

export const susceptibleLegendItem = css({
  ...BASE_LEGEND_SQUARE_STYLE,
  backgroundColor: appColors.secondary.whoMagenta,
});

export const resistantLegendItem = css({
  ...BASE_LEGEND_SQUARE_STYLE,
  backgroundColor: appColors.secondary.whoYellow,
});

export const intermediateLegendItem = css({
  ...BASE_LEGEND_SQUARE_STYLE,
  backgroundColor: appColors.secondary.whoGreen,
});

export const headerSeparator = css({
  marginLeft: 8,
  marginRight: 8,
});

export const label = css({
  color: appColors.secondary.whoBlue,
  fontSize: 14,
});

export const totalContainer = css({
  display: 'flex',
});

const BASE_TOTAL_STYLE = {
  color: appColors.tints.whoBlue.light,
};

export const totalLabel = css({
  ...BASE_TOTAL_STYLE,
});

export const totalValue = css({
  ...BASE_TOTAL_STYLE,
  marginLeft: 2,
});
