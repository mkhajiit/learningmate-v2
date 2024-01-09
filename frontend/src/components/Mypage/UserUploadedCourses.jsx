import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserUploadedCourses() {
  const [userUploadedCourses, setUserUploadedCourses] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // 유저의 아이디 또는 다른 식별자를 사용하여 해당 유저가 업로드한 강의들을 가져옴
    const fetchUserUploadedCourses = async () => {
      try {
        const response = await axios.get(`/api/userUploadedCourses/${auth.userId}`);
        setUserUploadedCourses(response.data.userUploadedCourses);
      } catch (error) {
        console.error('유저가 업로드한 강의 가져오기 실패:', error);
      }
    };

    fetchUserUploadedCourses();
  }, [auth.userId]);

  return (
    <div>
      <h3>내가 업로드한 강의 목록</h3>
      <ul>
        {userUploadedCourses.map((course) => (
          <li key={course.courseId}>{course.courseName}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserUploadedCourses;
