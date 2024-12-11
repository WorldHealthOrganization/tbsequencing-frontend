/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { ActivityIndicator, IActivityIndicatorProps } from '../ActivityIndicator/ActivityIndicator';

interface Props extends IActivityIndicatorProps {
  isLoading?: boolean;
  children: ReactNode;
}

export const LoadingWrapper = ({ isLoading, children, ...loaderProps }: Props) => {
  if (isLoading) {
    return <ActivityIndicator {...loaderProps} />;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default LoadingWrapper;
