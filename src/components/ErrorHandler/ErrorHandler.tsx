/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import H1 from '../typography/H1';
import imgPath from '../../assets/images/errorSvg.svg';
import { AppButton } from '../AppButton/AppButton';

export const ErrorHandler = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <div css={styles.wrapper}>
      <H1 style={styles.h1}>Oops, something went wrong...</H1>
      <H1 style={styles.h1}>
        Please, try again later
      </H1>
      <AppButton style={styles.buttonMargin} onClick={refreshPage} variant="contained" size="medium">Refresh</AppButton>
      <div css={styles.imageWrapper}>
        <img css={styles.image} src={imgPath} alt="error" />
      </div>
    </div>
  );
};

export default ErrorHandler;
