import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const container = css({
  display: 'flex',
  alignItems: 'center',
});

export const labelContainer = css({
  marginLeft: 16,
});

export const switchSxStyles = {
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: '0',
    margin: '2px',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: appColors.neutral.white,
      '& + .MuiSwitch-track': {
        backgroundColor: appColors.secondary.whoBlue,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: appColors.secondary.whoBlue,
      border: `6px solid ${appColors.neutral.white}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: appColors.neutral.grey,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: appColors.neutral.grey,
    opacity: 1,
  },
};
