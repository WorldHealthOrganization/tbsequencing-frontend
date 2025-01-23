/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, SyntheticEvent } from 'react';

import { useGetDrugsDataQuery } from '../../../../services/drugsApi/drugsApi';
import { useGetTableDataQuery } from '../../../../services/genotypeResistanceApi/genotypeResistanceApi';
import { DEFAULT_PAGE_SIZE, useTableData } from '../../hooks/useTableData';
import { useDebounce } from '../../../../hooks/useDebounce';

import H1 from '../../../../components/typography/H1';
import AppPaper from '../../../../components/AppPaper/AppPaper';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';

import AutocompleteInputSearch from '../../../../components/AutocompleteInputSearch/AutocompleteInputSearch';
import LoadingWrapper from '../../../../components/LoadingWrapper/LoadingWrapper';

import DataGrid from '../../../../components/DataGrid';
import { pagination } from '../../../../components/DataGrid/styles';
import Pagination from '../../../drugsView/componets/Pagination/Pagination';
import {
  GenotypeResistance, GridType, IColumn,
} from '../../../../components/DataGrid/models';

import {
  header,
  wrapper,
  paperWrapper,
  paper,
  dataGrid,
  viewStyles,
  addStyle,
} from './styles';

export const columns: IColumn<GenotypeResistance>[] = [
  { name: 'drugName', header: 'Drug' },
  { name: 'variant', header: 'Variant' },
  { name: 'sampleAliasesName', header: 'Sample Alias Name' },
  { name: 'resistanceFlag', header: 'Genotype Resistance' },
];

const GenotypeResistanceView = () => {
  const [inputSampleValue, setInputSampleValue] = useState<boolean | string>(false);
  const debouncedSampleValue = useDebounce<boolean | string>(inputSampleValue, 500);

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

  const handleSampleChange = (e: SyntheticEvent, value: string) => {
    setInputSampleValue(value);
  };

  useEffect(() => {
    if (typeof debouncedSampleValue === 'boolean') {
          // eslint-disable-line
    } else {
      updateFilters([{ id: 'sampleAliasesName', value: debouncedSampleValue }]);
    }
      // eslint-disable-line
  }, [debouncedSampleValue]);

  if (!tableData.length && isTableDataLoading) {
    return (
      <div css={wrapper}>
        <H1 style={header}>Sample Alias Search</H1>
        <LoadingWrapper centered isLoading>
          <span />
        </LoadingWrapper>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      <H1 style={header}>Sample Alias Search</H1>
      <div>
        <PrimaryText>
          Variant grade interpretations are available when filtering on the Grade column.
        </PrimaryText>
      </div>
      <div css={dataGrid}>
        <DataGrid<GenotypeResistance>
          isLoading={isTableDataLoading}
          columns={columns}
          dataSource={tableData}
          filterValues={filters}
          onFilterChange={updateFilters}
          onSortingChange={updateSort}
          selectedDropdownItem={{}}
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
                  Sample Alias
                </H3>
                <AutocompleteInputSearch
                  isLoading={isTableDataLoading}
                  onSelectionChanged={(e, value) => { console.log(e, value); }}
                  selectedValue={null}
                  onChange={handleSampleChange}
                  value={`${debouncedSampleValue}`}
                  options={[]}
                  style={viewStyles.sxAutoComplete}
                  placeholder="Search by Sample Alias Name"
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

export default GenotypeResistanceView;
