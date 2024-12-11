import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { ISelectControlProps } from '../models';
import { selectControl, selectLabel } from '../styles';

const SelectControl = <IInput extends unknown> (props: ISelectControlProps<IInput>) => {
  const labelId = 'select-label';

  const {
    label, selectableData, isError, onChange, onBlur, placeholder, fullWidth, name, value,
  } = props;

  return (
    <FormControl fullWidth>
      <InputLabel sx={selectLabel} id={labelId}>{label}</InputLabel>
      <Select
        sx={selectControl}
        labelId={labelId}
        placeholder={placeholder}
        fullWidth={fullWidth}
        error={isError}
        label={label}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        value={value}
        variant="outlined"
      >
        {selectableData!.map((
          data,
        ) => (
          <MenuItem
            key={data.value}
            value={data.value}
          >
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectControl;
