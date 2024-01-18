import axios from 'axios';
import { serverDomain } from '../config/config';

const usersApi = {
  // 중복검사를 위해 데이터를 읽어오는 api
  checkUser: async () => {
    try {
      const response = await axios.get(`${serverDomain}/users/check`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // 회원가입을 위한 post통신
  signUpUser: async (data) => {
    try {
      const response = await axios.post(`${serverDomain}/users/signup`, data, {
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
  // 로그인을 위한 post통신
  signInUser: async (data) => {
    try {
      const response = await axios.post(`${serverDomain}/users/login`, data);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default usersApi;
