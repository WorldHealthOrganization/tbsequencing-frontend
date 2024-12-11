import { css, CSSObject } from '@emotion/react';
import appColors from '../../styles/colors';
import { font, fontSizes } from '../typography/fontSizes';

const tableStyles = {
  wrapper: css({
    marginTop: '16px',
  }),
  thWrapper: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  tableHeaderCell: {
    boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
    maxWidth: '200px',
    padding: '0 20px 0 16px',
    borderCollapse: 'collapse',
    width: '200px',
    flex: 1,
  },
  thText: {
    position: 'static',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    fontFamily: font.bold,
    fontSize: fontSizes.primary,
    color: appColors.tints.whoBlue.light,
    marginRight: '10px',
    cursor: 'pointer',
    '&.MuiTableSortLabel-root.Mui-active': {
      color: appColors.secondary.whoBlue,
    },
    '&.MuiTableSortLabel-root:hover, &.MuiTableSortLabel-root': {
      color: appColors.tints.whoBlue.light,
      width: '100%',
      marginRight: '20px',
    },
    svg: {
      fill: appColors.secondary.whoBlue,
      position: 'absolute',
      right: '-18px',
      marginBottom: '4px',
    },
  },
  skeleton: {
    backgroundColor: appColors.tints.whoBlue.lightest,
  },
  buttons: css({
    display: 'flex',
    alignItems: 'center',
  }),
  sortedColumn: (sortedIndex: number) => ({
    [`td:nth-of-type(${sortedIndex + 1}), th:nth-of-type(${sortedIndex + 1})`]: {
      backgroundColor: appColors.neutral.whoBlueTransparent,
    },
  }),
  drugListPopover: css({
    '.MuiFormGroup-root': {
      width: '260px !important',
    },
  }),
  exportContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
    '.MuiButton-root': {
      marginBottom: 0,
    },
    '> button p': {
      fontSize: '20px',
    },
  }),
  exportButton: css({
    button: {
      marginLeft: '25px',
    },
    svg: {
      fill: appColors.secondary.whoBlue,
      marginRight: '12px',
      fontSize: '20px',
    },
  }),
  tbodyTr: {
    boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
  },
  noDataFound: {
    textAlign: 'center',
  },
  selected: {
    backgroundColor: appColors.neutral.whoBlueTransparent,
    // selector for all tr elements AFTER/BELOW selected one
    '&~tr': {
      backgroundColor: appColors.neutral.whoBlueTransparent,
    },
  },
  td: {
    fontFamily: font.regular,
    fontSize: fontSizes.primary,
    padding: '15px 16px',
    width: '200px',
    borderCollapse: 'collapse',
    flex: 1,
    whiteSpace: 'nowrap',
  },
  paper: css({
    boxShadow: `0px 0px 4px ${appColors.tints.whoBlue.lighter}`,
    borderRadius: '4px',
    height: '300px',
    overflow: 'auto',
    position: 'relative',
  }),
  filterIcon: ({
    cursor: 'pointer',
    fontSize: 18,
  }),
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: appColors.neutral.white,
    zIndex: 9,
  },
  headerFilterButton: css({
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
  }),
};

const headerFilterStyles = {
  '.MuiPaper-root': {
    padding: '20px 8px 8px 8px',
  },
  '.MuiInput-root': {
    padding: '0 16px',
  },
  '.MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input': {
    paddingRight: '6px !important',
  },
  '.MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input': {
    minWidth: '140px',
    paddingRight: '6px',
  },
  '.MuiSelect-icon.MuiSelect-iconStandard': {
    fill: appColors.secondary.whoBlue,
  },
  clearFilterIcon: {
    fill: appColors.secondary.whoBlue,
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  selectBox: {
    width: '200px',
  },
  selectClearFilterIcon: {
    fill: appColors.secondary.whoBlue,
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    marginRight: '13px',
  },
};

const theadEmotion = css({
  ...tableStyles.thText,
  cursor: 'default',
} as CSSObject);

const headerFilterContainer = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  recentlyText: css({
    color: appColors.secondary.whoBlue,
    cursor: 'pointer',
  }),
  recentlyContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  recentlyHeader: css({
    fontFamily: font.regular,
    fontWeight: 400,
    marginTop: '16px',
  }),
  recentlyButton: css({
    display: 'inline-flex',
    justifyContent: 'flex-start',
    height: 'auto',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
};

const pagination = {
  wrapper: css({
    display: 'flex',
    marginTop: '25px',
    nav: {
      marginLeft: 'auto',
    },
  }),
  paginationComponent: {
    '.MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)': {
      border: 'none',
      boxShadow: '0px 0px 4px #C9DDEA',
    },
    '.MuiPaginationItem-root.Mui-selected': {
      backgroundColor: appColors.secondary.whoBlue,
      color: appColors.neutral.white,
    },
  },
};

export {
  tableStyles,
  theadEmotion,
  headerFilterStyles,
  headerFilterContainer,
  pagination,
};
