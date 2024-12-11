import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';
import { font, fontSizes } from '../../../../components/typography/fontSizes';

export const forgotPasswordButtonStyles = css({
  fontFamily: font.regular,
  fontSize: fontSizes.h3,
  color: appColors.secondary.whoBlue,
  textAlign: 'center',
  width: '100%',
  display: 'inline-block',
  '&:visited': {
    color: appColors.secondary.whoBlue,
  },
});

export const signUpBtn = css({
  marginLeft: 16,
});

export const headerMargin = css({
  marginBottom: '55px',
});

export const buttonsSection = css({
  marginTop: '50px',
  marginBottom: '55px',
});

export const form = css({
  paddingTop: `${144}px`,
  paddingLeft: `${40}px`,
  paddingRight: `${128}px`,
});

export const errorsBlock = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: {
    color: appColors.status.fieldError,
    marginTop: '5px',
  },
});
export const description = css({
  marginTop: 10,
  marginBottom: 10,
  fontSize: fontSizes.h2,
  lineHeight: '36px',
});

export const link = css({
  color: appColors.secondary.whoBlue,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    textDecorationColor: appColors.secondary.whoBlue,
  },
});
