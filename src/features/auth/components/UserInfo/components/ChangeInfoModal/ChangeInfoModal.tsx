/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import * as styles from './styles';
import {
  validateEmail, validatePhone,
  validateTextField,
} from '../../../../../../utils/validators';
import H1 from '../../../../../../components/typography/H1';
import { AppButton } from '../../../../../../components/AppButton/AppButton';
import BaseModal from '../../../../../../components/BaseModal';
import { useChangeUserInfoMutation } from '../../../../../../services/indentityApi/identityApi';
import { IChangeUserInfoRequest } from '../../../../../../services/indentityApi/models';
import { useHttpError } from '../../../../../../hooks/useHttpError';
import { IHttpError } from '../../../../../../models/HttpError';

interface IInputs {
  firstName: string;
  lastName: string;
  institutionHeadName: string;
  institutionName: string;
  institutionPhone: string;
  institutionHeadEmail: string;
  institutionCountry: string;
}

interface Props {
  isOpened: boolean;
  handleClose: () => void;
}

const formSchema = yup.object().shape({
  firstName: validateTextField('First name is mandatory'),
  lastName: validateTextField('Last name is mandatory'),
  institutionHeadName: yup.string().required('Head of Lab is mandatory'),
  institutionName: yup.string().required('Institution is mandatory'),
  institutionPhone: validatePhone('Phone number is mandatory'),
  institutionHeadEmail: validateEmail('Email of Lab is mandatory'),
  institutionCountry: yup.string().required('Institution country is mandatory'),
});

export const ChangeInfoModal = ({
  isOpened, handleClose,
}: Props) => {
  const [changeUserInfo, { error, data }] = useChangeUserInfoMutation();
  const {
    formState: { isValid }, handleSubmit, setError, reset,
  } = useForm<IInputs>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  useHttpError<IInputs>(
    error as IHttpError,
    setError,
    'firstName',
  );

  useEffect(() => {
    if (data) {
      toast.success('User information was successfully changed');
      handleClose();
    }
  }, [data]);

  const onSubmit = (formData: IInputs) => {
    const requestParams: IChangeUserInfoRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      profile: {
        institutionCountry: formData.institutionCountry,
        institutionName: formData.institutionName,
        institutionHeadEmail: formData.institutionHeadEmail,
        institutionPhone: formData.institutionPhone,
        institutionHeadName: formData.institutionHeadName,
      },
    };
    changeUserInfo(requestParams);
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <BaseModal modalStyle={styles.baseModalSx} open={isOpened}>
      <div>
        <H1>Change info</H1>
        <div css={styles.buttonsContainer}>
          <AppButton onClick={onCancel} variant="outlined" size="large">Cancel</AppButton>
          <AppButton
            style={styles.changePasswordBtn}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            variant="contained"
            size="large"
          >
            Save
          </AppButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default ChangeInfoModal;
