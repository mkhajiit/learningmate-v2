import { createSlice } from '@reduxjs/toolkit';

const initialUserInfoState = {
  userId: 0,
  nickname: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUserInfoState,
  reducers: {
    insert(state, action) {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
    },
    initialize() {
      return initialUserInfoState;
    },
  },
});

export const userInfoAction = userInfoSlice.actions;
export default userInfoSlice.reducer;
