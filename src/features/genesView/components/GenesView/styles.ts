import { css } from '@emotion/react';
import { font } from '../../../../components/typography/fontSizes';
import appColors from '../../../../styles/colors';

export const genesViewStyles = {
  tablesWrapper: css({
    display: 'flex',
    marginTop: '16px',
    '>div': {
      marginRight: '17px',
      marginBottom: '10px',
      maxHeight: '470px',
      '&:last-of-type': {
        marginRight: 0,
      },
    },
  }),
  autoCompleteInputLabel: css({
    fontFamily: font.regular,
    fontWeight: '400',
  }),
  autoCompleteContainer: css({
    display: 'flex',
    alignItems: 'center',
  }),
  sxAutoComplete: {
    width: '300px',
    marginRight: '40px',
    '.MuiOutlinedInput-root': {
      padding: 0,
    },
  },
  overviewTitle: css({
    marginTop: '32px',
    marginBottom: '24px',
  }),
  gnomadWrapper: css({
    marginTop: '32px',
  }),
  gridWrapper: css({
    margin: '20px 0',
    paddingBottom: '40px',
  }),
};

export const geneOverviewLink = css({
  textDecoration: 'none',
  color: appColors.secondary.whoBlue,
});

export const cdsLink = css({
  width: '200px',
  overflow: 'hidden',
});

export const gridContainerStyles = css({
  maxHeight: 50 * 16, // 31 = height of single row; 16 = need to show 15 records in grid + 1(header)
  minHeight: '300px',
  height: 'unset',
  'tr th': {
    padding: '10px 16px',
  },
});

export const container = css({
  overflow: 'hidden',
});
