/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Tab, Tabs, Alert,
} from '@mui/material';
import * as styles from './styles';
import type { ITab } from '../../PackagePage';
import {
  ResistanceSampleType,
  GetSamplesByFileIdResponse,
} from '../../../../../../services/submissionApi/models';
import RemoveResistanceFileRow from './components/RemoveResistanceFileRow';
import DataSubmissionSampleRow from '../DataSubmissionSampleRow';
import ResistanceDataTable from './components/ResistanceDataTable';
import ActivityIndicator from '../../../../../../components/ActivityIndicator';
import H3 from '../../../../../../components/typography/H3';
import { getResistanceSamplesDataByValidity, getUnprocessedResistanceSamples } from './utils/dataUtils';
import { IHttpError } from '../../../../../../models/HttpError';

interface Props {
  activeTab: ResistanceSampleType
  tabs: ITab[];
  handleTabChange: (event: React.SyntheticEvent, newValue: ResistanceSampleType) => void;
  samplesData: GetSamplesByFileIdResponse;
  onRemoveFileClick: () => void;
  onRemoveErrorClick: () => void;
  isTabFileUploadError: boolean;
  errorFileName: string;
  isLoading: boolean;
  controlsDisabled: boolean;
  packageId: number;
  resistanceFileLabel: string;
  fileError: IHttpError;
  notUsedColumns: string[]
}

export const ResistanceData = ({
  tabs, activeTab, handleTabChange, samplesData, isLoading,
  onRemoveFileClick, isTabFileUploadError, errorFileName,
  onRemoveErrorClick, controlsDisabled, packageId,
  resistanceFileLabel, fileError, notUsedColumns,
}: Props) => {
  const renderSamplesContent = () => {
    if (isLoading) {
      return <ActivityIndicator size={20} centered />;
    }

    const validSamples = getResistanceSamplesDataByValidity(samplesData, true);
    const invalidSamples = getResistanceSamplesDataByValidity(samplesData, false);
    const unprocessedSamples = getUnprocessedResistanceSamples(samplesData);
    const shouldRenderValidTable = validSamples.length > 0;
    const shouldRenderInvalidTable = invalidSamples.length > 0;
    const shouldRenderUnprocessedTable = unprocessedSamples.length > 0;
    const shouldRenderFileLink = samplesData.length > 0;
    const errorMsg = fileError?.data?.errors[0].detail;

    return (
      <>
        {isTabFileUploadError && (
          <DataSubmissionSampleRow
            controlDisabled={controlsDisabled}
            title={errorFileName}
            isError={isTabFileUploadError}
            onRemoveClick={onRemoveErrorClick}
            description={errorMsg}
          />

        )}
        <>
          {shouldRenderFileLink && (
            <RemoveResistanceFileRow
              controlsDisabled={controlsDisabled}
              onRemoveClick={onRemoveFileClick}
              fileName={resistanceFileLabel}
            />
          )}
          {notUsedColumns?.length > 0 && (
            <Alert variant="filled" severity="warning">
              The following columns are not used:
              &nbsp;
              {notUsedColumns.join(', ')}
            </Alert>
          )}
          {shouldRenderUnprocessedTable && (
            <ResistanceDataTable
              activeTab={activeTab}
              controlsDisabled={controlsDisabled}
              packageId={packageId}
              samplesData={unprocessedSamples}
              title="Unprocessed"
            />
          ) }
          {shouldRenderInvalidTable && (
            <ResistanceDataTable
              activeTab={activeTab}
              controlsDisabled={controlsDisabled}
              packageId={packageId}
              samplesData={invalidSamples}
              title="Have Issues"
            />
          )}
          {shouldRenderValidTable && (
            <ResistanceDataTable
              activeTab={activeTab}
              controlsDisabled={controlsDisabled}
              packageId={packageId}
              samplesData={validSamples}
              title="Successfully Processed"
            />
          )}
        </>
      </>
    );
  };

  return (
    <div css={styles.container}>
      <H3 style={styles.header}>Resistance Data</H3>
      <div css={styles.tabsWrapper}>
        <Tabs
          sx={styles.sxTabsStyles}
          variant="fullWidth"
          value={activeTab}
          onChange={handleTabChange}
        >
          {tabs.map((tab) => (
            <Tab {...tab} key={tab.value} sx={styles.sxTabStyles} />
          ))}
        </Tabs>
        <div css={styles.fakeBorderBottom} />
      </div>
      <div css={styles.samplesContent}>
        {renderSamplesContent()}
      </div>
    </div>
  );
};

export default ResistanceData;
