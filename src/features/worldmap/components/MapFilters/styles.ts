import { css } from '@emotion/react';

export const container = css({
  display: 'flex',
});

export const section = css({
  marginLeft: 16,
});

export const singleElement = css({
  marginRight: 16,
});

export const radioGroup = css({
  width: 600,
  flexDirection: 'row',
  justifyContent: 'space-between',
  '>div': {
    display: 'flex',
  },
});
