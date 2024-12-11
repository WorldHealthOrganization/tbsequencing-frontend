/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import { DrugStatus } from '../../models';
import TooltipContent from '../../../../components/TooltipContent';
import { tooltip } from './styles';
import H2 from '../../../../components/typography/H2';

const ChartTooltip = (props: any) => {
  const { payload } = props;
  const data = payload?.[0]?.payload;
  if (!data) return <div />;
  return (
    <div css={tooltip.wrapper}>
      <H2>{data.drug.drugName}</H2>
      <TooltipContent
        susceptibleQuantity={data[DrugStatus.Susceptible]}
        susceptibleRatio={`${data[DrugStatus.RatioSusceptible]}`}
        shouldRenderColorLegend
        resistantQuantity={data[DrugStatus.Resistant]}
        resistantRatio={`${data[DrugStatus.RatioResistant]}`}
        intermediateQuantity={data[DrugStatus.Intermediate]}
        intermediateRatio={`${data[DrugStatus.RatioIntermediate]}`}
        totalSamples={data.total}
      />
    </div>
  );
};

export default memo(ChartTooltip);
