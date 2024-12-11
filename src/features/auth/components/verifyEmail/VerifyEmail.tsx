/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegistrationConfirmMutation } from '../../../../services/indentityApi/identityApi';
import { getPathFromLocation } from '../../../../utils/location';
import * as styles from './styles';
import H1 from '../../../../components/typography/H1';
import { ReactComponent as FooterImage } from './assets/bgImage.svg';
import { AppButton } from '../../../../components/AppButton/AppButton';
import ActivityIndicator from '../../../../components/ActivityIndicator';

export const VerifyEmail = () => {
  const [registrationConfirm, { isLoading, data }] = useRegistrationConfirmMutation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const key = getPathFromLocation(pathname);

  useEffect(() => {
    registrationConfirm({ key });
  }, [key, registrationConfirm]);

  if (isLoading || !data) {
    return <ActivityIndicator centered />;
  }

  const handleOkayClick = () => {
    navigate('/overview');
  };

  return (
    <div css={styles.container}>
      <div css={styles.headerWrapper}>
        <H1 style={styles.header}>The email address has been successfully confirmed</H1>
        <AppButton
          style={styles.okayBtn}
          onClick={handleOkayClick}
          variant="contained"
          size="large"
        >
          Okay
        </AppButton>
      </div>
      <FooterImage height={589} width={768} />
    </div>
  );
};
