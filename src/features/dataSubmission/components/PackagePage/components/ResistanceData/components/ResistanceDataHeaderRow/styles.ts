import { css } from '@emotion/react';
import appColors from '../../../../../../../../styles/colors';

export const summaryContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 15px',
  boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
  backgroundColor: appColors.neutral.blueBg,
});

export const sxIcon = {
  fontSize: 12,
  fill: appColors.tints.whoBlue.light,
};

const textProps = {
  color: appColors.tints.whoBlue.light,
};

export const titleText = css({
  ...textProps,
  fontWeight: 700,
});

export const itemsCountText = css({
  ...textProps,
  marginRight: 5,
});

export const buttonContainer = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
