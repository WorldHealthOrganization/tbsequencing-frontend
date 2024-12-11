/** @jsxImportSource @emotion/react */
import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Bar, BarChart, Brush, CartesianGrid, ReferenceArea, Tooltip, XAxis, YAxis,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { ChartDataType, DrugStatus } from '../../models';
import appColors from '../../../../styles/colors';
import { chart } from './styles';
import ChartTooltip from './ChartTooltip';
import { IChartDataLocal, IDrug } from '../../../../services/drugsApi/models';
import { useWindowSize } from '../../../worldmap/hooks/useWindowSize';

const BAR_SIZE = 16;
const BAR_GAP = 2;
const BAR_CATEGORY_GAP = 18;
const GROUP_WIDTH = (BAR_SIZE * 3) + (BAR_GAP * 2) + BAR_CATEGORY_GAP;
const CHART_HEIGHT = 444;

export interface IChart {
  onClick: (payload: IChartDataLocal) => void;
  data: IChartDataLocal[];
  dataType: ChartDataType;
  selectedDrug: IDrug;
}

const ClickArea = memo((props: any) => {
  const { customX, size } = props;
  return (
    <g>
      <rect
        x={customX}
        y={5}// 5 means 5px from top of chart 'cause lib has extra space on top
        width={size.width}
        height={size.height}
        fill={appColors.secondary.whoPurple}
        fillOpacity={0.3}
      />
    </g>
  );
});

const IBarProps = new BarChart({});

const Chart = (props: IChart) => {
  const {
    onClick, data, dataType, selectedDrug,
  } = props;

  const [chartData, setChartData] = useState(data);

  const [selectedAreaStart, setSelectedAreaStart] = useState<number>(0);
  const [brushIndexes, setBrushIndexes] = useState({
    startIndex: 0,
    endIndex: chartData.length,
  });
  const [selectedAreaSize, setSelectedAreaSize] = useState(0);
  const [chartRef, setChartRef] = useState<typeof IBarProps>();

  const { width: windowWidth } = useWindowSize();

  // 54 = padding of page; 24 = padding of chart container;
  const chartWidth = useMemo(() => windowWidth - 52 * 2 - 24 * 2, [windowWidth]);

  const allowScroll = useMemo(
    () => (
      brushIndexes.endIndex < chartData.length),
    [brushIndexes, chartData],
  );

  useEffect(() => {
    setChartData(data);
  }, [data]);

  useEffect(() => {
    // counting endIndex for Brush component
    // to fit container correctly
    const endIndex = Math.round(chartWidth / GROUP_WIDTH);
    setBrushIndexes(((prevState) => ({
      ...prevState,
      endIndex,
    })));

    // need this call to rerender chart after resize the window
    // in other way Brush component doesn't update its indexes
    setChartData((prevState) => [...prevState]);
  }, [chartWidth]);

  useEffect(() => {
    if (!brushIndexes || !chartRef) return;
    const { state: { orderedTooltipTicks, tooltipAxis } } = chartRef;
    // @ts-ignore
    setSelectedAreaSize(tooltipAxis?.bandSize);
    if (orderedTooltipTicks?.length) {
      const selectedDrugCoord = orderedTooltipTicks
        .find((item: { value: string; }) => item.value === selectedDrug.code);
      // selectedDrugCoord.coordinate means middle of central bar in group
      // offset is amount of px from group start to middle of group
      if (selectedDrugCoord) {
        setSelectedAreaStart(selectedDrugCoord.coordinate - selectedDrugCoord.offset);
      } else {
        setSelectedAreaStart(-1);
      }
    }
  }, [brushIndexes, chartRef, selectedDrug, chartWidth, chartData]);

  const cbRef = useCallback((ref: typeof IBarProps) => {
    setChartRef(ref);
  }, []);

  const onIndexesChange = (indexes: { startIndex: number, endIndex: number }) => {
    setBrushIndexes(indexes);
  };

  return (
    <BarChart
      ref={cbRef}
      barSize={BAR_SIZE}
      barGap={BAR_GAP}
      onClick={(e: CategoricalChartState) => {
        if (!e?.activeCoordinate || !e?.activePayload) return;
        onClick(e.activePayload[0].payload);
      }}
      height={CHART_HEIGHT}
      width={chartWidth}
      data={chartData}
    >
      <CartesianGrid strokeDasharray="0" vertical={false} />
      <XAxis
        allowDecimals={false}
        type="category"
        tickMargin={2}
        tick={chart.xAxis}
        tickLine={false}
        dataKey="drug.code"
      />
      <YAxis
        tickLine={false}
        hide
        domain={dataType === ChartDataType.Ratio ? [0, 100] : [0, 'auto']}
      />
      <Tooltip
        cursor={{ fill: appColors.tints.whoYellow.lightest }}
        content={<ChartTooltip />}
      />
      {!allowScroll ? null : (
        <Brush
          // @ts-ignore
          onChange={onIndexesChange}
          y={CHART_HEIGHT - 10}
          dataKey="drugCode"
          height={10}
          {...brushIndexes}
        />
      )}
      <Bar
        dataKey={dataType === ChartDataType.Ratio
          ? DrugStatus.RatioSusceptible
          : DrugStatus.Susceptible}
        fill={appColors.secondary.whoMagenta}
      />
      <Bar
        dataKey={dataType === ChartDataType.Ratio
          ? DrugStatus.RatioResistant
          : DrugStatus.Resistant}
        fill={appColors.secondary.whoYellow}
      />
      <Bar
        dataKey={dataType === ChartDataType.Ratio
          ? DrugStatus.RatioIntermediate
          : DrugStatus.Intermediate}
        fill={appColors.secondary.whoGreen}
      />
      {selectedAreaStart > 0
        && (
          <ReferenceArea
            shape={(
              <ClickArea
                size={{
                  width: selectedAreaSize,
                  height: allowScroll ? CHART_HEIGHT - 20 : CHART_HEIGHT,
                }}
                customX={selectedAreaStart}
              />
            )}
          />
        )}
    </BarChart>
  );
};

export default memo(Chart);
