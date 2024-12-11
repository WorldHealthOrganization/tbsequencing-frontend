/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  TableRow, TableHead, TableCell, TableSortLabel,
} from '@mui/material';
import {
  ColumnFiltersState, Header, HeaderGroup, flexRender,
} from '@tanstack/react-table';
import SearchIcon from '@mui/icons-material/Search';
import appColors from '../../styles/colors';
import { tableStyles, theadEmotion } from './styles';
import { ISortState } from './models';

export interface IOnHeaderCellClick {
  header: Header<any, any>
}

export interface IOnHeaderFilterClick {
  event: React.MouseEvent<HTMLButtonElement>;
  header: Header<any, any>
}

interface ITheadProps<T> {
  headerGroups: HeaderGroup<T>[]
  onHeaderCellClick: (e: IOnHeaderCellClick) => void;
  onHeaderFilterClick: (e: IOnHeaderFilterClick) => void;
  columnFilters: ColumnFiltersState;
  sortState?: ISortState;
}

const columnsAllowedToFilter = ['geneName', 'proteicAnnName', 'nucleodicAnnName', 'variantName', 'consequence', 'variantGrade'];
const columnsAllowedToSort = ['globalFrequency', 'totalCounts', 'resistantCount', 'susceptbleCount', 'intermediateCount'];

interface ITableHeaderProps<T> {
  sortState: ITheadProps<unknown>['sortState'];
  onHeaderCellClick: ITheadProps<unknown>['onHeaderCellClick'];
  header: Header<T, any>
}

const TableHeader = <T extends unknown>({
  sortState,
  onHeaderCellClick,
  header,
}: ITableHeaderProps<T>) => {
  if (!sortState || !columnsAllowedToSort.includes(header.id)) {
    return (
      <span css={theadEmotion}>
        {
          flexRender(
            header.column.columnDef.header,
            header.getContext(),
          )
        }
      </span>
    );
  }
  return (
    <TableSortLabel
      sx={tableStyles.thText}
      active={sortState?.colID === header.id && !!sortState.order}
      direction={sortState?.order}
      onClick={() => {
        onHeaderCellClick({
          header,
        });
      }}
    >
      {
          flexRender(
            header.column.columnDef.header,
            header.getContext(),
          )
        }
    </TableSortLabel>
  );
};

const Thead = <T extends unknown>({
  headerGroups, onHeaderCellClick, onHeaderFilterClick, columnFilters, sortState,
}: ITheadProps<T>) => (
  <TableHead sx={tableStyles.thead}>
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell
            align="left"
            sx={tableStyles.tableHeaderCell}
            key={header.id}
          >
            <div css={tableStyles.thWrapper}>
              <TableHeader<T>
                header={header}
                onHeaderCellClick={onHeaderCellClick}
                sortState={sortState}
              />
              <div css={tableStyles.buttons}>
                {columnsAllowedToFilter.includes(header.id) && (
                <button
                  data-testid={`filter-button-${header.id}`}
                  css={tableStyles.headerFilterButton}
                  type="button"
                  onClick={(e) => {
                    onHeaderFilterClick({
                      event: e,
                      header,
                    });
                  }}
                >
                  <SearchIcon
                    sx={tableStyles.filterIcon}
                    htmlColor={
                      columnFilters.some(
                        (filter) => (filter.id === header.id) && filter.value,
                      )
                        ? appColors.secondary.whoOrange
                        : appColors.secondary.whoBlue
                    }
                  />
                </button>
                )}
              </div>
            </div>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
  );

export default Thead;
