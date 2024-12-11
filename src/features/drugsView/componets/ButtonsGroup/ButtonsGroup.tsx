/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { AppButton } from '../../../../components/AppButton/AppButton';
import { block, wrapper } from './styles';
import { ChartDataType, Regions, ResistantType } from '../../models';
import AppSelectBox from '../../../../components/AppSelectBox';
// import RangeSlider from '../../../../components/RangeSlider';
import AppRadioGroup from '../../../../components/AppRadioGroup';
import { IDropDownContent } from '../../../../components/AppSelectBox/AppSelectBox';

interface IButtonGroupProps {
  resistantTypeClick: (type: ResistantType) => void;
  handleDataTypeChanged: (value: ChartDataType) => void;
  resistantType: ResistantType;
  chartDataType: ChartDataType,
  // setSelectedDates: (value: number[]) => void;
  handleRegionChange: (value: Regions) => void;
  selectedRegion: Regions;
  // selectedDates: number[];
}

const items = [
  { value: Regions.ALL, label: 'Global' },
  { value: Regions.AFRICA, label: 'Africa' },
  { value: Regions.AMERICA, label: 'America' },
  { value: Regions.EUROPE, label: 'Europe' },
  { value: Regions.EASTERN_MEDITERRANEAN, label: 'Eastern Mediterranean' },
  { value: Regions.SOUTH_EAST_ASIA, label: 'South-East Asia' },
  { value: Regions.WESTERN_PACIFIC, label: 'Western Pacific' },
];

// const now = new Date();

const ButtonsGroup = ({
  chartDataType,
  resistantType,
  resistantTypeClick,
  // setSelectedDates,
  handleRegionChange,
  handleDataTypeChanged,
  selectedRegion,
  // selectedDates,
}: IButtonGroupProps) => {
  const renderRadioGroup = useCallback(({ closeDropDown }: IDropDownContent) => (
    <AppRadioGroup
      variant="singleCol"
      selectedValue={selectedRegion}
      onChange={(value) => {
        handleRegionChange(value);
        closeDropDown();
      }}
      items={items}
    />
  ), [handleRegionChange, selectedRegion]); // TODO remove this var?

  // const renderRangeSlider = useCallback(({ closeDropDown }: IDropDownContent) => (
  //   <RangeSlider
  //     min={1964}
  //     max={now.getFullYear()}
  //     defaultValue={selectedDates}
  //     onSubmit={(e) => {
  //       setSelectedDates(e);
  //       closeDropDown();
  //     }}
  //   />
  // ), [setSelectedDates, selectedDates]);

  return (
    <div css={wrapper}>
      <div css={block}>
        <AppButton
          onClick={() => resistantTypeClick(ResistantType.Phenotypic)}
          variant={resistantType === ResistantType.Phenotypic ? 'contained' : 'outlined'}
          size="medium"
        >
          Phenotypic resistance
        </AppButton>
        <AppButton
          onClick={() => resistantTypeClick(ResistantType.Genotypic)}
          variant={resistantType === ResistantType.Genotypic ? 'contained' : 'outlined'}
          size="medium"
        >
          Genotypic resistance
        </AppButton>
      </div>
      <div css={block}>
        <AppSelectBox
          endIconName="arrow_drop_down"
          dropdownContentRender={renderRadioGroup}
          size="medium"
          variant="outlined"
        >
          WHO region
        </AppSelectBox>
      </div>
      {/* <div css={block}>
        <AppSelectBox
          endIconName="arrow_drop_down"
          dropdownContentRender={renderRangeSlider}
          size="medium"
          variant="outlined"
        >
          Time period
        </AppSelectBox>
      </div> */}
      <div css={block}>
        <AppButton
          onClick={() => handleDataTypeChanged(ChartDataType.Ratio)}
          variant={chartDataType === ChartDataType.Ratio ? 'contained' : 'outlined'}
          size="medium"
        >
          Proportions
        </AppButton>
        <AppButton
          onClick={() => handleDataTypeChanged(ChartDataType.Count)}
          variant={chartDataType === ChartDataType.Count ? 'contained' : 'outlined'}
          size="medium"
        >
          Absolute numbers
        </AppButton>
      </div>
    </div>
  );
};

export default ButtonsGroup;
