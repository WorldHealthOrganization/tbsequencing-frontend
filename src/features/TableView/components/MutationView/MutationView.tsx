/** @jsxImportSource @emotion/react */
import React, {
  useEffect, useState, SyntheticEvent, useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
// import { InputAdornment, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

import {
  useGetDrugsDataQuery, useGetTableDataQuery, useGetExportTableLazyQuery
} from '../../../../services/drugsApi/drugsApi';
import { IDrug } from '../../../../services/drugsApi/models';
import { IGene } from '../../../../services/genesApi/models';
import { DEFAULT_PAGE_SIZE, useTableData } from '../../hooks/useTableData';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useExportTable } from '../../../../hooks/useExportTable';

import H1 from '../../../../components/typography/H1';
import AppPaper from '../../../../components/AppPaper/AppPaper';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';

import { useGetMostSearchHistoryQuery } from '../../../../services/genesApi/genesApi';
import { useAutocompleteQuery } from '../../../genesView/hooks/useAutocompleteQuery';
import AutocompleteInputSearch from '../../../../components/AutocompleteInputSearch/AutocompleteInputSearch';
import LoadingWrapper from '../../../../components/LoadingWrapper/LoadingWrapper';
import AppButton from '../../../../components/AppButton/AppButton';

import DataGrid from '../../../../components/DataGrid';
import { pagination } from '../../../../components/DataGrid/styles';
import Pagination from '../../../drugsView/componets/Pagination/Pagination';
import {
  DrugTableColumns, GridType, IColumn, IColumnFilter,
} from '../../../../components/DataGrid/models';

import {
  header,
  wrapper,
  paperWrapper,
  paper,
  viewStyles,
  dataGrid,
  buttonUploadWrapper,
  addStyle,
} from './styles';

export const columns: IColumn<DrugTableColumns>[] = [
  { name: 'geneName', header: 'Gene' },
  { name: 'drugName', header: 'Drug' },
  { name: 'variantName', header: 'Variant' },
  { name: 'nucleodicAnnName', header: 'Nucleic Annotation' },
  { name: 'proteicAnnName', header: 'Proteic Annotation' },
  { name: 'consequence', header: 'Consequence' },
  { name: 'variantGrade', header: 'Grade' },
  { name: 'globalFrequency', header: 'Global Frequency' },
  { name: 'totalCounts', header: 'Total Samples' },
  { name: 'resistantCount', header: 'Resistant Count' },
  { name: 'susceptbleCount', header: 'Susceptible Count' },
  { name: 'intermediateCount', header: 'Intermediate Count' },
];

