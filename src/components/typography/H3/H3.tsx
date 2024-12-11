/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import BaseText from '../BaseText';

interface Props {
  children: ReactNode;
  style?: SerializedStyles;
}

export const H3 = ({ children, style }: Props) => {
  const injectedStyles = style || css({});

  return (
    <BaseText
      style={[styles.h3Styles, injectedStyles]}
    >
      {children}
    </BaseText>
  );
};

export default H3;
