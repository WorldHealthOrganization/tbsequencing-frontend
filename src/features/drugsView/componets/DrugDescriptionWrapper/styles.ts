import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';
import { font, fontSizes } from '../../../../components/typography/fontSizes';

export const header = css({
  display: 'flex',
  alignItems: 'center',
});

export const associationTable = css({
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100%',
  button: {
    p: {
      textAlign: 'left',
    },
  },
  '>div:nth-of-type(2)': {
    div: {
      margin: 0,
    },
    display: 'flex',
    flexFlow: 'column wrap',
    flex: 1,
    height: '100px',
  },
  '>div:nth-of-type(3)': {
    div: {
      margin: 0,
    },
    display: 'flex',
    flexFlow: 'column wrap',
    flex: 1,
    height: '100px',
  },
});

export const headerIcon = {
  fontSize: '48px',
  color: appColors.secondary.whoBlue,
};

export const drugsRadioSelect = css({
  height: '40px',
  marginBottom: '24px',
  lineHeight: '40px',
  color: appColors.neutral.black,
  border: 'none',
  p: {
    fontSize: fontSizes.h1,
    fontFamily: font.bold,
    fontWeight: 700,
  },
  '&:hover': {
    border: 'none',
  },
  '.MuiButton-endIcon': {
    span: {
      color: appColors.secondary.whoBlue,
      width: '40px',
      height: '40px',
      fontSize: '40px',
    },
  },
});

export const popupContent = css({
  '.MuiFormGroup-root': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: '750px',
    width: '650px',
    overflow: 'auto',
    paddingLeft: '11px',
  },
});

export const radioGroup = ({
  marginRight: 0,
  padding: '12px 20px',
  '.MuiRadio-root': {
    color: appColors.secondary.whoBlue,
    padding: 0,
    marginRight: '20px',
  },
  flex: 1,
  '&:hover': {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
});

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
});

export const descriptionWrapper = css({
  display: 'flex',
  marginBottom: '20px',
});
