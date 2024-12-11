/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { Dialog, SxProps } from '@mui/material';
import * as styles from './styles';

interface Props {
  children: ReactElement;
  open: boolean;
  modalStyle?: SxProps;
}

export const BaseModal = ({ children, open, modalStyle }: Props) => (
  <Dialog sx={modalStyle} open={open}>
    <div css={styles.modal}>
      {children}
    </div>
  </Dialog>
);

export default BaseModal;
