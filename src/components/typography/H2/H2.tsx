/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import BaseText from '../BaseText';

interface Props {
  children: ReactNode;
  style?: SerializedStyles;
}

export const H2 = ({ children, style }: Props) => {
  const injectedStyles = style || css({});

  return (
    <BaseText
      style={[styles.h2Styles, injectedStyles]}
    >
      {children}
    </BaseText>
  );
};

export default H2;
