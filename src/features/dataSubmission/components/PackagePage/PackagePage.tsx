/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent, useCallback, useRef, useState, SyntheticEvent,
} from 'react';
import { match } from 'ts-pattern';
import * as styles from './styles';
import PackagePageHeader from './components/PackagePageHeader';
import ResistanceData from './components/ResistanceData';
import ResistanceDataControls from './components/ResistanceData/components/ResistanceDataControls';
import { RemoveTestsFileType, ResistanceSampleType } from '../../../../services/submissionApi/models';
import {
  useGetPackageWithSamplesQuery, useMatchPackageMutation,
  useRemoveFileFromPackageMutation,
  useUploadFileMutation,
} from '../../../../services/submissionApi';
import SequencingData from './components/SequencingData';
import { useManageSequencingData } from './hooks/useManageSequencingData';
import SyncModal from './components/SyncModal';
import { usePackageId } from './hooks/usePackageId';
import { useDrawerApi } from '../../../drawer/hooks/useDrawerApi';
import BasePage from '../../../../components/BasePage';
import { getBreadcrumbsConfig } from './utils/getBreadcrumbsConfig';
import { IHttpError } from '../../../../models/HttpError';
import { pluralize } from '../../../../utils/pluralize';

type SyncState = 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';

export interface ITab {
  value: ResistanceSampleType;
  label: string
}

export interface FileErrorState {
  MIC?: boolean;
  PDST?: boolean;
}

const getTabsConfig = (micSamplesCount: number, pdsSamplesCount: number):ITab[] => {
  const micBaseLabel = 'MIC values';
  const pdsBaseLabel = 'Binary R/S values';

  const micLabel = !micSamplesCount ? micBaseLabel : `${micBaseLabel} (${pluralize(micSamplesCount, 'sample')})`;
  const pdsLabel = !pdsSamplesCount ? pdsBaseLabel : `${pdsBaseLabel} (${pluralize(pdsSamplesCount, 'sample')})`;

  return [
    { value: 'PDST', label: pdsLabel },
    { value: 'MIC', label: micLabel },
  ];
};

