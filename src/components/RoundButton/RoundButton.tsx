/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { match } from 'ts-pattern';
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import * as styles from './styles';

export type IButtonSize = 'xlarge' | 'large' | 'normal' | 'small' | 'xsmall';
export type IButtonVariants = 'add' | 'remove';

interface Props {
  style?: SerializedStyles;
  size: IButtonSize;
  variant: IButtonVariants;
  disabled?: boolean;
  onClick?: () => void;
}

export const RoundButton = ({
  style, size, variant, disabled, onClick,
}: Props) => {
  const isDisabled = Boolean(disabled);

  const icon = match(variant)
    .with('add', () => <Add />)
    .with('remove', () => <Remove />)
    .exhaustive();

  const sizeStyle = match(size)
    .with('xlarge', () => styles.xlarge)
    .with('large', () => styles.large)
    .with('normal', () => styles.normal)
    .with('small', () => styles.small)
    .with('xsmall', () => styles.xsmall)
    .exhaustive();

  return (
    <IconButton
      onClick={onClick}
      disabled={isDisabled}
      css={[sizeStyle, style]}
    >
      {icon}
    </IconButton>
  );
};

export default RoundButton;
