/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import * as styles from './styles';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import { useDrawerApi } from '../../../../../drawer/hooks/useDrawerApi';
import H1 from '../../../../../../components/typography/H1';
import { AppButton } from '../../../../../../components/AppButton/AppButton';
import { TEMPLATE_ARCHIVE_NAME, templateUrl } from '../../../../../../utils/templateFiles';
import { downloadFileViaAnchor } from '../../../../../../utils/fileDownload';

const instructions: string[] = [
  `To provide your MIC values or binary resistant/susceptible calls, please download 
  and use the template below.`,
  `Data for binary resistant/susceptible calls and MIC values will be read
  from the excel sheet named "PDST" and "MIC", respectively.`,
  `If you provided sample identification labels from the INSDC BioSample 
  database, they will be automatically linked to the publicly 
  available sequencing data.`,
  `Otherwise, you will need to upload the sequencing data via the provided
  interface.`,
];

export const DataSubmissionInstructions = () => {
  const { closeDrawer } = useDrawerApi();

  const onDownloadTemplateClick = () => {
    downloadFileViaAnchor(templateUrl, TEMPLATE_ARCHIVE_NAME);
  };

  return (
    <div css={styles.container}>
      <div css={styles.closeIconWrapper}>
        <IconButton onClick={closeDrawer}><Close sx={styles.closeIconSx} /></IconButton>
      </div>
      <H1 style={styles.header}>Instructions</H1>
      <div css={styles.info}>
        {instructions.map((
          paragraph,
        ) => <PrimaryText key={paragraph} style={styles.paragraph}>{paragraph}</PrimaryText>)}
      </div>
      <AppButton
        style={styles.downloadBtn}
        onClick={onDownloadTemplateClick}
        startIconName="file_download_icon"
        variant="outlined"
        size="medium"
      >
        Download Template
      </AppButton>
    </div>
  );
};

export default DataSubmissionInstructions;