const MutationView = () => {
  const [searchParams] = useSearchParams();

  // react-scv lib doesn't have types for ref
  const csvRef = useRef<any>(null);

  const [inputGeneValue, setInputGeneValue] = useState<boolean | string>(false);
  // const [inputPositionValue, setInputPositionValue] = useState<boolean | string>(false);
  const [inputPositionValue] = useState<boolean | string>(false);

  const debouncedGeneValue = useDebounce<boolean | string>(inputGeneValue, 500);
  const debouncedPositionValue = useDebounce<boolean | string>(inputPositionValue, 500);

  const defaultDrug = {
    code: searchParams.get('code'),
    drugId: Number(searchParams.get('drugId')),
    drugName: searchParams.get('drugName'),
  };

  const [selectedDrug, setSelectedDrug] = useState<IDrug | {}>(
    defaultDrug.drugId ? defaultDrug : {},
  );

  const {
    data: genes = [],
  } = useAutocompleteQuery();
  const {
    data: mostSearch = [],
    refetch: mostSearchHistoryRefetch,
  } = useGetMostSearchHistoryQuery(undefined, { refetchOnMountOrArgChange: true });

  const getOptions = () => {
    const inputEmpty = !inputGeneValue;
    const mostSearchedData = mostSearch
      .slice(-10)
      .sort((prev, next) => next.counter - prev.counter);

    return inputEmpty ? mostSearchedData : genes;
  };

  const optionsGene = getOptions();

  const defaultGene: IGene = {
    geneDbCrossrefId: Number(searchParams.get('geneDbCrossrefId')),
    geneName: searchParams.get('geneName'),
    locusTag: null,
    id: Number(searchParams.get('geneDbCrossrefId')),
    endPos: 1,
    startPos: 0,
    strand: -1,
  };

  const {
    data: drugsData = [],
  } = useGetDrugsDataQuery({ isAssociated: 1 });

  const getDrugIds = () => {
    let drugsIds = '';
    drugsData.forEach((drugItem) => {
      drugsIds += `,${drugItem.drugId}`;
    });
    return drugsIds.substring(1);
  };

  const [
    selectedGeneValue,
    setSelectedGeneValue,
  ] = useState<IGene | null>(defaultGene.geneDbCrossrefId ? defaultGene : null);

  const {
    rowsCount,
    tableData = [],
    isTableDataLoading,
    sortState,
    filters,
    page,
    updateSort,
    updateFilters,
    updatePaging,
  } = useTableData({
    drugID: getDrugIds(),
    useGetDataQuery: useGetTableDataQuery,
  });

  const {
    response,
    fetchData,
  } = useExportTable(useGetExportTableLazyQuery, { filters });

  useEffect(() => {
    // eslint-disable-line
    if (drugsData.length && !(selectedDrug as IDrug).drugId) {
      setSelectedDrug(drugsData[0]);
    }
    // eslint-disable-line
  }, [drugsData]);

  useEffect(() => {
    if (csvRef?.current && response.data?.length && response.status === 'fulfilled') {
      csvRef.current.link.click();
    }
  }, [response]);

  const refetchByPositionOrGene = (filterParam: string, inputValue: string) => {
    const nextFilters = filters.map((filter) => {
      if (filter.id !== filterParam) {
        return filter;
      }
      return {
        id: filterParam, value: inputValue,
      };
    });

    const hasNotNewFilter = !nextFilters.find((item) => item.id === filterParam);
    if (hasNotNewFilter) {
      const newFilter: IColumnFilter = {
        id: filterParam,
        value: inputValue,
      };
      nextFilters.push(newFilter);
    }
    updateFilters(nextFilters);
  };

  const handleGeneChange = (e: SyntheticEvent, value: string) => {
    setInputGeneValue(value);
  };
  // const handlePositionChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputPositionValue(event.target.value);
  // };

  useEffect(() => {
    if (typeof debouncedPositionValue === 'boolean') {

      // eslint-disable-line
    } else if (!filters.length) {
      updateFilters([{ id: 'variantName', value: debouncedPositionValue }]);
    } else {
      refetchByPositionOrGene('variantName', debouncedPositionValue);
    }
    // eslint-disable-line
  }, [debouncedPositionValue]);

  useEffect(() => {
    if (typeof debouncedGeneValue === 'boolean') {

      // eslint-disable-line
    } else if (!filters.length) {
      updateFilters([{ id: 'geneName', value: debouncedGeneValue }]);
    } else {
      refetchByPositionOrGene('geneName', debouncedGeneValue);
    }
    // eslint-disable-line
  }, [debouncedGeneValue]);

  if (!tableData.length && isTableDataLoading) {
    return (
      <div css={wrapper}>
        <H1 style={header}>Mutations Search</H1>
        <LoadingWrapper centered isLoading>
          <span />
        </LoadingWrapper>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      <H1 style={header}>Mutations Search</H1>
      <div>
        <PrimaryText>
          Variant grade interpretations are available when filtering on the Grade column.
        </PrimaryText>
      </div>
      <div css={dataGrid}>
        <DataGrid<DrugTableColumns>
          isLoading={isTableDataLoading}
          columns={columns}
          dataSource={tableData}
          filterValues={filters}
          onFilterChange={updateFilters}
          onSortingChange={updateSort}
          selectedDropdownItem={selectedDrug}
          sortState={sortState}
          type={GridType.Drug}
          addStyle={addStyle}
        >
          <div css={paperWrapper}>
            <AppPaper style={paper}>
              <div css={viewStyles.autoCompleteContainer}>
                <H3
                  style={viewStyles.autoCompleteInputLabel}
                >
                  Gene
                </H3>
                <AutocompleteInputSearch
                  isLoading={isTableDataLoading}
                  onSelectionChanged={(e, value) => {
                    if (value === null) {
                      mostSearchHistoryRefetch();
                    }
                    setSelectedGeneValue(value);
                  }}
                  selectedValue={selectedGeneValue}
                  onChange={handleGeneChange}
                  value={`${debouncedGeneValue}`}
                  options={optionsGene}
                  style={viewStyles.sxAutoComplete}
                  placeholder="Search by Gene"
                />
              </div>
              {/* <div css={viewStyles.autoCompleteContainer}>
                <H3
                  style={viewStyles.autoCompleteInputLabel}
                >
                  Position
                </H3>
                <TextField
                  sx={viewStyles.sxAutoComplete}
                  placeholder="Search by Position"
                  type="text"
                  disabled={isTableDataLoading}
                  value={inputPositionValue || ''}
                  onChange={handlePositionChange}
                  InputProps={
                    {
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon sx={iconStyles.filterIcon} />
                        </InputAdornment>
                      ),
                      inputProps: { min: 0 },
                    }
                  }
                />
              </div> */}
              <div css={buttonUploadWrapper}>
                <H3 style={viewStyles.autoCompleteInputLabel}>Export CSV Data</H3>
                <AppButton
                  onClick={fetchData}
                  variant="outlined"
                  size="medium"
                  startIconName="file_download"
                >
                  {response.isLoading ? 'Loading...' : 'Download'}
                </AppButton>
                <CSVLink
                  ref={csvRef}
                  data={response.data || []}
                  filename="MutationsSearch"
                />
              </div>
            </AppPaper>
          </div>
        </DataGrid>
        <div css={pagination.wrapper}>
          <Pagination
            page={page}
            pageCount={Math.ceil(rowsCount / DEFAULT_PAGE_SIZE)}
            onPageClick={updatePaging}
          />
        </div>
      </div>
    </div>
  );
};

export default MutationView;
