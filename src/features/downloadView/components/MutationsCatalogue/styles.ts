import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

export const wrapper = css({
  color: appColors.neutral.black,
  fontSize: 16,
});

export const box = css({
  padding: '16px 24px',
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
});

export const header = css({
  fontWeight: 'bold',
});

export const content = css({
  marginTop: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const mainList = css({
  marginTop: 20,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

export const boxCard = css({
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  width: '100%',
  maxWidth: 560,
  marginRight: 12,
  marginBottom: 12,
  padding: '8px 36px 8px 24px',
  fontSize: 14,
});

export const boxCardTitle = css({
  fontWeight: 700,
});

export const boxCardBottom = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const boxCardDescription = css({
  fontWeight: 400,
  fontSize: 14,
  paddingTop: 8,
  maxWidth: 320,
});

export const iconSx = css({
  fill: appColors.secondary.whoBlue,
  fontSize: '16px',
});
