import { css } from '@emotion/react';
import { font, fontSizes } from '../../../../components/typography/fontSizes';
import appColors from '../../../../styles/colors';

export const labelStyleSmall = {
  fontFamily: font.bold,
  fontSize: fontSizes.h3,
};

export const baseChartStyle = css({
  backgroundColor: appColors.tints.whoYellow.lightest,
  borderRadius: '50%',
  position: 'absolute',
});
