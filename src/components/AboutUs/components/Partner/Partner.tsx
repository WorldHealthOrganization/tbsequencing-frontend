/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { SerializedStyles } from '@emotion/react';
import * as styles from './styles';
import H3 from '../../../typography/H3';
import PrimaryText from '../../../typography/PrimaryText';

interface Props {
  image: ReactElement;
  title: string;
  webSite: string;
  description: string;
  marginStyle?: SerializedStyles;
}

export const Partner = ({
  image, description, title, webSite, marginStyle,
}: Props) => (
  <div css={[styles.container, marginStyle]}>
    {image}
    <H3 style={styles.title}><a css={styles.link} href={webSite}>{title}</a></H3>
    <PrimaryText style={styles.description} css={styles.description}>{description}</PrimaryText>
  </div>
);

export default Partner;
