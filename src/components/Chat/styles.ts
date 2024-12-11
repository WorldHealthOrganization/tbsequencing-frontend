import { css } from '@emotion/react';
import { font } from '../typography/fontSizes';
import appColors from '../../styles/colors';

const chatWrapper = css({
  backgroundColor: 'rgba(221, 239, 249, 0.25)',
  borderRadius: '4px',
  height: '424px',
  marginBottom: '24px',
  overflowY: 'auto',
});

const chatHeaderContainer = css({
  marginBottom: '28px',
});

const textAreaContainer = css({
  backgroundColor: 'rgba(221, 239, 249, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  section: {
    marginTop: 0,
  },
  textarea: {
    backgroundColor: 'transparent',
    border: 'none',
    fontFamily: font.regular,
    fontSize: '16px',
    '&::placeholder': {
      fontFamily: font.regular,
      fontSize: '16px',
      color: appColors.tints.whoBlue.lighter,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  padding: '24px',
});

const H1Styles = css({
  color: appColors.primary.navy,
});

const H3Styles = css({
  fontWeight: 400,
  fontFamily: font.regular,
});

const noMessagesText = css({
  fontWeight: 400,
  fontFamily: font.regular,
  color: appColors.tints.whoBlue.lighter,
  textAlign: 'center',
  padding: '100px 60px 0 60px',
});

const closeIcon = {
  position: 'absolute',
  top: 15,
  right: 25,
  fill: appColors.secondary.whoBlue,
  fontSize: '30px',
  cursor: 'pointer',
};

const chatOuter = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '40px',
  marginRight: '24px',
});

const chatClose = css({
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
});

const chatMessages = css({
  padding: '24px',
  marginBottom: '24px',
});

const awaitsForAnswerText = css({
  fontWeight: 400,
  color: appColors.tints.whoBlue.lighter,
  fontFamily: font.regular,
  textAlign: 'center',
});

const date = css({
  color: appColors.tints.whoBlue.lighter,
  fontWeight: 700,
  letterSpacing: '0.4px',
});

const messageText = css({
  overflowWrap: 'anywhere',
  fontFamily: font.regular,
  color: appColors.neutral.black,
  whiteSpace: 'pre-line',
  fontWeight: 400,
  marginLeft: '50px',
  marginBottom: '15px',
});

const messageHeader = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
});

const messageIcon = {
  fontSize: '40px',
  marginRight: '10px',
};

const adminSender = css({
  color: appColors.secondary.whoBlue,
  fontFamily: font.regular,
  fontWeight: 400,
});

const userSender = css({
  color: appColors.secondary.whoMagenta,
  fontFamily: font.regular,
  fontWeight: 400,
});

const messageStyles = css({
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${appColors.tints.whoBlue.lighter}`,
  },
});

const sendButton = css({
  marginLeft: 'auto',
});

export {
  chatWrapper,
  chatClose,
  messageText,
  messageHeader,
  messageIcon,
  messageStyles,
  chatMessages,
  chatOuter,
  chatHeaderContainer,
  H1Styles,
  H3Styles,
  userSender,
  adminSender,
  textAreaContainer,
  sendButton,
  noMessagesText,
  closeIcon,
  date,
  awaitsForAnswerText,
};
