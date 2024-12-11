import { css } from '@emotion/react';

const wrapper = css({
  marginBottom: '24px',
  display: 'flex',
});

const block = css({
  marginRight: '16px',
  display: 'flex',
  button: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export {
  wrapper, block,
};
