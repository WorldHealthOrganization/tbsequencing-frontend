import { css, SerializedStyles } from '@emotion/react';
import appColors from '../../styles/colors';

const XLARGE = 72;
const LARGE = 64;
const NORMAL = 56;
const SMALL = 40;
const XSMALL = 32;

const createBtnStyle = (size: number): SerializedStyles => css({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: appColors.secondary.whoBlue,
  color: appColors.neutral.white,
  '&:hover': {
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    backgroundColor: appColors.secondary.whoBlue,
  },
});

export const xlarge = createBtnStyle(XLARGE);
export const large = createBtnStyle(LARGE);
export const normal = createBtnStyle(NORMAL);
export const small = createBtnStyle(SMALL);
export const xsmall = createBtnStyle(XSMALL);
