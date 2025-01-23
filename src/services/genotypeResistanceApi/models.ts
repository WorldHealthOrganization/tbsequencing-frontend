export type TableData = Record<string, number | string>;

export interface ITableResponse {
  rowsCount: number;
  tableData: TableData[];
}

export interface ITableDataParams {
  drugID?: number | string;
  order?: string;
  search?: Record<string, unknown>;
  page?: number;
  pageSize?: number;
}
