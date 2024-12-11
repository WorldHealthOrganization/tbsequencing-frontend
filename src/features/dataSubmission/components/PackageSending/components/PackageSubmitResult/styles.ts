import { css } from '@emotion/react';
import appColors from '../../../../../../styles/colors';

export const msg = css({
  marginTop: 32,
  marginBottom: 32,
  fontSize: 16,
});

export const btnContainer = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const errorStyle = css({
  color: appColors.status.whoEmergencyRed,
});
