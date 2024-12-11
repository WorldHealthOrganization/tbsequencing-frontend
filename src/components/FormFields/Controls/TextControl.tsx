import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Error } from '@mui/icons-material';
import { ITextControlProps } from '../models';
import { errorIcon, textControlSx } from '../styles';

const TextControl = <IInput extends unknown> (props: ITextControlProps<IInput>) => {
  const {
    isError, error, type, placeholder, InputProps, value, onBlur, onChange, name, fullWidth, label,
  } = props;

  // TODO fix error type

  return (
    <TextField
      label={label}
      // @ts-ignore
      helperText={error?.message}
      type={type}
      sx={textControlSx}
      error={isError}
      placeholder={placeholder}
      variant="standard"
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      name={name}
      fullWidth={fullWidth}
      InputProps={InputProps || {
        endAdornment: (
          <InputAdornment position="end">
            {error
              && (
              <IconButton disabled>
                <Error sx={errorIcon} />
              </IconButton>
              )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextControl;
