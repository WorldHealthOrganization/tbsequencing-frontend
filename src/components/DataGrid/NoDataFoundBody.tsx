import React from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { tableStyles } from './styles';

const NoDataFoundBody = () => (
  <TableBody>
    <TableRow>
      <TableCell
        sx={tableStyles.noDataFound}
        colSpan={100}
        rowSpan={100}
      >
        No results matching your request
      </TableCell>
    </TableRow>
  </TableBody>
);

export default NoDataFoundBody;
