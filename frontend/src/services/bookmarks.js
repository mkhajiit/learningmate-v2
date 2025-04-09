import api from '../pages/api/api';

const bookmarksApi = {
  insertBookmark: async (user_id, course_id) => {
    try {
      const data = { user_id, course_id };
      const response = await api.post(`/bookmark/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getBookmarkByUserId: async (user_id) => {
    try {
      const response = await api.get(`/bookmark/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteBookmark: async (user_id, course_id) => {
    try {
      const response = await api.delete(`/bookmark/remove/${user_id}/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default bookmarksApi;
