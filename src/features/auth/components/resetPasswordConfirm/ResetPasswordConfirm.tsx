/** @jsxImportSource @emotion/react */
import React from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormFields from '../../../../components/FormFields';
import { formSchema } from './validation';
import type { AbstractIField } from '../registration/types';
import { useResetPasswordConfirmMutation } from '../../../../services/indentityApi/identityApi';
import { getPathFromLocation, getPrevPathFromLocation } from '../../../../utils/location';
import { getErrorMessage } from '../../../../utils/errors';
import * as styles from './styles';
import BasePage from '../../../../components/BasePage';
import AppPaper from '../../../../components/AppPaper';
import { AppButton } from '../../../../components/AppButton/AppButton';
import H3 from '../../../../components/typography/H3';

interface IInputs {
  newPassword1: string;
  newPassword2: string;
}

const defaultValues: IInputs = {
  newPassword1: '',
  newPassword2: '',
};

const inputs: AbstractIField<IInputs>[] = [
  {
    label: 'New password',
    type: 'password',
    name: 'newPassword1',
    wrapperStyles: styles.inputWrapper,
    showPasswordHint: true,
  },
  {
    label: 'Confirm password',
    type: 'password',
    name: 'newPassword2',
    wrapperStyles: styles.inputWrapper,
  },
];

export const ResetPasswordConfirm = () => {
  const {
    control, formState: { errors, isValid }, handleSubmit,
  } = useForm<IInputs>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const [confirmReset, { isLoading }] = useResetPasswordConfirmMutation();
  const { pathname } = useLocation();
  const token = getPathFromLocation(pathname);
  const uid = getPrevPathFromLocation(pathname);
  const navigate = useNavigate();

  const onSubmit = async (data: IInputs) => {
    const requestData = { ...data, token, uid };

    try {
      await confirmReset(requestData).unwrap();
      toast.success('Password was successfully changed');
      navigate('/overview');
    } catch (e) {
      toast.error(getErrorMessage('Unable to change password'));
    }
  };

  return (
    <BasePage pageHeader="Restore password">
      <AppPaper style={styles.paper}>
        <H3
          style={styles.subheader}
        >
          Your password has been successfully reset. Enter a new password
        </H3>
        <FormFields<IInputs>
          fieldArray={inputs}
          control={control as unknown as Control}
          loading={isLoading}
          errors={errors as FieldErrors}
        />
        <AppButton
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          style={styles.buttonStyles}
          disabled={!isValid}
        >
          Change password
        </AppButton>
      </AppPaper>
    </BasePage>
  );
};
