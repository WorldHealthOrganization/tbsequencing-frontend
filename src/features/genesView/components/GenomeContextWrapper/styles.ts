import { css } from '@emotion/react';
import { font } from '../../../../components/typography/fontSizes';
import appColors from '../../../../styles/colors';

const genomeContextWrapperStyles = {
  innerWrapper: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  outerWrapper: css({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  genomeWrapper: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  header: css({
    marginTop: '32px',
    marginBottom: '24px',
  }),
  leftNumber: css({
    marginRight: '56px',
    fontFamily: font.regular,
    fontWeight: 400,
  }),
  rightNumber: css({
    marginLeft: '56px',
    fontFamily: font.regular,
    fontWeight: 400,
  }),
  locusTag: css({
    marginBottom: '16px',
  }),
  axisContainer: css({
    marginTop: '10px',
    position: 'relative',
    text: {
      fontFamily: font.bold,
      fontSize: '12px !important',
    },
  }),
  label: css({
    position: 'absolute',
    left: 0,
    botton: 0,
  }),
  ncbiLink: {
    color: appColors.neutral.black,
    textDecoration: 'none',
  },
};

export const {
  innerWrapper,
  axisContainer,
  header,
  genomeWrapper,
  outerWrapper,
  locusTag,
  label,
  ncbiLink,
} = genomeContextWrapperStyles;
