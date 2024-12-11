/** @jsxImportSource @emotion/react */
import React, {
  useState, useEffect, useCallback, SyntheticEvent,
} from 'react';
import { Tabs, Tab } from '@mui/material';
import H1 from '../../../../components/typography/H1';
// import DescriptionText from '../DescriptionText/DescriptionText';
import DrugsDataset from '../DrugsDataset/DrugsDataset';
import MutationsCatalogue from '../MutationsCatalogue/MutationsCatalogue';
import { useGetDrugsDataQuery } from '../../../../services/drugsApi/drugsApi';
import { header, wrapper, sxTabsStyles } from './styles';
import * as styles from './styles';
import { IExtendedDrug } from '../../models';

interface DownloadViewProps {
  mockDate?: string;
}

const DownloadView = ({ mockDate }: DownloadViewProps) => {
  const [tabValue, setTabValue] = useState<number>(1);
  const [drugsList, setDrugsList] = useState<IExtendedDrug[] | []>([]);

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const handleChangeCheckbox = (touchedItem: IExtendedDrug, checked: boolean) => {
    const touchedDrug = {
      ...touchedItem, isChecked: !checked,
    };
    const nextDrugsList = drugsList.map((item) => ((touchedItem.drugId === item.drugId)
      ? touchedDrug : item));
    setDrugsList(nextDrugsList);
  };

  const handleCheckAll = (isSelect: boolean) => {
    const nextDrugsList = drugsList.map((item) => ({ ...item, isChecked: isSelect }));
    setDrugsList(nextDrugsList);
  };

  const {
    data: drugsData = [],
  } = useGetDrugsDataQuery({});

  useEffect(() => {
    if (drugsData.length) {
      setDrugsList(drugsData.map((item) => ({
        ...item,
        isChecked: false,
      })));
    }
  }, [drugsData]);

  return (
    <div css={wrapper}>
      <H1 style={header}>Data Download</H1>
      {/* <DescriptionText /> */}
      <div css={styles.tabsWrapper}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={sxTabsStyles}>
          <Tab label="WHO Mutations Catalogue 2023 version" value={1} sx={styles.sxTabStyles} />
          <Tab label="Drug resistance associated allelic counts" value={2} sx={styles.sxTabStyles} />
        </Tabs>
        <div css={styles.fakeBorderBottom} />
      </div>
      {tabValue === 2 && (
      <DrugsDataset
        drugsList={drugsList}
        handleChange={handleChangeCheckbox}
        handleCheckAll={handleCheckAll}
        mockDate={mockDate}
      />
      )}
      {tabValue === 1 && <MutationsCatalogue />}
    </div>
  );
};

export default DownloadView;
