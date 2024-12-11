import { css } from '@emotion/react';

const HORIZONTAL_PADDING = 54;

const baseHeaderStyle = {
  marginBottom: 24,
};

export const container = css({
  paddingRight: HORIZONTAL_PADDING,
  paddingLeft: HORIZONTAL_PADDING,
});

export const pageHeaderNoBreadcrumbs = css({
  ...baseHeaderStyle,
  marginTop: 40,
});

export const pageHeader = css({
  ...baseHeaderStyle,
});
