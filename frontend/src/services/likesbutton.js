import axios from 'axios';
import { serverDomain } from '../config/config';

const likesbuttonApi = {
  insertLikeButton: async (user_id, meet_id) => {
    try {
      const data = { user_id, meet_id };
      const response = await axios.post(`${serverDomain}/likebutton/add`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getLikeButtonByUserId: async (user_id) => {
    try {
      const response = await axios.get(`${serverDomain}/likebutton/list/${user_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteLikeButton: async (user_id, meet_id) => {
    try {
      const response = await axios.delete(`${serverDomain}/likebutton/remove/${user_id}/${meet_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default likesbuttonApi;
