/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { SerializedStyles } from '@emotion/react';
import { CSVLink } from 'react-csv';
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';
import { styles } from './styles';
import H3 from '../typography/H3';
import { AppButton } from '../AppButton/AppButton';
import { useExportTable } from '../../hooks/useExportTable';
import { useGetExportTableLazyQuery } from '../../services/drugsApi/drugsApi';
import { IDrug } from '../../services/drugsApi/models';
import { IGene } from '../../services/genesApi/models';
import { IColumnFilter, ISortState } from '../DataGrid/models';

interface Props {
  selectedDropdownItem: IGene | IDrug | {};
  columnFilters: IColumnFilter[];
  headers: LabelKeyObject[];
  sortState?: ISortState;
  addStyle?: SerializedStyles;
}

export const ExportButton = ({
  columnFilters,
  sortState,
  selectedDropdownItem,
  headers,
  addStyle,
}: Props) => {
  // react-scv lib doesn't have types for ref
  const csvRef = useRef<any>(null);

  const {
    response,
    fetchData,
  } = useExportTable(
    useGetExportTableLazyQuery,
    {
      drugID: 'drugId' in selectedDropdownItem ? selectedDropdownItem.drugId : undefined,
      geneDbCrossrefId: 'geneDbCrossrefId' in selectedDropdownItem
        ? selectedDropdownItem.geneDbCrossrefId
        : undefined,
      filters: columnFilters,
      sortState,
    },
  );

  useEffect(() => {
    if (csvRef?.current && response.data?.length && response.status === 'fulfilled') {
      csvRef.current.link.click();
    }
  }, [response]);

  const onExportClick = () => {
    fetchData();
  };

  return (
    <div css={[styles.exportContainer, addStyle]}>
      <H3>Export CSV Data</H3>
      <div css={styles.exportButton}>
        <AppButton
          onClick={onExportClick}
          variant="outlined"
          size="medium"
          startIconName="file_download"
          disabled={response.isLoading}
        >
          {response.isLoading ? 'Loading...' : 'Download'}
        </AppButton>
        <CSVLink
          ref={csvRef}
          data={response.data || []}
          headers={headers}
          filename={'drugName' in selectedDropdownItem
            ? selectedDropdownItem.drugName : (selectedDropdownItem as IGene).geneName as string}
        />
      </div>
    </div>
  );
};

export default ExportButton;
