import { css } from '@emotion/react';
import { font, fontSizes } from '../typography/fontSizes';
import appColors from '../../styles/colors';
// import bgImage from './assets/topBg.png';

export const topDescriptionSection = css({
  paddingTop: 110,
  paddingLeft: 122,
  paddingBottom: 151,
  // background: `url(${bgImage}) no-repeat`,
  backgroundSize: 'cover',
  display: 'flex',
});

export const header = css({
  fontSize: fontSizes.h0,
  lineHeight: '40px',
});

export const descriptionText = css({
  marginTop: 40,
  marginBottom: 40,
  fontSize: fontSizes.h2,
  lineHeight: '36px',
});

export const topDescriptionSectionLeft = css({
  width: '75%',
});

export const readMoreButtonLabel = css({
  fontFamily: font.bold,
});

export const whoAreWeSection = css({
  marginTop: 64,
  display: 'flex',
  paddingLeft: 54,
  paddingRight: 40,
});

export const whoAreWeSectionLeft = css({

  flexDirection: 'column',
  flexWrap: 'wrap',
});

export const descriptionPrimaryText = css({
  fontSize: 16,
  lineHeight: '32px',
});

export const descriptionSectionHeader = css({
  marginBottom: 24,
});

export const descriptionPaper = css({
  marginRight: 10,
});

export const partnersSection = css({
  marginTop: 50,
  background: 'rgba(221, 239, 249, 0.25)',
  paddingLeft: 54,
  paddingRight: 54,
  paddingTop: 40,
  paddingBottom: 60,
});

export const partnersContainer = css({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 46,
});

export const footer = css({
  marginTop: 64,
  backgroundColor: appColors.primary.navy,
  paddingTop: 40,
  paddingBottom: 50,
  paddingLeft: 54,
  paddingRight: 64,
});

export const footerHeader = css({
  marginBottom: 24,
  color: appColors.neutral.white,
});

export const contactsContainer = css({
  display: 'flex',
  justifyContent: 'center',
});

export const contactItem = css({
  marginLeft: 126,
});

export const logoSection = css({
  marginTop: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const legalHeaderBaseStyle = {
  color: appColors.neutral.white,
};

export const copyright = css({
  ...legalHeaderBaseStyle,
});

export const legalNotice = css({
  ...legalHeaderBaseStyle,
  marginLeft: 100,
});

export const legalContainer = css({
  display: 'flex',
});

export const partnerMargin = css({
  marginLeft: 76,
});

export const stepsContainer = css({
  paddingLeft: 54,
  paddingRight: 54,
});

export const stepsWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 24,
});

export const step0 = css({
  top: '8vh',
  right: '17vw',
  width: 312,
});

export const step1 = css({
  top: '1%',
  left: '1%',
  width: 200,
});

export const linkBanner = css({
  color: appColors.neutral.white,
  textDecoration: 'none',
  ':hover': {
    backgroundColor: appColors.secondary.whoBlue,
  },
  display: 'flex',
});

export const linkText = css({
  color: appColors.secondary.whoBlue,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    textDecorationColor: appColors.secondary.whoBlue,
  },
});
