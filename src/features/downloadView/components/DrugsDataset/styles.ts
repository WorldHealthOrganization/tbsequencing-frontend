import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

export const header = css({
  fontWeight: 'bold',
});

export const wrapper = css({
  color: appColors.neutral.black,
  fontSize: 16,
});

export const box = css({
  padding: '16px 24px',
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  borderRadius: '4px 4px 0 0',
});

export const content = css({
  marginTop: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const main = css({
  boxShadow: `0px 2px 4px ${appColors.tints.whoBlue.lighter}`,
  padding: '30px 40px 36px 24px',
  borderRadius: '0 0 4px 4px',
});

export const asLink = css({
  textDecoration: 'underline',
  padding: '6px 16px',
  fontSize: 16,
  color: appColors.secondary.whoBlue,
  ':hover': {
    cursor: 'pointer',
  },
});

export const asLinkFirst = css({
  marginLeft: 'auto',
  marginRight: '20px',
});

export const mainTop = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
});

export const list = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gap: '20px',
});

export const control = css({
  '&.MuiCheckbox-root': {
    color: appColors.secondary.whoBlue,
  },
});

export const csvLink = css({
  visibility: 'hidden',
});
