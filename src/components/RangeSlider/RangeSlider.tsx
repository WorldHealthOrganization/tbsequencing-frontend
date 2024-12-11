/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box, Slider } from '@mui/material';
import { AppButton } from '../AppButton/AppButton';
import { slider, sliderWrapper } from './styles';
import PresetArea from './PresetArea';
import { defaultDatePresets } from './defaultDatePresets';

interface Props {
  onSubmit: (value: number[]) => void
  min?: number,
  max?: number,
  presets?: { label: string, value: number[] }[],
  defaultValue?: number[];
}

export const RangeSlider = ({
  onSubmit, min = 0, max = 100, presets, defaultValue,
}: Props) => {
  const [sliderValue, setSliderValue] = useState<number[]>(
    defaultValue || [min, max],
  );

  if (presets) {
    presets = [
      ...defaultDatePresets,
      ...presets,
    ];
  } else {
    presets = defaultDatePresets;
  }

  const marks = [{
    value: min,
    label: min,
  }, {
    value: max,
    label: max,
  }];

  const handleSliderChange = (e: Event, value: number[]) => {
    setSliderValue(value);
  };

  const onClick = () => {
    onSubmit(sliderValue);
  };

  const onPresetClick = (value: number[]) => {
    setSliderValue(value);
  };

  return (
    <Box sx={sliderWrapper}>
      <Slider
        sx={slider}
        disableSwap
        // @ts-ignore
        onChange={handleSliderChange}
        value={sliderValue}
        marks={marks}
        min={min}
        max={max}
        valueLabelDisplay="auto"
      />
      <PresetArea presets={presets} onPresetClick={onPresetClick} />
      <AppButton variant="contained" size="medium" onClick={onClick}>
        Submit
      </AppButton>
    </Box>
  );
};

export default RangeSlider;
