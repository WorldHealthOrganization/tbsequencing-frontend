/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import * as styles from './styles';
import SecondaryText from '../typography/SecondaryText';

const SwitchLabel = (): ReactElement => (
  <div css={styles.container}>
    <SecondaryText>Read and agree with service </SecondaryText>
    <a css={styles.termsLink} target="_blank" href="/terms-of-use"> Terms and Conditions</a>
  </div>
);

export default SwitchLabel;
