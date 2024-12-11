import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

export const container = css({
  width: 200,
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
});

export const title = css({
  marginBottom: 8,
  textAlign: 'center',
});

export const description = css({
  fontSize: 16,
  lineHeight: '24px',
  textAlign: 'center',
});

export const link = css({
  color: appColors.neutral.black,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    textDecorationColor: appColors.neutral.black,
  },
  display: 'flex',
});
