/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import PrimaryText from '../../../../components/typography/PrimaryText';
import MapLegendSquare from '../MapLegendSquare';

interface ISectionProps {
  label: string;
  value: number;
  percents?:string;
  wrapperStyle?: SerializedStyles;
  legendStyle?: SerializedStyles;
  shouldRenderColorLegend?: boolean;
}

const LegendSection = ({
  label, value, percents, wrapperStyle, shouldRenderColorLegend, legendStyle,
}: ISectionProps) => {
  const hasPercents = percents !== undefined;
  const rightMarginStyle = hasPercents ? undefined : styles.noPercentsMargin;

  const formatter = new Intl.NumberFormat('fr-FR');

  return (
    <section css={[styles.section, wrapperStyle]}>
      <div css={styles.legendWrapper}>
        {shouldRenderColorLegend && <MapLegendSquare style={legendStyle} />}
        <PrimaryText style={styles.label}>{label}</PrimaryText>
      </div>

      <div css={styles.section}>
        <PrimaryText
          style={[styles.label, styles.value, rightMarginStyle]}
        >
          {formatter.format(value)}
        </PrimaryText>
        { hasPercents
          && (
            <>
              <div css={styles.separator}>|</div>
              <PrimaryText style={[styles.label, styles.value, styles.percentsValue]}>{`${percents}%`}</PrimaryText>
            </>
          )}
      </div>
    </section>
  );
};

export default LegendSection;
