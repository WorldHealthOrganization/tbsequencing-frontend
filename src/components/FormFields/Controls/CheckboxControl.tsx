import React from 'react';
import {
  Checkbox, FormControl, FormControlLabel, FormHelperText,
} from '@mui/material';
import { ICheckboxProps } from '../models';

const CheckboxControl = <IInput extends unknown>(props: ICheckboxProps<IInput>) => {
  const {
    label, value, isError, error, name, onChange, onBlur,
  } = props;

  return (
    <FormControl required error={isError}>
      <FormControlLabel
        label={label}
        control={(
          <Checkbox
            checked={Boolean(value)}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {isError && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxControl;
