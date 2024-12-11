/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import { AppButton } from '../../../../../../components/AppButton/AppButton';
import { useDrawerApi } from '../../../../../drawer/hooks/useDrawerApi';

interface Props {
  onCreateClick: () => void;
}

export const SubmissionPackageListHeader = ({ onCreateClick }: Props) => {
  const { setDrawerContent, openDrawer } = useDrawerApi();

  const onInstructionClick = () => {
    setDrawerContent('dataSubmissionInstruction');
    openDrawer();
  };

  const onTermsClick = () => {
    setDrawerContent('termsConditions');
    openDrawer();
  };

  return (
    <div css={styles.container}>
      <div>
        <AppButton
          style={styles.createButton}
          onClick={onCreateClick}
          variant="contained"
          size="large"
        >
          Create submission package
        </AppButton>
        <AppButton
          style={styles.termsButton}
          variant="text"
          size="large"
          onClick={onTermsClick}
        >
          Terms & Conditions
        </AppButton>
        <AppButton
          variant="text"
          size="large"
          onClick={onInstructionClick}
        >
          Instructions
        </AppButton>
      </div>
    </div>
  );
};

export default SubmissionPackageListHeader;
