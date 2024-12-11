import { css } from '@emotion/react';
import appColors from '../../styles/colors';

const breadcrumbsMargin = 42;

const baseStyle = {
  fontSize: 16,
};

export const active = css({
  ...baseStyle,
  color: appColors.secondary.whoBlue,
});

export const inactive = css({
  ...baseStyle,
  color: appColors.neutral.black,
});

export const breadcrumbs = css({
  marginTop: breadcrumbsMargin,
  marginBottom: breadcrumbsMargin,
});
