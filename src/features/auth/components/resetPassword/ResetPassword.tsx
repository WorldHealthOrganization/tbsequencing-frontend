/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Control, FieldErrors,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formSchema } from './validation';
import { useResetPasswordMutation } from '../../../../services/indentityApi/identityApi';
import { getErrorMessage } from '../../../../utils/errors';
import * as styles from './styles';
import AppPaper from '../../../../components/AppPaper';
import PrimaryText from '../../../../components/typography/PrimaryText';
import { AbstractIField } from '../registration/types';
import FormFields from '../../../../components/FormFields';
import { AppButton } from '../../../../components/AppButton/AppButton';
import BasePage from '../../../../components/BasePage';

interface IInputs {
  email: string;
}

const defaultValues:IInputs = {
  email: '',
};

const fields: AbstractIField<IInputs>[] = [{
  name: 'email',
  placeholder: 'name@domain.com',
  label: 'Enter your email',
  type: 'email',
}];

export const ResetPassword = () => {
  const {
    control, formState: { errors, isValid }, handleSubmit,
  } = useForm<IInputs>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const handleSignUpPress = () => {
    navigate('/registration');
  };

  const onSubmit = async (data: IInputs) => {
    try {
      await resetPassword(data).unwrap();

      navigate('/reset-email-sent');
    } catch (error) {
      toast.error(getErrorMessage('Email not found'));
    }
  };

  return (
    <BasePage pageHeader="Restore password" css={styles.container}>
      <AppPaper style={styles.paper}>
        <PrimaryText style={styles.infoMsg}>
          Enter the email address that the account was registered with.
          After clicking the “Reset password” button, an email will be sent to the specified
          email address with a link to reset your password.
        </PrimaryText>
        <FormFields
          fieldArray={fields}
          loading={false}
          control={control as unknown as Control}
          errors={errors as FieldErrors}
        />
        <div css={styles.btnContainer}>
          <AppButton disabled={!isValid} onClick={handleSubmit(onSubmit)} variant="contained" size="large">Reset Password</AppButton>
          <AppButton style={styles.signUpBtn} size="large" variant="outlined" onClick={handleSignUpPress}>Sign Up</AppButton>
        </div>
      </AppPaper>
    </BasePage>
  );
};
