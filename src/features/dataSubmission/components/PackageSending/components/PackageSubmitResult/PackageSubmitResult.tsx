/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import H2 from '../../../../../../components/typography/H2';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import BaseModal from '../../../../../../components/BaseModal';
import { AppButton } from '../../../../../../components/AppButton/AppButton';

interface Props {
  errorMsg?: string;
  open: boolean;
  onClose: () => void;
}

export const PackageSubmitResult = ({ errorMsg, open, onClose }: Props) => {
  const msg = errorMsg || 'Package has been sent for review. You will be notified '
    + 'after any package status update.';
  const errorStyle = errorMsg ? styles.errorStyle : undefined;

  return (
    <BaseModal open={open}>
      <>
        <H2>Package sent</H2>
        <PrimaryText style={[styles.msg, errorStyle]}>
          {msg}
        </PrimaryText>
        <div css={styles.btnContainer}>
          <AppButton onClick={onClose} variant="contained" size="large">Okay</AppButton>
        </div>
      </>
    </BaseModal>
  );
};

export default PackageSubmitResult;
