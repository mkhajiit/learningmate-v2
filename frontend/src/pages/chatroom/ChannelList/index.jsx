import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverDomain } from '../../../config/config';
import CollapseButton from './sytle2';
import CreateChannelModal from '../CreateChannelModal/index';

const ChannelList = (props) => {
  const { roomData, setRoomData, onChannelClick, getChatData } = props;

  const { meetId } = useParams();
  const location = useLocation();

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState({});
  const [chatRoomInfo, setChatRoomInfo] = useState(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const getRoomData = useCallback(async () => {
    try {
      const resp = await axios.get(`${serverDomain}/chat/chatRoom/${meetId}`);
      console.log('aaa', resp.data.data.initialRoom);
      setRoomData(resp.data.data.initialRoom);
    } catch (error) {
      console.error(error);
    }
  }, [meetId, setRoomData]);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => ({
        ...list,
        [id]: undefined,
      }));
    },
    [],
  );

  const openCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const closeCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(false);
  }, []);

  useEffect(() => {
    getRoomData();
  }, [getRoomData]);

  useEffect(() => {
    if (meetId && location.pathname) {
      console.log('ChannelList: channelId 바꼈다 meetId:', meetId, location.pathname);
      setCountList({});
    }
  }, [meetId, location]);

  const onMessage = (data) => {
    console.log('message 왔다', data);
    // 새로운 메시지가 도착할 때 화면을 갱신하는 로직 추가
    getChatData();
  };

  const fetchChannelList = async () => {
    try {
      const response = await fetch(`${serverDomain}/chat/channels/${meetId}`);
      const data = await response.json();
      if (response.ok) {
        setChatRoomInfo(data.data);
      } else {
        console.error('Failed to fetch channel list:', data.message);
      }
    } catch (error) {
      console.error('Error fetching channel list:', error.message);
    }
  };

  const fetchAndUpdateChannelList = async () => {
    try {
      const response = await axios.get(`${serverDomain}/chat/channels/${meetId}`);
      const { data } = response.data;

      setChatRoomInfo(data);
    } catch (error) {
      console.error('Error fetching and updating channel list:', error.message);
    }
  };

  useEffect(() => {
    fetchChannelList(); // 최초 렌더링 시에 채널 목록 가져오기
  }, [meetId]);

  useEffect(() => {
    // 풀링 주기 설정 (예: 10초마다 채널 목록 갱신)
    const pollingInterval = setInterval(() => {
      fetchAndUpdateChannelList();
    }, 1000); // 10초

    return () => clearInterval(pollingInterval);
  }, [meetId]);

  const handleChannelClick = useCallback(
    async (channel) => {
      try {
        const response = await axios.get(`${serverDomain}/chat/chatRoom/${meetId}/channels/${channel.channel_id}}`);
        const chatRoomData = response.data.data.channelRoom;
        console.log('ddddd', chatRoomData);
        setRoomData(chatRoomData);
        onChannelClick(channel);
      } catch (error) {
        console.error(error);
      }
    },
    [meetId, setRoomData, onChannelClick],
  );

  useEffect(() => {
    fetchChannelList();
  }, [meetId]);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className='c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline'
            data-qa='channel-section-collapse'
            aria-hidden='true'
          />
        </CollapseButton>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          chatRoomInfo?.channelList?.map((channel) => {
            const count = countList[`c-${channel.channel_description}`];
            return (
              <React.Fragment key={channel.channel_id}>
                <NavLink
                  to={`/chat/chatRoom/${meetId}/channels/${channel.channel_id}`}
                  onClick={() => {
                    resetCount(`c-${channel.channel_id}`)();
                    onChannelClick(channel);
                  }}
                >
                  <span className={count !== undefined && count >= 0 ? 'bold' : undefined}>
                    # {channel.channel_description}
                  </span>
                  {count !== undefined && count > 0 && <span className='count'>{count}</span>}
                </NavLink>
              </React.Fragment>
            );
          })}
      </div>

      <button
        onClick={openCreateChannelModal}
        style={{
          width: '200px',
          margin: '0 auto',
          border: 'none',
          borderRadius: '5px',
          padding: '2px 8px',
          background: 'transparent',
          color: '#fff',
          cursor: 'pointer',
          display: 'block',
          transition: 'background-color 0.3s',
          // fontSize: '14px',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = 'rgba(143, 125, 125, 0.2)';
          e.target.style.borderRadius = '5px';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        + 채널추가
      </button>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={closeCreateChannelModal}
        onChannelCreated={(newChannel) => {
          console.log('New Channel Created:', newChannel);

          // 서버 응답에서 직접 값을 추출
          const { channel_id, description } = newChannel || {};

          console.log('Channel Info from Server:', { channel_id, description });

          // 서버 응답에서 직접 값을 추출하여 UI 업데이트 등을 진행
          // 예를 들어, channel_id 및 description 등을 활용
          // UI 업데이트 등을 진행
          closeCreateChannelModal();
        }}
        meetId={meetId}
      />
    </>
  );
};

export default ChannelList;
