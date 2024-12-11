import { css } from '@emotion/react';

export const buttonsContainer = css({
  marginTop: 32,
  justifyContent: 'flex-end',
  display: 'flex',
});

export const fieldWrapper = css({
  marginTop: 16,
});

export const changePasswordBtn = css({
  marginLeft: 16,
  justifyContent: 'flex-end',
});

export const fieldsContainer = css({
  marginTop: 32,
  marginBottom: 32,
  '.MuiInputLabel-root': {
    transform: 'translate(0, -1.5px) scale(0.75)',
    paddingLeft: '13px',
  },
});

export const baseModalSx = {
  overflowY: 'auto',
  height: '100%',
  display: 'block',
};
