/** @jsxImportSource @emotion/react */
import React, {
  useEffect, useMemo, useRef, useState, ReactElement,
} from 'react';
import { Paper, Table, TableContainer } from '@mui/material';
import {
  AccessorFn,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { SerializedStyles } from '@emotion/react';
import {
  GridType, IColumn, IColumnFilter, ISortState, ScrollType,
} from './models';
import { tableStyles } from './styles';
import Thead, { IOnHeaderCellClick, IOnHeaderFilterClick } from './Thead';
import TBody from './TBody';
import HeaderFilter from './HeaderFilter';
import ExportButton from '../ExportButton';
import { IGene } from '../../services/genesApi/models';
import { IDrug } from '../../services/drugsApi/models';
import { useVirtualRows } from '../../hooks/useVirtualRows';
import NoDataFoundBody from './NoDataFoundBody';
import AppPaper from '../AppPaper';
import DrugsDropdown from '../../features/drugsView/componets/DrugDescriptionWrapper/DrugsDropdown';

interface IDataGridProps<T> {
  columns: IColumn<T>[];
  dataSource: any[];
  type: GridType;
  isLoading?: boolean;
  filterValues?: IColumnFilter[];
  onFilterChange?: (filters: IColumnFilter[]) => void;
  onSortingChange?: (sortState: ISortState) => void;
  onScroll?: (dataRows: number[]) => void;
  scrollType?: ScrollType;
  selectedDropdownItem: IDrug | IGene | {};
  selectedRow?: number;
  sortState?: ISortState;
  containerStyles?: SerializedStyles;
  resistantDrugs?: IDrug[];
  onChangeResistantDrug?: (id: number) => void;
  selectedResistantDrug?: IDrug;
  children?: ReactElement;
  addStyle?: SerializedStyles;
}

export const DataGrid = <T extends unknown>({
  columns,
  dataSource,
  isLoading,
  filterValues = [],
  onFilterChange,
  onSortingChange,
  onScroll,
  scrollType = ScrollType.Regular,
  sortState,
  selectedDropdownItem,
  containerStyles,
  onChangeResistantDrug,
  selectedResistantDrug,
  selectedRow,
  type,
  resistantDrugs,
  children,
  addStyle,
}: IDataGridProps<T>) => {
  const [headerFilterPosition, setHeaderFilterPosition] = useState<HTMLElement | null>(null);
  const [headerFilterColumn, setHeaderFilterColumn] = useState<ColumnDef<T>>();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const gridColumns = useMemo(() => {
    const columnHelper = createColumnHelper<T>();
    return columns.map((column) => (
      columnHelper.accessor((column.name as unknown as AccessorFn<T>), { header: column.header })));
  }, [columns]);

  const CSVHeaders = useMemo(() => columns.map((column) => ({
    label: column.header as string,
    key: column.name as string,
  })), [columns]);

  const instance = useReactTable<T>({
    data: dataSource,
    columns: gridColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = instance.getRowModel();

  const { virtualRows, totalSize } = useVirtualRows({
    rows,
    parentRef: tableContainerRef,
    isVirtual: scrollType === ScrollType.Infinite,
    selectedRow,
  });

  useEffect(() => {
    if (typeof onScroll === 'function' && virtualRows?.length) {
      onScroll([virtualRows[0]?.index, virtualRows[virtualRows.length - 1]?.index]);
    }
    // @ts-ignore
  }, [virtualRows]);

  const applyFilter = (filter: { id: string, value: string | number }) => {
    const getNewFilters = () => {
      const filterExist = filterValues.findIndex(({ id }) => id === filter.id);
      if (~filterExist) {
        return filterValues.map((item, index) => {
          if (index === filterExist) {
            return {
              id: item.id,
              value: filter.value,
            };
          }
          return item;
        });
      }
      return [
        ...filterValues,
        { id: filter.id, value: filter.value },
      ];
    };
    if (!onFilterChange) return;
    onFilterChange(getNewFilters());
  };

  const onHeaderFilterClick = (e: IOnHeaderFilterClick) => {
    setHeaderFilterColumn(e.header.column);
    setHeaderFilterPosition(e.event.currentTarget.parentElement);
  };

  const onHeaderCellClick = (e: IOnHeaderCellClick) => {
    if (!onSortingChange || !sortState) return;

    const { order, colIndex } = sortState;

    if (e.header.index !== colIndex) {
      onSortingChange({
        colIndex: e.header.index,
        order: 'asc',
        colID: e.header.id,
      });
      return;
    }

    const isAsc = order === 'asc';
    const isDesc = order === 'desc';
    const isDisabled = order === undefined;

    const getNextSortOrder = () => {
      if (isDisabled) return 'asc';
      if (isAsc) return 'desc';
      if (isDesc) return undefined;
      return undefined;
    };

    onSortingChange({
      ...sortState,
      order: getNextSortOrder(),
    });
  };

  return (
    <div>
      <AppPaper style={tableStyles.exportContainer}>
        {children}
        <ExportButton
          selectedDropdownItem={selectedDropdownItem}
          columnFilters={filterValues}
          sortState={sortState}
          headers={CSVHeaders}
          addStyle={addStyle}
        />
        {type === GridType.Gene && resistantDrugs?.length && selectedResistantDrug
          ? (
            <DrugsDropdown
              onChange={onChangeResistantDrug!}
              items={resistantDrugs || []}
              value={selectedResistantDrug!}
              size="medium"
              popoverStyle={tableStyles.drugListPopover}
              variant="outlined"
            />
          )
          : null}
      </AppPaper>
      <TableContainer component={Paper}>
        <div
          ref={tableContainerRef}
          css={[tableStyles.paper, containerStyles]}
        >
          <Table sx={[
            sortState?.order ? tableStyles.sortedColumn(sortState.colIndex!) : {},
          ]}
          >
            <Thead<T>
              headerGroups={instance.getHeaderGroups()}
              onHeaderCellClick={onHeaderCellClick}
              onHeaderFilterClick={onHeaderFilterClick}
              columnFilters={filterValues}
              sortState={sortState}
            />
            {!isLoading && !rows.length ? <NoDataFoundBody />
              : (
                <TBody<T>
                  isLoading={isLoading}
                  selectedRow={selectedRow}
                  isVirtual={scrollType === ScrollType.Infinite}
                  virtualRows={virtualRows}
                  totalSize={totalSize}
                  rows={rows}
                />
              )}
          </Table>
        </div>
      </TableContainer>
      {headerFilterPosition && (
        <HeaderFilter<T>
          closeDropDown={() => setHeaderFilterPosition(null)}
          onApplyFilter={(e) => applyFilter({ id: e.column.id as string, value: e.value })}
          anchorEl={headerFilterPosition}
          columnData={headerFilterColumn!}
          columnFilters={filterValues}
          type={type}
        />
      )}
    </div>
  );
};

export default DataGrid;
