import { HTMLInputTypeAttribute, ReactElement } from 'react';
import { FieldName } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';

export interface IInputs {
  firstName: string;
  lastName: string;
  institutionName: string;
  email: string;
  password1: string;
  password2: string;
  institutionCountry: string;
  institutionHeadName: string;
  institutionHeadEmail: string;
  institutionPhone: string;
  termsAccepted: boolean;
}

export interface ISelectableData {
  label: string;
  value: string;
}

export type CustomInputType = HTMLInputTypeAttribute | 'textarea' | 'select' | 'switch';

// TODO move to global models
export interface AbstractIField<I> {
  label: string | ReactElement;
  type: CustomInputType;
  selectable?: boolean;
  selectableData?: ISelectableData[];
  placeholder?: string;
  name: FieldName<I>;
  wrapperStyles?: SerializedStyles;
  required?: boolean;
  deps?: string;
  showPasswordHint?: boolean;
}
