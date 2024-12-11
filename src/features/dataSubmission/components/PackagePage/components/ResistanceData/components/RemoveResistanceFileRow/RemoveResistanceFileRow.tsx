/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import * as styles from './styles';
import OverflowMuiTooltip from '../../../../../../../../components/OverflowMuiTooltip';

interface Props {
  fileName: string;
  onRemoveClick: () => void;
  controlsDisabled: boolean;
}

export const RemoveResistanceFileRow = ({ fileName, onRemoveClick, controlsDisabled }: Props) => (
  <div css={styles.container}>
    <OverflowMuiTooltip tooltip={fileName} text={fileName} />

    {!controlsDisabled && (
    <IconButton
      disabled={controlsDisabled}
      data-testid="remove-btn"
      onClick={onRemoveClick}
    >
      <Close sx={styles.sxButtonStyles} />
    </IconButton>
    )}
  </div>
);

export default RemoveResistanceFileRow;
