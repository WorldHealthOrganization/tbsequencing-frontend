import { css } from '@emotion/react';
import { fontSizes } from '../typography/fontSizes';
import appColors from '../../styles/colors';
import { appZIndex } from '../../styles/appZIndex';

export const button = css({
  fontSize: fontSizes.h2,
  textTransform: 'capitalize',
  color: appColors.primary.navy,
});

export const nonClickableButton = css({
  pointerEvents: 'none',
  cursor: 'auto',
});

export const sxIcon = {
  fontSize: 40,
  fill: appColors.secondary.whoBlue,
};

export const mIcon = {
  fontSize: 32,
  fill: appColors.secondary.whoBlue,
};

export const iconWrapper = css({
  display: 'flex',
});

export const buttonWrapper = css({
  display: 'flex',
  position: 'relative',
});

export const active = css({
  borderBottom: `${4}px solid ${appColors.secondary.whoBlue}`,
});

export const fakeBorderBottom = css({
  height: 4,
  backgroundColor: appColors.secondary.whoBlue,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: appZIndex.appBar,
});
