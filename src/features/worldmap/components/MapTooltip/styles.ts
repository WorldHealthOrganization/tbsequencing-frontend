import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

export const paperSx = {
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
};

export const paper = css({
  minWidth: 382,
});

export const baseTooltipStyles = css({
  position: 'absolute',
});

export const label = css({
  color: appColors.secondary.whoBlue,
  fontSize: 14,
});

export const buttonsContainer = css({
  display: 'flex',
  marginBottom: 18,
  alignItems: 'center',
});

export const phenoBtn = css({
  marginLeft: 24,
});

export const genoBtn = css({
  marginLeft: 8,
});

export const header = css({
  marginBottom: 21,
});

export const quantityLabel = css({
  marginLeft: 62,
});

export const restLabels = css({
  marginLeft: 8,
});

export const legendWrapper = css({
  display: 'flex',
});
