/** @jsxImportSource @emotion/react */
import React from 'react';
// @ts-ignore
import { RegionViewer, PositionAxisTrack } from '@gnomad/region-viewer';
import H2 from '../../../../components/typography/H2';
import AppPaper from '../../../../components/AppPaper';
import GenomeContext from '../../../../components/GenomeContext';
import H3 from '../../../../components/typography/H3';
import {
  innerWrapper, header, outerWrapper, genomeWrapper, locusTag, axisContainer, ncbiLink,
} from './styles';

import { IGenomeContextWrapperProps } from '../../models';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import { useWindowSize } from '../../../worldmap/hooks/useWindowSize';

const GenomeContextWrapper = ({
  data,
  isLoading,
  selectedGene,
  minDomain,
  maxDomain,
}: IGenomeContextWrapperProps) => {
  const { width: windowWidth } = useWindowSize();
  const widgetWidth = windowWidth - ((54 + 24) * 2);

  return (
    <LoadingWrapper isLoading={!minDomain || !maxDomain || isLoading || !selectedGene} centered>
      <div css={outerWrapper}>
        <H2 style={header}>
          Genome Context —
          <a css={ncbiLink} href="https://www.ncbi.nlm.nih.gov/nuccore/NC_000962.3"> NC_000962.3</a>
        </H2>
        <AppPaper style={innerWrapper}>
          <H3 style={locusTag}>{selectedGene?.locusTag || selectedGene?.geneName || ''}</H3>
          <div css={genomeWrapper}>
            <RegionViewer
              regions={[{
                start: minDomain,
                stop: maxDomain,
              }]}
              leftPanelWidth={0}
              rightPanelWidth={0}
              width={widgetWidth}
            >
              <GenomeContext
                minDomain={minDomain!}
                maxDomain={maxDomain!}
                selectedGene={selectedGene!}
                data={data!}
                width={widgetWidth}
              />
              <div css={axisContainer}>
                <PositionAxisTrack />
              </div>
            </RegionViewer>
          </div>
        </AppPaper>
      </div>
    </LoadingWrapper>
  );
};

export default GenomeContextWrapper;
