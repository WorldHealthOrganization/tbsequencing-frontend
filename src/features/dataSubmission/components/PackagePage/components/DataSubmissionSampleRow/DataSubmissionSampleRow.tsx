/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';
import {
  CircularProgress, IconButton, Popover, Typography,
} from '@mui/material';
import {
  Done, DangerousOutlined, Close, FileDownload,
} from '@mui/icons-material';
import { match } from 'ts-pattern';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import PrimaryText from '../../../../../../components/typography/PrimaryText';

interface Props {
  isError?: boolean;
  isWarning?: boolean;
  title: string;
  description?: string;
  isLoading?: boolean;
  onRemoveClick?: () => void;
  onDownloadClick?: () => void;
  containerStyle?: SerializedStyles;
  controlDisabled: boolean;
  isSomethingInSequencingDataLoading?: boolean;
  isUloadingFile?: boolean;
  isProcessingFile?: boolean;
  dataLocation?: string;
}

interface IMatchIcon {
  error: boolean;
  loading: boolean;
  warning: boolean;
  isUloadingFile?: boolean;
  isProcessingFile?: boolean;
}

type MatchDescriptionStyle = Omit<IMatchIcon, 'loading'>;

export const DataSubmissionSampleRow = ({
  isError, isLoading, onDownloadClick, onRemoveClick,
  description, title, containerStyle, controlDisabled,
  isWarning, isSomethingInSequencingDataLoading, isUloadingFile, isProcessingFile, dataLocation,
}: Props) => {
  const errorStyles = isError && styles.error;
  const error = Boolean(isError);
  const loading = Boolean(isLoading);
  const warning = Boolean(isWarning);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const icon = match<IMatchIcon, ReactElement>({
    error, loading, warning, isUloadingFile, isProcessingFile,
  })
    .with({ isUloadingFile: false, isProcessingFile: true }, () => <CircularProgress size={14} />)
    .with({
      error: false, loading: false, warning: false, isUloadingFile: false, isProcessingFile: false,
    }, () => <Done sx={styles.sxIconDone} />)
    .with({ error: true, loading: false }, () => <DangerousOutlined sx={styles.sxIconDangerous} />)
    .with({ error: false, isUloadingFile: true }, () => <CircularProgress size={14} />)
    .with({
      error: false,
      loading: false,
      warning: true,
    }, () => <Done sx={styles.sxIconDoneWarning} />)
    .otherwise(() => <Done sx={styles.sxIconDone} />);

  const descriptionStyle = match<MatchDescriptionStyle, SerializedStyles>({ error, warning })
    .with({ warning: true, error: false }, () => styles.warningText)
    .with({ warning: false, error: true }, () => styles.errorText)
    .otherwise(() => styles.regularText);

  const actionsDisabled = isLoading || controlDisabled || isSomethingInSequencingDataLoading;

  const shouldRenderDownloadButton = Boolean(onDownloadClick) && dataLocation !== 'NCBI';
  const shouldRenderDisabledDownloadButton = Boolean(onDownloadClick) && dataLocation === 'NCBI';

  const shouldRenderRemoveButton = Boolean(onRemoveClick)
  && !controlDisabled
  && !isUloadingFile
  && !isProcessingFile;

  const handleClickHint = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHint = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'upload-popover' : undefined;

  return (
    <div css={[styles.container, errorStyles, containerStyle]}>
      <div css={styles.info}>
        {icon}
        <div css={styles.infoContainer}>
          <div><PrimaryText>{title}</PrimaryText></div>
          {description
          && <div><PrimaryText style={descriptionStyle}>{description}</PrimaryText></div>}
        </div>
        <div css={styles.actionsContainer}>
          {shouldRenderDownloadButton && (
          <IconButton
            data-testid="download-btn"
            onClick={onDownloadClick}
          >
            <FileDownload sx={styles.sxIconDone} />
          </IconButton>
          )}
          {shouldRenderDisabledDownloadButton && (
          <IconButton
            data-testid="disabled-download-btn"
            aria-label="toggle download info"
            aria-describedby={id}
            onClick={handleClickHint}
          >
            <FileDownload sx={styles.iconDisabledDowload} />
          </IconButton>
          )}
          <Popover
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseHint}
          >
            <Typography sx={{ p: 2 }}>
              The file has been discarded in favor of NCBI SRA record found
            </Typography>
          </Popover>
          {shouldRenderRemoveButton && (
          <IconButton
            disabled={actionsDisabled}
            data-testid="remove-btn"
            onClick={onRemoveClick}
          >
            <Close sx={styles.sxIconDone} />
          </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSubmissionSampleRow;
