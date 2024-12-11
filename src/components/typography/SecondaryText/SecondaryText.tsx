/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import BaseText from '../BaseText';

interface Props {
  children: ReactNode;
  style?: SerializedStyles;
}

export const SecondaryText = ({ children, style }: Props) => {
  const injectedStyles = style || css({});

  return (
    <BaseText
      style={[styles.secondaryTextStyles, injectedStyles]}
    >
      {children}
    </BaseText>
  );
};

export default SecondaryText;
