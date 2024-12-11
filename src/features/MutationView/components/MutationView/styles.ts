import { css } from '@emotion/react';
import appColors from '../../../../styles/colors';

const wrapper = css({
  padding: '64px 54px',
});

const header = css({
  marginBottom: '24px',
});

const paperWrapper = css({
  flex: 1,
});

const dataGrid = css({
  '>div': {
    '>div:nth-of-type(2)': {
      '>div': {
        height: 'auto',
      },
    },

  },
});

const addStyle = css({
  display: 'none',
});

const buttonUploadWrapper = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginLeft: 'auto',
  alignSelf: 'end',
  width: '100%',
});

const paper = css({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxShadow: 'none',
  padding: 0,
});

const genesViewStyles = {
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
    fontWeight: '700',
    marginRight: 16,
  }),
  autoCompleteContainer: css({
    display: 'flex',
    alignItems: 'center',
  }),
  sxAutoComplete: {
    width: '300px',
    marginRight: '32px',
    '.MuiOutlinedInput-root': {
      padding: 0,
      paddingRight: '8px',
      input: {
        paddingTop: '8px',
        paddingBottom: '8px',
        '&[type=number]': {
          MozAppearance: 'textfield',
        },
        '&::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
    position: 'relative',
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

const iconStyles = {
  filterIcon: ({
    cursor: 'pointer',
    fontSize: 20,
    pointerEvents: 'none',
    marginTop: '2px',
    '&.MuiSvgIcon-root': {
      color: appColors.secondary.whoBlue,
    },
  }),
};

export {
  wrapper,
  header,
  dataGrid,
  paperWrapper,
  paper,
  iconStyles,
  genesViewStyles,
  buttonUploadWrapper,
  addStyle,
};
