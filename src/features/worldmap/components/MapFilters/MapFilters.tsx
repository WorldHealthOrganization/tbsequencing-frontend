/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import * as styles from './styles';
import { AppButton } from '../../../../components/AppButton/AppButton';
import { ResistantType } from '../../../drugsView/models';
import AppSelectBox from '../../../../components/AppSelectBox';
import AppRadioGroup from '../../../../components/AppRadioGroup';
import { IDropDownContent } from '../../../../components/AppSelectBox/AppSelectBox';
// import RangeSlider from '../../../../components/RangeSlider';
import { IRadioGroupItem } from '../../../../components/AppRadioGroup/AppRadioGroup';
import { MapType } from '../WorldMap/models';

interface Props {
  drugsSelections: IRadioGroupItem[]
  resistantType: ResistantType;
  // selectedDates: number[];
  // setSelectedDates: (value: number[]) => void;
  mapType: MapType;
  setMapType: (mapType: MapType) => void;
  setResistantType: (resistantType: ResistantType) => void;
  selectedDrugId: string;
  setSelectedDrug: (drug: string) => void;
  closePopover: () => void;
}

// const now = new Date();

export const MapFilters = ({
  drugsSelections,
  resistantType,
  // selectedDates,
  // setSelectedDates,
  mapType,
  setMapType,
  setResistantType,
  selectedDrugId,
  setSelectedDrug,
  closePopover,
}: Props) => {
  const selectegDrugName = drugsSelections?.find((drug) => drug.value === selectedDrugId);
  const renderRadioGroup = useCallback(({ closeDropDown }: IDropDownContent) => (
    <AppRadioGroup
      variant="doubleCol"
      selectedValue={selectedDrugId}
      onChange={(eventSelectedDrug: string) => {
        setSelectedDrug(eventSelectedDrug);
        closeDropDown();
      }}
      items={drugsSelections}
      style={styles.radioGroup}
    />
  ), [drugsSelections]); // TODO remove this var?

  // const renderRangeSlider = useCallback(({ closeDropDown }: IDropDownContent) => (
  //   <RangeSlider
  //     min={1964}
  //     max={now.getFullYear()}
  //     defaultValue={selectedDates}
  //     onSubmit={(eventSelectedDates) => {
  //       setSelectedDates(eventSelectedDates);
  //       closeDropDown();
  //     }}
  //   />
  // ), [setSelectedDates, selectedDates]);

  return (
    <div css={styles.container}>
      <div css={styles.section}>
        <AppSelectBox
          endIconName="arrow_drop_down"
          dropdownContentRender={renderRadioGroup}
          size="medium"
          variant="outlined"
          style={styles.singleElement}
        >
          {selectegDrugName?.label || 'No Drug Data'}
        </AppSelectBox>

        {/* <AppSelectBox
          endIconName="arrow_drop_down"
          dropdownContentRender={renderRangeSlider}
          size="medium"
          variant="outlined"
        >
          Year
        </AppSelectBox> */}

      </div>
      <div css={styles.section}>
        <AppButton
          onClick={() => setResistantType(ResistantType.Phenotypic)}
          variant={ResistantType.Phenotypic === resistantType ? 'contained' : 'outlined'}
          size="medium"
        >
          Phenotypic resistance
        </AppButton>
        <AppButton
          onClick={() => setResistantType(ResistantType.Genotypic)}
          variant={ResistantType.Genotypic === resistantType ? 'contained' : 'outlined'}
          size="medium"
        >
          Genotypic resistance
        </AppButton>
      </div>
      <div css={styles.section}>
        <AppButton
          onClick={() => {
            closePopover();
            setMapType('macroRegions');
          }}
          variant={mapType === 'macroRegions' ? 'contained' : 'outlined'}
          size="medium"
        >
          WHO Regions
        </AppButton>
        {/* <AppButton
          onClick={() => {
            closePopover();
            setMapType('heatmap');
          }}
          variant={mapType === 'heatmap' ? 'contained' : 'outlined'}
          size="medium"
        >
          Country view
        </AppButton> */}
      </div>
    </div>
  );
};

export default MapFilters;
