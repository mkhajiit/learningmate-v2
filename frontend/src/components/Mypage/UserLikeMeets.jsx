import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserLikeMeets() {
  const [userLikeMeets, setUserLikeMeets] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // 유저의 아이디 또는 다른 식별자를 사용하여 해당 유저가 좋아하는 모임들을 가져옴
    const fetchUserLikeMeets = async () => {
      try {
        const response = await axios.get(`/api/userLikeMeets/${auth.userId}`);
        setUserLikeMeets(response.data.userLikeMeets);
      } catch (error) {
        console.error('좋아하는 모임 가져오기 실패:', error);
      }
    };

    fetchUserLikeMeets();
  }, [auth.userId]);

  // 승인이 난 모임들만 필터링
  const approvedLikeMeets = userLikeMeets.filter((meet) => meet.approved);

  return (
    <div>
      <h3>좋아하는 모임 목록</h3>
      <ul>
        {approvedLikeMeets.map((meet) => (
          <li key={meet.meetId}>{meet.meetName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserLikeMeets;
