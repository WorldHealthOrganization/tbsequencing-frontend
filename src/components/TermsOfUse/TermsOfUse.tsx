/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';
import BasePage from '../BasePage';
import PrimaryText from '../typography/PrimaryText';
import AppPaper from '../AppPaper';

const paragraphs: string[] = [
  'If you upload or otherwise submit data, information or other content (User Content) to the Platform, '
  + 'you represent and warrant that you have obtained all necessary permissions and have the authority '
  + 'to upload User Content into the Platform.',
  'By uploading User Content you understand and agree that '
  + 'other registered users will have access to your User Content, and may use the content for '
  + 'non-commercial public health purposes.',
  'You also agree that WHO may grant permission to other '
  + 'institutions to publish the information, subject to an appropriate acknowledgement of the data source.',
  'If you do not wish other users to access or use your User Content, please advise WHO by email '
  + 'tbsequencing@who.int within 30 days of submission and provide details of the data submitted.',
];

export const TermsOfUse = () => (
  <BasePage
    style={styles.container}
    pageHeader="TBsequencing Database Access Agreement"
  >
    <AppPaper>
      {paragraphs.map((paragraph) => (
        <PrimaryText
          style={styles.paragraph}
        >
          {paragraph}
        </PrimaryText>
      ))}
    </AppPaper>
  </BasePage>
);

export default TermsOfUse;
