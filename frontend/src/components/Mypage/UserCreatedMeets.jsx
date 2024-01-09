import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserCreatedMeets() {
  const [userCreatedMeets, setUserCreatedMeets] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // 유저의 아이디 또는 다른 식별자를 사용하여 해당 유저가 만든 모임들을 가져옴
    const fetchUserCreatedMeets = async () => {
      try {
        const response = await axios.get(`/api/userCreatedMeets/${auth.userId}`);
        setUserCreatedMeets(response.data.userCreatedMeets);
      } catch (error) {
        console.error('유저가 만든 모임 가져오기 실패:', error);
      }
    };

    fetchUserCreatedMeets();
  }, [auth.userId]);

  return (
    <div>
      <h3>내가 만든 모임 목록</h3>
      <ul>
        {userCreatedMeets.map((meet) => (
          <li key={meet.meetId}>{meet.meetName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserCreatedMeets;
