import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const label = css({
  color: appColors.secondary.whoBlue,
  textDecoration: 'underline',
  letterSpacing: '1.25px',
  lineHeight: '24px',
});

export const button = css({
  border: 'none',
  padding: 0,
  background: 'none',
  cursor: 'pointer',
});

export const disabled = css({
  color: appColors.neutral.grey,
  cursor: 'default',
});
