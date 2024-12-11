/* eslint-disable max-len,react/no-unescaped-entities */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { css } from '@emotion/react';
import * as styles from './styles';
import AppPaper from '../AppPaper';
import { useDrawerApi } from '../../features/drawer/hooks/useDrawerApi';
import H1 from '../typography/H1';
import PrimaryText from '../typography/PrimaryText';

interface Props {
  isDrawer?: boolean;
}

const paragraphs: string[] = [
  `If you upload or otherwise submit data, information or other content (User Content) to the Platform,
   you represent and warrant that you have obtained all necessary permissions and have the'
   authority to upload User Content into the Platform.`,

  `By uploading User Content you understand and agree that other registered users will have access
   to your User Content, and may use the content for non-commercial public health purposes.`,

  `You also agree that WHO may grant permission to other institutions to publish the information,
   subject to an appropriate acknowledgement of the data source.`,
];

export const DatabasePrinciplesInfo = ({ isDrawer }: Props) => {
  const { closeDrawer } = useDrawerApi();
  return (
    <AppPaper style={isDrawer ? styles.drawerStyles : styles.container}>
      {isDrawer && (
      <>
        <div css={styles.closeIconWrapper}>
          <IconButton onClick={closeDrawer}><Close sx={styles.closeIconSx} /></IconButton>
        </div>

        <H1 style={styles.header}>Terms & Conditions</H1>
      </>
      )}
      <div css={isDrawer ? styles.info : css({})}>
        {paragraphs.map((paragraph) => <PrimaryText style={styles.paragraph} key={paragraph}>{paragraph}</PrimaryText>)}
        <PrimaryText style={styles.paragraph}>
          If you do not wish other users to access or use your User Content, please advise WHO by email&nbsp;
          <a href="mailto:tbsequencing@who.int">tbsequencing@who.int</a>
          &nbsp;within 30 days of submission and provide details of the data submitted.
        </PrimaryText>
      </div>
    </AppPaper>
  );
};

export default DatabasePrinciplesInfo;
