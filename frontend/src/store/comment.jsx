import { createSlice } from '@reduxjs/toolkit';

const initialCommentState = {
  commentList: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    insert(state, action) {
      state.commentList = action.payload.commentList;
    },
    delete(state, action) {
      const commentIdToDelete = action.payload.commentId;
      state.commentList = state.commentList.filter((comment) => comment.comment_id !== commentIdToDelete);
    },
  },
});

export const commentAction = commentSlice.actions;
export default commentSlice.reducer;
