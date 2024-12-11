import { css } from '@emotion/react';
import appColors from '../../styles/colors';
import { fontSizes } from '../typography/fontSizes';

const PADDING_SIZE = 54;

export const muiAppBarStyles = css({
  paddingRight: PADDING_SIZE,
  paddingLeft: PADDING_SIZE,
  backgroundColor: appColors.neutral.white,
});

export const appBarWrapperStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  alignItems: 'stretch',
});

export const bottomLineStyles = css({
  height: 4,
  backgroundColor: appColors.tints.whoBlue.lightest,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

export const loaderContainer = css({
  position: 'relative',
  visibility: 'hidden',
});

export const logo = css({
  display: 'flex',
  alignItems: 'center',
  color: appColors.primary.navy,
  textDecoration: 'none',
});

export const dropdownContainer = css({
  width: '176px',
});

export const dropdownButtonStyles = css({
  fontSize: fontSizes.h2,
  paddingTop: '26px',
  paddingBottom: '26px',
  borderRadius: 0,
  color: appColors.primary.navy,
  textTransform: 'capitalize',
  borderBottom: '4px solid transparent',
  width: '160px',
  zIndex: 1,
  paddingRight: '32px',
  ':hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiButton-endIcon': {
    alignSelf: 'flex-start',
  },
  '& .MuiPaper-root': {
    width: '160px',
  },
});

export const dropdownMenu = css({
  width: '170px',
});

export const dropdownActiveStyles = css({
  borderBottom: `4px solid ${appColors.secondary.whoBlue}`,
});

export const dropdownItemStyles = css({
  width: '106px',
  padding: '20px 0',
  margin: '0 16px',
  lineHeight: '28px',
  justifyContent: 'center',
  fontSize: fontSizes.h2,
  color: appColors.primary.navy,
  fontWeight: 500,
  borderBottom: `2px solid ${appColors.tints.whoBlue.lightest}`,
  '&:last-child': {
    borderBottomColor: 'transparent',
  },
  ':hover': {
    backgroundColor: 'transparent',
  },
});

export const menuWrapper = css({
  display: 'flex',
});

export const arrowIcon = css({
  color: appColors.secondary.whoBlue,
  fontSize: '40px!important',
  position: 'absolute',
  marginLeft: '8px',
  right: 0,
});
