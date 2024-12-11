import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

const BASE_STYLE = {
  display: 'inline-block', // FIX FOR SAFARI
};

const MARGIN_STYLE = {
  ...BASE_STYLE,
  marginLeft: 8,
};

export const container = css({
  display: 'flex',
});

export const white = css({
  ...BASE_STYLE,
  border: `1px solid ${appColors.primary.navy}`,
  backgroundColor: appColors.neutral.white,
});

export const blue = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoBlue.light,
});

export const lightBlue = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoBlue.lighter,
});

export const lighterBlue = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoBlue.lightest,
});

export const lightestOrange = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoOrange.lightest,
});

export const lighterOrange = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoOrange.lighter,
});

export const lightOrange = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.tints.whoOrange.light,
});

export const orange = css({
  ...MARGIN_STYLE,
  backgroundColor: appColors.secondary.whoOrange,
});
