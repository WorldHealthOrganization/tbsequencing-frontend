/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import * as styles from './styles';
import BaseModal from '../../../../../../../../components/BaseModal';
import H1 from '../../../../../../../../components/typography/H1';
import { AbstractIField } from '../../../../../registration/types';
import FormFields from '../../../../../../../../components/FormFields';
import { validatePassword } from '../../../../../../../../utils/validators';
import { AppButton } from '../../../../../../../../components/AppButton/AppButton';
import { useChangePasswordMutation } from '../../../../../../../../services/indentityApi/identityApi';
import { IHttpError } from '../../../../../../../../models/HttpError';
import { useHttpError } from '../../../../../../../../hooks/useHttpError';

interface Props {
  isOpened: boolean;
  handleClose: () => void;
}

interface IInputs {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

const defaultValues: IInputs = {
  oldPassword: '',
  newPassword1: '',
  newPassword2: '',
};

const formFields:AbstractIField<IInputs>[] = [
  {
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Old Password',
  },
  {
    name: 'newPassword1',
    type: 'password',
    placeholder: 'Enter your password',
    deps: 'newPassword2',
    showPasswordHint: true,
    label: 'New Password',
    wrapperStyles: styles.fieldWrapper,
  },
  {
    name: 'newPassword2',
    type: 'password',
    deps: 'newPassword1',
    placeholder: 'Repeat password',
    label: 'Confirm Password',
    wrapperStyles: styles.fieldWrapper,
  },
];

const formSchema = yup.object().shape({
  newPassword1: validatePassword,
  newPassword2: yup.string().oneOf([yup.ref('newPassword1')], 'Passwords do not match'),
  oldPassword: validatePassword,
});

export const ChangePasswordModal = ({ isOpened, handleClose }: Props) => {
  const {
    control, formState: { errors, isValid }, setError, handleSubmit, reset,
  } = useForm<IInputs>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const [changePassword, { error, data }] = useChangePasswordMutation();

  useHttpError<IInputs>(error as IHttpError, setError);

  useEffect(() => {
    if (data) {
      toast.success('Password was successfully changed');
      reset();
      handleClose();
    }
  }, [data]);

  const onSubmit = (fieldData: IInputs) => {
    changePassword(fieldData);
  };

  const onCancel = () => {
    handleClose();
    reset(defaultValues);
  };

  return (
    <BaseModal open={isOpened}>
      <div>
        <H1>Change password</H1>
        <div css={styles.fieldsContainer}>
          <FormFields<IInputs>
            control={control as unknown as Control}
            errors={errors as FieldErrors}
            fieldArray={formFields}
            loading={false}
          />
        </div>
        <div css={styles.buttonsContainer}>
          <AppButton onClick={onCancel} variant="outlined" size="large">Cancel</AppButton>
          <AppButton
            style={styles.changePasswordBtn}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            variant="contained"
            size="large"
          >
            Change password
          </AppButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default ChangePasswordModal;
