/** @jsxImportSource @emotion/react */
import React, {
  useEffect, useState, SyntheticEvent, useRef,
} from 'react';
import { CSVLink } from 'react-csv';

import { useGetDrugsDataQuery } from '../../../../services/drugsApi/drugsApi';
import { 
  useGetTableDataQuery, 
  useGetExportTableLazyQuery
} from '../../../../services/genotypeResistanceApi/genotypeResistanceApi';
import { DEFAULT_PAGE_SIZE, useTableData } from '../../hooks/useTableData';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useExportTable } from '../../../../hooks/useExportTable';

import H1 from '../../../../components/typography/H1';
import AppPaper from '../../../../components/AppPaper/AppPaper';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';

import AutocompleteInputSearch from '../../../../components/AutocompleteInputSearch/AutocompleteInputSearch';
import LoadingWrapper from '../../../../components/LoadingWrapper/LoadingWrapper';
import AppButton from '../../../../components/AppButton/AppButton';

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
  buttonUploadWrapper,
  addStyle,
} from './styles';

export const columns: IColumn<GenotypeResistance>[] = [
  { name: 'sampleAliasesName', header: 'BioSample Accession' },
  { name: 'drugName', header: 'Drug' },
  { name: 'resistanceFlag', header: 'Genotypic Resistance' },
  { name: 'variant', header: 'Variant' },
];

const GenotypeResistanceView = () => {
  // react-scv lib doesn't have types for ref
  const csvRef = useRef<any>(null);

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

  const {
    response,
    fetchData,
  } = useExportTable(useGetExportTableLazyQuery, { filters, drugID: getDrugIds() });

  const handleSampleChange = (e: SyntheticEvent, value: string) => {
    setInputSampleValue(value);
  };

  useEffect(() => {
    if (csvRef?.current && response.data?.length && response.status === 'fulfilled') {
      csvRef.current.link.click();
    }
  }, [response]);

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
        <H1 style={header}>BioSample Search</H1>
        <LoadingWrapper centered isLoading>
          <span />
        </LoadingWrapper>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      <H1 style={header}>BioSample Search</H1>
      <div>
        <PrimaryText>
          Drug resistance predictions as of the second version of the WHO mutation catalogue
          for public BioSample accessions can be searched. Research Use Only.
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
                  BioSample Accession
                </H3>
                <AutocompleteInputSearch
                  isLoading={isTableDataLoading}
                  onSelectionChanged={(e, value) => { console.log(e, value); }}
                  selectedValue={null}
                  onChange={handleSampleChange}
                  value={`${debouncedSampleValue}`}
                  options={[]}
                  style={viewStyles.sxAutoComplete}
                  placeholder="Search by BioSample Accession"
                />
              </div>
              <div css={buttonUploadWrapper}>
                <H3 style={viewStyles.autoCompleteInputLabel}>Export CSV Data</H3>
                <a 
                  href={`${window.location.origin}/static/media/GenotypeResistance.csv`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppButton
                    variant="outlined"
                    size="medium"
                    startIconName="file_download"
                  >
                    Download
                  </AppButton>
                </a>
                <CSVLink
                  ref={csvRef}
                  data={response.data || []}
                  filename="GenotypeResistanceSearch"
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
