/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';
import AppButton from '../../../../components/AppButton';
import {
  wrapper, box, header, content, main, mainTop, list, asLink, asLinkFirst, control, csvLink,
} from './styles';
import { useExportTable } from '../../../../hooks/useExportTable';
import { IExtendedDrug } from '../../models';

interface DrugsDatasetProps {
  drugsList: IExtendedDrug[] | [];
  handleChange: (touchedItem: IExtendedDrug, checked: boolean) => void;
  handleCheckAll: (isSelect: boolean) => void;
  mockDate?: string;
}

const DrugsDataset = ({
  drugsList, handleChange, handleCheckAll, mockDate,
}: DrugsDatasetProps) => {
  // react-scv lib doesn't have types for ref
  const csvRef = useRef<any>(null);

  const getDrugIds = () => {
    let drugsIds = '';
    drugsList.forEach((drugItem) => {
      if (drugItem.isChecked) {
        drugsIds += `,${drugItem.drugId}`;
      }
    });
    return drugsIds.substring(1);
  };

  const {
    response,
    fetchData,
  } = useExportTable(
    {
      drugID: getDrugIds(),
      filters: [],
    },
  );

  useEffect(() => {
    if (csvRef?.current && response.data?.length && response.status === 'fulfilled') {
      csvRef.current.link.click();
    }
  }, [response]);

  useEffect(() => {
    if (response.data?.length === 0) {
      toast.info('There is no Dataset');
    }
  }, [response.data]);

  const getCSVFileName = () => {
    // use only in snapshot
    if (mockDate) return `tbkb-dataset-${mockDate}`;

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `tbkb-dataset-${year}-${month}-${day}`;
  };

  return (
    <div css={wrapper}>
      <div css={box}>
        <H3 style={header}>Download data</H3>
        <div css={content}>
          <PrimaryText>
            Please find below for each drug the updated allele counts and frequencies for related
            genes. The counts will reflect the current state of the database as new samples are
            added, and will be identical to those shown in the different interactive views of
            TBKB.
          </PrimaryText>
          <CSVLink
            css={csvLink}
            ref={csvRef}
            data={response.data || []}
            filename={getCSVFileName()}
          />
          <AppButton
            onClick={fetchData}
            variant="contained"
            size="medium"
            startIconName="file_download"
            disabled={response.isLoading || !drugsList.length}
          >
            {response.isLoading ? 'Loading...' : 'Download Dataset'}
          </AppButton>
        </div>
      </div>

      <div css={main}>
        <div css={mainTop}>
          <H3>Drugs</H3>
          <span css={[asLink, asLinkFirst]} onClick={() => handleCheckAll(true)} role="none">
            Select All
          </span>
          <span css={asLink} onClick={() => handleCheckAll(false)} role="none">
            Unselect All
          </span>
        </div>

        <div css={list}>
          {drugsList.map((drugItem) => (
            <FormControlLabel
              key={drugItem.drugId}
              value="end"
              control={(
                <Checkbox
                  onChange={() => handleChange(drugItem, drugItem.isChecked)}
                  checked={drugItem.isChecked}
                  css={control}
                  disabled={response.isLoading}
                />
              )}
              label={drugItem.drugName}
              labelPlacement="end"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DrugsDataset;
