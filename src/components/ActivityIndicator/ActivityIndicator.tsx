import React from 'react';
import { CircularProgress } from '@mui/material';
import { activityIndicatorStyles } from './styles';

export interface IActivityIndicatorProps {
  centered?: boolean;
  size?: number;
}

export const ActivityIndicator = ({ centered, size = 40 }: IActivityIndicatorProps) => (
  <CircularProgress size={size} sx={centered ? activityIndicatorStyles : undefined} />
);

export default ActivityIndicator;
