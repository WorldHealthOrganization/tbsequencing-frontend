import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const section = css({
  marginTop: 24,
  marginBottom: 24,
});

export const sectionInfo = css({
  marginTop: 8,
  fontSize: '16px',
});

export const headerWrapper = css({
  display: 'flex',
});

const VERIFICATION_IN_PROGRESS_BADGE_COLOR = appColors.secondary.whoMagenta;
const APPROVED_BADGE_COLOR = appColors.secondary.whoGreen;

export const verificationInProgressBadge = css({
  color: VERIFICATION_IN_PROGRESS_BADGE_COLOR,
  border: `1px solid ${VERIFICATION_IN_PROGRESS_BADGE_COLOR}`,
  backgroundColor: appColors.neutral.white,
});

export const approvedBadge = css({
  color: appColors.neutral.white,
  backgroundColor: APPROVED_BADGE_COLOR,
  borderColor: APPROVED_BADGE_COLOR,
});
