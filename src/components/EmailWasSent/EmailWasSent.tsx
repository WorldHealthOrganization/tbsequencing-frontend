/** @jsxImportSource @emotion/react */
import React from 'react';
import { styles } from './styles';
import H1 from '../typography/H1';
import imgPath from '../../assets/images/email-sent.png';

export const EmailWasSent = () => (
  <div>
    <H1 style={styles.h1}>Your request has been processed</H1>
    <H1 style={styles.h1}>
      If a user with this email exists, you will receive an email with further instructions
    </H1>
    <div css={styles.imageWrapper}>
      <img css={styles.image} src={imgPath} alt="email was sent" />
    </div>
  </div>
);

export default EmailWasSent;
