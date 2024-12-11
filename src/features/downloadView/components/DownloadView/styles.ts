import { css } from '@emotion/react';
import { appZIndex } from '../../../../styles/appZIndex';
import appColors from '../../../../styles/colors';
import { fontSizes } from '../../../../components/typography/fontSizes';

const wrapper = css({
  padding: '40px 54px',
});

const header = css({
  marginBottom: '24px',
});

const sxTabsStyles = {
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    height: 4,
    zIndex: appZIndex.appBar,
  },
};

const tabsWrapper = css({
  position: 'relative',
  display: 'inline-flex',
  marginBottom: 24,
});

const fakeBorderBottom = css({
  height: 4,
  backgroundColor: appColors.tints.whoBlue.lightest,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

export const paragraph = css({
  marginBottom: 30,
  color: appColors.neutral.black,
  boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
  padding: 24,
  fontSize: 16,
  textAlign: 'justify',
});

export const sxTabStyles = {
  fontSize: fontSizes.h2,
  maxWidth: 600,
  padding: `${16}px`,
  color: appColors.neutral.black,
  opacity: 0.8,
  '&.Mui-selected': {
    color: appColors.neutral.black,
    fontWeight: 'bold',
    opacity: 1,
  },
  textTransform: 'none',
};

export {
  wrapper, header, sxTabsStyles, tabsWrapper, fakeBorderBottom,
};
