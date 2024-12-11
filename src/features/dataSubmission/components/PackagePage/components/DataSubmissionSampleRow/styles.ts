import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

const VERTICAL_PADDING = 9;

const VERTICAL_PADDING_PROPS = {
  paddingTop: VERTICAL_PADDING,
  paddingBottom: VERTICAL_PADDING,
  paddingLeft: 19,
  paddingRight: 30,
};

export const container = css({
  ...VERTICAL_PADDING_PROPS,
  boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
});

export const info = css({
  display: 'flex',
  alignItems: 'center',
});

export const actionsContainer = css({
  marginLeft: 'auto',
});

export const infoContainer = css({
  marginLeft: 19,
});

export const error = css({
  backgroundColor: appColors.status.emergencyRedBg,
});

export const sxIconDone = {
  fill: appColors.secondary.whoBlue,
  fontSize: 17,
};

export const iconDisabledDowload = {
  fill: appColors.neutral.ncbiGrey,
  fontSize: 17,
};

export const sxIconDoneWarning = {
  fill: appColors.secondary.whoOrange,
  fontSize: 17,
};

export const sxIconDangerous = {
  fill: appColors.status.whoEmergencyRed,
  fontSize: 22,
};

export const errorText = css({
  color: appColors.status.whoEmergencyRed,
});

export const regularText = css({
  color: appColors.tints.whoBlue.light,
});

export const warningText = css({
  color: appColors.secondary.whoOrange,
});
