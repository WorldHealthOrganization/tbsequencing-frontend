/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { IAggregatedGlobalDrug } from '../../../../services/drugsApi/models';
import DrugsPieChart from '../DrugsPieChart';
import { Regions } from '../../../drugsView/models';
import { IRectDimensions } from '../WorldMap/utils/renderingHelpers';
import { WORLD_MAP_PIE_CHART_SIZE } from '../DrugsPieChart/DrugsPieChart';

import * as styles from './styles';

export type RectConfig = Record<Regions, IRectDimensions>;

interface Props {
  aggregatedData: IAggregatedGlobalDrug[];
  getOnRegionClickHandler: (
    globalDrug: IAggregatedGlobalDrug
  ) => (event: React.MouseEvent<HTMLDivElement>) => void;
  rectConfig: RectConfig;
}

export const RegionCharts = ({
  aggregatedData,
  getOnRegionClickHandler,
  rectConfig,
}: Props) => (
  <div>
    {aggregatedData.map((drug) => {
      const rect = rectConfig[drug.regionId];

      if (!rect || drug.aggregatedTotal === 0) {
        return null;
      }

      const { top, left } = rectConfig[drug.regionId];

      const style = css({
        top: top - WORLD_MAP_PIE_CHART_SIZE,
        left,
        position: 'absolute',
      });

      return (
        // eslint-disable-next-line max-len
        <div
          key={drug.regionId}
          onClick={getOnRegionClickHandler(drug)}
          css={[styles.container, style]}
        >
          <DrugsPieChart
            key={`${drug.regionId}`}
            susceptibleQuantity={drug.aggregatedSusceptible}
            intermediateQuantity={drug.aggregatedIntermediate}
            resistantQuantity={drug.aggregatedResistant}
            totalSamples={drug.aggregatedTotal}
          />
        </div>
      );
    })}
  </div>
);

export default RegionCharts;
