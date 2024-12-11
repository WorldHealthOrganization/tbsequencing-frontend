import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';
import { fontSizes } from '../../../../components/typography/fontSizes';

const BORDER = `1px solid ${appColors.tints.whoBlue.light}`;

export const liReset = css({
  margin: 0,
  listStyleType: 'none',
  button: {
    borderTop: BORDER,
    borderBottom: BORDER,
  },
});

export const authButton = css({
  pointerEvents: 'none',
});

export const navButton = css({
  border: 'none',
  background: 'none',
  paddingLeft: 16,
  paddingTop: 16,
  paddingBottom: 16,
  paddingRight: 16,
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left',
  '&:hover': {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
});

export const container = css({
  width: 320,
  paddingLeft: 40,
});

export const nameWrapper = css({
  paddingBottom: 60,
  paddingLeft: 4,
  paddingTop: 144,
});

export const logout = css({
  borderBottom: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 72,
  alignItems: 'center',
});

export const logoutIconSx = {
  fill: appColors.secondary.whoBlue,
  fontSize: 19,
};
export const descriptionText = css({
  marginTop: 10,
  marginBottom: 10,
  fontSize: fontSizes.h2,
  lineHeight: '36px',
});
