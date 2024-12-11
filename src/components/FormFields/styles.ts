import { css } from '@emotion/react';
import appColors from '../../styles/colors';
import { font, fontSizes } from '../typography/fontSizes';

const LABEL_BASE_STYLES = {
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  fontFamily: font.regular,
};

export const sectionStyles = css({
  marginTop: 10,
});

export const textAreaStyles = css({
  border: '1px solid lightgray',
  borderRadius: '15px',
  padding: '2px 5px',
  resize: 'none',
  width: '100%',
  flex: 1,
});

export const selectControl = {
  '.MuiOutlinedInput-notchedOutline': {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${appColors.secondary.whoBlue}`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  '.MuiOutlinedInput-input': {
    paddingBottom: '13px',
    paddingLeft: '13px',
  },
};

export const selectLabel = {
  ...LABEL_BASE_STYLES,
  color: appColors.neutral.black,
  left: '1px',
  top: '2px',
};

export const textControlSx = {
  lineHeight: '20px',
  paddingTop: '0',
  '.MuiInput-underline:before': {
    borderBottomColor: appColors.tints.whoBlue.light,
  },
  '.MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: appColors.tints.whoBlue.light,
  },
  '.MuiInputBase-root': {
    padding: '0px 20px 5px 10px',
  },
  '.MuiFormHelperText-root': {
    paddingLeft: '10px',
  },
  '.MuiInputLabel-root': {
    ...LABEL_BASE_STYLES,
    paddingLeft: '13px',
    color: appColors.neutral.black,
    '&.Mui-focused': {
      color: appColors.neutral.black,
    },
  },
};

export const passwordHelper = css({
  fontFamily: font.regular,
  fontSize: fontSizes.secondary,
  color: appColors.neutral.black,
  lineHeight: '16px',
  paddingLeft: '10px',
});

export const hidePassIcon = {
  fill: appColors.tints.whoBlue.light,
};

export const hidePassIconError = {
  fill: appColors.status.whoEmergencyRed,
};

export const errorIcon = {
  fill: appColors.status.whoEmergencyRed,
};

export const infoSpecialSymbolsButton = css({
  height: '18px',
  width: '18px',
  marginLeft: '2px',
});

export const infoSpecialSymbolsIcon = css({
  height: '18px',
});
