import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

const PADDING_SIZE = 24;

export const container = css({
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  height: 92,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: PADDING_SIZE,
  paddingRight: PADDING_SIZE,
});

export const primaryText = css({
  letterSpacing: '0.4px',
  fontWeight: 700,
});

export const createButton = css({
  marginRight: 20,
  textTransform: 'capitalize',
});

export const termsButton = css({
  marginRight: 20,
});
