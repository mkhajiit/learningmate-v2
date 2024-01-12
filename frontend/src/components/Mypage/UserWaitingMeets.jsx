import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserWaitingMeets() {
  const [waitingMeets, setWaitingMeets] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // 유저의 아이디 또는 다른 식별자를 사용하여 해당 유저의 승인 대기중인 참가 신청 모임들을 가져옴
    const fetchWaitingMeets = async () => {
      try {
        const response = await axios.get(`/api/userWaitingMeets/${auth.userId}`);
        setWaitingMeets(response.data.waitingMeets);
      } catch (error) {
        console.error('유저의 승인 대기중인 참가 신청 모임 가져오기 실패:', error);
      }
    };

    fetchWaitingMeets();
  }, [auth.userId]);

  return (
    <div>
      <h3>내 승인 대기중인 모임 목록</h3>
      <ul>
        {waitingMeets.map((waitingMeet) => (
          <li key={waitingMeet.meetId}>{waitingMeet.meetName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserWaitingMeets;
