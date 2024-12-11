/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { max, min } from 'd3-array';
// @ts-ignore
import { Cursor, PositionAxisTrack, RegionViewer } from '@gnomad/region-viewer';
import VariantTrack from '../VariantTrack/VariantTrack';
import AppPaper from '../AppPaper';
import H2 from '../typography/H2';
import { IGene, IVariant } from '../../services/genesApi/models';
import { IVariantLocal } from '../../features/genesView/models';
import LoadingWrapper from '../LoadingWrapper';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';
import { useWindowSize } from '../../features/worldmap/hooks/useWindowSize';
import SecondaryText from '../typography/SecondaryText';

interface IGnomadVariantsProps {
  onClick?: (variant: IVariant) => void;
  variants?: IVariant[];
  variantsInTable?: number[];
  isLoading?: boolean;
  selectedGene: IGene;
}

const findMaxEndPos = (tableData: IVariant[]): number => {
  const endPosArray: number[] = tableData.map((variant) => variant.endPos);

  return Math.max(...endPosArray);
};

const findMinStartPos = (tableData: IVariant[]): number => {
  const startPosArray: number[] = tableData.map((variant) => variant.startPos);
  return Math.min(...startPosArray);
};

const getRelativeCoords = (
  startPos: number,
  endPos: number,
  selectedGene: IGene,
) => {
  const start = startPos - selectedGene.startPos;
  const stop = endPos - selectedGene.endPos;

  return {
    start,
    stop,
  };
};

const getRelativeSmallerCoords = ({ start, stop }: { start: number, stop: number }) => {
  const smallerStartPos = start / 3;
  const smallerEndPos = stop / 3;

  return {
    start: Math.floor(smallerStartPos),
    stop: Math.ceil(smallerEndPos),
  };
};

export const GnomadVariants = ({
  onClick, variants = [], variantsInTable = [0, 19], isLoading,
  selectedGene,
}: IGnomadVariantsProps) => {
  const [activePosition, setActivePosition] = useState(null);

  const { width: windowWidth } = useWindowSize();

  const formattedVariants: IVariantLocal[] = variants.map((variant) => ({
    ...variant,
    pos: variant.startPos,
    allele_freq: +variant.globalFrequency / 100,
  }));

  const start = min(formattedVariants, (d) => d.pos);
  const stop = max(formattedVariants, (d) => d.pos);

  useEffect(() => {
    if (activePosition === null) {
      return;
    }

    const closest = formattedVariants.reduce((prev, curr) => (
      Math.abs(curr.pos - activePosition) < Math.abs(prev.pos - activePosition) ? curr : prev));

    if (typeof onClick === 'function') onClick(closest);
  }, [activePosition]);

  if (!selectedGene) {
    return null;
  }

  const regions = [
    { start, stop },
  ];

  const minStartPos = findMinStartPos(variants);
  const maxEndPos = findMaxEndPos(variants);
  const relativeCoords = getRelativeCoords(
    minStartPos,
    maxEndPos,
    selectedGene,
  );

  const relativeSmallerCoords = getRelativeSmallerCoords(relativeCoords);

  return (
    <AppPaper style={styles.container}>
      <H2>Variants</H2>
      <LoadingWrapper isLoading={isLoading} centered>
        {!formattedVariants?.length ? 'No results matching your request'
          : (
            <div>
              <RegionViewer regions={regions} width={windowWidth}>
                <Cursor
                  onClick={setActivePosition}
                  renderCursor={(x: any) => (
                    <line
                      x1={x}
                      y1={0}
                      x2={x}
                      y2="100%"
                      stroke="#000"
                      strokeWidth={1}
                    />
                  )}
                >
                  <VariantTrack
                    width={1000}
                    title="Global variants"
                    variants={formattedVariants || []}
                  />
                  <VariantTrack
                    title="Viewing in table"
                    width={1000}
                    variants={formattedVariants?.slice(variantsInTable[0], variantsInTable[1])}
                  />
                  <div css={styles.additionalAxisContainer}>
                    <SecondaryText
                      style={styles.additionalAxisLabel}
                    >
                      Genomic scale
                    </SecondaryText>
                    <PositionAxisTrack />
                  </div>
                </Cursor>
              </RegionViewer>
              <RegionViewer regions={[relativeCoords]} width={windowWidth}>
                <div css={styles.additionalAxisContainer}>
                  <SecondaryText
                    style={styles.additionalAxisLabel}
                  >
                    Gene Scale
                  </SecondaryText>
                  <PositionAxisTrack />
                </div>
              </RegionViewer>
              <RegionViewer regions={[relativeSmallerCoords]} width={windowWidth}>
                <div css={styles.additionalAxisContainer}>
                  <SecondaryText
                    style={styles.additionalAxisLabel}
                  >
                    Protein scale
                  </SecondaryText>
                  <PositionAxisTrack />
                </div>
              </RegionViewer>
            </div>
          )}
      </LoadingWrapper>
      <div css={styles.legendContainer}>
        <div css={styles.legendItem('upstream_gene_variant')}>
          <div css={styles.box('upstream_gene_variant')} />
          <PrimaryText> UPSTREAM </PrimaryText>
        </div>
        <div css={styles.legendItem('missense_variant')}>
          <div css={styles.box('missense_variant')} />
          <PrimaryText> MISSENSE </PrimaryText>
        </div>
        <div css={styles.legendItem('synonymous_variant')}>
          <div css={styles.box('synonymous_variant')} />
          <PrimaryText> SYNONYMOUS </PrimaryText>
        </div>
        <div css={styles.legendItem('ins-del')}>
          <div css={styles.box('ins-del')} />
          <PrimaryText> INSERTION/DELETION </PrimaryText>
        </div>
        <div css={styles.legendItem('start_lost')}>
          <div css={styles.box('start_lost')} />
          <PrimaryText> START_LOST </PrimaryText>
        </div>
        <div css={styles.legendItem('frameshift_variant')}>
          <div css={styles.box('frameshift_variant')} />
          <PrimaryText> FRAMESHIFT </PrimaryText>
        </div>
        <div css={styles.legendItem('stop_gained')}>
          <div css={styles.box('stop_gained')} />
          <PrimaryText> STOP_GAINED </PrimaryText>
        </div>
        <div css={styles.legendItem('OTHER')}>
          <div css={styles.box('OTHER')} />
          <PrimaryText> OTHER </PrimaryText>
        </div>
      </div>
    </AppPaper>
  );
};

export default GnomadVariants;
