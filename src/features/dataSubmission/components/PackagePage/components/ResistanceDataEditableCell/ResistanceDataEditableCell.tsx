/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { IconButton } from '@mui/material';
import { ModeEditOutlined } from '@mui/icons-material';
import { AbstractIField } from '../../../../../auth/components/registration/types';
import { registrationValidationFormSchema } from '../../../../../auth/components/registration/validation';
import FormFields from '../../../../../../components/FormFields';
import PrimaryText from '../../../../../../components/typography/PrimaryText';

interface Props {
  initialName: string;
}

interface IInputs {
  name: string;
}

const formFields: AbstractIField<IInputs>[] = [{ name: 'name', label: '', type: 'text' }];

export const ResistanceDataEditableCell = ({ initialName }: Props) => {
  const [editable, setEditable] = useState<boolean>(false);
  const defaultValues: IInputs = {
    name: initialName,
  };
  const {
    control, formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(registrationValidationFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleEditClick = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  return editable ? (
    <FormFields<IInputs>
      control={control as unknown as Control}
      loading={false}
      fieldArray={formFields}
      errors={errors as FieldErrors}
    />
  ) : (
    <div>
      <PrimaryText>{initialName}</PrimaryText>
      <IconButton onClick={handleEditClick}>
        <ModeEditOutlined />
      </IconButton>
    </div>
  );
};

export default ResistanceDataEditableCell;