export const PackagePage = () => {
  const [activeTab, setActiveTab] = useState<ResistanceSampleType>('PDST');
  const [syncState, setSyncState] = useState<SyncState>('NOT_STARTED');
  const resistanceFileNameRef = useRef<string>('Resistance file');
  const [fileUploadErrorState, setFileUploadErrorState] = useState<FileErrorState>(
    { MIC: false, PDST: false },
  );

  const packageId = usePackageId();

  const { toggleDrawer, setDrawerContent } = useDrawerApi();

  const {
    data: packageData, isLoading: isPackageLoading,
  } = useGetPackageWithSamplesQuery({ packageId }, { refetchOnMountOrArgChange: true });

  const [runMatch] = useMatchPackageMutation();

  const [uploadResistanceFile, {
    isLoading: isResistanceFileUploadLoading,
    error: uploadResistanceFileError,
  }] = useUploadFileMutation();

  const isLoading = isPackageLoading || isResistanceFileUploadLoading;

  const isTabFileUploadError = match<ResistanceSampleType, boolean>(activeTab)
    .with('MIC', () => Boolean(fileUploadErrorState.MIC))
    .with('PDST', () => Boolean(fileUploadErrorState.PDST))
    .exhaustive();

  const handleRemoveErrorClick = () => {
    setFileUploadErrorState(((prevState) => ({ ...prevState, [activeTab]: false })));
  };

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: ResistanceSampleType) => {
    setActiveTab(newValue);
  }, []);

  const
    handleResistanceFileInputChange = useCallback(async (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const type = match<ResistanceSampleType, string>(activeTab)
        .with('PDST', () => 'pds-tests')
        .with('MIC', () => 'mic-tests')
        .exhaustive();

      if (!event.currentTarget.files) {
        return;
      }

      const selectedFile = event?.currentTarget?.files[0];

      resistanceFileNameRef.current = selectedFile.name;

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);
      formData.append('pk', `${packageId}`);

      try {
        setFileUploadErrorState((prevState) => ({ ...prevState, [activeTab]: false }));
        await uploadResistanceFile(formData).unwrap();
      } catch (error) {
        setFileUploadErrorState((prevState) => ({ ...prevState, [activeTab]: true }));
      }
    }, [activeTab, packageId, uploadResistanceFile]);

  const [removeResistanceTests,
    { isLoading: isRemoveResistanceTestsLoading },
  ] = useRemoveFileFromPackageMutation();

  const handleRemoveResistanceFileClick = () => {
    const type = match<ResistanceSampleType, RemoveTestsFileType>(activeTab)
      .with('PDST', () => 'pds')
      .with('MIC', () => 'mic')
      .exhaustive();

    removeResistanceTests({
      type,
      packageId,
    });
  };

  const handleSyncClick = async () => {
    setSyncState('IN_PROGRESS');

    try {
      await runMatch({
        packageName: packageData ? packageData.name : '',
        packageId,
      });

      setSyncState('FINISHED');
    } catch (error) {
      setSyncState('FINISHED');
    }
  };

  const handleSyncModalCloseClick = () => {
    setSyncState('NOT_STARTED');
  };

  const isSyncFinished = syncState === 'FINISHED';
  const isSyncModalOpened = syncState === 'IN_PROGRESS' || syncState === 'FINISHED';
  const getDrugsPartialLabel = (drugsCount: number) => pluralize(drugsCount, 'drug');
  const getConcentrationPartialLabel = (drugsConcentration: number) => pluralize(drugsConcentration, 'concentration');

  const handleChatClick = () => {
    setDrawerContent<{ packageId: number }>('chat', { packageId });
    toggleDrawer();
  };

  const {
    sequencingDataState,
    handleSequencingFileInputChange,
    getNonErrorSequencingFiles,
    isSomethingInSequencingDataLoading,
  } = useManageSequencingData({ packageId });

  const isFilesCurrentlyManaging = isSomethingInSequencingDataLoading
    || isPackageLoading
    || isRemoveResistanceTestsLoading
    || isResistanceFileUploadLoading;

  if (!packageData) {
    return null;
  }

  const getDrugListLabel = (drugsList: string[]) => drugsList.join(',');

  const getResistanceFileLabel = () => {
    const drugsCount = activeTab === 'MIC' ? packageData.micDrugsCount : packageData.pdsDrugsCount;
    const pdsDrugsConcentration = packageData.pdsDrugConcentrationCount;

    const resistanceFileName = match<ResistanceSampleType, string | undefined>(activeTab)
      .with('MIC', () => (packageData?.attachments.find((item) => item.type === 'MIC')?.originalFilename))
      .with('PDST', () => (packageData?.attachments.find((item) => item.type === 'PDS')?.originalFilename))
      .exhaustive();

    const drugsListLabel = activeTab === 'MIC' ? getDrugListLabel(packageData.micDrugs) : getDrugListLabel(packageData.pdsDrugs);

    const resistanceFileLabel = match<ResistanceSampleType, string>(activeTab)
      .with('PDST', () => `${resistanceFileName} (${getDrugsPartialLabel(drugsCount)} / ${getConcentrationPartialLabel(pdsDrugsConcentration)}: ${drugsListLabel})`)
      .with('MIC', () => `${resistanceFileName} (${getDrugsPartialLabel(drugsCount)}: ${drugsListLabel})`)
      .exhaustive();

    return resistanceFileLabel;
  };

  const breadcrumbsConfig = getBreadcrumbsConfig(packageId, packageData.name);

  const samplesByActiveTab = activeTab === 'PDST' ? packageData.pdsSamples : packageData.micSamples;
  const controlsDisabled = packageData.state === 'ACCEPTED' || packageData.state === 'PENDING';
  const syncAllowed = packageData.matchingState !== 'MATCHED';
  const controlsVisible = samplesByActiveTab.length === 0;
  const chatDisabled = packageData.state === 'ACCEPTED';

  const isSubmitAllowed = (packageData.matchingState === 'MATCHED')
    && (packageData.pdsSamples.length > 0
      || packageData.micSamples.length > 0
      || getNonErrorSequencingFiles().length > 0);

  const resistanceFileLabel = getResistanceFileLabel();
  const tabs = getTabsConfig(packageData.micSamples.length, packageData.pdsSamples.length);

  return (
    <BasePage
      breadcrumbsConfig={breadcrumbsConfig}
    >
      <PackagePageHeader
        isFilesCurrentlyManaging={isFilesCurrentlyManaging}
        chatDisabled={chatDisabled}
        description={packageData.description}
        syncAllowed={syncAllowed}
        controlsDisabled={controlsDisabled}
        isSubmitAllowed={isSubmitAllowed}
        packageState={packageData.state}
        onSyncClick={handleSyncClick}
        onChatClick={handleChatClick}
        packageId={packageId}
        name={packageData.name}
      />
      <div css={styles.dataWrapper}>
        <ResistanceData
          fileError={uploadResistanceFileError as IHttpError}
          resistanceFileLabel={resistanceFileLabel}
          packageId={packageId}
          controlsDisabled={controlsDisabled}
          isLoading={isLoading}
          onRemoveErrorClick={handleRemoveErrorClick}
          isTabFileUploadError={isTabFileUploadError}
          errorFileName={resistanceFileNameRef.current}
          onRemoveFileClick={handleRemoveResistanceFileClick}
          samplesData={samplesByActiveTab}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          tabs={tabs}
        />
        <SequencingData
          isSomethingInSequencingDataLoading={isSomethingInSequencingDataLoading}
          controlsDisabled={controlsDisabled}
          sequencingDataFiles={sequencingDataState}
          onFileInputChange={handleSequencingFileInputChange}
        />
      </div>
      { controlsVisible && !controlsDisabled
        && (
        <ResistanceDataControls
          onFileInputChange={handleResistanceFileInputChange}
        />
        )}
      <SyncModal
        closeModal={handleSyncModalCloseClick}
        syncFinished={isSyncFinished}
        isOpen={isSyncModalOpened}
      />
    </BasePage>
  );
};

export default PackagePage;
