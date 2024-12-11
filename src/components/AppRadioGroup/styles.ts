import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const sxRadioGroup = {
  marginRight: 0,
  padding: '12px 20px',
  '.MuiRadio-root': {
    color: appColors.secondary.whoBlue,
    padding: 0,
    marginRight: '20px',
  },
  '&:hover': {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
  width: '100%',
};

export const sxRadioGroupFirst = {
  ...sxRadioGroup,
  '&:first-of-type': {
    borderBottom: `2px solid ${appColors.secondary.whoBlue}`,
  },
};

export const halfWidth = css({
  flex: 1,
});

export const fullWidth = css({
  width: '100%',
});

export const radioGrouop = css({
  paddingLeft: 11,
});
