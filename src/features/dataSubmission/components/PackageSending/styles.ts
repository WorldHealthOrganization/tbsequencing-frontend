import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

const INPUT_WIDTH = 210;
const INPUT_MARGIN = 16;

export const section = css({
  marginBottom: 24,
});

export const sxRemoveIcon = {
  fill: appColors.secondary.whoBlue,
  fontSize: 14,
};

export const removeBtn = css({
  position: 'absolute',
  right: 0,
  top: 0,
});

export const rowWrapper = css({
  width: INPUT_WIDTH * 2 + INPUT_MARGIN,
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
});

export const inputWrapper = css({
  width: INPUT_WIDTH,
  marginTop: 24,
});

export const secondRow = css({
  marginLeft: INPUT_MARGIN,
});

export const sendBtn = css({
  marginTop: 24,
});

export const sendButtonWrapper = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const addContributorsBtn = css({
  marginTop: 24,
});

export const agreeTermsWrapper = css({
  marginTop: 24,
});

export const controlCheck = css({
  '&.MuiCheckbox-root': {
    color: appColors.secondary.whoBlue,
  },
});

export const termsButton = css({
  marginRight: 20,
  paddingBottom: 8,
});
