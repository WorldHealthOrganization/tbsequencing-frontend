import { css } from '@emotion/react';

export const styles = {
  h1: css({
    textAlign: 'center',
    '&:first-of-type': {
      marginTop: '20px',
    },
  }),
  imageWrapper: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }),
  image: css({
    bottom: 0,
    position: 'absolute',
  }),
};
