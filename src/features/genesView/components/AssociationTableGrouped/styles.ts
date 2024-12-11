import { css } from '@emotion/react';
import { font } from '../../../../components/typography/fontSizes';
import appColors from '../../../../styles/colors';

export const associationTableStyles = {
  singlePair: css({
    display: 'flex',
    margin: '12px 0',
    'button, p': {
      width: '148px',
      justifyContent: 'left',
      paddingLeft: 0,
      marginRight: '15px',
      ':hover': {
        backgroundColor: 'transparent',
      },
    },
  }),
  paper: css({
    flex: 1,
    marginTop: '16px',
  }),
  itemsContainer: css({
    height: '100%',
    overflow: 'auto',
  }),
  defaultColumn: css({
    fontFamily: font.regular,
    fontWeight: '400',
    color: appColors.neutral.black,
  }),
  leftColumn: css({
    p: {
      textAlign: 'left',
    },
  }),
  tierTitle: css({
    marginTop: '16px',
  }),
};
