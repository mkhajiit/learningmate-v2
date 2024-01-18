/* eslint-disable no-console */
// API 호출을 담당하는 함수로, axios를 사용하여 데이터를 가져옴
import axios from 'axios';

const fetcher = async (url, options = {}) => {
  try {
    const response = await axios({
      method: options.method || 'get',
      url,
      withCredentials: true,
      ...options,
    });
    return response.data; // 이 부분을 변경하여 data 속성을 반환하도록 수정
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const get = async (url, options = {}) => {
  return fetcher(url, {
    method: 'get',
    ...options,
  });
};

export const post = async (url, data, options = {}) => {
  return fetcher(url, {
    method: 'post',
    data,
    ...options,
  });
};

export default fetcher;
