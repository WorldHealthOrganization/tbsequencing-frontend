/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  IconButton,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import * as styles from './styles';

import PrimaryText from '../../../../../../../../components/typography/PrimaryText';

interface Props {
  title: string;
  totalItems: number;
  onExpandClick: () => void;
}

export const ResistanceDataSamplesHeaderRow = ({
  title, totalItems, onExpandClick,
}: Props) => (
  <div css={styles.summaryContainer}>
    <PrimaryText style={styles.titleText}>{title}</PrimaryText>
    <div css={styles.buttonContainer}>
      <PrimaryText style={styles.itemsCountText}>{`${totalItems} items`}</PrimaryText>
      <IconButton data-testid="expand-btn" onClick={onExpandClick}>
        <ArrowDropDown sx={styles.sxIcon} />
      </IconButton>
    </div>
  </div>

);

export default ResistanceDataSamplesHeaderRow;
