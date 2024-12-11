/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  FormControlLabel, FormGroup, Switch,
} from '@mui/material';
import * as styles from './styles';
import { ISwitchControlProps } from '../FormFields/models';

export const SwitchButton = <IInput extends unknown>({
  label, value, onChange, onBlur, name,
}:
ISwitchControlProps<IInput>) => {
  const isString = typeof label === 'string';
  const switchProps = {
    onChange, checked: value, onBlur, name,
  };

  return isString ? (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch sx={styles.switchSxStyles} {...switchProps} />
      }
        label={label}
      />
    </FormGroup>
  ) : (
    <FormGroup>
      <div css={styles.container}>
        <Switch sx={styles.switchSxStyles} {...switchProps} />
        <div css={styles.labelContainer}>
          {label}
        </div>
      </div>
    </FormGroup>
  );
};

export default SwitchButton;
