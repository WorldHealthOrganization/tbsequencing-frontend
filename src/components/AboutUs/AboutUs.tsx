/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import * as styles from './styles';
import PrimaryText from '../typography/PrimaryText';
import { AppButton } from '../AppButton/AppButton';
// import { ReactComponent as ScientistImage1 } from './assets/scientistImage1.svg';
// import { ReactComponent as ScientistImage2 } from './assets/scientistImage2.svg';
import { ReactComponent as SeqLogo } from './assets/seqLogo.svg';
import { ReactComponent as FindLogo } from './assets/findLogo.svg';
import { ReactComponent as UniLogo } from './assets/uniLogo.svg';
import { ReactComponent as WHOLogo } from './assets/whoLogo.svg';
import { ReactComponent as WHOLogoBig } from './assets/whoLogoBig.svg';
import { ReactComponent as StepsSvgFull } from './assets/stepsFull.svg';

import H1 from '../typography/H1';
import AppPaper from '../AppPaper';
import Partner from './components/Partner';
import Contact from './components/Contact';
import H3 from '../typography/H3';

const contactLogoProps = {
  width: '200',
  height: '176',
};

const partnersConfig = [
  {
    title: 'Seq&Treat',
    webSite: 'https://www.finddx.org/what-we-do/projects/seqtreat/',
    description: 'Seq&Treat brings next-generation tuberculosis care to underserved communities.',
    image: <SeqLogo {...contactLogoProps} />,
    id: 0,
  },
  {
    title: 'FIND',
    webSite: 'https://www.finddx.org/',
    description: 'We are a global non-profit connecting countries and communities, funders, decisionmakers, healthcare providers and developers.',
    image: <FindLogo {...contactLogoProps} />,
    id: 1,
  },
  {
    title: 'UNITAID',
    webSite: 'https://unitaid.org/#en',
    description: 'Unitaid saves lives by making new health products available and affordable for people in low- and middle-income countries.',
    image: <UniLogo {...contactLogoProps} />,
    id: 2,
  },
  {
    title: 'World Health Organization',
    webSite: 'https://www.who.int/',
    description: 'We champion health and a better future for all.',
    image: <WHOLogo {...contactLogoProps} />,
    id: 3,
  },
];

const contactsConfig = [
  {
    title: 'FIND',
    email: 'sequencing@finddx.org',
    webSite: 'https://www.finddx.org/what-we-do/projects/seqtreat/',
    linkLabel: 'https://www.finddx.org/',
    id: 1,
  },
  {
    title: 'WHO',
    email: 'tbsequencing@who.int',
    webSite: 'https://www.who.int/teams/global-tuberculosis-programme/overview',
    linkLabel: 'https://www.who.int/',
    id: 2,
  },
];

export const AboutUs = () => {
  const stepsRef = useRef<HTMLDivElement>(null!);

  return (
    <div>
      <section css={styles.topDescriptionSection}>
        <div css={styles.topDescriptionSectionLeft}>
          <H1 style={styles.header}>TBKB</H1>
          <PrimaryText style={styles.descriptionText}>
            Welcome to the
            {' '}
            <i>
              Mycobacterium tuberculosis
            </i>
            {' '}
            sequencing and phenotyping knowledgebase of the WHO Global Tuberculosis
            Programme
          </PrimaryText>
          <AppButton
            injectedLabelStyle={styles.readMoreButtonLabel}
            onClick={() => {
              stepsRef.current.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            size="large"
            variant="contained"
          >
            Read More
          </AppButton>
        </div>
      </section>
      <section css={styles.whoAreWeSection}>
        <div css={styles.whoAreWeSectionLeft}>
          <H1 style={styles.descriptionSectionHeader}>Who are we?</H1>
          <AppPaper style={styles.descriptionPaper}>
            <PrimaryText style={styles.descriptionPrimaryText}>
              The WHO Global Tuberculosis Programme works towards the goal of a world free of TB,
              with zero deaths, disease and suffering due to the disease. The team&apos;s mission is
              to lead and guide the global effort to end the TB epidemic through universal access to
              people-centred prevention and care, multisectoral action and innovation.
            </PrimaryText>
          </AppPaper>
        </div>

        {/* <div><ScientistImage1 width="431" height="304" /></div> */}
      </section>
      <section css={styles.whoAreWeSection}>
        {/* <div><ScientistImage2 width="431" height="304" /></div> */}
        <div css={styles.whoAreWeSectionLeft}>
          <H1 style={styles.descriptionSectionHeader}>Mission of the project</H1>
          <AppPaper style={styles.descriptionPaper}>
            <PrimaryText style={styles.descriptionPrimaryText}>
              The tbsequencing portal welcomes any voluntary contributions of combined
              whole genome sequencing and phenotypic drug susceptibility results (pDST) of
              {' '}
              <i>
                M. tuberculosis
              </i>
              {' '}
              clinical isolates. Terms and conditions for the data submitted to the portal are
              available in the data submission page. The tbsequencing portal handles processing
              of the raw sequencing data internally and provides aggregated statistics based on
              genotype calls in its
              different dashboard views. Ultimately, all data collected via this portal will be
              integrated for drug resistance markers identification under the WHO Mutations
              Catalogue initiative. The tbsequencing portal acknowledges the contribution of the
              {' '}
              <a css={styles.linkText} href="https://www.insdc.org/">
                International Nucleotide Sequence Database Collaboration
              </a>
              {' '}
              and uses its public ressources to achieve its goals.
            </PrimaryText>
          </AppPaper>
        </div>
      </section>
      <section ref={stepsRef} css={styles.stepsContainer}>
        <H1>How does it work?</H1>
        <div css={styles.stepsWrapper}>
          <StepsSvgFull width="1340" height="1332" />

        </div>
      </section>
      <section css={styles.partnersSection}>
        <H1 style={styles.descriptionSectionHeader}>Partners and sponsors</H1>
        <div css={styles.partnersContainer}>
          {partnersConfig.map((partnerProps, index) => {
            const marginStyle = index === 0 ? undefined : styles.partnerMargin;

            return <Partner {...partnerProps} key={partnerProps.id} marginStyle={marginStyle} />;
          })}
        </div>
      </section>
      <footer css={styles.footer}>
        <H1 style={styles.footerHeader}>Contacts</H1>
        <div css={styles.contactsContainer}>
          {contactsConfig.map((contact, index) => {
            const style = index === 0 ? undefined : styles.contactItem;

            return (
              <Contact
                {...contact}
                key={contact.id}
                style={style}
              />
            );
          })}
        </div>
        <div css={styles.logoSection}>
          <WHOLogoBig width="228" height="70" />
          <div css={styles.legalContainer}>
            <H3 style={styles.copyright}><a css={styles.linkBanner} href="https://www.who.int/about/policies/terms-of-use">© 2024 WHO</a></H3>
            <H3 style={styles.legalNotice}><a css={styles.linkBanner} href="https://www.who.int/about/policies/privacy">Privacy legal notice</a></H3>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default AboutUs;
