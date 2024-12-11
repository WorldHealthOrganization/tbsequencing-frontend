import { css } from '@emotion/react';
import { font, fontSizes } from '../typography/fontSizes';

export const text = css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontFamily: font.regular,
  fontSize: fontSizes.primary,
  lineHeight: '20px',
});
