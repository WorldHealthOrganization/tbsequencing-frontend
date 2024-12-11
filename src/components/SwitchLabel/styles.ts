import { css } from '@emotion/react';
import { font, fontSizes } from '../typography/fontSizes';
import appColors from '../../styles/colors';

export const container = css({
  display: 'flex',
  alignItems: 'center',
});

export const termsLink = css({
  fontSize: fontSizes.secondary,
  color: appColors.secondary.whoBlue,
  lineHeight: '20px',
  textDecoration: 'none',
  marginLeft: 4,
  fontFamily: font.regular,
  marginTop: '0.5px',
});
