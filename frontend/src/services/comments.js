import api from '../pages/api/api';

const commentsApi = {
  getCommentList: async (course_id) => {
    try {
      const response = await api.get(`/comments/lecture-comment-list/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  insertComment: async (submitData) => {
    try {
      const response = await api.post(`/comments/insert`, submitData);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteComments: async (comment_id) => {
    try {
      const response = await api.delete(`/comments/delete/${comment_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default commentsApi;
