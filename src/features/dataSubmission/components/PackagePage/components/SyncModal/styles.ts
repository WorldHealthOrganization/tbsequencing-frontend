import { linearProgressClasses } from '@mui/material';
import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const msgContainer = css({
  marginTop: 32,
});

export const progressBarContainer = css({
  marginTop: 64,
});

export const buttonContainer = css({
  marginTop: 32,
  display: 'flex',
  justifyContent: 'flex-end',
});

export const btn = css({
  textTransform: 'capitalize',
});

export const progressBarSx = {
  height: 16,
  borderRadius: '16px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '16px',
    backgroundColor: appColors.secondary.whoBlue,
  },
};
