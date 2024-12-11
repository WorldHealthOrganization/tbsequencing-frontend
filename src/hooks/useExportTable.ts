import { useGetExportTableLazyQuery } from '../services/drugsApi/drugsApi';
import { prepareRequestFilters } from '../features/drugsView/hooks/useTableData';
import { IColumnFilter, ISortState } from '../components/DataGrid/models';

interface IUseExportTableArgs {
  drugID?: number | string;
  geneDbCrossrefId?: number;
  filters: IColumnFilter[];
  sortState?: ISortState;
}

export const useExportTable = ({
  drugID, geneDbCrossrefId, filters, sortState,
}: IUseExportTableArgs) => {
  const [trigger, response] = useGetExportTableLazyQuery();

  const getSortOrder = () => {
    if (!sortState?.order) return undefined;
    return {
      asc: `${sortState.colID}`,
      desc: `-${sortState.colID}`,
    }[sortState.order];
  };

  const requestFilters = prepareRequestFilters(filters);

  const fetchData = () => {
    trigger({
      drugID,
      geneDbCrossrefId,
      search: requestFilters,
      order: getSortOrder(),
    }, false);
  };

  return { response, fetchData };
};
