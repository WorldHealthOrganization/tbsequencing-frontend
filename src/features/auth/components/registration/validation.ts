import * as yup from 'yup';
import {
  validateEmail,
  validatePassword,
  validateTermOfUse,
  validateTextField,
  validatePhone,
} from '../../../../utils/validators';

export const registrationValidationFormSchema = yup.object().shape({
  firstName: validateTextField('First name is mandatory'),
  lastName: validateTextField('Last name is mandatory'),
  email: validateEmail('Email is mandatory'),
  password1: validatePassword,
  password2: validateTextField('Password confirmation is mandatory')
    .oneOf([yup.ref('password1')], 'Passwords do not match'),
  termsAccepted: validateTermOfUse('You have to accept terms of use'),
  institutionHeadName: yup.string().required('Institution country is mandatory'),
  institutionName: yup.string().required('Institution is mandatory'),
  institutionPhone: validatePhone('Institution phone is mandatory'),
  institutionHeadEmail: validateEmail('Head of institution email is mandatory'),
  institutionCountry: yup.string().required('Institution country is mandatory'),
});
