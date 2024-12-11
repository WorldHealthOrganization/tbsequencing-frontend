/** @jsxImportSource @emotion/react */
import React from 'react';
import { presetItem, presetWrapper } from './styles';

interface IPresetAreaProps {
  presets: { label: string, value: number[] }[],
  onPresetClick: (value: number[]) => void;
}

const PresetArea = ({ presets, onPresetClick }: IPresetAreaProps) => (
  <div css={presetWrapper}>
    {presets.map((preset) => (
      <button
        key={preset.label}
        type="button"
        css={presetItem}
        onClick={() => onPresetClick(preset.value)}
      >
        {preset.label}
      </button>
    ))}
  </div>
);

export default PresetArea;
