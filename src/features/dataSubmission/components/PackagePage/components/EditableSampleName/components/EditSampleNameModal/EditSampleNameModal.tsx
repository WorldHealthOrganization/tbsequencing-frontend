/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import * as styles from './styles';
import { AbstractIField } from '../../../../../../../auth/components/registration/types';
import { validateTextField } from '../../../../../../../../utils/validators';
import BaseModal from '../../../../../../../../components/BaseModal';
import H2 from '../../../../../../../../components/typography/H2';
import FormFields from '../../../../../../../../components/FormFields';
import { AppButton } from '../../../../../../../../components/AppButton/AppButton';
import { useUpdateSampleMutation } from '../../../../../../../../services/submissionApi/submissionApi';

interface Props {
  name: string;
  open: boolean;
  handleCloseModal: () => void;
  sampleId: number;
  packageId: number;
}

interface IInputs {
  name: string;
}

const fields: AbstractIField<IInputs>[] = [{
  name: 'name',
  type: 'text',
  placeholder: 'Type sample name here',
  label: 'Sample name',
  wrapperStyles: styles.fieldWrapper,
}];

const formSchema = yup.object().shape({
  name: validateTextField('Sample name is required'),
});

export const EditSampleNameModal = ({
  name, open, handleCloseModal, sampleId, packageId,
}: Props) => {
  const defaultValues: IInputs = {
    name,
  };

  const {
    control, formState: { errors, isValid }, handleSubmit, reset,
  } = useForm<IInputs>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const [updateSample, { error, data }] = useUpdateSampleMutation();
  const onSubmit = (formData: IInputs) => {
    updateSample({
      name: formData.name, packageId, sampleId,
    });
  };

  useEffect(() => {
    if (data) {
      toast.success('Sample name was successfully updated');
      handleCloseModal();
    }

    if (error) {
      toast.error(
        // @ts-ignore
        error.data.errors[0].detail,
      );
    }
  }, [error, data]);

  const onCancel = () => {
    handleCloseModal();
    reset(defaultValues);
  };

  return (
    <BaseModal open={open}>
      <>
        <H2>Edit sample name</H2>
        <div css={styles.fieldWrapper}>
          <FormFields
            <IInputs>
            errors={errors as FieldErrors}
            loading={false}
            fieldArray={fields}
            control={control as unknown as Control}
          />
        </div>

        <div css={styles.buttonsContainer}>
          <AppButton onClick={onCancel} size="large" variant="outlined">Cancel</AppButton>
          <AppButton
            disabled={!isValid}
            style={styles.okayBtn}
            size="large"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </AppButton>
        </div>
      </>
    </BaseModal>
  );
};

export default EditSampleNameModal;
