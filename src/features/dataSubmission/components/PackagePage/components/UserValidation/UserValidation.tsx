/** @jsxImportSource @emotion/react */
import React from 'react';
import { toast } from 'react-toastify';
import * as styles from './styles';
import AppPaper from '../../../../../../components/AppPaper';
import H2 from '../../../../../../components/typography/H2';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import { AppButton } from '../../../../../../components/AppButton/AppButton';
import ActivityIndicator from '../../../../../../components/ActivityIndicator';
import { useVerifyUserMutation } from '../../../../../../services/indentityApi/identityApi';

interface Props {
  validationInProgress: boolean;
  isLoading: boolean;
}

export const UserValidation = ({ validationInProgress, isLoading }: Props) => {
  const validationMsg = validationInProgress
    ? 'You are waiting for verification. If it takes too long, contact us'
    : 'Before you start, you need to be validated by our team, '
    + 'which may take a few days. Provided the information is accurate, '
    + 'use the “Validate” button. If not, first change the data.';

  const [verifyUser] = useVerifyUserMutation();

  const handleValidateMeClick = async () => {
    try {
      await verifyUser().unwrap();
    } catch (error) {
      toast.error('There was an error trying to validate user');
    }
  };

  if (isLoading) {
    return <ActivityIndicator centered />;
  }

  return (
    <AppPaper style={styles.paper}>
      <H2 style={styles.section}>User validation</H2>
      <PrimaryText style={styles.section}>{validationMsg}</PrimaryText>
      <AppButton
        disabled={validationInProgress}
        onClick={handleValidateMeClick}
        variant="contained"
        size="large"
      >
        Validate me
      </AppButton>
    </AppPaper>
  );
};

export default UserValidation;
