/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent, memo, useMemo, useRef,
} from 'react';
import { match } from 'ts-pattern';
import * as styles from './styles';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import AppButton from '../../../../../../components/AppButton';
import AppPaper from '../../../../../../components/AppPaper';
import { ISequencingFile, VerdictLevel } from '../../../../../../services/submissionApi/models';
import DataSubmissionSampleRow from '../DataSubmissionSampleRow';
import H3 from '../../../../../../components/typography/H3';
import { formatBytes } from '../../utils/formatFileSize';

interface Props {
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  sequencingDataFiles?: ISequencingFile[];
  controlsDisabled: boolean;
  isSomethingInSequencingDataLoading: boolean;
}

type DescriptionMatch = {
  isError: boolean,
  verdictLevel: VerdictLevel | undefined,
  isUloadingFile: boolean,
  isProcessingFile: boolean,
};

export const SequencingData = ({
  onFileInputChange, sequencingDataFiles, controlsDisabled, isSomethingInSequencingDataLoading,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const handleBrowseClick = () => {
    inputRef.current.value = '';
    inputRef.current.click();
  };

  const sortedData = useMemo(() => {
    if (!sequencingDataFiles) {
      return [];
    }

    return [...sequencingDataFiles].sort(
      (_a, _b) => {
        if (_a.filename < _b.filename) return -1;
        if (_a.filename > _b.filename) return 1;

        return 0;
      },
    );
  }, [sequencingDataFiles]);

  return (
    <AppPaper style={styles.paper}>
      <div css={styles.browseContainer}>
        <H3>Sequencing Data</H3>
        <div css={styles.descriptionContainer}>
          <PrimaryText style={styles.sectionHeader}>only *fastq.gz files allowed</PrimaryText>
          <AppButton 
            disabled={controlsDisabled} 
            onClick={handleBrowseClick} 
            size="large" 
            variant="contained"
          >
            Browse Files
          </AppButton>
        </div>
      </div>
      <input
        css={styles.fileInput}
        accept=".gz"
        onChange={onFileInputChange}
        ref={inputRef}
        type="file"
        data-testid="fileInput"
        multiple
      />
      {sortedData.map(({
        filename, isError, isLoading, onRemoveClick, onDownloadClick,
        sequencingData, errorMsg, verdicts, uploadedSize,
        isUloadingFile, isProcessingFile,
      }) => {
        const verdict = verdicts[0];
        const verdictLevel = verdict ? verdict.level : undefined;
        const verdictMessage = verdict ? verdict.verdict : undefined;
        const formattedFileSize = formatBytes(sequencingData.fileSize);
        const formattedSizeUploaded = formatBytes(uploadedSize);
        const { dataLocation } = sequencingData;

        const description = match<DescriptionMatch, string>(
          {
            isError, verdictLevel, isUloadingFile, isProcessingFile,
          },
        )
          .with({ isUloadingFile: true }, () => `${formattedSizeUploaded}/ ${formattedFileSize}`)
          .with({ isUloadingFile: false, isProcessingFile: true }, () => 'Server update process')
          .with({ isError: true, verdictLevel: undefined }, () => errorMsg as string)
          .with({ verdictLevel: 'warning' }, () => verdictMessage as string)
          .with({ verdictLevel: 'info' }, () => formattedFileSize)
          .with({ verdictLevel: 'error' }, () => formattedFileSize)
          .otherwise(() => formattedFileSize);

        const isWarning = verdictLevel === 'warning';

        return (
          <DataSubmissionSampleRow
            isSomethingInSequencingDataLoading={isSomethingInSequencingDataLoading}
            isWarning={isWarning}
            controlDisabled={controlsDisabled}
            key={filename}
            containerStyle={styles.sampleRow}
            isLoading={isLoading}
            isError={isError}
            description={description}
            title={filename}
            onRemoveClick={onRemoveClick}
            onDownloadClick={onDownloadClick}
            isUloadingFile={isUloadingFile}
            isProcessingFile={isProcessingFile}
            dataLocation={dataLocation}
          />
        );
      })}
    </AppPaper>
  );
};

export default memo(SequencingData);
