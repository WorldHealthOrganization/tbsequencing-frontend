import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const container = css({
  height: 619,
  overflowY: 'auto',
  flex: 1,
});

export const drawerStyles = css({
  paddingTop: 51,
  paddingLeft: 40,
  paddingRight: 24,
});

export const infoText = css({
  fontSize: 16,
});

export const header = css({
  marginBottom: 10,
  marginTop: 67,
});

export const paragraph = css({
  marginBottom: 30,
});

export const closeIconWrapper = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const closeIconSx = {
  fill: appColors.secondary.whoBlue,
  fontSize: 21,
};

export const info = css({
  paddingRight: 12,
  height: '62.15%',
  overflowY: 'auto',
});
