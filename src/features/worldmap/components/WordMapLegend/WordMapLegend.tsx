/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import AppPaper from '../../../../components/AppPaper';
import LegendSection from '../LegendSection';

interface Props {
  overallSamples: number;
  monoResistant: number;
  monoResistantPercent: string;
  multidrugResistant: number;
  multidrugResistantPercent: string;
  extensiveDrugResistant: number;
  extensiveDrugResistantPercent: string;
  rifampicinResistant: number;
  rifampicinResistantPercent: string;
}

export const WordMapLegend = ({
  overallSamples,
  monoResistant,
  monoResistantPercent,
  multidrugResistant,
  multidrugResistantPercent,
  extensiveDrugResistant,
  extensiveDrugResistantPercent,
  rifampicinResistant,
  rifampicinResistantPercent,
}: Props) => (
  <AppPaper style={styles.paper}>
    <LegendSection label="Overall Samples" value={overallSamples} />
    <LegendSection label="Mono-Resistant" value={monoResistant} percents={monoResistantPercent} />
    <LegendSection label="Multidrug Resistant | MDR" value={multidrugResistant} percents={multidrugResistantPercent} />
    <LegendSection label="Extensive Drug Resistant | XDR" value={extensiveDrugResistant} percents={extensiveDrugResistantPercent} />
    <LegendSection label="Rifampicin Resistant | RR" value={rifampicinResistant} percents={rifampicinResistantPercent} />
  </AppPaper>
);

export default WordMapLegend;
