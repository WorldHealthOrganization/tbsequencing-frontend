/** @jsxImportSource @emotion/react */
import React from 'react';
import SubmissionPackageUserInfo from '../../../dataSubmission/components/PackagePage/components/SubmissionPackageUserInfo';
import * as styles from './styles';
import BasePage from '../../../../components/BasePage';

export const UserInfo = () => (
  <BasePage pageHeader="Profile">
    <div css={styles.container}>
      <SubmissionPackageUserInfo
        containerStyle={styles.userVerificationContainer}
      />
    </div>
  </BasePage>
);
export default UserInfo;
