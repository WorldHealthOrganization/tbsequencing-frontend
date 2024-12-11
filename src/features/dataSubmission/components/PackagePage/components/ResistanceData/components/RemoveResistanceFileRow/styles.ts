import { css } from '@emotion/react';
import appColors from '../../../../../../../../styles/colors';

const VERTICAL_PADDING = 8;
const HORIZONTAL_PADDING = 16;

export const container = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: VERTICAL_PADDING,
  paddingBottom: VERTICAL_PADDING,
  paddingLeft: HORIZONTAL_PADDING,
  paddingRight: HORIZONTAL_PADDING,
  borderBottom: `2px solid ${appColors.tints.whoBlue.lighter}`,
});

export const buttonCell = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const sxButtonStyles = {
  fill: appColors.secondary.whoBlue,
  fontSize: 14,
};
