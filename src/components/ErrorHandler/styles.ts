import { css } from '@emotion/react';

export const styles = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  }),
  buttonMargin: css({
    marginTop: '10px',
    zIndex: 999,
  }),
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
    width: '100%',
    bottom: 0,
    position: 'absolute',
  }),
};
