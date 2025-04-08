import { useParams } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import { ChatArea, Form, Toolbox } from './style';
import { post, get } from '../utils/fetcher';
import useInput from '../hooks/useInput';
import { localDomain } from '../../../config/config';

const ChatBox = ({ onSubmitForm, chat, onChangeChat, placeholder, userData }) => {
  const { meetId, channelId } = useParams();
  const textareaRef = useRef(null);
  const [chatValue, chatHandler, setChatValue] = useInput(chat);
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, [textareaRef.current]);

  useEffect(() => {
    const fetchNewMessages = async () => {
      try {
        const response = await get(`${localDomain}/chat/chatRoom/${meetId}/channels/${channelId}`);
        setNewMessages(response.data);
      } catch (error) {
        console.error('새로운 채팅 메시지 가져오기 실패:', error.message);
      }
    };

    const intervalId = setInterval(fetchNewMessages, 2000);

    return () => clearInterval(intervalId);
  }, [meetId, channelId, setNewMessages]);

  const onKeydownChat = async (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();

        const senderUserId = userData.userId;
        const senderNickname = userData.nickname;
        const senderProfile = userData.profilePath;

        try {
          await post(`${localDomain}/chat/sendMessage/${meetId}/${channelId}`, {
            content: chatValue,
            senderUserId,
            senderNickname,
            senderProfile,
          });

          // 수정된 부분: 채팅 전송 후 메시지 창 비우기
          setChatValue('');

          onSubmitForm(e);
        } catch (error) {
          console.error('채팅 메시지 전송 실패:', error.message);
        }
      }
    }
  };

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <Toolbox>
          <textarea
            ref={textareaRef}
            value={chatValue}
            onChange={chatHandler}
            onKeyDown={onKeydownChat}
            placeholder={'내용을 입력한 뒤 enter을 눌러주세요'}
            style={{
              flex: '1',
              border: 'none',
              padding: '8px 10px',
              outline: 'none',
              borderRadius: '4px',
              resize: 'none',
              lineHeight: '22px',
            }}
          />
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
