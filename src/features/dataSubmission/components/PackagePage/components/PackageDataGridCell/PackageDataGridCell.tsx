/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { TableCell } from '@mui/material';
import * as styles from './styles';

interface Props {
  children: ReactNode;
  error?: boolean;
}

export const PackageDataGridCell = ({ children, error }: Props) => {
  const errorStyles = error && styles.error;

  return (
    <TableCell css={[styles.tableCell, errorStyles]}>
      {children}
    </TableCell>
  );
};

export default PackageDataGridCell;
