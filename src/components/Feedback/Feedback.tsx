/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Feedback as FeedbackIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import * as styles from './styles';
import BaseModal from '../BaseModal';
import H2 from '../typography/H2';
import FormFields from '../FormFields';
import { AbstractIField } from '../../features/auth/components/registration/types';
import { AppButton } from '../AppButton/AppButton';
import { useCreateFeedbackMutation } from '../../services/feederApi/feederApi';
import { baseEmailValidator, validateTextField } from '../../utils/validators';

interface IInputs {
  feedbackMsg: string;
}

interface IAnonymousInputs extends IInputs {
  email: string;
}

const defaultValues: IInputs = {
  feedbackMsg: '',
};

const anonymousDefaultValues: IAnonymousInputs = {
  ...defaultValues,
  email: '',
};

const formSchemaProps = {
  feedbackMsg: validateTextField(
    'Feedback message is required',
    10000,
  ),
};

const anonymousFormSchemaProps = {
  ...formSchemaProps,
  email: baseEmailValidator,
};

const formSchema = yup.object().shape({
  ...formSchemaProps,
});

const anonymousFormSchema = yup.object().shape({
  ...formSchemaProps,
  ...anonymousFormSchemaProps,
});

export const formFields: AbstractIField<IInputs> [] = [{
  name: 'feedbackMsg',
  type: 'textarea',
  label: 'Feedback message',
  wrapperStyles: styles.textAreaContainer,
}];

export const anonymousFields = [{
  name: 'email',
  type: 'email',
  label: 'Contact email',
  required: false,
}, ...formFields];

export const Feedback = () => {
  const { accounts } = useMsal();

  const isAnonymous = !accounts[0];

  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [sendFeedback, { isLoading, data, error }] = useCreateFeedbackMutation();

  const feedbackFormSchema = isAnonymous ? anonymousFormSchema : formSchema;
  const feedbackFormFields = isAnonymous ? anonymousFields : formFields;
  const feedbackFormDefaultValues = isAnonymous ? anonymousDefaultValues : defaultValues;

  const {
    control, formState: { errors, isValid }, handleSubmit, reset,
  } = useForm<IInputs | IAnonymousInputs>({
    resolver: yupResolver(feedbackFormSchema),
    defaultValues: feedbackFormDefaultValues,
    mode: 'onChange',
  });

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const handleOpenClick = () => setOpen(true);
  const handleCancelClick = () => closeModal();
  // @ts-ignore
  const onSubmit = ({ feedbackMsg, email }: IInputs | IAnonymousInputs) => {
    const feedbackEmail = isAnonymous ? email : accounts[0].username;

    sendFeedback({
      feedbackMsg,
      feedbackEmail,
      feedbackSrc: location.pathname,
    });
  };

  useEffect(() => {
    if (data) {
      toast.success('Your feedback was successfully sent');
      closeModal();
    }

    if (error) {
      toast.error('There was an error trying to send your feedback');
    }
  }, [data, error]);

  return (
    <div css={styles.container}>
      <IconButton onClick={handleOpenClick}>
        <FeedbackIcon sx={styles.iconSx} />
      </IconButton>
      <BaseModal open={open}>
        <>
          <H2>Provide your feedback</H2>
          <div css={styles.fieldsContainer}>
            <FormFields<IInputs | IAnonymousInputs>
              fieldArray={feedbackFormFields as unknown as AbstractIField<IInputs>[]}
              loading={false}
              control={control as unknown as Control}
              errors={errors as FieldErrors}
            />
          </div>
          <div css={styles.buttonsContainer}>
            <AppButton
              size="large"
              variant="outlined"
              onClick={handleCancelClick}
            >
              Cancel
            </AppButton>
            <AppButton
              style={styles.sendButton}
              disabled={!isValid || isLoading}
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)}
            >
              Send feedback
            </AppButton>
          </div>
        </>
      </BaseModal>
    </div>
  );
};

export default Feedback;
