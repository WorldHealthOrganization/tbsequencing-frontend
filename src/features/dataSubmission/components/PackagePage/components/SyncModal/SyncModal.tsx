/** @jsxImportSource @emotion/react */
import React from 'react';
import { LinearProgress } from '@mui/material';
import * as styles from './styles';
import BaseModal from '../../../../../../components/BaseModal';
import H2 from '../../../../../../components/typography/H2';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import { AppButton } from '../../../../../../components/AppButton/AppButton';

interface Props {
  syncFinished: boolean;
  closeModal: () => void;
  isOpen: boolean;
}

export const SyncModal = ({ syncFinished, closeModal, isOpen }: Props) => {
  const progressBar = syncFinished
    ? <LinearProgress sx={styles.progressBarSx} variant="determinate" value={100} />
    : <LinearProgress sx={styles.progressBarSx} />;

  const infoMsg = syncFinished ? 'Matching completed.' : 'The process may take a few minutes';

  return (
    <BaseModal open={isOpen}>
      <div>
        <H2>Matching sample labels</H2>
        <div css={styles.msgContainer}><PrimaryText>{infoMsg}</PrimaryText></div>
        <div css={styles.progressBarContainer}>{progressBar}</div>
        <div css={styles.buttonContainer}>
          <AppButton
            style={styles.btn}
            disabled={!syncFinished}
            variant="contained"
            size="large"
            onClick={closeModal}
          >
            Close
          </AppButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default SyncModal;
