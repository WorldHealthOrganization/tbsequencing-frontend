import * as yup from 'yup';
import { validateEmail, validateTextField } from '../../../../utils/validators';
import { AbstractIField } from '../registration/types';

export const formConfig:AbstractIField<IInputs>[] = [
  {
    type: 'text',
    label: 'Email',
    name: 'username',
    placeholder: 'mail@domain.com',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
  },
];

export interface IInputs {
  username: string;
  password: string;
}

export const defaultValues: IInputs = {
  username: '',
  password: '',
};

export const loginSchema = yup.object().shape({
  password: validateTextField('This field is required'),
  username: validateEmail('Email is mandatory'),
});
