/** @jsxImportSource @emotion/react */
import React, { ReactNode, MouseEvent } from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';

interface Props {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: SerializedStyles;
  disabled?: boolean;
}

export const TextButton = ({
  children, onClick, style, disabled = false,
}: Props) => {
  const disabledStyle = disabled ? styles.disabled : undefined;

  return (
    <button
      disabled={disabled}
      css={[styles.button, style]}
      type="button"
      onClick={onClick}
    >
      <PrimaryText style={[styles.label, disabledStyle]}>{children}</PrimaryText>
    </button>
  );
};

export default TextButton;
