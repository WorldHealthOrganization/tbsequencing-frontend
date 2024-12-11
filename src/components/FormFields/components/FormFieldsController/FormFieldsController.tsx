/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Control, Controller, FieldError,
} from 'react-hook-form';
import { AbstractIField } from '../../../../features/auth/components/registration/types';
import FieldsFactory from '../../FieldsFactory';

type Props<IInput> = {
  isError: boolean,
  error: FieldError,
  fieldItem: AbstractIField<IInput>,
  componentProps: {
    fullWidth: boolean,
    required: boolean,
  },
  control: Control,
};

export const FormFieldsController = <IInput extends unknown>({
  isError,
  error,
  fieldItem,
  componentProps,
  control,
}: Props<IInput>) => {
  const Component = FieldsFactory.create(fieldItem);

  return (
    <Controller
      control={control}
      name={fieldItem.name}
      rules={{
        deps: fieldItem.deps,
      }}
      render={({ field }) => (
        <Component
          isError={isError}
          error={error}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...fieldItem}
          {...componentProps}
          label={
          componentProps.required && fieldItem.type !== 'switch'
            ? `${fieldItem.label} *`
            : fieldItem.label
        }
        />
      )}
    />
  );
};

export default FormFieldsController;
