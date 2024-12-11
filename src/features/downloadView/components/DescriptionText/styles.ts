import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

export const paragraph = css({
  marginBottom: 30,
  color: appColors.neutral.black,
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  padding: 24,
  fontSize: 16,
});

export const wrapper = css({
  maxWidth: '930px',
});
