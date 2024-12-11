/** @jsxImportSource @emotion/react */
import React, { ReactNode, memo } from 'react';
import { match } from 'ts-pattern';
import { Button, Icon, SxProps } from '@mui/material';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';

type ButtonType = 'button' | 'submit';

export interface IButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: IButtonVariant;
  size: IButtonSize;
  disabled?: boolean;
  startIconName?: string;
  endIconName?: string;
  underlined?: boolean;
  style?: SerializedStyles;
  type?: ButtonType;
  injectedLabelStyle?: SerializedStyles;
}

type IButtonVariant = 'text' | 'contained' | 'outlined' | 'containedRound';
type IButtonSize = 'small' | 'medium' | 'large';

export const AppButton = ({
  onClick, variant, size, children, disabled, startIconName, endIconName, underlined, style, type,
  injectedLabelStyle,
}: IButtonProps) => {
  const isDisabled = Boolean(disabled);

  const btnVariant = match<IButtonVariant, 'text' | 'contained' | 'outlined'>(variant)
    .with('text', () => 'text')
    .with('contained', () => 'contained')
    .with('outlined', () => 'outlined')
    .with('containedRound', () => 'contained')
    .exhaustive();

  const hoverSxStyle = match<IButtonVariant, SxProps>(variant)
    .with('text', () => styles.textButtonHoverStyle)
    .with('outlined', () => styles.outlinedButtonHoverStyle)
    .otherwise(() => styles.containedButtonHoverStyle);

  const sizeStyle = match<IButtonSize, SerializedStyles>(size)
    .with('small', () => styles.smallStyle)
    .with('medium', () => styles.mediumStyle)
    .with('large', () => styles.largeStyle)
    .exhaustive();

  const textTransformStyle = match<IButtonVariant, SerializedStyles>(variant)
    .with('text', () => styles.noTextTransformStyle)
    .with('outlined', () => styles.noTextTransformStyle)
    .with('contained', () => styles.noTextTransformStyle)
    .otherwise(() => styles.uppercaseStyle);

  const labelStyle = match([isDisabled, variant])
    .with([false, 'contained'], () => styles.containedColorStyle)
    .with([false, 'containedRound'], () => styles.containedColorStyle)
    .with([false, 'text'], () => styles.outlinedColorStyle)
    .with([false, 'outlined'], () => styles.outlinedColorStyle)
    .with([true], () => styles.disabledColorStyle)
    .otherwise(() => styles.outlinedColorStyle);

  const borderRadiusStyle = variant === 'containedRound' ? styles.roundBorderRadiusStyle : undefined;
  const textDecorationStyle = underlined ? styles.textDecoration : undefined;

  const startIcon = startIconName ? <Icon>{startIconName}</Icon> : undefined;
  const endIcon = endIconName ? <Icon>{endIconName}</Icon> : undefined;

  return (
    <Button
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={isDisabled}
      css={[
        sizeStyle,
        textTransformStyle,
        labelStyle,
        borderRadiusStyle,
        textDecorationStyle,
        style,
      ]}
      sx={hoverSxStyle}
      onClick={onClick}
      variant={btnVariant}
      disableElevation
    >
      <PrimaryText style={[styles.baseLabelStyle, injectedLabelStyle]}>{children}</PrimaryText>
    </Button>
  );
};

export default memo(AppButton);
