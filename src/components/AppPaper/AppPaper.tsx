/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';

interface Props {
  children: ReactNode;
  style?: SerializedStyles;
}

export const AppPaper = ({ children, style }: Props) => (
  <div css={[styles.container, style]}>
    {children}
  </div>
);

export default AppPaper;
