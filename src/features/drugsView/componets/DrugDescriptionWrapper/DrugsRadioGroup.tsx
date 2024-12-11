/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { IDrug } from '../../../../services/drugsApi/models';
import { popupContent, radioGroup } from './styles';

interface IDrugsRadioGroup {
  onChange: (id: number) => void;
  selectedItem: IDrug;
  items: IDrug[];
}

const DrugsRadioGroup = ({ onChange, selectedItem, items }: IDrugsRadioGroup) => (
  <div css={popupContent}>
    <FormControl>
      <RadioGroup
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
        value={selectedItem.drugId}
      >
        {items.map((item) => (
          <FormControlLabel
            sx={radioGroup}
            key={item.drugName}
            value={item.drugId}
            control={(
              <Radio
                inputProps={{
                  'aria-label': item.drugName,
                }}
              />
)}
            label={item.drugName}
          />
        ))}
      </RadioGroup>
    </FormControl>
  </div>
);

export default DrugsRadioGroup;
