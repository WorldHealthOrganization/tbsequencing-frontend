import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const warningIconSx = {
  fill: appColors.secondary.whoOrange,
};

export const errorIconSx = {
  fill: appColors.status.whoEmergencyRed,
};

export const infoIconSx = {
  fill: appColors.secondary.whoBlue,
};

export const container = css({
  display: 'flex',
  alignItems: 'center',
});

export const label = css({
  marginLeft: 6,
});
