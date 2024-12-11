import { css } from '@emotion/react';

export const verificationBadge = css({
  borderRadius: '20px', // TODO taken on eye, could not take this from design
  boxShadow: '0px 0px 4px #C9DDEA',
  fontSize: 12,
  marginLeft: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 12,
  paddingRight: 12,
});

export const questionMark = css({
  fontWeight: 700,
  display: 'flex',
  marginRight: 3,
});
