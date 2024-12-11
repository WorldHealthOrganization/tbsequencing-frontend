import * as yup from 'yup';

export const validatePassword = yup
  .string()
  .required('Please Enter your password')
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/,
    'Incorrect password',
  );
export const phoneRegExp = /^[+]?[(]?[0-9]{1,5}[)]?[- s]?[0-9]{1,4}[- s]?[0-9]{2,4}[- s]?[0-9]{3,6}$/i;
export const validateTextField = (
  errorMessage: string,
  maxChars: number = 255,
) => yup.string().required(errorMessage).min(1).max(maxChars);

export const baseEmailValidator = yup.string().email('Incorrect email');

export const validateEmail = (
  errorMessage: string,
) => baseEmailValidator.required(errorMessage).min(3);

export const validateTermOfUse = (
  errorMessage: string,
) => yup.boolean().oneOf([true], errorMessage);

export const validatePhone = (
  errorMessage: string,
) => yup.string()
  .matches(phoneRegExp, 'The phone number is invalid')
  .required(errorMessage);

export const validateMaxLength = (
  maxLength: number,
  errorMessage: string,
) => yup.string().max(maxLength, errorMessage);
