/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { useMsal } from '@azure/msal-react';
import * as styles from './styles';
import AppPaper from '../../../../../../components/AppPaper';
import H2 from '../../../../../../components/typography/H2';
import H3 from '../../../../../../components/typography/H3';
import PrimaryText from '../../../../../../components/typography/PrimaryText';

interface Props {
  containerStyle?: SerializedStyles;
}

export const SubmissionPackageUserInfo = ({
  containerStyle,
}:
Props) => {
  const { accounts } = useMsal();

  if (!accounts[0]) {
    return null;
  }

  return (
    <AppPaper style={containerStyle}>
      <div css={styles.headerWrapper}>
        <H2>General info</H2>
      </div>
      <section css={styles.section}>
        <PrimaryText style={styles.sectionInfo}>{accounts[0].name}</PrimaryText>
      </section>
      {accounts[0].idTokenClaims?.email !== undefined && (
        <section css={styles.section}>
          <H3>Email</H3>
          <PrimaryText style={styles.sectionInfo}>
            {accounts[0].idTokenClaims?.email as string}
          </PrimaryText>
        </section>
      )}
    </AppPaper>
  );
};

export default SubmissionPackageUserInfo;
