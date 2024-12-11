import { css } from '@emotion/react';
import appColors from '../../styles/colors';
import { font, fontSizes } from '../typography/fontSizes';

const slider = {
  margin: '30px 0',
  '.MuiSlider-rail': {
    backgroundColor: appColors.neutral.grey,
    height: '4px',
  },
  '.MuiSlider-track': {
    backgroundColor: appColors.secondary.whoBlue,
    height: '4px',
  },
  '.MuiSlider-thumb': {
    backgroundColor: appColors.secondary.whoBlue,
  },
  '.MuiSlider-valueLabelOpen, .MuiSlider-valueLabel, .MuiSlider-markLabel': {
    background: 'unset',
    color: appColors.secondary.whoBlue,
    fontFamily: font.regular,
    fontSize: fontSizes.h3,
    lineHeight: '24px',
  },
  '.MuiSlider-markLabel': {
    top: '-22px',
  },
};

const presetWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  marginBottom: '35px',
  maxHeight: 80,
});

const presetItem = css({
  color: appColors.secondary.whoBlue,
  backgroundColor: 'unset',
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'underline',
  fontSize: fontSizes.h3,
  font: font.regular,
  marginRight: '35px',
  marginBottom: '8px',
});

const sliderWrapper = {
  width: 512, padding: '24px',
};

export {
  slider,
  presetItem,
  presetWrapper,
  sliderWrapper,
};
