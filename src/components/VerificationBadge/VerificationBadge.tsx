/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';

export interface IVerificationBadgeProps {
  label: string;
  textIcon?: string;
  style?: SerializedStyles;
} // TODO move to shared?

export const VerificationBadge = ({ label, style, textIcon }: IVerificationBadgeProps) => (
  <div css={[styles.verificationBadge, style]}>
    {textIcon && <span css={styles.questionMark}>{textIcon}</span>}
    {' '}
    {label}
  </div>
);

export default VerificationBadge;
