/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  PieChart, Pie, Cell, Label,
} from 'recharts';
import * as styles from './styles';
import appColors from '../../../../styles/colors';

export const WORLD_MAP_PIE_CHART_SIZE = 98;

const DATA_KEY = 'value';
const COLORS = [
  appColors.secondary.whoMagenta, appColors.secondary.whoYellow, appColors.secondary.whoGreen,
];

interface Props {
  susceptibleQuantity: number;
  resistantQuantity: number;
  intermediateQuantity: number;
  totalSamples: number;
}

export const DrugsPieChart = ({
  totalSamples, susceptibleQuantity, resistantQuantity, intermediateQuantity,
}: Props) => {
  const data = [
    { name: 'Susceptible', [DATA_KEY]: susceptibleQuantity },
    { name: 'Resistant', [DATA_KEY]: resistantQuantity },
    { name: 'Intermediate', [DATA_KEY]: intermediateQuantity },
  ];

  const totalSamplesFormatted = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(totalSamples);

  return (
    <PieChart
      css={styles.baseChartStyle}
      width={WORLD_MAP_PIE_CHART_SIZE}
      height={WORLD_MAP_PIE_CHART_SIZE}
    >
      <Pie
        dataKey={DATA_KEY}
        data={data}
        innerRadius={34}
        outerRadius={49}
      >

        {data.map((drug, index) => <Cell key={`cell-${drug.name}`} fill={COLORS[index]} />)}
        <Label style={styles.labelStyleSmall} width={25} position="center">{totalSamplesFormatted}</Label>
      </Pie>
    </PieChart>
  );
};

export default DrugsPieChart;
