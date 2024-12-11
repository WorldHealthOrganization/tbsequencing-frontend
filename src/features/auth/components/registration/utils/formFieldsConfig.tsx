import React from 'react';
import { css } from '@emotion/react';
import {
  AbstractIField, IInputs,
} from '../types';
import { getCountriesData } from './getSelectableData';
import { ICountry } from '../../../../../services/dictionariesApi/models';
import SwitchLabel from '../../../../../components/SwitchLabel';

const baseStyles = {
  width: '48%',
  marginTop: 24,
};

const evenStyles = css({
  ...baseStyles,
  marginRight: 16,
});

const oddStyles = css({
  ...baseStyles,
});

const termsAndServiceStyles = css({
  ...baseStyles,
  marginTop: 28,
  width: '100%',
});

export const getChangeInfoFormFields = (
  countriesData: ICountry[] | undefined,
): AbstractIField<IInputs>[] => {
  if (!countriesData) {
    return [];
  }

  return [
    {
      label: 'First name',
      type: 'text',
      name: 'firstName',
      placeholder: 'John',
    }, {
      label: 'Last name',
      type: 'text',
      name: 'lastName',
      placeholder: 'Smith',
    },
    {
      label: 'Laboratory/Institution',
      type: 'text',
      name: 'institutionName',
      placeholder: 'Awesome lab',
    },
    {
      label: 'Institution’s Country',
      type: 'select',
      name: 'institutionCountry',
      selectable: true,
      selectableData: getCountriesData(countriesData || []),
      placeholder: 'USA',
    },
    {
      label: 'Phone number of Lab/Institution',
      type: 'text',
      name: 'institutionPhone',
      placeholder: '+380000000000',
    },
    {
      label: 'Email of Lab/Institution',
      type: 'email',
      name: 'institutionHeadEmail',
      placeholder: 'institution@domail.com',
    },
    {
      label: 'Head of Lab/Institution Name',
      type: 'text',
      name: 'institutionHeadName',
      placeholder: 'John',
    },
  ];
};

export const getRegistrationFormFields = (
  countriesData: ICountry[] | undefined,
): AbstractIField<IInputs>[] => {
  if (!countriesData) {
    return [];
  }

  return [
    {
      label: 'First name',
      type: 'text',
      name: 'firstName',
      placeholder: 'John',
      wrapperStyles: evenStyles,
    }, {
      label: 'Last name',
      type: 'text',
      name: 'lastName',
      placeholder: 'Smith',
      wrapperStyles: oddStyles,
    },
    {
      label: 'Laboratory/Institution',
      type: 'text',
      name: 'institutionName',
      placeholder: 'Awesome lab',
      wrapperStyles: evenStyles,
    },
    {
      label: 'Institution’s Country',
      type: 'select',
      name: 'institutionCountry',
      selectable: true,
      selectableData: getCountriesData(countriesData || []),
      placeholder: 'USA',
      wrapperStyles: oddStyles,
    },
    {
      label: 'Head of Lab/Institution Name',
      type: 'text',
      name: 'institutionHeadName',
      placeholder: 'John',
      wrapperStyles: evenStyles,
    },
    {
      label: 'Phone number of Lab/Institution',
      type: 'text',
      name: 'institutionPhone',
      placeholder: '+100000000000',
      wrapperStyles: oddStyles,
    },
    {
      label: 'Email of Lab/Institution',
      type: 'email',
      name: 'institutionHeadEmail',
      placeholder: 'institution@domail.com',
      wrapperStyles: evenStyles,
    },
    {
      label: 'Personal Email',
      type: 'email',
      name: 'email',
      placeholder: 'surname@domail.com',
      wrapperStyles: oddStyles,
    }, {
      label: 'Password',
      type: 'password',
      name: 'password1',
      showPasswordHint: true,
      deps: 'password2',
      placeholder: 'Enter your password',
      wrapperStyles: evenStyles,
    }, {
      label: 'Confirm password',
      type: 'password',
      name: 'password2',
      deps: 'password1',
      placeholder: 'Enter your password',
      wrapperStyles: oddStyles,
    }, {
      label: <SwitchLabel />,
      type: 'switch',
      name: 'termsAccepted',
      wrapperStyles: termsAndServiceStyles,
    },
  ];
};
