import { css } from '@emotion/react';
import { fontSizes } from '../../../../../../components/typography/fontSizes';
import appColors from '../../../../../../styles/colors';
import { appZIndex } from '../../../../../../styles/appZIndex';

export const container = css({
  width: '60%',
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
});

export const header = css({
  fontWeight: 700,
  paddingLeft: 24,
  paddingTop: 16,
});

export const sxTabStyles = {
  fontSize: fontSizes.primary,
  lineHeight: '24px',
  paddingTop: '11px',
  paddingBottom: '11px',
  color: appColors.tints.whoBlue.light,
  '&.Mui-selected': {
    color: appColors.secondary.whoBlue,
  },
  textTransform: 'capitalize',
};

export const sxTabsStyles = {
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: appColors.secondary.whoBlue,
    height: 2,
    zIndex: appZIndex.appBar,
  },
};

export const tabsWrapper = css({
  position: 'relative',
});

export const fakeBorderBottom = css({
  height: 2,
  backgroundColor: appColors.tints.whoBlue.lightest,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

export const loaderWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 24,
});

export const samplesContent = css({
  position: 'relative',
  minHeight: '35px',
});
