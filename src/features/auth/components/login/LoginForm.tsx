/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '@mui/material';
import { UnauthenticatedTemplate, AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { toast } from 'react-toastify';
import * as styles from './styles';
import H1 from '../../../../components/typography/H1';
import { headerMargin } from './styles';
import { AppButton } from '../../../../components/AppButton/AppButton';
import { loginRequest } from '../../../../authConfig';
import PrimaryText from '../../../../components/typography/PrimaryText';
import SecondaryText from '../../../../components/typography/SecondaryText';

export const LoginForm = () => {
  const { instance } = useMsal();

  const onLoginSSO = () => {
    instance.loginRedirect(loginRequest).catch((error) => toast.error(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const entraTenant = `${process.env.REACT_APP_ENTRA_TENANT}`;

  const contactEmailAdress = `mailto:${process.env.REACT_APP_EMAIL_CONTACT}`;

  return (
    <div css={styles.form}>
      <H1 style={headerMargin}>Sign In</H1>
      <PrimaryText style={styles.description}>
        You will be redirected to
        {' '}
        {entraTenant}
        {' '}
        authentication page to login.
      </PrimaryText>
      <SecondaryText style={styles.description}>
        Request via
        {' '}
        <a css={styles.link} href={contactEmailAdress}>
          email
        </a>
        {' '}
        an account creation.
      </SecondaryText>
      <section css={styles.buttonsSection}>
        <UnauthenticatedTemplate>
          <AppButton
            type="submit"
            variant="contained"
            size="large"
            onClick={onLoginSSO}
          >
            Login
          </AppButton>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Button
            onClick={handleLogoutRedirect}
          >
            Logout
          </Button>
        </AuthenticatedTemplate>
      </section>
    </div>
  );
};
