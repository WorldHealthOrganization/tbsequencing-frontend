import {
  ControllerRenderProps, FieldError, FieldName, FieldValues,
} from 'react-hook-form';
import { InputProps } from '@mui/material';
import { AbstractIField, CustomInputType } from '../../features/auth/components/registration/types';

export interface IBaseControlProps<IInput> extends
  AbstractIField<IInput>,
  Pick<ControllerRenderProps<FieldValues, FieldName<IInput>>, 'value' | 'onChange' | 'onBlur' > {
  isError: boolean,
  error: FieldError,
  fullWidth?: boolean,
  required?: boolean,
}

export interface ICheckboxProps<IInput> extends IBaseControlProps<IInput> {

}

export interface ITextAreaProps<IInput> extends IBaseControlProps<IInput> {

}

export interface ITextControlProps<IInput> extends IBaseControlProps<IInput> {
  type: CustomInputType
  InputProps?: Partial<InputProps>
}

export interface ISwitchControlProps<IInput> extends IBaseControlProps<IInput> {
  isActive?: boolean;
}

export interface ISelectControlProps<IInput> extends IBaseControlProps<IInput> {

}
