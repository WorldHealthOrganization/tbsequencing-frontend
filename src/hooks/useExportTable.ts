import { useGetExportTableLazyQuery as drugsApiQuery } from '../services/drugsApi/drugsApi';
import { useGetExportTableLazyQuery as genoResApiQuery } from '../services/genotypeResistanceApi/genotypeResistanceApi';
import { prepareRequestFilters } from '../features/drugsView/hooks/useTableData';
import { IColumnFilter, ISortState } from '../components/DataGrid/models';

interface IUseExportTableArgs {
  drugID?: number | string;
  sampleAliasesName?: string;
  geneDbCrossrefId?: number;
  filters: IColumnFilter[];
  sortState?: ISortState;
}

export const useExportTable = (query: typeof drugsApiQuery | typeof genoResApiQuery, {
  drugID, sampleAliasesName, geneDbCrossrefId, filters, sortState,
}: IUseExportTableArgs) => {
  const [trigger, response] = query();

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
      sampleAliasesName,
      geneDbCrossrefId,
      search: requestFilters,
      order: getSortOrder(),
    }, false);
  };

  return { response, fetchData };
};
