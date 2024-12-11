import { css } from '@emotion/react';
import appColors from '../../styles/colors';

const small = 28;
const medium = 36;
const large = 44;

export const capitalizeStyle = css({
  textTransform: 'capitalize',
});

export const uppercaseStyle = css({
  textTransform: 'uppercase',
});

export const noTextTransformStyle = css({
  textTransform: 'none',
});

export const baseLabelStyle = css({
  letterSpacing: '1.25px',
  fontSize: 16,
});

export const disabledColorStyle = css({
  color: appColors.neutral.black020,
  backgroundColor: appColors.neutral.grey,
});

export const containedColorStyle = css({
  color: appColors.neutral.white,
  backgroundColor: appColors.secondary.whoBlue,
});

export const outlinedColorStyle = css({
  color: appColors.secondary.whoBlue,
  borderColor: appColors.secondary.whoBlue,
  backgroundColor: appColors.neutral.white,
});

export const textDecoration = css({
  textDecoration: 'underline',
});

export const roundBorderRadiusStyle = css({
  borderRadius: 50,
});

export const textButtonHoverStyle = {
  '&:hover': {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
};

export const outlinedButtonHoverStyle = {
  '&:hover': {
    borderColor: appColors.secondary.whoBlue,
    backgroundColor: appColors.neutral.white,
  },
  '&': {
    borderColor: appColors.tints.whoBlue.lighter,
  },
};

export const containedButtonHoverStyle = {
  '&:hover': {
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    backgroundColor: appColors.secondary.whoBlue,
  },
};

export const smallStyle = css({ height: small });
export const mediumStyle = css({ height: medium });
export const largeStyle = css({ height: large });
