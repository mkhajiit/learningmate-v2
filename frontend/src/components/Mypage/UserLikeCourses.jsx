import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserLikeCourses() {
  const [userLikeCourses, setUserLikeCourses] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // 유저의 아이디 또는 다른 식별자를 사용하여 해당 유저가 좋아요한 강의들을 가져옴
    const fetchUserLikeCourses = async () => {
      try {
        const response = await axios.get(`/api/userLikeCourses/${auth.userId}`);
        setUserLikeCourses(response.data.userLikeCourses);
      } catch (error) {
        console.error('좋아요한 강의 가져오기 실패:', error);
      }
    };

    fetchUserLikeCourses();
  }, [auth.userId]);

  return (
    <div>
      <h3>구독한 강의 목록</h3>
      <ul>
        {userLikeCourses.map((course) => (
          <li key={course.courseId}>{course.courseName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserLikeCourses;
