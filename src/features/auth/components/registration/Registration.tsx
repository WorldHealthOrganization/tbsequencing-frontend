/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import DatabasePrinciplesInfo from '../../../../components/DatabasePriciplesInfo';
import BasePage from '../../../../components/BasePage';

export const Registration = () => (
  <BasePage pageHeader="Terms & Conditions">
    <div css={styles.containerStyles}>
      <DatabasePrinciplesInfo />
    </div>
  </BasePage>
);
