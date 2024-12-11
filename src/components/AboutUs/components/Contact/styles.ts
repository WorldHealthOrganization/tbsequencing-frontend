import { css } from '@emotion/react';
import { fontSizes } from '../../../typography/fontSizes';
import appColors from '../../../../styles/colors';

export const container = css({
  width: 200,
});

export const primaryText = css({
  fontSize: fontSizes.h3,
  color: appColors.neutral.white,
  lineHeight: '24px',
});

export const header = css({
  color: appColors.neutral.white,
  marginBottom: 8,
});

export const link = css({
  textDecoration: 'none',
  ':hover': {
    backgroundColor: appColors.secondary.whoBlue,
  },
  display: 'flex',
});
export const primaryTextRight = css({
  marginLeft: 3,
});
