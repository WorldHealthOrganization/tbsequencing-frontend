/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

import { Control, FieldErrors, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import { group, InternMap } from 'd3-array';
import { format } from 'date-fns';
import { useMsal } from '@azure/msal-react';
import {
  chatWrapper,
  chatMessages,
  chatOuter, chatHeaderContainer, H1Styles, H3Styles,
  textAreaContainer, sendButton, noMessagesText, closeIcon,
  date, messageStyles, awaitsForAnswerText,
} from './styles';

import Message from './Message';
import FormFields from '../FormFields';
import {
  defaultValues, ITextArea, textAreaField, textAreaSchema,
} from './textAreaConfig';
import H1 from '../typography/H1';
import H3 from '../typography/H3';
import { AppButton } from '../AppButton/AppButton';
import { useGetMessagesQuery, useSendMessagesMutation } from '../../services/submissionApi';
import { IMessage } from '../../services/submissionApi/models';
import { useDrawerApi } from '../../features/drawer/hooks/useDrawerApi';
import PrimaryText from '../typography/PrimaryText';
import LoadingWrapper from '../LoadingWrapper';

const groupMessagesByDate = (messages?: IMessage[]) => {
  if (!messages) {
    return new InternMap<string, IMessage[]>([]);
  }
  return group(messages, (value) => format(new Date(value.timestamp), 'PPP'));
};

export const Chat = () => {
  const { drawerContentProps, closeDrawer } = useDrawerApi();
  const { accounts } = useMsal();

  const { data, isLoading } = useGetMessagesQuery(
    drawerContentProps!.packageId as number,
    { refetchOnMountOrArgChange: true },
  );
  const [sendMessage] = useSendMessagesMutation();

  const [messages, setMessages] = useState<InternMap<string, IMessage[]>>(
    groupMessagesByDate(data),
  );

  useEffect(() => {
    setMessages(groupMessagesByDate(data));
  }, [data]);

  const {
    control, watch, formState: { errors }, getValues, setValue,
  } = useForm<ITextArea>({
    resolver: yupResolver(textAreaSchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchTextarea = watch('textArea');

  const renderMessages = () => {
    if (!messages.size) {
      return (
        <H3 style={noMessagesText}>
          Leave comments for the admin
          team
        </H3>
      );
    }

    return Array.from(messages.entries()).map(([key, value], index) => {
      const isLastGroup = index === messages.size - 1;
      let shouldRenderMsgFooter = false;

      return (
        <>
          <div key={key}>
            <PrimaryText style={date}>{key}</PrimaryText>
            {value?.map((message, messageIndex) => {
              const isLastMessage = messageIndex === value.length - 1;

              if (isLastMessage && isLastGroup) {
                const isUserAuthorOfMessage = message.sender.email === accounts[0]?.username;

                shouldRenderMsgFooter = isUserAuthorOfMessage;
              }

              return (
                <div css={messageStyles} key={message.timestamp}>
                  <Message
                    sender={`${message.sender.firstName || message.sender.username} ${message.sender.lastName}`}
                    timeStamp={message.timestamp}
                    text={message.content}
                    isOwnMessage={message.sender.username === accounts[0]?.username}
                  />
                </div>
              );
            })}
          </div>
          {shouldRenderMsgFooter
            && <H3 style={awaitsForAnswerText}>The admin team will answer in a few moments</H3>}
        </>
      );
    });
  };

  const addMessage = () => {
    const newMessage = {
      pk: drawerContentProps.packageId,
      sender: {
        username: accounts[0]?.username || '',
        email: accounts[0]?.username || '',
        firstName: accounts[0]?.name || '',
        lastName: accounts[0]?.name || '',
      },
      timestamp: new Date().toISOString(),
      content: getValues().textArea,
    };

    setMessages((prevState) => {
      const newMessageKey = format(new Date(newMessage.timestamp), 'PPP');
      const newMessagesMap = new InternMap(prevState);
      const prevValues = newMessagesMap.get(newMessageKey);

      if (prevValues) {
        const newValues = [
          ...prevValues,
          newMessage,
        ];
        newMessagesMap.set(newMessageKey, newValues);
        return newMessagesMap;
      }

      newMessagesMap.set(newMessageKey, [newMessage]);
      return newMessagesMap;
    });

    sendMessage(newMessage);
    setValue('textArea', '');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && watchTextarea.trim().length && !e.shiftKey) {
      addMessage();
    }
  };

  return (
    <div css={chatOuter}>
      <CloseIcon
        onClick={closeDrawer}
        sx={closeIcon}
      />
      <div css={chatHeaderContainer}>
        <H1 style={H1Styles}>Chat</H1>
        <H3 style={H3Styles}>Share your concerns and questions with the Admin</H3>
      </div>
      <div css={chatWrapper}>
        <div css={chatMessages}>
          <LoadingWrapper centered isLoading={isLoading}>
            {renderMessages()}
          </LoadingWrapper>
        </div>
      </div>
      <div tabIndex={0} css={textAreaContainer} role="button" onKeyPress={handleKeyPress}>
        <FormFields
          control={control as unknown as Control}
          fieldArray={[textAreaField]}
          errors={errors as FieldErrors}
          loading={false}
        />
        <AppButton
          onClick={() => addMessage()}
          variant="contained"
          size="small"
          style={sendButton}
          disabled={!watchTextarea.trim().length}
        >
          Send comment
        </AppButton>
      </div>
    </div>
  );
};

export default Chat;
