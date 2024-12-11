import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import {
  TableBody, TableCell, TableRow as MUITableRow, Skeleton,
} from '@mui/material';
import { VirtualItem } from 'react-virtual';
import { tableStyles } from './styles';

interface ITBodyProps<T> {
  rows: Row<T>[];
  isLoading?: boolean;
  selectedRow?: number;
  isVirtual?: boolean;
  virtualRows?: VirtualItem[]
  totalSize?: number;
}

interface ITableRow<T> {
  row: Row<T>;
  isSelected?: boolean;
  isLoading?: boolean;
}

const TableRow = <T extends unknown>({ row, isSelected, isLoading }: ITableRow<T>) => (
  <MUITableRow
    sx={[
      tableStyles.tbodyTr,
      isSelected ? tableStyles.selected : false,
    ]}
    key={row.id}
  >
    {row.getVisibleCells()
      .map((
        cell,
      ) => {
        const cellValue = cell.getContext().getValue();
        // @ts-ignore
        const includeVariant = /_variant$/.test(cellValue?.toString());
        return (
          <TableCell
            sx={tableStyles.td}
            key={cell.id}
          >
            {isLoading ? <Skeleton sx={tableStyles.skeleton} animation="wave" /> : (
              <span>

                {includeVariant
                // @ts-ignore
                  ? cellValue?.toString().slice(0, -8)
                  : flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            )}
          </TableCell>
        );
      })}
  </MUITableRow>
);

const VirtualBody = <T extends unknown>({
  virtualRows,
  rows,
  isLoading,
  selectedRow,
  totalSize,
}: Pick<ITBodyProps<T>, 'rows' | 'isLoading' | 'selectedRow' | 'virtualRows' | 'totalSize'>) => {
  const paddingTop = virtualRows!.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows!.length > 0
    ? totalSize! - (virtualRows?.at(-1)?.end || 0)
    : 0;
  return (
    <TableBody>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows!.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <TableRow
            key={row.index}
            isSelected={selectedRow === row.index}
            row={row}
            isLoading={isLoading}
          />
        );
      })}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </TableBody>
  );
};

const RegularBody = <T extends unknown>({
  rows,
  isLoading,
}: Pick<ITBodyProps<T>, 'rows' | 'isLoading'>) => (
  <TableBody>
    {rows.map((row) => <TableRow key={row.index} isLoading={isLoading} row={row} />)}
  </TableBody>
  );

const TBody = <T extends unknown>({
  isVirtual, ...rest
}: ITBodyProps<T>) => (isVirtual ? <VirtualBody {...rest} /> : <RegularBody {...rest} />);

export default TBody;
