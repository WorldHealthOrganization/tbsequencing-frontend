import React, { useCallback } from 'react';
import { SerializedStyles } from '@emotion/react';
import { IDropDownContent } from '../../../../components/AppSelectBox/AppSelectBox';
import DrugsRadioGroup from './DrugsRadioGroup';
import AppSelectBox from '../../../../components/AppSelectBox';
import { drugsRadioSelect } from './styles';
import { IDrug } from '../../../../services/drugsApi/models';
import { IButtonProps } from '../../../../components/AppButton/AppButton';

interface IDrugsDropdownProps extends Pick<IButtonProps, 'size' | 'variant'> {
  onChange: (id: number) => void;
  items: IDrug[];
  value: IDrug;
  popoverStyle?: SerializedStyles;
}

const DrugsDropdown = ({
  onChange, value, items, size, variant, popoverStyle,
}: IDrugsDropdownProps) => {
  const renderDrugsRadio = useCallback(({ closeDropDown }: IDropDownContent) => (
    <DrugsRadioGroup
      onChange={(e) => {
        onChange(e);
        closeDropDown();
      }}
      selectedItem={value}
      items={items}
    />
  ), [items, value, onChange]);
  return (
    <AppSelectBox
      dropdownContentRender={renderDrugsRadio}
      size={size}
      variant={variant}
      style={drugsRadioSelect}
      popoverStyle={popoverStyle}
      endIconName="keyboard_arrow_down_icon"
    >
      {value.drugName}
    </AppSelectBox>
  );
};

export default DrugsDropdown;
