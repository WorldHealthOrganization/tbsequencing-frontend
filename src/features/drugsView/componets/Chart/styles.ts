import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';
import { font, fontSizes } from '../../../../components/typography/fontSizes';

const wrapper = css({
  boxShadow: '0px 0px 4px #C9DDEA',
  width: '100%',
  borderRadius: '4px',
  padding: '24px',
  backgroundColor: appColors.neutral.white,
  marginBottom: '54px',
  height: '492px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.recharts-brush': {
    '.recharts-brush-slide': {
      fill: `${appColors.secondary.whoBlue}`,
      fillOpacity: 1,
      ry: 4, // border-radius for svg elements
    },
    '.recharts-brush-texts, .recharts-brush-traveller': {
      opacity: 0,
      pointerEvents: 'none',
    },
    '>rect:first-of-type': {
      stroke: 'unset',
      ry: 4, // border-radius for svg elements
      fill: appColors.tints.whoBlue.lightest,
    },
  },
});

const chart = {
  scrollable: css({
    overflowX: 'auto',
    overflowY: 'hidden',
  }),
  xAxis: {
    fontSize: fontSizes.h2,
    fontFamily: font.bold,
  },
};

const tooltip = {
  wrapper: {
    zIndex: 9999,
    backgroundColor: appColors.neutral.white,
    padding: '24px',
    boxShadow: '0px 0px 4px #C9DDEA',
    borderRadius: '4px',
    minWidth: '384px',
  },
};

export {
  chart, tooltip, wrapper,
};
