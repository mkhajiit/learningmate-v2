import axios from 'axios';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../components/Modal/index';
import useInput from '../hooks/useInput';
import { Button, Input, Label } from './style';

const CreateChannelModal = ({ show, onCloseModal, onChannelCreated, meetId }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');

  const onCreateChannel = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) {
        toast.error('채널 이름을 입력하세요.', { position: 'bottom-center' });
        return;
      }

      try {
        // 여기서 axios.post로 새로운 채널을 추가하는 API 호출을 합니다.
        const response = await axios.post(`http://localhost:8000/chat/chatRoom/${meetId}/channels`, {
          description: newChannel,
        });

        // 모달 닫기, 입력 값 초기화 및 부모 컴포넌트에게 채널 추가 알림
        onCloseModal();
        setNewChannel('');
        onChannelCreated(response.data); // 부모 컴포넌트에게 새로운 채널 정보 전달
      } catch (error) {
        console.error('채널 추가 실패:', error.message);
        toast.error('채널 추가에 실패했습니다.', { position: 'bottom-center' });
      }
    },
    [newChannel, onCloseModal, setNewChannel, onChannelCreated],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id='channel-label' style={{ color: 'gray' }}>
          <span>채널 이름</span>
          <Input id='channel' value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type='submit'>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
