/** @jsxImportSource @emotion/react */

import React from 'react';
import { wrapper } from './styles';
import Chart, { IChart } from './Chart';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import PrimaryText from '../../../../components/typography/PrimaryText';

const ChartWrapper = ({ isLoading, ...rest }: IChart & { isLoading: boolean }) => (
  <div css={wrapper}>
    <LoadingWrapper isLoading={isLoading} centered>
      {!rest.data.length
        ? <PrimaryText>No results matching your request</PrimaryText>
        : <Chart {...rest} />}
    </LoadingWrapper>
  </div>
);

export default ChartWrapper;
