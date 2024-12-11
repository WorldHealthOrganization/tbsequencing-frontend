/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import H1 from '../typography/H1';
import { ReactComponent as FooterImage } from './assets/Frame.svg';

export const RegistrationResult = () => (
  <div css={styles.container}>
    <H1 style={styles.header}>
      To finalize your registration,
      please check your inbox and your spam folder
      after a few minutes to confirm your email address.
    </H1>
    <FooterImage width={1113} height={512} />
  </div>
);

export default RegistrationResult;
