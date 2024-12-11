import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

const CELL_PADDING_VERTICAL = 15;

export const tableCell = css({
  paddingTop: CELL_PADDING_VERTICAL,
  paddingBottom: CELL_PADDING_VERTICAL,
});

export const error = css({
  backgroundColor: appColors.status.emergencyRedBg,
});
