import axios from 'axios';
import { localDomain } from '../config/config';

const bookmarksApi = {
  insertBookmark: async (user_id, course_id) => {
    try {
      const data = { user_id, course_id };
      const response = await axios.post(`${localDomain}/bookmark/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getBookmarkByUserId: async (user_id) => {
    try {
      const response = await axios.get(`${localDomain}/bookmark/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteBookmark: async (user_id, course_id) => {
    try {
      const response = await axios.delete(`${localDomain}/bookmark/remove/${user_id}/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default bookmarksApi;
