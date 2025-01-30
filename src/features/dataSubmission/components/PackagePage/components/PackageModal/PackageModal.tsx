/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import {
  Control, FieldErrors, UnpackNestedValue, useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as styles from './styles';
import H2 from '../../../../../../components/typography/H2';

import AppButton from '../../../../../../components/AppButton';
import BaseModal from '../../../../../../components/BaseModal';
import FormFields from '../../../../../../components/FormFields';
import { validateTextField } from '../../../../../../utils/validators';
import { AbstractIField } from '../../../../../auth/components/registration/types';

interface Props {
  open: boolean;
  onCancelClick: () => void;
  onSubmit: (data: UnpackNestedValue<IInputs>) => Promise<void>;
  okayLabel: string;
  cancelLabel: string;
  initialName?: string;
  initialDescription?: string;
  isLoading: boolean;
  title: string;
}

export interface IInputs {
  name: string;
  description: string;
}

const formConfig: AbstractIField<IInputs>[] = [{
  type: 'text',
  label: 'Package Name',
  name: 'name',
  placeholder: 'Package Name',
}, {
  type: 'text',
  label: 'Description',
  name: 'description',
  placeholder: 'Description text is here',
  wrapperStyles: styles.description,
  required: false,
}];

export const createPackageSchema = yup.object().shape({
  name: validateTextField('Package name is required'),
});

export const PackageModal = ({
  open, onCancelClick, onSubmit, initialName, cancelLabel, okayLabel, isLoading, title,
  initialDescription,
}: Props) => {
  const defaultValues: IInputs = {
    name: initialName || '',
    description: initialDescription || '',
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IInputs>({
    defaultValues,
    resolver: yupResolver(createPackageSchema),
    mode: 'onChange',
  });

  const onCancel = () => {
    onCancelClick();
    reset(defaultValues);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [open, initialDescription, initialName]);

  return (
    <BaseModal open={open}>
      <>
        <H2>{title}</H2>
        <div css={styles.fieldsContainer}>
          <FormFields
            <IInputs>
            fieldArray={formConfig}
            control={control as unknown as Control}
            loading={isLoading}
            errors={errors as FieldErrors}
          />
        </div>
        <div css={styles.buttons}>
          <AppButton 
            style={styles.cancelBtn} 
            onClick={onCancel} 
            variant="outlined" 
            size="large"
          >
            {cancelLabel}
          </AppButton>
          <AppButton 
            disabled={isLoading} 
            onClick={handleSubmit(onSubmit)} 
            variant="contained" 
            size="large"
          >
            {okayLabel}
          </AppButton>
        </div>
      </>
    </BaseModal>
  );
};

export default PackageModal;
