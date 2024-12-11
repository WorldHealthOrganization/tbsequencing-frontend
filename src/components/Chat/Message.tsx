/** @jsxImportSource @emotion/react */
import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { format, parseISO } from 'date-fns';
import {
  messageText, messageHeader, messageIcon, userSender, adminSender,
} from './styles';
import appColors from '../../styles/colors';
import H3 from '../typography/H3';

interface IMessageProps {
  sender: string,
  text: string,
  timeStamp: string,
  isOwnMessage?: boolean
}

const Message = ({
  sender, text, timeStamp, isOwnMessage,
}: IMessageProps) => (
  <div>
    <div css={messageHeader}>
      <AccountBoxIcon
        sx={messageIcon}
        htmlColor={isOwnMessage ? appColors.secondary.whoMagenta : appColors.secondary.whoBlue}
      />
      <H3 style={isOwnMessage ? userSender : adminSender}>
        {`${sender}, ${format(parseISO(timeStamp), 'HH:mm')}`}
      </H3>
    </div>
    <H3 style={messageText}>{text}</H3>
  </div>
);

export default Message;
