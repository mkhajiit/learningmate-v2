import axios from 'axios';
import { serverDomain } from '../config/config';

const coursesApi = {
  // 강의 전체 리스트 get
  getCourseList: async () => {
    try {
      const response = await axios.get(`${serverDomain}/courses/courseList`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 세부 정보 get
  getCourse: async (course_id, user_id) => {
    try {
      const response = await axios.get(`${serverDomain}/courses/course/${course_id}`, {
        params: { userId: user_id },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  getMainCourseList: async () => {
    try {
      const response = await axios.get(`${serverDomain}/courses/main-course-list`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 삭제 delete통신
  deleteCourse: async (course_id) => {
    try {
      const response = await axios.delete(`${serverDomain}/courses/delete/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 등록 post통신
  insertCourse: async (formData) => {
    try {
      const response = await axios.post(`${serverDomain}/courses/insert`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 업데이트 patch 통신
  updateCourse: async (formData) => {
    try {
      const response = await axios.patch(`${serverDomain}/courses/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  // 해당 유저가 올린 강의
  myCourseList: async (user_id) => {
    try {
      const response = await axios.get(`${serverDomain}/courses/courseList/${user_id}`, {
        params: { userId: user_id },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default coursesApi;
