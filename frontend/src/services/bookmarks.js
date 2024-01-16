import axios from 'axios';
import { serverDomain } from '../config/config';

const bookmarksApi = {
  insertBookmark: async (user_id, course_id) => {
    try {
      const data = { user_id, course_id };
      const response = await axios.post(`${serverDomain}/bookmark/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getBookmarkByUserId: async (user_id) => {
    try {
      const response = await axios.get(`${serverDomain}/bookmark/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteBookmark: async (user_id, course_id) => {
    try {
      const response = await axios.delete(`${serverDomain}/bookmark/remove/${user_id}/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default bookmarksApi;
