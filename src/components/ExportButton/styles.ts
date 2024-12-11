import { css } from '@emotion/react';
import appColors from '../../styles/colors';

export const styles = {
  exportContainer: css({
    display: 'flex',
    alignItems: 'center',
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
};
