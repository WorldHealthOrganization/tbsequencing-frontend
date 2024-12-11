/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useMsal } from '@azure/msal-react';
import * as styles from './styles';
import AppPaper from '../../../../../../components/AppPaper';
import H2 from '../../../../../../components/typography/H2';
import H3 from '../../../../../../components/typography/H3';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import AppButton from '../../../../../../components/AppButton';
import ChangePasswordModal from './components/ChangePasswordModal';

interface Props {
  containerStyle: SerializedStyles;
}

export const AccountDetails = ({ containerStyle }: Props) => {
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState<boolean>(false);

  const { accounts } = useMsal();

  if (!accounts[0]) {
    return null;
  }

  const handleChangePasswordClick = () => {
    setChangePasswordModalVisible(true);
  };

  const onCloseModal = () => {
    setChangePasswordModalVisible(false);
  };

  return (
    <AppPaper style={containerStyle}>
      <H2>Account Details</H2>
      <section css={styles.section}>
        <H3>Email</H3>
        <PrimaryText style={styles.sectionInfo}>{accounts[0].username}</PrimaryText>
      </section>
      <section css={styles.section}>
        <H3>Password</H3>
        <PrimaryText style={styles.sectionInfo}>************************************</PrimaryText>
      </section>
      <section css={styles.section}>
        <AppButton onClick={handleChangePasswordClick} variant="outlined" size="large">Change password</AppButton>
      </section>
      <ChangePasswordModal handleClose={onCloseModal} isOpened={changePasswordModalVisible} />
    </AppPaper>
  );
};

export default AccountDetails;
