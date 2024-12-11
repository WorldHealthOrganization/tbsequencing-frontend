import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const container = css({
  borderRadius: 4,
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  padding: 24,
  marginBottom: 24,
});

export const control = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 24,
});

export const button = css({
  marginRight: 16,
});

export const sxEditIcon = {
  fill: appColors.secondary.whoBlue,
  fontSize: 27,
};

export const editButton = css({
  marginLeft: 10,
});

export const headerContainer = css({
  display: 'flex',
});

export const info = css({
  flex: 1,
});

export const infoMsg = css({
  fontSize: 16,
});

export const buttons = css({
  flex: 1,
  marginLeft: 54,
});

export const approvedBadge = css({
  backgroundColor: appColors.secondary.whoGreen,
  color: appColors.neutral.white,
});

export const pendingBadge = css({
  backgroundColor: appColors.neutral.white,
  color: appColors.secondary.whoMagenta,
  border: `1px solid ${appColors.secondary.whoMagenta}`,
});
