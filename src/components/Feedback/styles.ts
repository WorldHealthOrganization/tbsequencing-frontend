import { css } from '@emotion/react';
import { SxProps } from '@mui/material';
import { font } from '../typography/fontSizes';
import appColors from '../../styles/colors';

export const textAreaContainer = css({
  textarea: {
    backgroundColor: 'transparent',
    fontFamily: font.regular,
    fontSize: '16px',
    '&::placeholder': {
      fontFamily: font.regular,
      fontSize: '16px',
      color: appColors.tints.whoBlue.lighter,
    },
    '&:focus': {
      outline: 'none',
    },
    padding: '16px 20px 5px 10px',
    lineHeight: '20px',
    minHeight: 200,
  },
});

export const buttonsContainer = css({
  display: 'flex',
  marginTop: 32,
  justifyContent: 'flex-end',
});

export const sendButton = css({
  marginLeft: 16,
});

export const fieldsContainer = css({
  marginTop: 32,
  marginBottom: 32,
});

export const container = css({
  position: 'fixed',
  bottom: 8,
  right: 8,
});

export const iconSx: SxProps = {
  fill: appColors.secondary.whoBlue,
  fontSize: 32,
};
