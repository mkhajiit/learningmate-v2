import api from '../pages/api/api';

const likesbuttonApi = {
  insertLikeButton: async (user_id, meet_id) => {
    try {
      const data = { user_id, meet_id };
      const response = await api.post(`/likebutton/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getLikeButtonByUserId: async (user_id) => {
    try {
      const response = await api.get(`/likebutton/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteLikeButton: async (user_id, meet_id) => {
    try {
      const response = await api.delete(`/likebutton/remove/${user_id}/${meet_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default likesbuttonApi;
