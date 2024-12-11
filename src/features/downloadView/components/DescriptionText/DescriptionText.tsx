/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import PrimaryText from '../../../../components/typography/PrimaryText';

const mockText = `
        Please find available dataset for download in CSV format here.
`;

const DescriptionText = () => (
  <div css={styles.paragraph}>
    <PrimaryText style={styles.wrapper}>
      {mockText}
    </PrimaryText>
  </div>
);

export default DescriptionText;
