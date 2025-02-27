import { useState } from 'react';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { IColumnFilter, ISortState } from '../../../components/DataGrid/models';
import { ITableResponse } from '../../../services/drugsApi/models';

export const DEFAULT_PAGE_SIZE = 12;

export const prepareRequestFilters = (filters: IColumnFilter[]) => (
  filters.reduce((acc: Record<string, string | number>, cur) => {
    if (cur.value) {
      acc[cur.id] = cur.value;
    }
    return acc;
  }, {})
);

interface IUseTableData {
  drugID?: number | string;
  sampleAliasesName?: string;
  geneDbCrossrefId?: number;
  skipQuery?: boolean;
  useGetDataQuery: UseQuery<any>;
}

export const useTableData = ({
  drugID, sampleAliasesName, geneDbCrossrefId, useGetDataQuery, skipQuery,
}: IUseTableData) => {
  const [sortState, setSortState] = useState<ISortState>({ colID: '', colIndex: -1, order: undefined });
  const [filters, setFilters] = useState<IColumnFilter[]>([]);
  const [paging, setPaging] = useState<number>(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const updateSort = (value: ISortState) => {
    setSortState(value);
  };

  const updateFilters = (value: IColumnFilter[]) => {
    setFilters(value);
    setPaging(1);
  };

  const updatePaging = (value: number) => {
    setPaging(value);
  };

  const getSortOrder = () => {
    if (!sortState.order) return undefined;
    return {
      asc: `${sortState.colID}`,
      desc: `-${sortState.colID}`,
    }[sortState.order];
  };

  const fetchNextPage = () => {
    setPageSize((prevState) => prevState + DEFAULT_PAGE_SIZE);
  };

  const requestFilters = prepareRequestFilters(filters);

  const {
    data: response,
    isFetching: isTableDataLoading,
  } = useGetDataQuery({
    geneDbCrossrefId,
    sampleAliasesName,
    drugID,
    order: getSortOrder(),
    search: requestFilters,
    page: paging,
    pageSize,
  }, { skip: (!geneDbCrossrefId && !drugID && !sampleAliasesName) || skipQuery });

  return {
    rowsCount: (response as ITableResponse)?.rowsCount,
    tableData: (response as ITableResponse)?.tableData,
    isTableDataLoading,
    filters,
    sortState,
    page: paging,
    updateSort,
    updateFilters,
    updatePaging,
    fetchNextPage,
  };
};
