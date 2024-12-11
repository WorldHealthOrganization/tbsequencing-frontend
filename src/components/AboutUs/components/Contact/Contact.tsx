/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import H2 from '../../../typography/H2';
import PrimaryText from '../../../typography/PrimaryText';

interface Props {
  title: string;
  phone?: string;
  email: string;
  webSite: string;
  style?: SerializedStyles;
  linkLabel: string;
}

export const Contact = ({
  title,
  phone,
  email,
  webSite,
  style,
  linkLabel,
}: Props) => (
  <div css={[styles.container, style]}>
    <H2 style={styles.header}>{title}</H2>
    {
     phone && (
     <a css={styles.link} href={`tel:${phone}`}>
       <PrimaryText style={styles.primaryText}>Phone: </PrimaryText>
       <PrimaryText style={[styles.primaryText, styles.primaryTextRight]}>{phone}</PrimaryText>
     </a>
     )
    }

    <a css={styles.link} href={`mailto: ${email}`}>
      <PrimaryText style={[styles.primaryText, styles.primaryTextRight]}>{email}</PrimaryText>
    </a>

    <a css={styles.link} target="_blank" href={webSite} rel="noreferrer">
      <PrimaryText style={[styles.primaryText, styles.primaryTextRight]}>{linkLabel}</PrimaryText>
    </a>

  </div>
);

export default Contact;
