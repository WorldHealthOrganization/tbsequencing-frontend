/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: ReactNode;
  style: Array<SerializedStyles | undefined> | SerializedStyles[];
}

export const BaseText = ({ children, style }: Props) => (
  <Typography css={style}>{children}</Typography>
);

export default BaseText;
