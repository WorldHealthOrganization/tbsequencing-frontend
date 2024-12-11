/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Control, FieldError, FieldErrors,
} from 'react-hook-form';
import ActivityIndicator from '../ActivityIndicator';
import { AbstractIField } from '../../features/auth/components/registration/types';
import * as styles from './styles';
import FormFieldsController from './components/FormFieldsController';

interface Props<IInput> {
  fieldArray: AbstractIField<IInput>[];
  control: Control;
  loading: boolean;
  errors: FieldErrors;
  fullWidth?: boolean;
}

export const FormFields = <IInput extends unknown>({
  fieldArray, control, loading, errors, fullWidth = true,
}: Props<IInput>) => {
  if (loading) {
    return <ActivityIndicator centered />;
  }

  return (
    <>
      {fieldArray.map(
        (fieldItem) => {
          const error = errors[fieldItem.name];
          const required = fieldItem.required !== undefined ? fieldItem.required : true;
          const componentProps = { required, fullWidth };
          const isError = Boolean(error);
          const { wrapperStyles } = fieldItem;

          return (
            <section css={[styles.sectionStyles, wrapperStyles]} key={fieldItem.name}>
              <FormFieldsController
                <IInput>
                fieldItem={fieldItem}
                control={control}
                isError={isError}
                error={error as unknown as FieldError}
                componentProps={componentProps}
              />
            </section>
          );
        },
      )}
    </>
  );
};

export default FormFields;
