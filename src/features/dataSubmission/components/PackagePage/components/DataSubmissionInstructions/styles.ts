import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const container = css({
  paddingTop: 51,
  paddingLeft: 40,
  paddingRight: 24,
});

export const closeIconSx = {
  fill: appColors.secondary.whoBlue,
  fontSize: 21,
};

export const closeIconWrapper = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const header = css({
  marginBottom: 10,
  marginTop: 67,
});

export const paragraph = css({
  marginTop: 24,
});

export const downloadBtn = css({
  marginTop: 24,
});

export const info = css({
  paddingRight: 12,
  height: '62.15%',
  overflowY: 'auto',
});
