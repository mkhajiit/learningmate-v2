import axios from 'axios';
import { localDomain } from '../config/config';

const likesbuttonApi = {
  insertLikeButton: async (user_id, meet_id) => {
    try {
      const data = { user_id, meet_id };
      const response = await axios.post(`${localDomain}/likebutton/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getLikeButtonByUserId: async (user_id) => {
    try {
      const response = await axios.get(`${localDomain}/likebutton/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteLikeButton: async (user_id, meet_id) => {
    try {
      const response = await axios.delete(`${localDomain}/likebutton/remove/${user_id}/${meet_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default likesbuttonApi;
