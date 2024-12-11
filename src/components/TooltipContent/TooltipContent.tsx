/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';
import LegendSection from '../../features/worldmap/components/LegendSection';

interface ITooltipContentProps {
  susceptibleQuantity: number;
  susceptibleRatio: string;
  shouldRenderColorLegend: boolean;
  resistantQuantity: number;
  resistantRatio: string;
  intermediateQuantity: number;
  intermediateRatio: string;
  totalSamples: number;
}

export const TooltipContent = ({
  susceptibleQuantity,
  susceptibleRatio,
  shouldRenderColorLegend,
  resistantQuantity,
  resistantRatio,
  intermediateQuantity,
  intermediateRatio,
  totalSamples,
}: ITooltipContentProps) => (
  <div>
    <div css={styles.resistanceHeaders}>
      <div><PrimaryText style={[styles.label]}>Resistance type</PrimaryText></div>
      <div css={styles.resistanceHeadersValues}>
        <PrimaryText style={[styles.label]}>Sample Quantity</PrimaryText>
        <div css={[styles.label, styles.headerSeparator]}>|</div>
        <PrimaryText style={[styles.label]}>Ratio</PrimaryText>
      </div>
    </div>
    <section css={styles.legendSectionWrapper}>
      <LegendSection
        legendStyle={styles.susceptibleLegendItem}
        shouldRenderColorLegend={shouldRenderColorLegend}
        label="Susceptible"
        value={susceptibleQuantity}
        percents={susceptibleRatio}
      />
      <LegendSection
        legendStyle={styles.resistantLegendItem}
        shouldRenderColorLegend={shouldRenderColorLegend}
        label="Resistant"
        value={resistantQuantity}
        percents={resistantRatio}
      />
      <LegendSection
        legendStyle={styles.intermediateLegendItem}
        shouldRenderColorLegend={shouldRenderColorLegend}
        label="Intermediate"
        value={intermediateQuantity}
        percents={intermediateRatio}
      />
    </section>
    <div css={styles.totalContainer}>
      <PrimaryText style={styles.totalLabel}>Total samples: </PrimaryText>
      <PrimaryText style={styles.totalValue}>{new Intl.NumberFormat('fr-FR').format(totalSamples)}</PrimaryText>
    </div>
  </div>
);

export default TooltipContent;
