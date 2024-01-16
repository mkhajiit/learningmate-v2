import React, { useEffect, useState } from 'react';
import fetcher from '../utils/fetcher';

const SomePage = () => {
  const [chatRoomInfo, setChatRoomInfo] = useState(null);

  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      try {
        const meetId = 19; // 예시로 하드코딩, 실제로는 동적으로 결정
        const url = `/api/participants/chatroom-info/${meetId}`;
        const data = await fetcher(url);

        setChatRoomInfo(data);
      } catch (error) {
        console.error('Error fetching chat room info:', error);
      }
    };

    fetchChatRoomInfo();
  }, []);

  return (
    <div>
      {/* chatRoomInfo를 사용하여 원하는 렌더링을 수행 */}
      {chatRoomInfo && (
        <div>
          <h2>Chat Room Information</h2>
          <pre>{JSON.stringify(chatRoomInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SomePage;
