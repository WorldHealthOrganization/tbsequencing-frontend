/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import BaseText from '../BaseText';

type InjectedStyle = SerializedStyles | Array<SerializedStyles | undefined>;

interface Props {
  children: ReactNode;
  style?: InjectedStyle;
}

export const getInjectedStyles = (
  injectedStyle: InjectedStyle | undefined,
  baseStyle: SerializedStyles,
) => {
  if (!injectedStyle) {
    return [baseStyle];
  }

  if (Array.isArray(injectedStyle)) {
    return [baseStyle, ...injectedStyle];
  }

  return [baseStyle, injectedStyle];
};

export const PrimaryText = ({ children, style }: Props) => (
  <BaseText
    style={getInjectedStyles(style, styles.primaryTextStyles)}
  >
    {children}
  </BaseText>
);

export default PrimaryText;
