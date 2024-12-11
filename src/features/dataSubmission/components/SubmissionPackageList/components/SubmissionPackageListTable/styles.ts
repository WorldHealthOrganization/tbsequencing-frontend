import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

const CELL_PADDING_VERTICAL = 15;
const CELL_PADDING_HORIZONTAL = 16;

export const tableHeaderCell = css({
  paddingTop: CELL_PADDING_VERTICAL,
  paddingBottom: CELL_PADDING_VERTICAL,
  paddingLeft: CELL_PADDING_HORIZONTAL,
  paddingRight: CELL_PADDING_HORIZONTAL,
  color: appColors.secondary.whoBlue,
  fontWeight: 700,
});

export const container = css({
  marginTop: 24,
  paddingBottom: 0,
  paddingTop: 0,
});

export const openChatBtn = css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
